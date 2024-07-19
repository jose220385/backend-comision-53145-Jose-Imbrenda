const addBrand = (formId) =>{

const formAddBrand = document.getElementById(formId)

formAddBrand.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newBrand = {
        brandName: formAddBrand.elements["brandName"].value,
    }
    
    const route='/api/products/brands'
    const headers={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBrand)
    }

    fetchFunction(route,headers)

    location. reload()
})}

const getBrands=()=>{
    const brands = fetch(`/api/products/brands/all`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar Marcas");
        }
        return response.json()
    })
    .then(data => {
        return data.payload
    })
    .catch(error => {
        console.error("Error:", error);
    });
    return brands
}