// Funcion de carga masiva de datos a traves de Excel
const massiveCharge = (formId) =>{
    const formularioCargaMasiva = document.getElementById(formId)

formularioCargaMasiva.addEventListener("submit", (e)=> {
    e.preventDefault()

    const file = new FormData(formularioCargaMasiva)

    const route='/api/upload/bdFile'
    const headers={
        method: "POST",
        body: file
    }

    fetchFunction(route,headers)
})
}

const addProduct = (formId) =>{
    const formAddProduct = document.getElementById(formId)

    formAddProduct.addEventListener("submit", (e)=> {
        e.preventDefault()
        const newProduct = {
            code: formAddProduct.elements["code"].value,
            category: formAddProduct.elements["category"].value,
            subCategory: formAddProduct.elements["sub-category"].value,
            title: formAddProduct.elements["title"].value,
            description: formAddProduct.elements["description"].value,
            cost: parseFloat(formAddProduct.elements["cost"].value),
            markdown: parseFloat(formAddProduct.elements["markdown"].value),
            thumbnail: formAddProduct.elements["thumbnail"].value,
            stock: parseInt(formAddProduct.elements["stock"].value),
            brand: formAddProduct.elements["brand"].value,
            provider: formAddProduct.elements["provider"].value
        }
    
        const route='/api/products'
        const headers={
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }
    
        fetchFunction(route,headers)
    
    })
}

const deleteProduct =()=>{
    const id = document.activeElement.parentNode.parentNode.id
    console.log(id);

    const route=`/api/products/${id}`
    const headers={method: "DELETE"}

    fetchFunction(route,headers)
}


const updateProduct =async ()=>{
    const categories = await getCategories()
    const brands = await getBrands()
    idToUpDate = document.activeElement.parentNode.parentNode.id
    const upDateform = document.createElement('div')
    const main = document.getElementsByTagName('main')
    upDateform.className = 'upDateform'
    main[0].appendChild(upDateform)
    upDateform.innerHTML = `
    <form id="formulario-actualizacion">
        <h4>Ingrese los campos que desea modificar:</h4>
        <input type="text" name="title" placeholder="Nombre del producto">
        <input type="text" name="code" placeholder="Codigo del producto">
        <select name="category" id="updateCategoryInput">
            <option value=''>Seleccione Categoria</option>
        </select>
        <select name="sub-category" id="updateSubCategories"> 
            <option value=''>Seleccione Sub-Categoria</option>
        </select>
        <select name="brand" id="updateBrandInput">
            <option value=''>Seleccione Marca</option>
        </select>
        <input type="text" name="provider" placeholder="Proveedor">
        <input type="text" name="thumbnail" placeholder="Ruta de la foto">
        <input type="number" name="cost" placeholder="Costo del producto">
        <input type="number" name="markdown" placeholder="Porcentaje de marcado del producto">
        <input type="number" name="stock" placeholder="Stock del producto">
        <textarea name="description" placeholder="Descripción del producto"></textarea>
        <button type="submit">Actualizar</button>
        <button id="cancelarUpload" >Cancelar</button>
    </form>
    `

    const categoryInput = document.getElementById("updateCategoryInput")
    categoryInput.addEventListener('click', (e)=>{
        categoryInput.innerHTML=""
        categories.forEach(category => {
            categoryInput.innerHTML+= `<option name=${category.categoryName} value='${category.categoryName}'>${category.categoryName}</option>`
        });
    })

    await getSubCategories("updateCategoryInput", 'updateSubCategories')

    const brandInput = document.getElementById("updateBrandInput")
    brandInput.addEventListener('click', (e)=>{
        brandInput.innerHTML=""
        brands.forEach(brand => {
            brandInput.innerHTML+= `<option name=${brand.brandName} value='${brand.brandName}'>${brand.brandName}</option>`
        });
    })

    const updateForm = document.getElementById("formulario-actualizacion")

    updateForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    //console.log(upDateform);
    //updateForm.elements.forEach(e => console.log(e.value))
    const updatedProduct = {
        code: updateForm.elements["code"].value,
        category: updateForm.elements["category"].value,
        subCategory: updateForm.elements["sub-category"].value,
        title: updateForm.elements["title"].value,
        description: updateForm.elements["description"].value,
        cost: parseFloat(updateForm.elements["cost"].value),
        markdown: parseFloat(updateForm.elements["markdown"].value),
        thumbnail: parseFloat(updateForm.elements["thumbnail"].value),
        stock: parseInt(updateForm.elements["stock"].value),
        brand: updateForm.elements["brand"].value,
        provider: updateForm.elements["provider"].value
    }

    const route=`/api/products/${idToUpDate}`
    const headers={
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)

    }

    fetchFunction(route,headers)

    upDateform.parentNode.removeChild(upDateform)

    })

    const cancelUpload = document.getElementById("cancelarUpload")
    cancelUpload.addEventListener('click',(e)=>{
        upDateform.parentNode.removeChild(upDateform)
    })
    

}