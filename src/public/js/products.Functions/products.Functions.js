//Funcion para obtener las subcategorias segun categoria
const getSubCategories = async (nodeCategoriesId, nodeSubCategoriesId,event) =>{

    const categoryInput = document.getElementById(nodeCategoriesId)
    categoryInput.addEventListener(event,(e) =>{
    const categoryName = categoryInput.value

    const subCategoriesInput = document.getElementById(nodeSubCategoriesId)
    
    if(categoryName){
    subCategoriesInput.innerHTML = ""
    subCategoriesInput.innerHTML = `<option name="all" value=''>Todas las Sub-Categorias</option>`
    fetch(`/api/products/subCategories/${categoryName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar Categoria");
        }
        return response.json()
    })
    .then(data => {
        data.forEach(d =>{
            subCategoriesInput.innerHTML += `<option name=${d.subCategoryName} value='${d.subCategoryName}'>${d.subCategoryName}</option>`
        })

    })
    .catch(error => {
        console.error("Error:", error);
    });
    return
    }

    subCategoriesInput.innerHTML = `<option name="all" value=''>Todas las Sub-Categorias</option>`
})

}

//Funcion para filtrar

const productsFilter = () =>{
    
    const filter ={
     category : document.getElementById("categoryInput").value,
     subCategory : document.getElementById("subCategories").value,
     brand : document.getElementById("brandInput").value,
     order : document.getElementById("orderInput").value,
     status : document.getElementById("availabilityInput").value
    }

    console.log(filter)

    const params = new URLSearchParams(filter).toString()

    const endpoint = '/products'
    const urlConParametros = `${endpoint}?${params}`

    window.location.href = urlConParametros

    /* fetch(urlConParametros)
    .then(response => response.json())
    .then(data => window.location)
    .catch(error => console.error('Error:', error)) */

   /*  const category = document.getElementById("categoryInput").value
    if(category){filter.category = category}
    const subCategory = document.getElementById("subCategories").value
    if(subCategory){filter.subCategory = subCategory}
    const brand = document.getElementById("brandInput").value
    if(brand){filter.brand = brand}
    const order = document.getElementById("orderInput").value
    if(order){filter.order = order}
    const availability = document.getElementById("availabilityInput").value
    if(availability){filter.availability = availability}
 */
    //console.log(filter);

}

//Funcion para traer query
const getQueryValue = (query) =>{
        const queryString = window.location.search
        const params = new URLSearchParams(queryString)
        const queryValue = params.get('category')
        return queryValue
}


//Funcion para cargar el contenido que viene por query
const contentLoadWithFilter = async (nodeId, query)=>{
    document.addEventListener('DOMContentLoaded', (event) => {
        const queryValue = getQueryValue(query)
        if(queryValue !== ""){
            const queryInput = document.getElementById(nodeId)
            queryInput.value = queryValue;
        }

        
        
        // Seleccionar el option correspondiente
        
    })
}