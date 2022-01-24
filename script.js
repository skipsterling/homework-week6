var key = "6744cb88601eaac0b3fcf6205994879a";

function now() {
    navigator.geolocation.getCurrentPosition(function (position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        var qURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + key;

        $.ajax({
            url: qURL,
            method: "get"
        })
            //Creating a response to store all the data
            .then(function (response) {
                var iCode = response.weather[0].icon;
                var iUrl = "http://openweathermap.org/img/w/" + iCode + ".png";
                $(".city").html("<h1> " + response.name + " </h1>");
                $(".temp").text("Temperature: " + ((response.main.temp - 273.15)).toFixed(0) + " °C");
                $(".humidity").text("Humidity: " + response.main.humidity + " %");
                $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#weather-icon").attr("src", iUrl);
            });
    });
};

now();

function theFC() {

    var theFCUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Sydney&appid=" + key;

    $.ajax({
        url: theFCUrl,
        method: "get"
    }).then(function (secondResponse) {

        var firstIcon = secondResponse.list[4].weather[0].icon;
        var firstIconurl = "http://openweathermap.org/img/w/" + firstIcon + ".png";

        var secondIcon = secondResponse.list[4].weather[0].icon;
        var secondIconurl = "http://openweathermap.org/img/w/" + secondIcon + ".png";

        var thirdIcon = secondResponse.list[4].weather[0].icon;
        var thirdIconurl = "http://openweathermap.org/img/w/" + thirdIcon + ".png";

        var fourthIcon = secondResponse.list[4].weather[0].icon;
        var fourthIconurl = "http://openweathermap.org/img/w/" + fourthIcon + ".png";

        var fifthIcon = secondResponse.list[4].weather[0].icon;
        var fifthIconurl = "http://openweathermap.org/img/w/" + fifthIcon + ".png";

        // This will change the temp into degrees celcius 
        var firstTempC = (secondResponse.list[4].main.temp - 273.15);
        var firstTemp = firstTempC.toFixed(1);
        var secondTempC = (secondResponse.list[12].main.temp - 273.15);
        var secondTemp = secondTempC.toFixed(1);
        var thirdTempC = (secondResponse.list[20].main.temp - 273.15);
        var thirdTemp = thirdTempC.toFixed(1);
        var fourthTempC = (secondResponse.list[28].main.temp - 273.15);
        var fourthTemp = fourthTempC.toFixed(1);
        var fifthTempC = (secondResponse.list[36].main.temp - 273.15);
        var fifthTempC = fifthTempC.toFixed(1);

        var firstDay = secondResponse.list[4].dt_txt;
        var secondDay = secondResponse.list[12].dt_txt;
        var thirdDay = secondResponse.list[20].dt_txt;
        var fourthDay = secondResponse.list[28].dt_txt;
        var fifthDay = secondResponse.list[36].dt_txt;

        $("#1st").html("<h5>" + firstDay.substr(0, 10) + "</h5>");
        $("#1st").append("<img src=" + firstIconurl + ">");
        $("#1st").append("<p>" + "Temp: " + firstTemp + " °C </p>");
        $("#1st").append("<p>" + "Humidity: " + secondResponse.list[4].main.humidity + " % </p>");

        $("#2nd").html("<h5>" + secondDay.substr(0, 10) + "</h5>");
        $("#2nd").append("<img src=" + secondIconurl + ">");
        $("#2nd").append("<p>" + "Temp: " + secondTemp + " °C </p>");
        $("#2nd").append("<p>" + "Humidity: " + secondResponse.list[12].main.humidity + " % </p>");

        $("#3rd").html("<h5>" + thirdDay.substr(0, 10) + "</h5>");
        $("#3rd").append("<img src=" + thirdIconurl + ">");
        $("#3rd").append("<p>" + "Temp: " + thirdTemp + " °C </p>");
        $("#3rd").append("<p>" + "Humidity: " + secondResponse.list[20].main.humidity + " % </p>");

        $("#4th").html("<h5>" + fourthDay.substr(0, 10) + "</h5>");
        $("#4th").append("<img src=" + fourthIconurl + ">");
        $("#4th").append("<p>" + "Temp: " + fourthTemp + " °C </p>");
        $("#4th").append("<p>" + "Humidity: " + secondResponse.list[28].main.humidity + " % </p>");

        $("#5th").html("<h5>" + fifthDay.substr(0, 10) + "</h5>");
        $("#5th").append("<img src=" + fifthIconurl + ">");
        $("#5th").append("<p>" + "Temp: " + fifthTempC + " °C </p>");
        $("#5th").append("<p>" + "Humidity: " + secondResponse.list[36].main.humidity + " % </p>");
    });
}

theFC();

