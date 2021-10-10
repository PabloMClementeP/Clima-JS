const d = document;

let $city = d.querySelector(".city-name"),
    $date = d.querySelector(".date"),
    $icon = d.querySelector(".icon"),
    $temp = d.querySelector(".temp"),
    $state = d.querySelector(".state"),
    $humidity = d.querySelector(".humidity"),
    $sensation = d.querySelector(".sensation"),
    $inputCity = d.querySelector(".input-form"),
    $errorMsg = d.querySelector(".error-msg"),
    $btnLocate = d.querySelector(".btn-gps"),
    monthString="";

let url = `https://api.openweathermap.org/data/2.5/weather?q=Montevideo&units=metric&lang=es&appid=75350c5fe8426d5c17726a1339fac1d0`;
    
    
window.addEventListener('load', () =>{
    getWeather(url);
    
    $btnLocate.addEventListener("click", e =>{
        e.preventDefault();
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( position =>{
                let lon = position.coords.longitude,
                    lat = position.coords.latitude;
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=75350c5fe8426d5c17726a1339fac1d0`
                getWeather(url);
            })
        }
    })
});


d.addEventListener("submit", e=>{
    e.preventDefault();
    let city = $inputCity.value;
    if(city !== ""){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=75350c5fe8426d5c17726a1339fac1d0`;
        getWeather(url);
        $inputCity.value = "";
    }else{
        $errorMsg.classList.remove("hidden");
    }
});


const getWeather = (url)=>{
    fetch(url)
        .then( res => { return res.ok ? res.json() : Promise.reject(res)})
        .then( data => {
            $errorMsg.classList.add("hidden");
            let temp = Math.round(data.main.temp);
            let desc = data.weather[0].description;
            let hoy = new Date(),
                month = (hoy.getMonth() + 1),
                day = hoy.getDate(),
                hours = hoy.getHours(),
                minutes = hoy.getMinutes();
            
            convertMonth(month);
            let fecha = `${day} de ${monthString} ${hours}:${minutes}`
    
            $city.textContent = data.name;
            $date.textContent = fecha; /*hoy.toString();*/
            $temp.textContent = `${temp}°C`;
            $state.textContent = desc.toUpperCase();
            $humidity.textContent = `Humedad: ${data.main.humidity}%`;
            $sensation.textContent = `Sensación termica: ${data.main.feels_like}°`
    
            $icon.src = `animated/${selectIcon(data.weather[0].main)}.svg`;
            
        })
        .catch( error =>{
            $errorMsg.classList.remove("hidden");
            console.log(error)
        })
};


function selectIcon (condition){
    switch (condition){
        case 'Thunderstorm':
            console.log("Tormenta");
            return "thunder"
            break;
        case 'Drizzle':
            console.log("Llovizna");
            return "rainy-2"
            break;
        case 'Rain':
            console.log("Lluvia");
            return "rainy-7"
            break;
        case 'Snow':
            console.log("Nieve");
            return "snowy-6"
            break;
        case 'Clear':
            console.log("Limpio");
            return "day"
            break;
        case 'Atmosphere':
            console.log("Atmosfera");
            return "weather"
            break;
        case 'Clouds':
            console.log("Nubes");
            return "cloudy-day-1"
            break;
        default:
            console.log("por defecto");
            return data.weather[0].main;
    }
};

const convertMonth = (monthNumber) =>{
    switch (monthNumber) {
        case 0:
            monthString = "Enero";
            break;
        case 1:
            monthString = "Febrero";
            break;
        case 2:
            monthString = "Marzo";
            break;
        case 3:
            monthString = "Abril";
            break;
        case 4:
            monthString = "Mayo";
            break;
        case 5:
            monthString = "Junio";
            break;
        case 6:
            monthString = "Julio";
            break;
        case 7:
            monthString = "Agosto";
            break;
        case 8:
            monthString = "Setiembre";
            break;
        case 9:
            monthString = "Octubre";
            break;
        case 10:
            monthString = "Noviembre";
            break;
        case 11:
            monthString = "Diciembre";
            break;
        default:
            break;
    }
};