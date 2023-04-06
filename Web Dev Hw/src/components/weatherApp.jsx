import { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBInputGroup,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";

const geoLocationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const apiKey = "87edf438ea65ffd13800e7ff3707ec87";

const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?";




function WeatherApp() {
    const [data, setData] = useState(undefined);
    const [data2, setData2] = useState(undefined);
    const [city, setCity] = useState("Boston");
    const [CurrentTemp, setCurrentTemp] = useState(undefined);
    const [FeelsLike, setFeelsLike] = useState(undefined);
    const [Max, setMax] = useState(undefined);
    const [Min, setMin] = useState(undefined);
    const [print, setPrint] = useState(false);
    const [latitude, setLat] = useState(42.3554334);
    const [longitude, setLon] = useState(-71.060511);
    const [count, setCount] = useState(0);

    const weatherAPI = weatherUrl+"lat="+latitude+"&lon="+longitude+"&appid="+apiKey;
    const geoAPI = geoLocationUrl+city+"&limit=1&appid="+apiKey;

    useEffect(() => {
        setTimeout(() => {
            fetch(weatherAPI)
            .then((res) => res.json())
            .then((data2) => {
                setData2(data2);
                setCurrentTemp(data2.main.temp);
                setFeelsLike(data2.main.feels_like);
                setMax(data2.main.temp_max);
                setMin(data2.main.temp_min);
            });
        }, 1000);
        // This useEffect will run every time the count state changes, so every seconds
      });


    const convertTemp = (temp) => {
        let kelvinTemp = temp;
        let fahrenheitTemp = (kelvinTemp - 273.15) * 9/5 + 32;
        return fahrenheitTemp.toFixed(2);
    }
    // The temperature is in Kelvin, so we need to convert it to Fahrenheit



    async function search() {
        try{
            setPrint(true);
            // This function is called when the user clicks the submit button
            const response = await fetch(geoAPI);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const geoData = await response.json();
            setLat(geoData[0].lat);
            setLon(geoData[0].lon);
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

}
    
    const getCity=(evt) =>{
        setCity(evt.target.value);
        setPrint(false);
        console.log(city);


    }

    return(
        <section className="vh-0">
            <MDBContainer className = "h-100 py-10">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md ="80" lg="60" xl = "50">
                        <MDBTypography tag="h3" className="mb-4 pb-2 fw-normal">
                        Check the weather forecast
                        </MDBTypography>

                        <MDBInputGroup className="mb-4">
                            <input className="form-control rounded" type="text" placeholder="Enter City" onChange={getCity}/>

                            <a href="#!" type="button" onClick={search}>
                                <span className="input-group-text fw-bold"  id="search">
                                Submit               
                                </span>
                            </a>
                        </MDBInputGroup>

                        <MDBCard className="shadow-10 border">
                            <MDBCardBody className="p-2">
                            <MDBTypography tag="h4" className="mb-3 sfw-normal d-flex flex-row align-items-center"> 
                            <strong>{print ? city : "Boston"} US</strong></MDBTypography>
                            <p className="d-flex flex-row align-items-center mb-0">
                                Current temperature: <strong>{convertTemp(CurrentTemp)}°F</strong>
                                </p>
                                <p className="d-flex flex-row align-items-center">
                                Feels like: <strong>{convertTemp(FeelsLike)}°F</strong>
                                </p>
                                <p className="d-flex flex-row align-items-center">
                                Max: <strong>{convertTemp(Max)}°F</strong>, Min: <strong>{convertTemp(Min)}°F</strong>
                                </p>
                            </MDBCardBody>

                        </MDBCard>

                    </MDBCol>

                </MDBRow>
            </MDBContainer>

        </section>
            
    );}
export default WeatherApp;