$("button").on("click", function (event) {
    event.preventDefault();
    var key = "6744cb88601eaac0b3fcf6205994879a";
    var weatherPull = $("#weather-pull");
    var city = weatherPull.val().trim();
    cities.push(city);
    var message = document.querySelector(".message-inv");
    console.log(weatherPull);

    function storeCities() {
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    if (city === null || city === "") {
        message.innerHTML = "Invalid input. Please try again!";
    } else {
        message.innerHTML = "";
        renderCities();
        storeCities();
        getCities();
    }
    function renderCities() {

        $(".data-search").prepend("<p>" + city + "</p");

    }

    var qURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&q=" +
        city + "&appid=" + key;
    // now we run the ajax to call the API
    $.ajax({
        url: qURL,
        method: "get"
    })
        // Creating a response 
        .then(function (response) {
            console.log(qURL);
            console.log(response);
            // This will transfer the content to our html
            var iCode = response.weather[0].icon;
            var iUrl = "http://openweathermap.org/img/w/" + iCode + ".png";
            $(".city").html("<h1>" + response.name + "</h1>");
            $(".temp").text("Temperature: " + ((response.main.temp - 273.15)).toFixed(0) +
                " °C"
            );
            $(".humidity").text("Humidity: " + response.main.humidity + " %");
            $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#weather-icon").attr("src", iUrl);
            

            // This will log our data to console
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });

    var theFCUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
    $.ajax({
        url: theFCUrl,
        method: "get"
    }).then(function (secondResponse) {
        console.log(theFCUrl);
        console.log(secondResponse);
        console.log(secondResponse.list[4].dt_txt);
        console.log(secondResponse.list[4].main.temp);

        var firstIcon = secondResponse.list[4].weather[0].icon;
        var firstIconurl = "http://openweathermap.org/img/w/" + firstIcon + ".png";

        var secondIcon = secondResponse.list[4].weather[0].icon;
        var secondIconurl = "http://openweathermap.org/img/w/" + secondIcon + ".png";

        var thirdIcon = secondResponse.list[4].weather[0].icon;
        var thirdIconurl = "http://openweathermap.org/img/w/" + thirdIcon + ".png";

        var fourthIcon = secondResponse.list[4].weather[0].icon;
        var fourthIconurl = "http://openweathermap.org/img/w/" + fourthIcon + ".png";

        var fifthIcon = secondResponse.list[4].weather[0].icon;
        var fifthIconurl = "http://openweathermap.org/img/w/" + fifthIcon + ".png";

        // Again changing the temp to celcius
        var firstTempC = (secondResponse.list[4].main.temp - 273.15);
        var firstTemp = firstTempC.toFixed(1);
        var secondTempC = (secondResponse.list[12].main.temp - 273.15);
        var secondTemp = secondTempC.toFixed(1);
        var thirdTempC = (secondResponse.list[20].main.temp - 273.15);
        var thirdTemp = thirdTempC.toFixed(1);
        var fourthTempC = (secondResponse.list[28].main.temp - 273.15);
        var fourthTemp = fourthTempC.toFixed(1);
        var fifthTempC = (secondResponse.list[36].main.temp - 273.15);
        var fifthTempC = fifthTempC.toFixed(1);

        var firstDay = secondResponse.list[4].dt_txt;
        var secondDay = secondResponse.list[12].dt_txt;
        var thirdDay = secondResponse.list[20].dt_txt;
        var fourthDay = secondResponse.list[28].dt_txt;
        var fifthDay = secondResponse.list[36].dt_txt;

        var firstIconCode = secondResponse.list[4].weather[0].icon;
        var firstIconurl = "http://openweathermap.org/img/w/" + firstIconCode + ".png";


        $("#1st").html("<h5>" + firstDay.substr(0, 10) + "</h5>");
        $("#1st").append("<img src=" + firstIconurl + ">");
        $("#1st").append("<p>" + "Temp: " + firstTemp + " °C </p>");
        $("#1st").append("<p>" + "Humidity: " + secondResponse.list[4].main.humidity + " % </p>");

        $("#2nd").html("<h5>" + secondDay.substr(0, 10) + "</h5>");
        $("#2nd").append("<img src=" + secondIconurl + ">");
        $("#2nd").append("<p>" + "Temp: " + secondTemp + " °C </p>");
        $("#2nd").append("<p>" + "Humidity: " + secondResponse.list[12].main.humidity + " % </p>");

        $("#3rd").html("<h5>" + thirdDay.substr(0, 10) + "</h5>");
        $("#3rd").append("<img src=" + thirdIconurl + ">");
        $("#3rd").append("<p>" + "Temp: " + thirdTemp + " °C </p>");
        $("#3rd").append("<p>" + "Humidity: " + secondResponse.list[20].main.humidity + " % </p>");

        $("#4th").html("<h5>" + fourthDay.substr(0, 10) + "</h5>");
        $("#4th").append("<img src=" + fourthIconurl + ">");
        $("#4th").append("<p>" + "Temp: " + fourthTemp + " °C </p>");
        $("#4th").append("<p>" + "Humidity: " + secondResponse.list[28].main.humidity + " % </p>");

        $("#5th").html("<h5>" + fifthDay.substr(0, 10) + "</h5>");
        $("#5th").append("<img src=" + fifthIconurl + ">");
        $("#5th").append("<p>" + "Temp: " + fifthTempC + " °C </p>");
        $("#5th").append("<p>" + "Humidity: " + secondResponse.list[36].main.humidity + " % </p>");
    });

});

var cities = [];

function getCities() {
    var getCity = localStorage.getItem("cities");
    console.log(getCity);
}