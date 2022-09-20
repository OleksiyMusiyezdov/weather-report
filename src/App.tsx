import React, { useState } from "react";
import "./App.css";
import { Main } from "./components/main.page";
import { send } from "process";

function App() {
  const [city, setCity] = useState("");
  const [choosenCity, setChoosenCity] = useState("");

  const handleSubmit = () => {
    if (city !== "") {
      console.log(city); // send(city);
      setChoosenCity(city);
      setCity("");
    }
  };

  const handleKeyPress = (eventKey: string) => {
    if (eventKey === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather report</h2>
        <div className="input-block">
          <p>Enter the city</p>
          <input
            className="input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e.key)}
          />
          <button className="button" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </header>
      <Main choosenCity={choosenCity} />
    </div>
  );
}

export default App;
