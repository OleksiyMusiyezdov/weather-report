import React, { useState } from "react";
import "./App.css";
import { Main } from "./components/main/main.page";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  geoApiOptions,
  GEO_API_URL,
  WEATHER_API_KEY,
  WEATHER_API_URL,
} from "./api/api";
import { IChoosenCity } from "./interfaces/interfaces";

function App() {
  const [choosenCity, setChoosenCity] = useState<IChoosenCity | null>();
  const [forecast, setForecast] = useState(null);

  console.log(forecast);

  const handleOnChange = (searchData: IChoosenCity | null) => {
    if (searchData !== null) {
      setChoosenCity(searchData);
      const [latitude, longitude] = searchData.value.split(" ");

      fetch(
        `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((response) => {
          setForecast({ city: searchData.label, ...response });
        })
        .catch(console.log);
    }
  };

  const loadOptions = (choosenCity: string) => {
    /* minPopulation=1000000& added to reduce complexity/workload */
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${choosenCity}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        const options = response.data.map((city: any) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        });
        return { options: options };
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      width: 500,
      fontSize: 18,
    }),
    option: (styles: any) => ({
      ...styles,
      fontSize: 18,
      background: "white",
      color: "black",
    }),
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather report</h2>
        <AsyncPaginate
          styles={customStyles}
          placeholder="Enter the city name"
          debounceTimeout={600}
          value={choosenCity}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </header>

      {/* {forecast && <Forecast data={forecast} />} */}

      <Main choosenCity={choosenCity as IChoosenCity} />
    </div>
  );
}

export default App;
