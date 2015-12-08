(function() {
    var $submit = $("#submit")
    var $keyFfield = $("#keyFfield")
    var $clearkey = $("#clearkey");

    myweatherapp = {

        $targetArea: $("#targetArea"),
        apikey: "",
        details: $("#details"),
        weatherdata : null,
        request: false,

        getWeatherData: function (zipcode) {
            if ($("#keyFfield").val() != "") {
                myweatherapp.saveKey();
            };


            var request = false;
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + myweatherapp.apikey + "&units=imperial";
            $.ajax({
                type: "GET",
                url: url,
                datatype: "json",
                success: function (data) {
                    if (data.message != "Error: Not found city") {
                    myweatherapp.weatherdata = data
                    myweatherapp.$targetArea.html("API Connection Successful");
                    myweatherapp.displaydata();
                    myweatherapp.request = true;
                    }
                    else {
                        myweatherapp.details.append("<h3>" + data.message + "</h3>")
                    }
                }

            })
         
        },
        displaydata: function () {
              myweatherapp.details.append("<h3>" + myweatherapp.weatherdata.weather[0].description + "</h3>");
                myweatherapp.details.append("<h3>" + myweatherapp.weatherdata.name + "</h3>");
                myweatherapp.details.append("<h3>" + myweatherapp.weatherdata.coord.lat + ' ' + myweatherapp.weatherdata.coord.lon + "</h3>");
            },
          
        
        saveKey: function () {
           
            localStorage.setItem("ApiKey", $keyFfield.val())
            myweatherapp.apikey = localStorage.getItem("ApiKey")
            $("#keyFfield").attr("disabled", "disabled");
        },
        LoadKey: function () {
            if (localStorage.length == 1) {
                myweatherapp.apikey = localStorage.getItem("ApiKey")
                $("#keyFfield").attr("disabled", "disabled");
            }
        }
    }
    // Event Handlers
    $submit.on('click', function () {

        myweatherapp.details.empty();
        myweatherapp.getWeatherData($("#zipcodefield").val());

    })

    $clearkey.on('click', function () {
        myweatherapp.apikey = ""
        localStorage.clear();
        $("#keyFfield").prop("disabled", false);
    })

    $( document ).ajaxError(function() {
        myweatherapp.details.append("<h3>Could Not Connect To API</h3>");
        myweatherapp.$targetArea.html("AJAX Call Failed!");
    });


    myweatherapp.LoadKey();

})();
   


