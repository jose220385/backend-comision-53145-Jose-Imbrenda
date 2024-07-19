const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const data = {
        first_name: registerForm.elements["first_name"].value,
        last_name: registerForm.elements["last_name"].value,
        age: registerForm.elements["age"].value,
        email : registerForm.elements["email"].value,
        password : registerForm.elements["password"].value,
    }
    
    const route =  '/api/sessions/register'

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
        window.location.href = 'http://localhost:8080/login'
    })
    .catch(error => {
        console.error('Error en la consulta', error);
    });
    
})