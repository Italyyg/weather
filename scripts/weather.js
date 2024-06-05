"use strict"
console.log("hey mike!")

window.onload=()=>{

cityDropdown();

}
function cityDropdown(){

    let dropdown= document.querySelector("#citySelect");

    // let citieslist= cities.length

    // for(let i = 0; i< citieslist; i++ ){

    //     console.log(cities[i].name);

    // }

    let defaultOption = document.createElement("option");
    defaultOption.value= ""
    defaultOption.innerText= "----Select a city----"

    dropdown.appendChild(defaultOption);

    cities.forEach((city) => {

        //create the new option for the category we are on in the loop
        let newOption = document.createElement("option");

        //set the value for the option
        newOption.value = city.name;

        //set what the user sees 
        newOption.textContent = city.name;

        dropdown.appendChild(newOption);


    })



}