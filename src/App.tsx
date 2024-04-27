import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [selection, setSelection] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSelection = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://duplicatequestions-backend.onrender.com/selection");
      setSelection(response.data.selection);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching selection:", error);
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchSelection();

    const intervalId = setInterval(() => {
      fetchSelection();
    }, 5000000);

    return () => clearInterval(intervalId);
  }, [selection]);



  
  const submitHandler = async () => {
    try {
      const response = await axios.post("https://duplicatequestions-backend.onrender.com/questions", {
        question1,
        question2,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-2/3 p-8 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <textarea
            placeholder="Enter question 1"
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setQuestion1(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="mb-6">
          <textarea
            placeholder="Enter question 2"
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setQuestion2(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="mb-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg w-full shadow-md transition-all"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
        <div className="text-center">
          {isLoading ? (
            <p className="text-gray-700">Loading...</p>
          ) : (
            <p className="text-gray-700">Selection: {selection || "Waiting..."}</p>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default App;
