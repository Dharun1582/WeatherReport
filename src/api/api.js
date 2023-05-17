export async function fetchlatlon(){
    const APIkey='5810c2641ae2af82a48c78181c253baf';
    try {
      console.log( document.getElementById("location").value);
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ document.getElementById("location").value}&limit=1&appid=${APIkey}`);
      const jsonData = await response.json();
      document.getElementById("latitude").value=jsonData[0].lat;
      document.getElementById("longitude").value=jsonData[0].lon;
 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  export async function fetchData(){
    const APIkey='5810c2641ae2af82a48c78181c253baf';
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${document.getElementById("latitude").value}&lon=${document.getElementById("longitude").value}&units=metric&appid=${APIkey}`);
      // const res= await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${document.getElementById("latitude").value}&lon=${document.getElementById("longitude").value}&limit=5&appid=${APIkey}`);
      // console.log(res);
      const jsonData = await response.json();
      document.getElementById('curimg').src=`https://openweathermap.org/img/wn/${jsonData.current.weather[0].icon}@4x.png`;
      console.log(jsonData);
      return jsonData;
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  