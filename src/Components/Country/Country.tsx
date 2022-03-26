import React, { useEffect, useState } from 'react';
import { countryDataType, weatherDataType } from '../Types/countryData';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const Country = ( ) => {
    const [ weatherShow, setWeatherShow ] = useState(false)
    let { countryName } = useParams<string>()
    const [countryData, setCountryData] = useState<countryDataType | null>(null)
    const [curWeather, setCurrWeather ] = useState<weatherDataType| null>(null)

    useEffect(()=>{
       if(countryName){ // getting country data
            fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(res => res.json())
            .then(data =>{
                if(data.status === 404){
                    console.log('data not found')
                    console.log(data)
                }
                else{
                        const contryData = {
                        country: countryName,
                        capital: data[0].capital,
                        latlng: data[0].latlng,
                        population: data[0].population,
                        flags: data[0].flags,
                    }
                    setCountryData(contryData)
                }
            })
       }
    },[ countryName ])

    useEffect(()=>{ // getting weather data on every time country state change
        if(countryData?.capital){
            fetch(`http://api.weatherstack.com/current?access_key=b3e1cf02fa83d3e62042d571ec252620&query=${countryName}`)
            .then(res => res.json())
            .then( weather =>{
                const currentWeather = {
                    temperature: weather.current.temperature,
                    weatherIcon: weather.current.weather_icons[0],
                    windSpeed: weather.current.wind_speed, 
                    precip: weather.current.wind_speed,
                }
                setCurrWeather(currentWeather)
            })
        }
    },[ countryData ])

    const showWeather = ( shouldShow: boolean )=>{
        setWeatherShow(shouldShow)
    }

    return (
        <div style={{}}>
            <Box width='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='center' ><br />
            { countryData?.country && <Typography data-testid='countryName' variant='h3'>{countryData?.country?.toUpperCase()}</Typography> }
                <Box display='flex' flexDirection='row' >
                    <img height='150px' src={countryData?.flags.png} alt="flag" />
                    <Box sx={{ textAlign: 'left', marginLeft: '10px' }}>
                        <p>Capital: {countryData?.capital[0]}</p>
                        <p>Population: { countryData?.population}</p>
                        <p>Latitude: {countryData?.latlng[0]}</p>
                        <p>Longitude: {countryData?.latlng[1]}</p>
                    </Box>
                </Box>
            </Box>
            
            { weatherShow ?  <div>
                <Box display='flex' flexDirection='row' justifyContent='center' justifyItems='center' alignItems='center' >
                    <img width='90px' height='90px' style={{borderRadius:'50%'}} src={curWeather?.weatherIcon} alt="weather icon" />
                    <Box sx={{ textAlign: 'left', marginLeft: '10px' }}>
                        <p>Temperature: {curWeather?.temperature}</p>
                        <p>Wind Speed: {curWeather?.windSpeed}</p>
                        <p>Precip: {curWeather?.precip}</p>
                    </Box>
                </Box>
            </div> : 
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 1, bgcolor: 'background.paper', borderRadius: 1, height:'100%' }} >
                <Button onClick={()=>{showWeather(true)}} disabled={false} variant="contained">Capital weather</Button>
            </Box> }

            <Button data-testid='backHomeBtn' variant="outlined" >
                <Link to='/' >Back Home</Link>
            </Button>
        </div>
    );
};

export default Country;