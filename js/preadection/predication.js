function showAlert(message, value) {
  if (message === true) {
    swal(
      "Successful",
      `The Crop Yield Prediction Is ${value} Tons Per Acre`,
      "success"
    );
  } else {
    swal("Error", "Please Enter Valid Data", "error");
  }
}
document
  .querySelector(".predict-btn")
  .addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect data from the inputs
    const year = document.getElementById("year").value;
    const avgRain = document.getElementById("avgRain").value;
    const avgTemp = document.getElementById("avgtemp").value;
    const pesticidesTonnes = document.getElementById("pesticidesTonnes").value;
    const area = document.getElementById("countries").value;
    const item = document.getElementById("crops").value;
    const erroryear = document.getElementById("erroryear");
    const errorAvgRainFall = document.getElementById("errorAvgRainFall");
    const errorAvgTemp = document.getElementById("errorAvgTemp");
    const errorPesticidesTonnes = document.getElementById(
      "errorPesticidesTonnes"
    );
    const errorCountryList = document.getElementById("errorCountryList");
    const errorcrop = document.getElementById("errorcrop");
    // var timestamp= Date.now();
    // Validate data
    var valid = false;
    if (!year || isNaN(year)) {
      erroryear.textContent = "Please enter a valid year";
      valid = false;
    } else {
      erroryear.textContent = "";
      valid = true;
    }
    if (!avgRain || isNaN(avgRain)) {
      errorAvgRainFall.textContent = "Please enter a valid average rainfall";
      valid = false;
    } else {
      errorAvgRainFall.textContent = "";
      valid = true;
    }
    if (!avgTemp || isNaN(avgTemp)) {
      errorAvgTemp.textContent = "Please enter a valid average temperature";
      valid = false;
    } else {
      errorAvgTemp.textContent = "";
      valid = true;
    }
    if (!pesticidesTonnes || isNaN(pesticidesTonnes)) {
      errorPesticidesTonnes.textContent =
        "Please enter a valid quantity of pesticides";
      valid = false;
    } else {
      errorPesticidesTonnes.textContent = "";
      valid = true;
    }
    if (!area) {
      errorCountryList.textContent = "Please choose a country";
      valid = false;
    } else {
      errorCountryList.textContent = "";
      valid = true;
    }
    if (!item) {
      errorcrop.textContent = "Please choose a crop.";
      valid = false;
    } else {
      errorcrop.textContent = "";
      valid = true;
    }
    const formData = {
      Year: year,
      average_rain_fall_mm_per_year: avgRain,
      pesticides_tonnes: pesticidesTonnes,
      avg_temp: avgTemp,
      Area: area,
      Item: item,
    };
    if (valid != true) {
      return;
    }
    try {
      const response = await fetch(
        "https://crop-yield-prediction-6asp.onrender.com/api",
        {
          // Replace with your actual API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network error: " + response.statusText);
      }

      // Display the prediction result

      // const formData2 = {
      //     'timestamp': timestamp,
      //     'year': year,
      //     'average_rainfall': avgRain,
      //     'pesticides_quantity': pesticidesTonnes,
      //     'average_temperature': avgTemp,
      //     'country': area,
      //     'crop_type': item,
      //     'prediction_result': prediction.result,
      // };

      // const response2 = await fetch('https://crop-yield-prediction-6asp.onrender.com/api', { // Replace with your actual API endpoint
      // method: 'POST',
      // headers: {
      //     'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(formData2)
      // });

      // if (!response2.ok) {
      // throw new Error('Network error: ' + response.statusText);
      // }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("result").innerText = "Error: " + error.message;
    }
    try {
      const response2 = await fetch(
        "https://crop-yield-prediction-6asp.onrender.com/api"
      );
      if (response2.ok) {
        const decoded = await response2.json();
        const finalResponse = decoded.prediction;
        
        // Save prediction to localStorage
        const predictionData = {
          ...formData,
          prediction: finalResponse
        };
        
        // Import and use history storage
        if (typeof historyStorage !== 'undefined') {
          historyStorage.savePrediction(predictionData);
        }
        
        // Clear form fields after successful prediction
        clearFormFields();
        
        // Show success alert and redirect to history
        showAlertAndRedirect(true, finalResponse);
      } else {
        showAlert(false, finalResponse);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  });

// Function to clear all form fields
function clearFormFields() {
  try {
    // Clear all input fields
    document.getElementById("year").value = "";
    document.getElementById("avgRain").value = "";
    document.getElementById("avgtemp").value = "";
    document.getElementById("pesticidesTonnes").value = "";
    document.getElementById("countries").value = "";
    document.getElementById("crops").value = "";
    
    // Clear all error messages
    document.getElementById("erroryear").textContent = "";
    document.getElementById("errorAvgRainFall").textContent = "";
    document.getElementById("errorAvgTemp").textContent = "";
    document.getElementById("errorPesticidesTonnes").textContent = "";
    document.getElementById("errorCountryList").textContent = "";
    document.getElementById("errorcrop").textContent = "";
    
    console.log("Form fields cleared successfully");
  } catch (error) {
    console.error("Error clearing form fields:", error);
  }
}

// Function to show alert and redirect to history page
function showAlertAndRedirect(message, value) {
  if (message === true) {

    swal({
      title: "Successful!",
      text: `The Crop Yield Prediction Is ${value} Tons Per Acre`,
      icon: "success",
      button: "View History",
      closeOnClickOutside: false,
      closeOnEsc: false
    }).then((value) => {
      // Redirect to history page
      window.location.href = "historey.html";
    });
document.getElementById("year").value = "";
document.getElementById("avgRain").value = "";
document.getElementById("avgtemp").value = "";
document.getElementById("pesticidesTonnes").value = "";
document.getElementById("countries").value = "";
document.getElementById("crops").value = "";
  } else {
    swal("Error", "Please Enter Valid Data", "error");
  }
}
