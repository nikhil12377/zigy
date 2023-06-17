const displayArea = document.getElementById("displayArea");

function updateDisplay(data) {
  displayArea.innerHTML = "";

  for (let i = 0; i < data.textValues.length; i++) {
    const newItem = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.disabled = true;
    checkbox.checked = data.checkboxValues[i];

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(data.textValues[i]));

    newItem.appendChild(label);
    displayArea.appendChild(newItem);
  }
}

// Simulating a real-time updates
// fetch will get executed after every 2 seconds
setInterval(function () {
  // Fetch data from the server
  fetch("http://localhost:3000/data")
    .then((response) => response.json())
    .then((data) => {
      updateDisplay(data);
    })
    .catch((error) => {
      console.log(error);
    });
}, 2000);
