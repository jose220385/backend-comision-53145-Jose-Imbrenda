const recoveryForm = document.getElementById('sendRecoveryMailForm')
console.log(recoveryForm);
recoveryForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    const data = {
        email: recoveryForm.elements["email"].value
    }

    console.log(data);

    const url = '/api/mails/sendPasswordRecoveryMail'
    fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': 'Bearer ' + token // si es necesario
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        })
})