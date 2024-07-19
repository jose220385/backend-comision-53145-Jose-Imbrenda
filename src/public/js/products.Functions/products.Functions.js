//Funcion para traer query
const getQueryValue = (query) =>{
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    const queryValue = params.get(query)
    return queryValue
}

const setImputValue =(nodeId,query)=>{
const queryValue = getQueryValue(query)
    const queryInput = document.getElementById(nodeId)
    if(queryValue){
        queryInput.value = queryValue;
    } else {
        queryInput.selectedIndex = 0
    }
}

//Funcion para obtener las subcategorias segun categoria
const getSubCategoriesInFilter = async (nodeCategoriesId, nodeSubCategoriesId,event) =>{

    const categoryInput = document.getElementById(nodeCategoriesId)
   
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
        data.payload.forEach(d =>{
            subCategoriesInput.innerHTML += `<option name=${d.subCategoryName} value='${d.subCategoryName}'>${d.subCategoryName}</option>`
        })
        setImputValue('subCategories','subCategory')
    })
    .catch(error => {
        console.error("Error:", error);
    });
    return
    }

    subCategoriesInput.innerHTML = `<option name="all" value=''>Todas las Sub-Categorias</option>`


}

//Funcion para filtrar

const productsFilter = (endpoint) =>{
    
    const filter ={
     category : document.getElementById("categoryInput").value,
     subCategory : document.getElementById("subCategories").value,
     brand : document.getElementById("brandInput").value,
     order : document.getElementById("orderInput").value,
     status : document.getElementById("availabilityInput").value
    }

    console.log(filter)

    const params = new URLSearchParams(filter).toString()

    const urlConParametros = `${endpoint}?${params}`

    window.location.href = urlConParametros

}

//Funcion para cargar el contenido que viene por query
const contentLoadWithFilter = async (nodeId, query)=>{
    document.addEventListener('DOMContentLoaded', (event) => {
        setImputValue(nodeId,query)
        /* const queryValue = getQueryValue(query)
        const queryInput = document.getElementById(nodeId)
        if(queryValue){
            queryInput.value = queryValue;
        } else {
            queryInput.selectedIndex = 0
        } */
        if(query==='category'){
            getSubCategoriesInFilter('categoryInput', 'subCategories')
            //setImputValue('subCategories','subCategory')
        }
    })
}

//Funcion para cambiar de pagina

const changePage = (nodeId)=>{
    const changePage = document.getElementById(nodeId)
    if(changePage){
        changePage.addEventListener('click', (e)=>{
        const url = new URL(window.location.href)
        console.log(changePage);
        const pageQuery = changePage.dataset.changepage
        console.log(pageQuery)
        url.searchParams.set('newPage', pageQuery)
        console.log(url);
        window.location.assign(url)
        })
    }
}



//Funcion para cargar los elementos en la pagina

/* const loadInputsContent = async (inputId,query,route) =>{
    const input = document.getElementById(inputId)
    document.addEventListener('DOMContentLoaded', (event) => {
        input.innerHTML=""
        if(query === "category"){input.innerHTML=`<option value="">Todas las Categorías</option>`}
        if(query === "subCategory"){input.innerHTML=`<option value="">Todas las Sub-Categorías</option>`}
        if(query === "brand"){input.innerHTML=`<option value="">Todas las Marcas</option>`}
        fetch(route)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar Categorias");
            }
            return response.json()
        })
        .then(data => {
            data.forEach(d =>{
                const propertyName = query + 'Name'
                console.log(propertyName);
                const objectProperty = d[propertyName]
                console.log(objectProperty);
                input.innerHTML += `<option name=${objectProperty} value='${objectProperty}'>${objectProperty}</option>`
                
                const queryValue = getQueryValue(query)
                if(queryValue){
                input.value = queryValue;
                } else {
                    input.selectedIndex = 0
                }
        })
        .catch(error => {
            console.error("Error:", error);
        });
        
    
    })})
} */
        
        
// Seleccionar el option correspondiente
        
