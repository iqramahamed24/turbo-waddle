import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignIn from '../../auth/SIgnIn'; 
import './Home.css'; 




function Home() {
  return (
    <div className="homepage-container">
      <div className="centered-form">
        <div className="login-form rounded shadow-lg p-5">
          <h1 className="text-center text-primary mb-4">Welcome to MyFinancePal!</h1>
          <Button
            as={Link}
            to="/signup"
            variant="primary"
            className="d-block mx-auto mb-3 btn btn-primary"
          >
            Create Account
          </Button>
          <div className="text-center">
            <SignIn/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
