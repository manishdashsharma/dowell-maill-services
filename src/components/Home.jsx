import React, { useState } from 'react';
import './styles.css';
import { generateKey, sendMail } from '../utils/handleAPI';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [key, setKey] = useState(null);
  const [emailData, setEmailData] = useState({
    topic: 'EditorMailComponent',
    toEmail: '',
    toName: '',
    fromEmail: '',
    fromName: '',
    subject: '',
    body: ''
  });

  const handleOnClick = async () => {
    try {
      const response = await generateKey();
      console.log(response);
      setKey(response);
      toast.success("Key generated")
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    try {
      const response = await sendMail(emailData, key.uuid);
      console.log(response);
      toast.success(response.message)
      setKey(prevKey => ({
        ...prevKey,
        is_valid: response.is_valid_count
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button onClick={handleOnClick}>Generate API key</button>
      {key && (
        <>
          <div className='api-key'>
            <p>API Key: {key.uuid}</p>
            <p>Valid count: {key.is_valid}</p>
          </div>
          <form className='text-box' onSubmit={handleSendMail}>
            <input
              type="text"
              placeholder='To Email'
              name='toEmail'
              value={emailData.toEmail}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder='To Name'
              name='toName'
              value={emailData.toName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder='From Email'
              name='fromEmail'
              value={emailData.fromEmail}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder='From Name'
              name='fromName'
              value={emailData.fromName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder='Subject'
              name='subject'
              value={emailData.subject}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder='Email Body'
              name='body'
              value={emailData.body}
              onChange={handleInputChange}
            />
            <button type="submit">Send Mail</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Home;
