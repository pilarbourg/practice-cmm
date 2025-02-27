document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#simple-search-form");

  if (!form) {
    console.error("❌ Form not found! Make sure #simple-search-form exists.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("✅ Form submitted!"); // Debugging
  });
});

document.addEventListener("DOMContentLoaded", () => {
  
  // Select the form and submit button
  const form = document.querySelector("#simple-search");
  const submitButton = document.querySelector(".submit-button input[type='submit']");

  // Add event listener for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the page from reloading

    // Collect the form data
    const formData = {
      experimental_mass: document.getElementById("experimental_mass_textbox").value,
      tolerance: document.getElementById("tolerance").value,
      tolerance_type: document.querySelector("input[name='tolerance_type']:checked").value,
      metabolites: document.querySelector("input[name='rd']:checked")?.id || "",
      mass_mode: document.querySelector("input[name='rd4']:checked")?.value || "",
      ionization_mode: document.querySelector("input[name='rd2']:checked")?.value || "",
      adducts: document.querySelector("input[name='rd3']:checked")?.value || "",
      databases: Array.from(document.querySelectorAll("input[name='databases']:checked")).map(el => el.value)
    };

    console.log("Submitting data:", formData);

    try {
      // Send data to your Spring Boot backend (replace URL with your actual API endpoint)
      const response = await fetch("http://localhost:8080/api/submit-form", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      // Show success alert
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error submitting form. Please try again.");
    }
  });
});

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
});

// Populate the form with data
function populateForm(data) {
  if (!data) return;

  document.getElementById("experimental_mass_textbox")?.setAttribute("value", data.experimental_mass || "");
  document.getElementById("tolerance")?.setAttribute("value", data.tolerance || "10");

  const toleranceType = document.querySelector(`input[name="tolerance_type"][value="${data.tolerance_type}"]`);
  if (toleranceType) toleranceType.checked = true;

  const metabolites = document.querySelector(`input[name="rd"][id="${data.metabolites}"]`);
  if (metabolites) metabolites.checked = true;

  const massMode = document.querySelector(`input[name="rd4"][value="${data.mass_mode}"]`);
  if (massMode) massMode.checked = true;

  const ionizationMode = document.querySelector(`input[name="rd2"][value="${data.ionization_mode}"]`);
  if (ionizationMode) ionizationMode.checked = true;

  const adducts = document.querySelector(`input[name="rd3"][value="${data.adducts}"]`);
  if (adducts) adducts.checked = true;

  // Populate checkboxes for databases
  data.databases?.forEach(db => {
    const checkbox = document.querySelector(`input[name="databases"][value="${db}"]`);
    if (checkbox) checkbox.checked = true;
  });
}