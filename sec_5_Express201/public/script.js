const url = "http://localhost:3000/x201",
  data = {
    name: "Maynard James Keenan",
    age: 56
  },
  request = fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

request.then(response => console.log(response)).catch(error => console.log(error));
