# H06-Weather-Dashboard

![App Image](./assets/images/weather-dashboard-app-demo-image.png)



Git Hub Repo: https://github.com/cristianmontenegrop/H06-Weather-Dashboard
Deployed Project: https://cristianmontenegrop.github.io/H06-Weather-Dashboard/

In this activity, a Weather Dashboard was created using information provided from "Open Weather" Via their API.

The key concept is to display content regarding weather conditions from the searched location in the format of City name.

Additionaly a feature that saves the previous searches was implemented, by means of storing informations as an array in localStorage. This in the visual format of a list below the search input, steps were taken to make sure that no double searches were displayed, and that the elements displayed were actual cities that Open Weather found.

4 different AJAX calls were generated in order to gather all the required data.

Ajax calls:
        - Call for the daily weather
        - Call for the 5 day forecast
        - Call for the UV index
        - Call to obtain the prompted location's date

required data:

- current day forecast that displays:
        - Average day temeprature
        - Humidity
        - UV Index
        - Wind speed
        - Icon depicting general sky outlook

- 5 day forecast that displays:
        - Average day temperature
        - Humidity
        - Date
        - Icon depicting general sky outlook



// Pseudocode: 

//      Create Function "loadDataList"
// pull local storage as a list 
// create a loop to run the strings in the list
// push those elements in a list
// each created button generates a call with the corresponding city


//      Create function runSavedSearch
// push city query into function getXMLDataFirst


// Create Function saveInDataList
// Function that saves the searched response city elements into localStorage.
// clear .list-group to load the updated localStorage information


// Create Function getXMLDataFirst
// this function calls to retrieve the information to gather the date, then runs the response in function getWeatherApi


//      Create Function "getWeatherApi"
// Event listener on the search button
// Ajax caller to Open weather
// add the city input on the call
// Add the seached element to the localStorage


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
