import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from './Map.js';
import './App.css';
import {
  FormControl,
  Select,
  MenuItem,
  CardContent,
} from '@material-ui/core';

function App() {
  //State = how to write variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');

  //https://disease.sh/v3/covid-19/countries
  //UseEffect = Runs a piece of code based on given condition

  useEffect(() => {
    //The code inside here will run once when the components loads and not again.
    //async -> send a request to server, wait for it, do someting with the code.
    const getCountriesData = async () => {
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
    setCountry(countryCode);
  }


  return (
    <div className="app">
      <div className="app_left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="Worldwide"> <img src="https://image.flaticon.com/icons/svg/2909/2909523.svg" height="16" width="16" alt=".." />&nbsp; Worldwide </MenuItem>
              {/* Loop through all the countries and show in option */}
              {countries.map(country => (
                <MenuItem value={country.value}> <img src={country.flag} height="16" width="16" alt=".." /> &nbsp;{country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={1234} total={2000} />
          <InfoBox title="Recovered" cases={4528} total={3000} />
          <InfoBox title="Deaths" cases={4857} total={4000} />
        </div>
 
      {/* Map */}
      <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {/* Table */}
          <h3> Worldwide New Cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>

    </div >
  );
}

export default App;
