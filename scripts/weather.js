"use strict"
console.log("hey mike!")

window.onload = () => {

    cityDropdown();

    let dropdown = document.querySelector("#citySelect");

    dropdown.addEventListener("change", displayEverything);


}
function cityDropdown() {

    // selecting the dropdown from the html page
    let dropdown = document.querySelector("#citySelect");

    //here im creating a default value to choose from in the dropdown
    let defaultOption = document.createElement("option");
    defaultOption.value = ""
    defaultOption.innerText = "----Select a city----"

    dropdown.appendChild(defaultOption);

    //A loop is created to go throught the array of cities and create a option for the "name" part of out array
    cities.forEach((city) => {

        //create the new option for the category we are on in the loop
        let newOption = document.createElement("option");

        //set the value for the option
        newOption.value = `${city.latitude},${city.longitude}`;

        //set what the user sees 
        newOption.textContent = city.name;

        dropdown.appendChild(newOption);


    });




}
//making a function to display everything we want
function displayEverything() {
   
    // calling the weather function that is returning the URL and making it a easy to use variable,
    // forcastURL is the actual data, that we are returning as getWeather is the promise.
    getTheWeather().then((forecastURL) => {
        //then is going in the promises and returning what we have in it them, the last then basically that we run in it 
        actualDisplayWeather(forecastURL).then((info)=>{

            displayForecast(info.properties.periods)

        })


    });
 
}
function displayForecast(forecastArray){

    let table = document.getElementById("tableBodyody");
    table.innerHTML = "";

    for(let i=0; i<forecastArray.length; i++) {

        let row = table.insertRow();
        
        let cell1 = row.insertCell(0);
        cell1.innerHTML = forecastArray[i].name;
        
        let cell2 = row.insertCell(1);
        cell2.innerHTML= forecastArray[i].temperature + " " +
        forecastArray[i].temperatureUnit;
        
        let cell3 = row.insertCell(2);
        cell3.innerHTML = forecastArray[i].windDirection + " " +
        forecastArray[i].windSpeed;
        
        let cell4 = row.insertCell(3);
        cell4.innerHTML = forecastArray[i].shortForecast;
    
        
        }

    // console.log(forecastArray)
    
}
function getTheWeather() {
    //grabbing the dropdown in order to grab the values attached
    let dropdown = document.querySelector("#citySelect");


    //grabbbing the API link to with selected value from the dropdown to show certain data
    return fetch(`https://api.weather.gov/points/${dropdown.value}`)
        .then((response) => response.json())
        .then((data) => {

            ///this is returning the URL that has the information that we want to build a table
            return data.properties.forecast

        })
        .catch((error) => console.log("Girl..this doesnt work"))



}
//Now we have to go into the link itself and grab that information so we have to run another fetch request
function actualDisplayWeather(forecastURL) {

    // console.log("hi")
    // Here we are telling the request to grab that URL and run through it
    return fetch(forecastURL)
        .then((response) => response.json())
        .then((info) => {
            //this should return that information we are looking for
            return info
        })
        .catch((error) => console.log("Girl..this doesnt work"))

}
