import { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "986f593b23d55a7759b1c5dbdce49fc4",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;

      setLoading(true);
      // process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            `${data.name}, ${data.sys.country}\n${data.weather[0].description}\n${data.main.temp}°C`
          );

          setErrorMessage("");
        } else {
          setErrorMessage(data.message); //cú pháp theo err api trả về
        }
      } catch (error) {
        setErrorMessage(error.message);
      }

      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Enter City"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button className="btn">Search</button>
        </form>
        {loading ? (
          <div className="load">loading.....</div>
        ) : (
          <>
            {errorMessage ? (
              <div className="load err">{errorMessage}</div>
            ) : (
              <div className="load weather">{weatherInfo}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
