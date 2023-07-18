import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_END_POINT;

const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}task`, { name: inputValue });
      console.log('response', response);

      if (response.status === 201) {
        const data = response.data;
        console.error(data,'data');
        setResults(data);
        setInputValue(''); // Clear the input field
      } else {
        console.error('Failed to save the input value.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <h1>Input Form</h1>
        <form id="inputForm" className="mb-3" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputValue"
              placeholder="Enter a value"
              required
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>

        <ul className="list-group">
          {results.length > 0 && results.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
