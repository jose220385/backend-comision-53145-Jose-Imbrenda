//Function Fetch

const fetchFunction = (route,headers) =>{
    fetch(route, headers)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la consulta");
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}