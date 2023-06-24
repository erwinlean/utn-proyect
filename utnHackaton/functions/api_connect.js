"use strict";

let timeForm =  document.querySelector("#form-time");
let timeValue = document.querySelector("#form-time > input[type=text]");
let update_time = 30000;
let refreshInterval;

// Location/Zones
const zones = [{
        name: "Buenos AIres",
        latitude: "-34,61",
        longitude: "-58,38"
    },{
        name: "Catamarca",
        latitude: "-28,47",
        longitude: "-65,79"
    },{
        name: "Chaco",
        latitude: "-27,46",
        longitude: "-58,98"
    },{
        name: "Chubut",
        latitude: "-43,30",
        longitude: "-65,10"
    },{
        name: "Cordoba",
        latitude: "-31,41",
        longitude: "-64,18"
    },{
        name: "Corrientes",
        latitude: "-27,47",
        longitude: "-58,83"
    },{
        name: "Paraná",
        latitude: "-31,73",
        longitude: "-60,53"
    },{
        name: "Formosa",
        latitude: "-26,18",
        longitude: "-58,17"
    },{
        name: "Jujuy",
        latitude: "-24,19",
        longitude: "-65,30"
    },{
        name: "La Pampa",
        latitude: "-36,62",
        longitude: "-64,28"
    },{
        name: "La Rioja",
        latitude: "-29,41",
        longitude: "-66,85"
    },{
        name: "Mendoza",
        latitude: "-32,89",
        longitude: "-68,83"
    },{
        name: "Misiones",
        latitude: "-27,37",
        longitude: "-55,90"
    },{
        name: "Neuquén",
        latitude: "-38,95",
        longitude: "-68,06"
    },{
        name: "Río Negro",
        latitude: "-40,81",
        longitude: "-63,00"
    },{
        name: "Salta",
        latitude: "-24,79",
        longitude: "-65,41"
    },{
        name: "San Juan",
        latitude: "-31,54",
        longitude: "-68,54"
    },{
        name: "San Luis",
        latitude: "-33,30",
        longitude: "-66,34"
    },{
        name: "Santa Cruz",
        latitude: "-51,62",
        longitude: "-69,22"
    },{
        name: "Santa Fe",
        latitude: "-31,65",
        longitude: "-60,71"
    },{
        name: "Santiago del Estero",
        latitude: "-27,80",
        longitude: "-64,26"
    }
];
const cities_on_dom = [];

// Helpers - Functions
function week_average_calc (array_to_sum){
    array_to_sum = (array_to_sum.reduce(function(num_1, num_2){return num_1 + num_2}) / 7);
    return array_to_sum;
};
function clear_dom(array_toclear){
    const elementsToClear = document.querySelectorAll("#list-item");
    elementsToClear.forEach(element => element.remove());

    while(array_toclear.length > 0){
        array_toclear.pop();
    };
};
function getDayFromIndex(index) {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + index);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[nextDay.getDay()];
};

// Search Danger Zones > with loop, with longitude and latitude with api, and print results on the DOM
const find_alert_zones = (zone) => {

    //  Clear cities on DOM
    if(cities_on_dom.length >= 1){
        clear_dom(cities_on_dom);
    };

    for (let i = 0; i < zones.length; i++) {
        let datos_from_array = zone[i];
        let city_name = datos_from_array.name;
        let latitude = parseFloat(datos_from_array.latitude);
        let longitude = parseFloat(datos_from_array.longitude);

        const url_fire_alert = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,apparent_temperature_max,rain_sum&current_weather=true&timezone=auto`

        // Danger for fire
        fetch(url_fire_alert)
        .then(async (response) =>{
            const data_fire = await response.json()

            function show_alert_zone(info){
                let current_weather = info.current_weather;
                let daily = info.daily;

                // Weather conditions
                const average_temperature_week = week_average_calc(daily.apparent_temperature_max);
                const average_rain_week = week_average_calc(daily.rain_sum);
                const weather_code_week = daily.weathercode.every((code_num) => {
                    if( code_num > 60){
                        return code_num;
                    }
                });

                // Conditions for forest fires (Hight temperature, temperature averager of the week, day and week Rain)
                if(current_weather.temperature > 25 && current_weather.weathercode <= 3 && average_temperature_week >= 30 && average_rain_week === 0 && weather_code_week === false){
                    cities_on_dom.push(city_name);

                    const pCreate = document.createElement("p");   
                    pCreate.setAttribute("class", "alert-zone");
                    pCreate.setAttribute("id", "list-item");
                    pCreate.innerText = `⚠️🔥⚠️ ${city_name}`;
                    document.getElementById('list').appendChild(pCreate);
                };
            };

            show_alert_zone(data_fire)
        }).catch((response_error) =>{
            console.log(response_error);
        });

        // Rains precipitation alert
        const url_rains_alert = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation,rain&precipitation_unit=mm&timezone=auto`//`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum&forecast_days=7&precipitation_unit=mm&timezone=auto`;

        fetch(url_rains_alert)
        .then(async (response) =>{
        
            const data_rains = await response.json();
            console.log(data_rains)

            function show_alert_zone(info) {
                let hourly_precipitation = info.hourly.precipitation;
                let filtered_cities = [];
            
                // Iterate over hourly precipitation data
                for (let i = 0; i < hourly_precipitation.length; i++) {
                    let precipitation = hourly_precipitation[i];
                
                    // Check if precipitation exceeds 10mm
                    if (precipitation >= 50) {
                        filtered_cities.push(info.timezone);
                        break;
                    };
                };
            
                if (filtered_cities.length > 0) {
                    cities_on_dom.push(city_name);

                    const pCreate = document.createElement("p");
                    pCreate.setAttribute("class", "alert-zone");
                    pCreate.setAttribute("id", "list-item");
                    pCreate.innerText = `⚠️⛈️⚠️ ${city_name}`;
                    document.getElementById('list').appendChild(pCreate);
                };
            };
        
            show_alert_zone(data_rains);

        }).catch((response_error) =>{
            console.log(response_error);
        });
    };
};

// Refresh DOM
function refreshDOM() {
    find_alert_zones(zones);
};
function startInterval() {
    refreshInterval = setInterval(refreshDOM, update_time);
};

// Change update time
function changeTime(event) {
    event.preventDefault();
    
    let newTime = timeValue.value * 1000;

    if (/^\d+$/.test(timeValue.value)) {
        update_time = newTime;
        clearInterval(refreshInterval);
        startInterval();

        document.querySelector("body > div.general_body > div.general_body > div.map_alert_zone > div.alert_from_api > h5").innerHTML = `Actualizacion cada ${newTime/1000} segundos.`;
    } else {
        alert("Ingrese un valor numérico para cambiar el tiempo de actualización.");
    };
};

// First search before refreshing the danger zones
find_alert_zones(zones);
timeForm.addEventListener("change", changeTime);
startInterval();