import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const App = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
    .sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID 
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY  // Public Key 
    )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message Sent Successfully!");
          e.target.reset();
        },
        (error) => {
          console.error(error);
          setStatus("Failed to Send Message.");
        }
      );
  };

  return (
    <div className="App">
      <h1>Contact Me</h1>
      <form ref={form} onSubmit={sendEmail} style={formStyles}>
        <label>Name</label>
        <input type="text" name="user_name" required style={inputStyles} />

        <label>Email</label>
        <input type="email" name="user_email" required style={inputStyles} />

        <label>Message</label>
        <textarea name="message" required style={textareaStyles}></textarea>

        <button type="submit" style={buttonStyles}>Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

// Styles for simplicity
const formStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "400px",
  margin: "auto",
};

const inputStyles = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const textareaStyles = {
  ...inputStyles,
  height: "100px",
};

const buttonStyles = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default App;
