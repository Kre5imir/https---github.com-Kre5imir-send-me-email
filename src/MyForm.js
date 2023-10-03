import React, { useState } from 'react';
import './App.css'
import axios from 'axios';

function MyForm() {
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  console.log(content)
  console.log(senderEmail)
  console.log(subject)

  const handlesenderEmailChange = (e) => {
    setSenderEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSendEmail = async (e) => {
    
    e.preventDefault();

    if (!senderEmail || !content) {
      return console.log('Please fill email, subject and message');
    }

    try {
      // Make a POST request to your backend endpoint with recipient and content data
      await axios.post('http://localhost:8000/email/sendEmail', {
        senderEmail,
        subject,
        content,
        
      }).then((response) => {
        console.log('Response Data:', response.status);
        // Handle the response data here
        if ((response.status === 200)) {
        // Email sent successfully
          alert('Email sent!');
          setSenderEmail('');
          setContent('');
          setSubject('');
        
        } else {
          // Email sending failed
          alert('Failed to send email.');
        }
    })} catch (error) {
      console.error('Error occurred:', error);
      alert('An error occurred while sending the email.');
    }
    
  };

  return (
      <div className='container'>
        < form >
        <label htmlFor="senderEmail">Recipient:</label>
        <input
        type="text"
        id="senderEmail"
        value={senderEmail}
        onChange={handlesenderEmailChange}
      />
        <label htmlFor="subject">Subject:</label>
        <textarea
        id="subject"
        value={subject}
        onChange={handleSubjectChange}
      />
        <label htmlFor="content">Content:</label>
        <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
      />
      <button onClick={handleSendEmail}>Send Email</button>
        </form> 
      
      
      </div>
    )
}

export default MyForm;
