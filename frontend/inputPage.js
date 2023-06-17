document.getElementById("inputForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission
  const formData = new FormData(this);

  const textValues = [];
  const checkboxValues = [];

  // Extract the values of textboxes
  for (let i = 1; i <= 6; i++) {
    const textboxValue = formData.get(`textbox${i}`);
    textValues.push(textboxValue);
  }

  // Extract the state of checkboxes
  for (let i = 1; i <= 6; i++) {
    const checkboxChecked = formData.get(`checkbox${i}`) === "on";
    checkboxValues.push(checkboxChecked);
  }

  // Send the data to the server
  fetch("http://localhost:3000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ textValues, checkboxValues }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Data saved successfully");
        // Clear the input fields
        this.reset();
      } else {
        console.error("Failed to save data");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
});
