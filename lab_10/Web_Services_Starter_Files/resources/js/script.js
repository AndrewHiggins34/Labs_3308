//helper functions
var dayOfWeek = "";
function formatDate(date, month, year)
{
  month = (month.length < 2) ? ('0' + month) : month;
  date = (date.length < 2)? ('0' + date) : date;
  return [year,month,date].join('-');
}
function getDayofWeek(date, month, year){
  var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayOfWeek =  week_names[new Date([month,date,year].join('-')).getDay()];
}
function getFarenheitTemp(temp){
  return (9*temp/5)+32;
}

//run when the document object model is ready for javascript code to execute
$(document).ready(function() {
  var url ='https://api.weatherstack.com/forecast?access_key=5bc82451636190abd9d7afe6fe9b20b5&query=40.015,-105.270&forecast_days=5&units=f'; //Place your weatherstack API Call Here - access_key to be used: 5bc82451636190abd9d7afe6fe9b20b5

  $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
    // console.log(data);
    // console.log("Current Temp: " + data.current.temperature);

//  1. image_today : This should display an image for today's weather.
    document.getElementById("image_today").src = data.current.weather_icons;
//  2. location: This should be appended to the heading. For eg: "Today's Weather Forecast - Boulder"
    document.getElementById("heading").innerText = "Today's Weather Forecast - " + data.location.name;
//  3. temp_today : This will be updated to match the current temperature. Use the getFarenheitTemp to convert the temperature from celsius to farenheit.
    document.getElementById("temp_today").innerText = getFarenheitTemp(data.current.temperature);
//  4. thermometer_inner : Modify the height of the thermometer to match the current temperature.
    var x = getFarenheitTemp(data.current.temperature);
    if(x > 100){x = 100;}
    if(x < 0){x = 0;}
    document.getElementById("thermometer_inner").style.height = x+"%";
//  5. precip_today : This will be updated to match the current probability for precipitation.
    document.getElementById("precip_today").innerText = data.current.precip;
//  6. humidity_today : This will be updated to match the current humidity percentage (make sure this is listed as percentage %)
    document.getElementById("humidity_today").innerText = data.current.humidity + "%";
//  7. wind_today : This will be updated to match the current wind speed.
    document.getElementById("wind_today").innerText = data.current.wind_speed;
//  8. summary_today: This will be updated to match the current summary for the day's weather.
    document.getElementById("summary_today").innerText = data.current.weather_descriptions;

    //helper function - to be used to get the key for each of the 5 days in the future when creating cards for forecasting weather
    function getKey(i){
        var week_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
        dayOfWeek=week_names[new Date(Object.keys(data.forecast)[i]).getDay()];
        return data.forecast[Object.keys(data.forecast)[i]];
    }

   for(var x = 0; x < 6; x++){
     console.log(getKey(x));
   }

   forecastCards(data);

   function forecastCards(data){
     var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     var table = document.getElementById("5_day_forecast");
     for(var i = 1; i < 6; i++){
      var card1 = '<div style="width: 20%;"><div class="card"><div class="card-body"><h5 class="card-title">'
      var card2 = '</h5><p class="card-text">High:'
      var card3 = '<br>Low:'
      var card4 = '</p></div></div></div>'
      table.innerHTML += card1+week_names[i]+card2+getKey(i).maxtemp+'<br>Low:'+getKey(i).mintemp+card3+getKey(i).mintemp+
      '<br>Sunrise:'+getKey(i).astro.sunrise+'<br>Sunset:'+getKey(i).astro.sunset+card4;
     }
   }

/*
      Each card should use the following format:

      <div style="width: 20%;">
        <div class="card" id="day5">
          <div class="card-body">
            <h5 class="card-title"><!-- List Day of the Week Here --></h5>
            <p class="card-text">High:<!--List Temperature High --> <br>
              Low: <!-- List Temperature Low --><br>
              Sunrise: <!-- List Time of Sunrise --><br>
              Sunset: <!-- List Time of Sunset --></p>
          </div>
        </div>
      </div>

      <Hint1 - To access the forecast data> You need to make sure to carefully see the JSON response to see how to access the forecast data. While creating the key to access forecast data make sure to convert it into a string using the toString() method.

      <Hint2 - To add the cards to the HTML> - Make sure to use string concatenation to add the html code for the daily weather cards.  This should
      be set to the innerHTML for the 5_day_forecast.
    */
  })
});
