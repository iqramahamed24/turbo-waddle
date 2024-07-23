import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { BASE_URL } from '../../data/data';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      toast.success('Login successful', {
        className: "custom-toast-success",

      }
      );
      navigate('/mainpage'); 

    } catch (error) {
      console.error('Error logging in:', error);
      toast.error(`Failed to log in: ${error.message}`, {
        className: "custom-toast-error",

      });
    }
  };

  return (
    <section className="overflow-hidden">
      <div className="flex flex-wrap -m-8">
        <div className="w-full md:w-1/2 p-8">
          <div className="px-4 pt-10 md:pb-40 max-w-lg mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary w-100">
                Log in
              </Button>
              <NavLink to="/signup" className="btn btn-link d-block mt-3">
                Don't have an account? Sign up
              </NavLink>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignIn;
