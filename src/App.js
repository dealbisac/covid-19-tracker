import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';

function App() {
  //State = how to write variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');

  //https://disease.sh/v3/covid-19/countries
  //UseEffect = Runs a piece of code based on given condition

  useEffect(() =>{
    //The code inside here will run once when the components loads and not again.
    //async -> send a request to server, wait for it, do someting with the code.
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries/")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, //Nepal
            value: country.countryInfo.iso2, //NP
            flag: country.countryInfo.flag //flag of Country
          }));

          setCountries(countries);
      });
     };

     getCountriesData();
    }, []);

    const onCountryChange = (event) => {
      const countryCode = event.target.value;

      console.log("YOOOO", countryCode);

      setCountry(countryCode);
    }


  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="Worldwide">
            <img src="https://image.flaticon.com/icons/svg/2909/2909523.svg" height="16" width="16" alt=".."/>&nbsp;
            Worldwide
          </MenuItem>
          {/* Loop through all th countries and show in option */}
            
            {countries.map(country =>(
                <MenuItem value={country.value}>
                  <img src={country.flag} height="16" width="16" alt=".."/> &nbsp;
                  {country.name}
                </MenuItem>
              ))} 
            
            
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Nepal">Nepal</MenuItem>
            <MenuItem value="UK">UK</MenuItem> */}
          </Select>
      </FormControl>
      
      </div>
      

      { /* Header */}
      { /* Title + Select input from dropdown */}

      {/* Info Boxs */}
      {/* Info Boxs */}
      {/* Info Boxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}

      
    </div>
  );
}

export default App;
