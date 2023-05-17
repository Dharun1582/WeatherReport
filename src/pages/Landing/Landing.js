import React, { useEffect } from 'react'
import styles from "./Landing.css"
import { useState } from 'react';
import {fetchlatlon,fetchData} from './../../api/api';

function Landing() {



  async function ftw(position){
    document.getElementById("latitude").value=position.coords.latitude;
    document.getElementById("longitude").value=position.coords.longitude;
    wdata=await fetchData();
    update();
  }

  function wtf(err){
    console.log(err);
  }




  useEffect(async ()=>{
    let opts={
      enableHighAccuracy: true,
      timeout:1000*10,
      maximumAge:1000*60*5,
    };
    await navigator.geolocation.getCurrentPosition(ftw,wtf,opts);
  },[])

  var wdata={};


  function update(){
    document.getElementById("temp").innerHTML=wdata.current.temp+" °C";
    document.getElementById("maindesc").innerHTML=wdata.current.weather[0].description;
    document.getElementById("feelslike").innerHTML="Feels Like "+wdata.current.feels_like+" °C";
    document.getElementById("desc").innerHTML="The low will be "+wdata.daily[0].temp.min+" °C";
    document.getElementById("cloudiness").innerHTML=wdata.current.clouds+" %";
    document.getElementById("wind").innerHTML=wdata.current.wind_speed+" m/s";
    document.getElementById("humidity").innerHTML=wdata.current.humidity+" %";
    document.getElementById("visibility").innerHTML=wdata.current.visibility+" m";
    document.getElementById("pressure").innerHTML=wdata.current.pressure+" hPa";
    document.getElementById("dewpoint").innerHTML=wdata.current.dew_point+" °C";
    for(var i=1;i<=6;i++){
      document.getElementById(i+"img").src=`http://openweathermap.org/img/wn/${wdata.daily[i].weather[0].icon}@4x.png`;
      document.getElementById(i+"max").innerHTML=wdata.daily[i].temp.max+" °C";
      document.getElementById(i+"min").innerHTML=wdata.daily[i].temp.min+" °C";
      var dt=new Date(wdata.daily[i].dt * 1000);
      document.getElementById(i+"date").innerHTML=dt.toDateString();
      document.getElementById(i+"desc").innerHTML=wdata.daily[i].weather[0].description;
    }

    if(document.getElementById("location").value==""){
      document.getElementById("mainhd").innerHTML="Current Weather"+" (latitude= "+ document.getElementById("latitude").value+" longitude= "+ document.getElementById("longitude").value+")";
    }else{
      document.getElementById("mainhd").innerHTML="Current Weather"+" ("+document.getElementById("location").value+")";
    }

    document.getElementById("latitude").value="";
    document.getElementById("longitude").value="";
    document.getElementById("location").value="";
  }

  async function showCard(){

    if(document.getElementById("latitude").value=="" && document.getElementById("longitude").value==""){
      if( document.getElementById("location").value==""){
        window.alert("Enter valid data");
        return;
      }
      await fetchlatlon();
    }
    wdata=await fetchData();
    update();

  }


  return (
    <div>
        <br></br>
        <br></br>
        <nav class="container">
          <div class="row align-items-center py-2">
            <div class="input-group col-sm">
              <span class="input-group-text" id="basic-addon1">Lat</span>
              <input
                type="text"
                class="form-control"
                inputmode="numeric"
                id="latitude"
                placeholder="latitude"
                aria-label="latitude"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group col-sm">
              <span class="input-group-text" id="basic-addon1">Lon</span>
              <input
                type="text"
                class="form-control"
                inputmode="numeric"
                id="longitude"
                placeholder="longitude"
                aria-label="longitude"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <div class="row align-items-center py-2">
            <div class="input-group col-sm">
              <span class="input-group-text" id="basic-addon1">Location</span>
              <input
                type="text"
                class="form-control"
                inputmode="text"
                id="location"
                placeholder="location"
                aria-label="location"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <div class="row align-items-center py-2 ">
            <div class="col-auto me-auto centre">
              <button id="btnGet" type="button" class="btn btn-primary mb-3" onClick={showCard}>
                Get Weather
              </button>
              <br></br>
            </div>
          </div>
        </nav>
      <br></br>

      {/* ============================ weather details ==================================== */}

      <div class="container">
        <div class="row gy-5">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="container cardown">
              <div class="row ">
                <div class="col headown" id="mainhd">
                  
                </div>
              </div>
              <div class="row ">
                <div class="col-md-4 col-12  imgown">
                  <img id="curimg" src={wdata.urlImg}  />
                </div>
                <div class="col-md-8 col-12 maindescription" >
                  <b class="tempown" id='temp'></b><br></br>
                  <b id="maindesc"></b>
                  <br></br>
                  <span id="feelslike"></span>
                </div>
              </div>

              <div class="row ">
                <div class="col-12  descown" id="desc">
                  
                </div>
              </div>

              <div class="row ">
                <div class="col-sm-2 col-6  btmcont">
                  Cloudiness<br></br>
                  <b id="cloudiness"></b>
                </div>
                <div class="col-sm-2 col-6  btmcont">
                  Wind<br></br>
                  <b id="wind"></b>
                </div>
                <div class="col-sm-2 col-6  btmcont">
                  Humidity<br></br>
                  <b id="humidity"></b>
                </div>
                <div class="col-sm-2 col-6  btmcont">
                  Visibility<br></br>
                  <b id="visibility"></b>
                </div>
                <div class="col-sm-2 col-6  btmcont">
                  Pressure<br></br>
                  <b id="pressure"></b>
                </div>
                <div class="col-sm-2 col-6  btmcont">
                  Dew Point<br></br>
                  <b id="dewpoint"></b>
                </div>
            
              </div>
            </div>
          </div>


        </div>
        <br></br>
        <span class="forcastown">6 day forecast</span>
        <div class="row gy-5 rowown">
            <div class="col-lg-2 col-md-4 col-xs-12">
              <div class="card">
                
                <img class="card-img-top" id="1img" src="https://openweathermap.org/img/wn/10d@2x.png" alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title" id="1date"></h5>
                <p class="card-text" id="1desc"></p>
                <p class="card-text"><b id="1max"></b><br></br><b id="1min"></b></p>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-4 col-xs-12">
              <div class="card">
                <img class="card-img-top" id="2img" src="https://openweathermap.org/img/wn/10d@2x.png" alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title" id="2date"></h5>
                <p class="card-text" id="2desc"></p>
                <p class="card-text"><b id="2max"></b><br></br><b id="2min"></b></p>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-4 col-xs-12">
              <div class="card">
                <img class="card-img-top" id="3img" src="https://openweathermap.org/img/wn/10d@2x.png" alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title" id="3date"></h5>
                <p class="card-text" id="3desc"></p>
                <p class="card-text"><b id="3max"></b><br></br><b id="3min"></b></p>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-4 col-xs-12">
              <div class="card">
                <img class="card-img-top" id="4img" src="https://openweathermap.org/img/wn/10d@2x.png" alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title" id="4date"></h5>
                <p class="card-text" id="4desc"></p>
                <p class="card-text"><b id="4max"></b><br></br><b id="4min"></b></p>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-4 col-xs-12">
              <div class="card">
                <img class="card-img-top" id="5img" src="https://openweathermap.org/img/wn/10d@2x.png" alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title" id="5date"></h5>
                <p class="card-text" id="5desc"></p>
                <p class="card-text"><b id="5max"></b><br></br><b id="5min"></b></p>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-4 col-xs-12">
              <div class="card">
                <img class="card-img-top" id="6img" src="https://openweathermap.org/img/wn/10d@2x.png" alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title" id="6date"></h5>
                <p class="card-text" id="6desc"></p>
                <p class="card-text"><b id="6max"></b><br></br><b id="6min"></b></p>
                </div>
              </div>
            </div>

        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default Landing