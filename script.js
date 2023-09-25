const apikey = "e6c81c96618ea1dd84567c860f148d70";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector(".search input");
const button = document.querySelector(".search button");
const weathericon = document.querySelector(".icon")
const bgc = document.querySelector(".card")

async function weather(city){
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else{
        var data = await response.json();
     
        console.log(data);
    
        document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+ "°C";
        document.querySelector(".city").innerHTML= data.name;
        document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
        document.querySelector(".wind").innerHTML= data.wind.speed + "km/h";


        if(data.weather[0].main == "Clouds"){
            weathericon.src = "images/clouds.png"
            bgc.style.background = "linear-gradient(135deg,orange,palegoldenrod)";
        
            if(data.main.temp < 0){
                weathericon.src ="images/snow.png"
                bgc.style.background = "linear-gradient(135deg,white,blue)";
            }
        }
        else if(data.weather[0].main == "Clear"){
            weathericon.src ="images/clear.png"
            bgc.style.background = "linear-gradient(135deg,paleturquoise,blue)";
        }
        else if(data.weather[0].main == "Rain"){
            weathericon.src ="images/rain.png"
            bgc.style.background = "linear-gradient(135deg,black,gray)";
        }
        else if(data.weather[0].main == "Drizzle"){
            weathericon.src ="images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
            weathericon.src ="images/mist.png"
        }
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}

button.addEventListener("click",()=>{
    weather(search.value)
})