import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from "react-bootstrap";
import { FiSend } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";


function ContactForm() {
  const [state, handleSubmit] = useForm("contactForm");
  if (state.succeeded) {
      return (
        <>
            <h5 className="text-center mt-3">Your message has been successfully sent ✅ <br/> We will get back to you as soon as possible</h5>
        </>
      )
  }
  return (
     
 <div className="form contact-form mt-5">
          <form
            onSubmit={handleSubmit}
            method="POST"
            role="form"
            className="messageForm"
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group mt-3">
              <textarea
                className="form-control"
                name="message"
                rows="5"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <div className="text-center mt-5">
              <Button type="submit" disabled={state.submitting} size="lg" variant="primary">
                Send <FiSend />
              </Button>
            </div>
          </form>
          <style jsx>{`
            .form-control:focus {
              // color: var(--secondary-color);
              background-color: #fff;
              border-color: var(--main-color);
              outline: 0;
              box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
            }
            h2 {
              color: var(--main-color);
              font-weight: bold;
            }
          `}</style>
        </div> 
    
  );
}
export default ContactForm;
