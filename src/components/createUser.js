import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar } from "react-icons/bs"; // Import BsCalendar icon from react-icons/bs

function CreateUser() {
  const [Title, setTitle] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [ReadMoreUrl, setReadMoreUrl] = useState("");
  const [ReadMoreText, setReadMoreText] = useState("");
  const [formDate, setFormDate] = useState(null);
  const [formTime, setFormTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    console.log("submited");
    e.preventDefault();
    setLoading(true); // Start loading
    const userObject = {
      Title,
      ImageUrl,
      Description,
      Category,
      ReadMoreUrl,
      ReadMoreText,
      formDate,
      formTime,
    };

    axios
      .post(
        "https://newsserver-1.onrender.com/users/create",
        userObject
      )
      .then((res) => {
        console.log(res.data);
        alert("User Information Registered");
        // Clear form fields after successful submission
        setTitle("");
        setImageUrl("");
        setDescription("");
        setCategory("");
        setReadMoreUrl("");
        setReadMoreText("");
        setFormDate(null);
        setFormTime(null);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error state or display error message
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className='form-wrapper'>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='Title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='ImageUrl'>
          <Form.Label>ImageUrl</Form.Label>
          <Form.Control
            type='text'
            value={ImageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='Description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        {/* <Form.Group controlId='Category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            value={Category}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group> */}
        <Form.Group controlId='Category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as='select'
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            required>
            <option value=''>Select a category</option>
            <option value='Leadership and Organizational Development'>
              Leadership and Organizational Development
            </option>
            <option value='Strategic and Operations Management'>
              Strategic and Operations Management
            </option>
            <option value='Financial and Risk Management'>
              Financial and Risk Management
            </option>
            <option value='Human Resources and Change Management'>
              Human Resources and Change Management
            </option>
            <option value='Marketing and Customer Relations'>
              Marketing and Customer Relations
            </option>
            <option value='Innovation and Entrepreneurship'>
              Innovation and Entrepreneurship
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='formDate'>
          <Form.Label style={{ marginRight: "10px" }}>Select Date :</Form.Label>
          <DatePicker
            selected={formDate}
            onChange={(date) => setFormDate(date)}
            dateFormat='MMMM d, yyyy'
            className='form-control'
            placeholderText='Select a date'
            style={{ marginBottom: "10px" }}
          />
        </Form.Group>

        <Form.Group controlId='formTime'>
          <Form.Label style={{ marginRight: "10px" }}>Time :</Form.Label>
          <DatePicker
            selected={formTime}
            onChange={(time) => setFormTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat='h:mm aa'
            placeholderText='Select a time'
            className='form-control'
          />
        </Form.Group>

        <Form.Group controlId='ReadMoreUrl'>
          <Form.Label>Read More Url</Form.Label>
          <Form.Control
            type='text'
            value={ReadMoreUrl}
            onChange={(e) => setReadMoreUrl(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='ReadMoreText'>
          <Form.Label>Read More Text</Form.Label>
          <Form.Control
            type='text'
            value={ReadMoreText}
            onChange={(e) => setReadMoreText(e.target.value)}
            required
          />
        </Form.Group>

        <br />
        <br />
        <br />

        {/* <Button
          variant='danger'
          size='lg'
          block
          type='submit'
          style={{ paddingBottom: "10px" }}>
          Submit News
        </Button> */}
        <Button
          variant='danger'
          size='lg'
          block
          type='submit'
          style={{ paddingBottom: "10px" }}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
          ) : (
            "Submit News"
          )}
        </Button>
        <br />
        {/* <br /> */}
      </Form>
    </div>
  );
}

export default CreateUser;
