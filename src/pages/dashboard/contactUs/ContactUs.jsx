import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./Contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form data submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setSubmitted(true);
  };

  return (
    <Container className="contact-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Contact Us</h2>
          {submitted && (
            <div className="alert alert-success" role="alert">
              Your message has been sent successfully!
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100">
              Send Message
            </Button>
          </Form>

          <div className="contact-info mt-5">
            <h4>Contact Information</h4>
            <p>Email: support@financeapp.com</p>
            <p>Phone: +(254) 789-7890-432</p>
            <p>Address: 123 Finance St, Moi Avenue, Nairobi, Kenya</p>
          </div>

          <div className="map mt-5">
            <h4>Our Location</h4>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19879.62958374412!2d36.821946!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178c185e7b1a7e7b%3A0x6fbd17d7a9dc6238!2sMoi%20Avenue%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1635270686791!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
