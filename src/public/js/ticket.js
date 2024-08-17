const buttonGoToPay = document.getElementById('goToPay')
buttonGoToPay.addEventListener('click', (e)=>{
    const route = '/api/tickets'
    const headers={
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          }
    }
    //fetchFunction(route,headers)
    fetch(route, headers)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    window.location.href = "http://localhost:3000/products/"
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
    
})