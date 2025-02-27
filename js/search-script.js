document.addEventListener("DOMContentLoaded", async () => {
  const radiobuttons = document.querySelectorAll(".box");

  // Hover effect on radio buttons
  radiobuttons.forEach(radio => {
    radio.addEventListener("mouseover", () => {
      radio.style.transform = "scale(1.05)";
      radio.style.transition = "0.3s ease-in-out";
    });

    radio.addEventListener("mouseout", () => {
      radio.style.transform = "scale(1)";
    });
  });

  // Fetch test data from JSON or backend API
  try {
    // Try loading from local JSON file (this will be used if available)
    const response = await fetch("json/simple-search-data.json");
    const data = await response.json();
    populateForm(data);
  } catch (error) {
    console.warn("Could not load local JSON, trying backend instead...");
    
    // Try loading from backend API (this will be your Express API)
    try {
      const response = await fetch("http://localhost:3000/api/get-form-data");
      const data = await response.json();
      populateForm(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});

// Populate the form with data from JSON or backend response
function populateForm(data) {
  document.getElementById("experimental_mass_textbox").value = data.experimental_mass || "";
  document.getElementById("tolerance").value = data.tolerance || "10";
  document.querySelector(`input[name="tolerance_type"][value="${data.tolerance_type}"]`).checked = true;
  
  // Similarly, populate other fields like radio buttons, checkboxes
  document.querySelector(`input[name="rd"][id="${data.metabolites}"]`).checked = true;
  document.querySelector(`input[name="rd4"][value="${data.mass_mode}"]`).checked = true;
  document.querySelector(`input[name="rd2"][value="${data.ionization_mode}"]`).checked = true;
  document.querySelector(`input[name="rd3"][value="${data.adducts}"]`).checked = true;
  
  // Populate the databases checkboxes
  data.databases.forEach(db => {
    document.querySelector(`input[name="databases"][value="${db}"]`).checked = true;
  });
}

// Handle form submission
document.querySelector("#simple-search-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents page reload

  // Collect the form data
  const formData = {
    experimental_mass: document.getElementById("experimental_mass_textbox").value,
    tolerance: document.getElementById("tolerance").value,
    tolerance_type: document.querySelector("input[name='tolerance_type']:checked").value,
    metabolites: document.querySelector("input[name='rd']:checked").id,
    mass_mode: document.querySelector("input[name='rd4']:checked").value,
    ionization_mode: document.querySelector("input[name='rd2']:checked").value,
    adducts: document.querySelector("input[name='rd3']:checked").value,
    databases: Array.from(document.querySelectorAll("input[name='databases']:checked")).map(el => el.value)
  };

  console.log("Submitting data:", formData);

  try {
    // Send the form data to the backend (POST request)
    const response = await fetch("http://localhost:3000/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Server response:", result);
    
    // Optionally, show a success message or update the UI
    alert("Form submitted successfully!");
  } catch (error) {
    console.error("Error sending data:", error);
  }
});
