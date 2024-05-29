// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./NewsArticles.css";
// const NewsArticles = () => {
//   const [articles, setArticles] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const articlesPerPage = 10;

//   useEffect(() => {
//     fetchArticles(currentPage);
//   }, [currentPage]);

//   const fetchArticles = async (page) => {
//     try {
//       const response = await axios.get(`https://newsserver-1.onrender.com/`);
//       console.log(response.data);
//       setArticles(response.data.reverse());
//       setTotalPages(Math.ceil(response.data.total / articlesPerPage));
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     }
//   };
//   // console.log(articles);
//   const truncateDescription = (description, wordLimit) => {
//     const words = description.split(" ");
//     return words.length > wordLimit
//       ? words.slice(0, wordLimit).join(" ") + "..."
//       : description;
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className='container mt-5'>
//       {/* <h1>hii</h1> */}
//       <div className='row'>
//         {articles.map((article) => (
//           <div key={article.id} className='col-md-4 mb-4'>
//             <div className='card h-100'>
//               <img
//                 src={article.ImageUrl}
//                 className='card-img-top'
//                 alt={article.Title}
//               />
//               <div className='card-body'>
//                 <h5 className='card-title'>
//                   {truncateDescription(article.Description, 9)}
//                 </h5>
//                 <p className='card-text'>
//                   {truncateDescription(article.Description, 24)}
//                 </p>
//                 <a href={article.ReadMoreUrl} className='btn btn-primary'>
//                   {truncateDescription(article.ReadMoreText, 5)}
//                 </a>
//               </div>
//               <div className='card-footer'>
//                 <small className='text-muted'>
//                   {new Date(article.formDate).toLocaleDateString()}
//                 </small>
//                 <small className='text-muted ml-2'>
//                   {new Date(article.formTime).toLocaleTimeString()}
//                 </small>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <nav aria-label='Page navigation'>
//         <ul className='pagination justify-content-center'>
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button
//               className='page-link'
//               onClick={() => handlePageClick(currentPage - 1)}>
//               Previous
//             </button>
//           </li>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <li
//               key={i + 1}
//               className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
//               <button
//                 className='page-link'
//                 onClick={() => handlePageClick(i + 1)}>
//                 {i + 1}
//               </button>
//             </li>
//           ))}
//           <li
//             className={`page-item ${
//               currentPage === totalPages ? "disabled" : ""
//             }`}>
//             <button
//               className='page-link'
//               onClick={() => handlePageClick(currentPage + 1)}>
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default NewsArticles;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./NewsArticles.css"; // Assuming you add the CSS here

const NewsArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const articlesPerPage = 21;

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page) => {
    try {
      const response = await axios.get(`https://newsserver-1.onrender.com/`);
      console.log(response);
      setArticles(response.data.reverse());
      setTotalPages(Math.ceil(response.data.total / articlesPerPage));
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      console.log(articleToDelete._id);
      const response = await axios.delete(
        `https://newsserver-1.onrender.com/api/news/${articleToDelete._id}`
      );
      setLoading(false);
      console.log(response);
      setShowDeleteModal(false);
      fetchArticles(currentPage);
      // Refresh the articles after deletion
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleCardClick = (article) => {
    setSelectedArticle(article);
    setFormValues(article);
    setShowUpdateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://newsserver-1.onrender.com/api/news/${selectedArticle._id}`,
        formValues
      );
      setShowUpdateModal(false);
      fetchArticles(currentPage); // Refresh the articles after update
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        {articles.map((article) => (
          <div key={article.id} className='col-md-4 mb-4'>
            <div
              className='card h-100'
              onClick={() => handleCardClick(article)}>
              <img
                src={article.ImageUrl}
                className='card-img-top'
                alt={article.Title}
              />
              <div className='card-body'>
                <h5 className='card-title'>{article.Title}</h5>
                <p className='card-text'>
                  {truncateDescription(article.Description, 24)}
                </p>
                <a href={article.ReadMoreUrl} className='btn btn-primary'>
                  {article.ReadMoreText}
                </a>
              </div>
              <div className='card-footer position-relative'>
                <small className='text-muted'>
                  {new Date(article.formDate).toLocaleDateString()}
                </small>
                <small className='text-muted ml-2'>
                  {new Date(article.formTime).toLocaleTimeString()}
                </small>
                <i
                  className='fas fa-trash-alt delete-icon position-absolute'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(article);
                  }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label='Page navigation'>
        <ul className='pagination justify-content-center'>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className='page-link'
              onClick={() => handlePageClick(currentPage - 1)}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button
                className='page-link'
                onClick={() => handlePageClick(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}>
            <button
              className='page-link'
              onClick={() => handlePageClick(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                name='Title'
                value={formValues.Title || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formImageUrl'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                name='ImageUrl'
                value={formValues.ImageUrl || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                name='Description'
                value={formValues.Description || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formCategory'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                name='Category'
                value={formValues.Category || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formReadMoreUrl'>
              <Form.Label>Read More URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter read more URL'
                name='ReadMoreUrl'
                value={formValues.ReadMoreUrl || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formReadMoreText'>
              <Form.Label>Read More Text</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter read more text'
                name='ReadMoreText'
                value={formValues.ReadMoreText || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter date'
                name='formDate'
                value={
                  formValues.formDate
                    ? new Date(formValues.formDate).toISOString().substr(0, 10)
                    : ""
                }
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formTime'>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type='time'
                placeholder='Enter time'
                name='formTime'
                value={
                  formValues.formTime
                    ? new Date(formValues.formTime).toISOString().substr(11, 5)
                    : ""
                }
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this article?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={confirmDelete} disabled={loading}>
            {loading ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewsArticles;
