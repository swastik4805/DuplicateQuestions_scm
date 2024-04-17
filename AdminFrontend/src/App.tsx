import { useState, useEffect } from 'react';
import axios from 'axios';

function SecondFrontend() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch questions when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/questions');
      setQuestions(response.data.questions);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setIsLoading(false);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:3001/selection', { selection: selectedOption });
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending selection:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Questions</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <p>{question}</p>
              </li>
            ))}
            <label>
                  <input
                    type="radio"
                    value="duplicate"
                    checked={selectedOption === 'duplicate'}
                    onChange={() => handleOptionChange('duplicate')}
                  />
                  Duplicate
                </label>
                <label>
                  <input
                    type="radio"
                    value="not-duplicate"
                    checked={selectedOption === 'not-duplicate'}
                    onChange={() => handleOptionChange('not-duplicate')}
                  />
                  Not Duplicate
                </label>
          </ul>
          <button onClick={handleSubmit}>Submit Selection</button>
        </>
      )}
    </div>
  );
}

export default SecondFrontend;
