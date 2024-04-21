import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [selection, setSelection] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSelection = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://ec2-13-50-232-36.eu-north-1.compute.amazonaws.com:3001/selection");
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
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selection]);



  
  const submitHandler = async () => {
    try {
      const response = await axios.post("http://ec2-13-50-232-36.eu-north-1.compute.amazonaws.com:3001/questions", {
        question1,
        question2,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <textarea
          placeholder="enter question 1"
          onChange={(e) => {
            setQuestion1(e.target.value);
          }}
        ></textarea>
        <textarea
          placeholder="enter question 2"
          onChange={(e) => {
            setQuestion2(e.target.value);
          }}
        ></textarea>
        <button onClick={submitHandler}>submit</button>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Selection: {selection || "No selection made yet"}</p>
        )}
      </div>
    </div>
  );
}

export default App;
