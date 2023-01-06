const API_KEY = `d3593db5e8552cc87239b754b39d2d0e`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const place = document.querySelector("#place");
const temperature = document.querySelector("#temperature");
const tempRange = document.querySelector("#tempRange");
const tempStatus = document.querySelector("#weathercon");

function changeStatus(val) { 
    if(val=="Sunny") return `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
    else if(val=="Clouds") return "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
    else if(val=="Rainy") return "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
    else return "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
}

const replaceVal = (newVal) => {
    let city = newVal.name;
    let country = newVal.sys.country;
    let temp = newVal.main.temp;
    let tempMin = newVal.main.temp_min;
    let tempMax = newVal.main.temp_max;
    let modification1 = `<i class="fas fa-street-view"></i> ${city}, ${country}`
    let modification2 = `${temp} °C`
    let modification3 = `Min ${tempMin} °C | Max ${tempMax} °C`
    place.innerHTML = modification1;
    temperature.innerHTML = modification2;
    tempRange.innerHTML = modification3;
    tempStatus.innerHTML = changeStatus(newVal.weather[0].main);
}

const getWeather = async (city) => {
    try{
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d3593db5e8552cc87239b754b39d2d0e`;
        const response = await fetch(url);
        const data = await response.json();
        return replaceVal(data);
    }catch(err){
        console.log("City Not Found!");
    }
}

form.addEventListener("submit",
    function(event) {
        getWeather(search.value);
        event.preventDefault();
    }
)

getWeather("Lucknow");      // Default weather