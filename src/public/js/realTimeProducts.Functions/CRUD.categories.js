const addCategory =(formId)=>{
    const formAddCategory = document.getElementById(formId)

formAddCategory.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newCategory = {
        categoryName: formAddCategory.elements["categoryName"].value,
    }

    const route='/api/products/categories'
    const headers={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
    }

    fetchFunction(route,headers)
    location. reload()
})}

const getCategories =()=>{
    const categories = fetch(`/api/products/categories/all`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar Categorias");
        }
        return response.json()
    })
    .then(data => {
        return data
    })
    .catch(error => {
        console.error("Error:", error);
    });

    return categories
}

const addSubCategory =(formId)=>{
    const formAddSubCategory = document.getElementById(formId)

formAddSubCategory.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newSubCategory = {
        categoryName: formAddSubCategory.elements["categoryName"].value,
        subCategoryName: formAddSubCategory.elements["subCategoryName"].value
    }

    const route='/api/products/subCategories'
    const headers={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSubCategory)
    }

    fetchFunction(route,headers)

    location. reload()
})
}


const getSubCategories = async (nodeCategoriesId, nodeSubCategoriesId) =>{

    const categoryInput = document.getElementById(nodeCategoriesId)
    categoryInput.addEventListener('change',(e) =>{
    const categoryName = categoryInput.value
    console.log(categoryName);
    const subCategoriesInput = document.getElementById(nodeSubCategoriesId)
    subCategoriesInput.innerHTML = ""

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
})

}

