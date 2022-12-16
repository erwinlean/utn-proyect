"use strict";

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

// Functions
function week_average_calc (array_to_sum){
    array_to_sum = (array_to_sum.reduce(function(num_1, num_2){return num_1 + num_2}) / 7);
    return array_to_sum;
}

function clear_dom(array_toclear){
    for (let i = 0; i < array_toclear.length; i++) {
        const element_clear = document.getElementById("list-item");
        element_clear.remove();
    };

    while(array_toclear > 0){
        array_toclear.pop();
    };
};

// Search Danger Zones > with loop, with longitude and latitude with api, and print results on the DOM
const find_alert_zones = (zone) => {
    for (let i = 0; i < zones.length; i++) {
        let datos_from_array = zone[i];
        let city_name = datos_from_array.name;
        let latitude = parseFloat(datos_from_array.latitude);
        let longitude = parseFloat(datos_from_array.longitude);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,apparent_temperature_max,rain_sum&current_weather=true&timezone=auto`

        fetch(url)
        .then(async (response) =>{
            const data = await response.json()

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
                    

                    // Weather status for print on the DOM
                    console.log(`Ciudad: ${city_name} ⚠️⚠️`);
                    console.log(`Temperatura actual: ${current_weather.temperature}`);
                    console.log(`Temperatura maxima promedio de la semana: ${average_temperature_week}`);
                    console.log(`Milimetros de lluvia de la semana: ${average_rain_week}`)
                    //console.log(`Codigo de clima (inferior a 61 significa sin lluvia/tormenta): ${current_weather.weathercode}`);
                    //console.log(`Codigos de clima semanal (true=codigo durante la semana superior a 61): ${weather_code_week}`);
                    //console.log(daily.weathercode);

                    const pCreate = document.createElement("p");   
                    pCreate.setAttribute("class", "alert-zone");
                    pCreate.setAttribute("id", "list-item");
                    pCreate.innerText = `⚠️🔥⚠️ ${city_name}`;
                    document.getElementById('list').appendChild(pCreate);
                }
            };

            show_alert_zone(data)
        }).catch((response_error) =>{
            console.log(response_error);
        });
    }
};

// Refresh DOM
setInterval(()=> {
    find_alert_zones(zones);
}, 30000);

// Clear DOM, from previous zones
setInterval(() => {
    clear_dom(cities_on_dom);
}, 29999)

// First search before refreshing the danger zones
find_alert_zones(zones);
