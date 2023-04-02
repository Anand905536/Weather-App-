import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ThreeDots } from 'react-loader-spinner'
import "./data.css";
import { WiSunrise } from 'react-icons/wi'
import { WiSunset } from "react-icons/wi";
import { FaTemperatureHigh } from 'react-icons/fa'
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi"
import { BsCloudSunFill } from 'react-icons/bs'
import { RiWindyLine } from 'react-icons/ri'
import {TiWeatherStormy} from 'react-icons/ti'




export default function Data() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getLocation = async () => {
    setIsLoading(true);
    setError(false);
    const options = {
      method: "GET",
      headers: { "X-Api-Key": "05bXy3unM1vtQbMKRlU9xA==AomjnymUKBZ3Cely" },
    };
    const cityName = location;
    await fetch(`https://api.api-ninjas.com/v1/weather?city=${cityName}`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  const sunriseTimestamp = data?.sunrise;
  const sunriseDate = new Date(sunriseTimestamp * 1000);

  const sunsetTimestamp = data?.sunset;
  const sunsetDate = new Date(sunsetTimestamp * 1000);


  const handleKeypress = e => {
    //it triggers by pressing the enter key
    console.log(e.key)
  if (e.key === 13) {
    getLocation();
  }
};


  return (
    <div className="data">

      <input
        className="input"
        type="text"
        value={location}
        placeholder="Enter City Name"
        style={{ textAlign: "center" }}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Button  onKeyPress={handleKeypress} className="button" variant="contained" color="primary" style={{background:"#081014",color:"lightgrey"}} onClick={getLocation}>
        Check
      </Button>

      <div className="loader">
        {isLoading && <ThreeDots
          height="30"
          width="30"
          radius="4"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />}
      </div>

      {data ? (
        <div className="card">
          <div className="inside_card_1">

            {/* sunrise */}

            <section className="section" style={{ display: "flex" }}>
              <div className="inside_section_1"><WiSunrise size={90} className="sunrise" /></div>
              <div className="inside_section_2">{sunriseDate.toLocaleTimeString()} <br /><p>Sunrise</p></div>
            </section>

            {/* minimum temprature */}

            <section className="section" style={{ display: "flex" }}>
              <div className="inside_section_1"><FaTemperatureHigh size={70} className="sunrise" /></div>
              <div className="inside_section_2">{data.min_temp}<span>&#176;</span>C<br /><p>Min. Temp</p></div>
            </section>

            {/* maximum temprature */}

            <section className="section" style={{ display: "flex" }}>
              <div className="inside_section_1"><FaTemperatureLow size={70} className="sunrise" /></div>
              <div className="inside_section_2">{data.max_temp}<span>&#176;</span>C<br /><p>Max. Temp.</p></div>
            </section>


            {/* Feeels Like */}

            <section className="section" style={{ display: "flex" }}>
              <div className="inside_section_1"><FaTemperatureLow size={70} className="sunrise" /></div>
              <div className="inside_section_2">{data.feels_like}<span>&#176;</span>C<br /><p>Feels Like</p></div>
            </section>

          </div>

           {/* <p>Temperature: {data.temp}</p> */}

          <div className="inside_card_2">

            {/* sunset */}

          <section className="section" style={{ display: "flex" }}>
            <div className="inside_section_1"><WiSunset size={90} className="sunrise" /></div>
            <div className="inside_section_2">{sunsetDate.toLocaleTimeString()} <br /><p>Sunset</p></div>
          </section>

          {/* humidity */}

          <section className="section" style={{ display: "flex" }}>
            <div className="inside_section_1"><WiHumidity size={90} className="sunrise" /></div>
            <div className="inside_section_2">{data.humidity} <br /><p>Humidity</p></div>
          </section>

          {/* Cloud percentage */}

          <section className="section" style={{ display: "flex" }}>
            <div className="inside_section_1"><BsCloudSunFill size={70} className="sunrise" /></div>
            <div className="inside_section_2">{data.cloud_pct} <br /><p>Cloud %</p></div>
          </section>



          {/* feels like temptrature */}

          <section className="section" style={{ display: "flex" }}>
            <div className="inside_section_1"><RiWindyLine size={70} className="sunrise" /></div>
            <div className="inside_section_2">{data.wind_speed}m/s<br /><p>Wind Speed</p></div>
          </section>

        </div>

         {/* <p>Wind Degrees: {data.wind_degrees}</p> */}

    </div>

  ) : (
    <div className="card2">
      <h1 className="inside_card2_h1">Enter City Name For Weather Details</h1>
      <div>
        <TiWeatherStormy className="weatherlogo" size={250}/>
      </div>

    </div>
  )
}
    </div >
  );
}
