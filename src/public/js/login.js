const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const data = {
        email : loginForm.elements["email"].value,
        password : loginForm.elements["password"].value,
    }
    
    const route =  '/api/sessions/login'

    const headers={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(route,headers).then(response => {
        if (!response.ok) {
            throw new Error('Fallo en la consulta ' + response.statusText);
        }
        return response.json()
    })
    .then(data => {
        //sessionStorage.setItem('token', data.payload)
        console.log(data);
        window.location.href = 'http://localhost:3000/products'
    })
    .catch(error => {
        console.error('Error en la consulta', error);
    });
    
})