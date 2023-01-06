const API_KEY = `d3593db5e8552cc87239b754b39d2d0e`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const place = document.querySelector("#place");
const temperature = document.querySelector("#temperature");
const tempRange = document.querySelector("#tempRange");
const tempStatus = document.querySelector("#weathercon");
// const info_box = document.querySelector("#info_box");

function changeStatus(val) { 
    if(val=="Sunny") return `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
    else if(val=="Clouds") return "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
    else if(val=="Rainy") return "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
    else return "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
}

const replaceVal = (newVal) => {
    if(newVal.cod==="404"){
        place.innerHTML = `<i class="fas fa-street-view"></i>OOPs! City Not Found...`;
        temperature.innerHTML = ``;
        tempRange.innerHTML = ``;
        tempStatus.innerHTML = ``;
        return;
    }

    let city = newVal.name;
    let country = newVal.sys.country;
    let temp = newVal.main.temp;
    let tempMin = newVal.main.temp_min;
    let tempMax = newVal.main.temp_max;

    place.innerHTML = `<i class="fas fa-street-view"></i> ${city}, ${country}`
    temperature.innerHTML = `${temp} °C`
    tempRange.innerHTML = `Min ${tempMin} °C | Max ${tempMax} °C`
    tempStatus.innerHTML = changeStatus(newVal.weather[0].main);
}

const getWeather = async (city) => {
    try{
        place.innerHTML = `<i class="fas fa-spinner fa-pulse"></i>`;    //only for showing loading symbol 
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d3593db5e8552cc87239b754b39d2d0e`;
        const response = await fetch(url);
        // if(response)
        const data = await response.json();
        return replaceVal(data);
    }catch(err){
        console.log(err);
    }
}

form.addEventListener("submit",
    function(event) {
        getWeather(search.value);
        event.preventDefault();
    }
)

getWeather("Lucknow");      // Default weather