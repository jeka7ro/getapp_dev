const url = "https://script.google.com/macros/s/AKfycbyxqdNRFdR7J63V8SpM5jxFAyyMfTszh9LPI3Q28ZOiRGtOx-eXQG3HnUS1f_7M0iix2Q/exec";
const lead = { name: "Test Auto", phone: "0700000000", email: "test@test.ro", business: "Magazin", source: "API TEST" };

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: JSON.stringify(lead)
}).then(res => res.text()).then(txt => console.log("Response:", txt)).catch(err => console.error("Error:", err));
