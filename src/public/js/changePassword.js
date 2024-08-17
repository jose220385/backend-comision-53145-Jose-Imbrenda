const changePasswordForm = document.getElementById('changePasswordForm')
console.log(changePasswordForm);
changePasswordForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const password = changePasswordForm.elements["password"].value
    const repitePassword = changePasswordForm.elements["repite-password"].value

    if(password!==repitePassword){
        const errorMessageContainer = document.getElementById('errorMessage')
        const errorMessageElement = document.createElement('h4')
        errorMessageElement.textContent = "Las contraseñas deben coincidir"
        errorMessageElement.className = "p-2 mt-2 text-danger"
        errorMessageContainer.appendChild(errorMessageElement)
        return
    }
   
    const data = {
        password
    }

    const urlActual = window.location.href;
    const segment = 'reset-password/';
    const startIndex = urlActual.indexOf(segment) + segment.length;

    const token = urlActual.substring(startIndex) 

    const url = `/api/users/changePassword/${token}`
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
          window.location.href = 'http://localhost:3000/login'
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        })
})