// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
// ```

// Open Weather key : e5118ebc33cd56027d17063bffc2dc6b
// API call current Weather : api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// Imperial system Data: imperial api.openweathermap.org/data/2.5/find?q=London&units=imperial


// Pseudocode: 

//      Create Function "getWeatherApi"
// Event listener on the search button
// Ajax caller to Open weather
// add the city input on the call
// Add the seached element to the localStorage

//      Create Function "createDataList"
// pull local storage as a list 
// create a loop to run the strings in the list
// push those elements in a list
// each created button generates a call with the corresponding city

//      Create Function "getTodaysWeather" 
// Use received array to manipulate the DOM of the corresponding displayed info
// City Name
// Date of such forecast
// Temperature
// Humidity
// Wind-speed
// UV Index

//      Create Function get5DayWeather
// Use received array to manipulate the DOM of the 5 blocks
// create a main design
// run design through loop to display 5 days of forecast  
// Date
// Weather font
// Temperature
// Humidity






// Open Weather key : e5118ebc33cd56027d17063bffc2dc6b
// API call current Weather : api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// Imperial system Data: imperial api.openweathermap.org/data/2.5/find?q=London&units=imperial
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}

//      Create Function "getWeatherApi"
// Event listener on the search button
// Ajax caller to Open weather
// add the city input on the call
// Add the seached element to the localStorage
// updatePage is the function that commands both functions that populate the webpage with the result
var weatherDate;
var weatherSliced;
var cityQuery = $("#city-input").val();
// var wData1;
// var storedWeatherSearch;
var myWeatherData = [];
var forecastCard;


$(document).ready(loadDataList);

function loadDataList() {
    // console.log("manageDataList RAN")
    if (localStorage.myWeatherData == null) {} else {

        myWeatherData = JSON.parse(localStorage.getItem("myWeatherData"));
        console.log(myWeatherData);

        // Code that prevents duplicat cities to be present in the list.
        var myWeatherDataUniqueStrings = [];
        $.each(myWeatherData, function (i, el) {
            if ($.inArray(el, myWeatherDataUniqueStrings) === -1) myWeatherDataUniqueStrings.push(el);
        });
        localStorage.setItem("myWeatherData", JSON.stringify(myWeatherDataUniqueStrings));

        // append elements from the array to the .list-group Element.
        for (i = 0; i < myWeatherDataUniqueStrings.length; i++) {
            $(".list-group").append("<li class='list-group-item'> " + myWeatherDataUniqueStrings[i] + "</li>");
        }

    }
};
// loadDataList();

// $(document).ready(runSavedSearch);

function runSavedSearch(event) {
    // event.preventDefault();
    cityQuery = $(this).text();
    console.log($(this).text());
    getXMLDataFirst(cityQuery);
};



// Save on the array every time user searches
function saveInDataList(wData1) {
    // console.log(wData1.name)
    // var i = 1;
    myWeatherData.unshift(wData1.name);
    // console.log(myWeatherDataX);
    // var myWeatherData3 = new Set(myWeatherData);
    // console.log(myWeatherData3);
    localStorage.setItem("myWeatherData", JSON.stringify(myWeatherData))
    // i++;
    // console.log(myWeatherData);
    // console.log(cityQuery);
    // console.log(i);

    // clear current content on the list
    $(".list-group").empty();
    // reload array from local storage
    loadDataList();
}



// Ajax call XML file for date retrieval
// $(document).ready(getXMLDataFirst);

function getXMLDataFirst() {




    cityQuery;
    //  = $("#city-input").val();
    var queryUrl3 = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityQuery + "&mode=xml&cnt=5&appid=166a433c57516f51dfab1f7edaed8413";
    $.ajax({
        url: queryUrl3,
        method: "GET"
    }).then(getWeatherApi)
}


function getWeatherApi(wData, status, tree) {

    // console.log(wData);
    // console.log(status);
    // console.log(tree);
    weatherDate = tree.responseXML.all[13].childNodes[0].attributes[0].value;
    // weatherDate = JSON.stringify(weatherDate)
    weatherSliced = weatherDate.split("-");
    // console.log(weatherSliced);
    // event.preventDefault();

    // Ajax call current weather
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=166a433c57516f51dfab1f7edaed8413";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(getTodaysWeather);

    // Ajax call 5 day Forecast
    var queryUrl2 = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityQuery + "&cnt=5&appid=166a433c57516f51dfab1f7edaed8413";
    $.ajax({
        url: queryUrl2,
        method: "GET"
    }).then(get5DayWeather)
};


