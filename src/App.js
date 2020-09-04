import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  //State = how to write variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:28.3949, lng:84.1240});
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

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

          const sortedData = sortData(data); 
          setTableData(sortedData);  
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    //https://disease.sh/v3/covid-19/all (Worldwide)
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    const url = countryCode === 'Worldwide' 
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      //All of the data....about the country
      //from the country response
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };

  console.log("COUNTRY INFO>>", countryInfo);


  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered } />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map 
          center={mapCenter} 
          zoom={mapZoom}
        />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />

          <h3> Worldwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div >
  );
}

export default App;
