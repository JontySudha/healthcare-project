const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;

  const response = await fetch("http://localhost:3000/appointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      date
    })
  });

  const data = await response.text();

  alert(data);
});