//      Create Function "getTodaysWeather" 

// UV Index Color changing Box 
// PENDING!!!!
function getTodaysWeather(wData1) {



    // UV Index call 
    var cityLat = wData1.coord.lat;
    var cityLon = wData1.coord.lon;
    var queryUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat=" + cityLat + "&lon=" + cityLon;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (uvResponse) {
        $("#uv-index-badge").removeAttr("background-color");
        console.log($("#todays-uv-index"));
        $("#todays-uv-index").text(uvResponse.value);
        console.log(parseInt(uvResponse.value));


        // manage changing color box around uv-index reading
        //  green 0-2, yellow 3-5, orange 6-7, red 8-10, violet 11+
        if (parseInt(uvResponse.value) <= 2) {
            // $("#todays-uv-index").removeAttr("style");
            console.log(this)
            $("#uv-index-badge").attr("style", "background-color: #009900 color:white;");
        } else if (parseInt(uvResponse.value) <= 5) {
            console.log(this)
            // $("#todays-uv-index").removeAttr("style");
            $("#uv-index-badge").attr("style", "background-color: #ffcc00 color:white;")
        } else if (parseInt(uvResponse.value) <= 7) {
            console.log(this)
            // $("#todays-uv-index").removeAttr("style");
            $("#uv-index-badge").attr("style", "background-color: #ff9900 color:white;")
        } else if (parseInt(uvResponse.value) <= 10) {
            console.log(this)
            // $("#todays-uv-index").removeAttr("style");
            $("#uv-index-badge").attr("style", "background-color: #ff0000 color:white;")
        } else if (parseInt(uvResponse.value) >= 11) {
            console.log(this)
            // $("#todays-uv-index").removeAttr("style");
            $("#uv-index-badge").attr("style", "background-color: #990099; color:white;")
            // $("#todays-uv-index").attr("class", "pr-1")
            // $("#todays-uv-index").css("background-size", '60px 120px');
        };
        // $("#todays-uv-index").removeAttr("style")
    });


    // Push weather data into html
    var tempIconUrl = "http://openweathermap.org/img/wn/" + wData1.weather[0].icon + "@2x.png";
    $("#city-icon-div").append('<img id="city-img">');
    $("#city-img").attr("src", tempIconUrl)
    var tempF = (wData1.main.temp - 273.15) * 1.80 + 32;
    weatherDate = weatherSliced[1] + "-" + weatherSliced[2] + "-" + weatherSliced[0]
    $("#city-title").text(wData1.name + " " + weatherDate);
    $("#todays-temperature").text("Temperature: " + tempF.toFixed(1) + " ˚F");
    $("#todays-humidity").text("Humidity: " + wData1.main.humidity + " %");
    $("todays-wind-speed").text("Wind Speed: " + wData1.wind.speed + "MPH");
    saveInDataList(wData1);
}


//      Create Function get5DayWeather
function get5DayWeather(wData, status, Tree) {

    // eliminate previous content from the forecast cards
    $(".forecast-cards").empty();

    for (i = 0; i < wData.list.length; i++) {
        var weatherForecastDay = JSON.parse(weatherSliced[2])
        var weatherDateCard = weatherSliced[1] + "-" + (weatherForecastDay + i + 1) + "-" + weatherSliced[0]
        var forecastToLoop = wData.list[i];
        var tempF = (forecastToLoop.temp.day - 273.15) * 1.80 + 32;
        var weatherIconURL = "http://openweathermap.org/img/wn/" + forecastToLoop.weather[0].icon + "@2x.png";
        forecastCard = $('<div style="width:18%" class="card-blue-forecast bg-primary text-white card card-body m-2"><h5>' + weatherDateCard + '</h5><img src= ' + weatherIconURL + '><p>Temperature: ' + tempF.toFixed(1) + ' ˚F</p><p>Humidity: ' + forecastToLoop.humidity + ' % </p></div>');
        $(".forecast-cards").append(forecastCard);
    }
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    cityQuery = $("#city-input").val();
    getXMLDataFirst(cityQuery);
});

$(".list-group").on("click", "li", runSavedSearch);