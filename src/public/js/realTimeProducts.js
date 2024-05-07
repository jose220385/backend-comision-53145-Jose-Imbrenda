const socket = io()

const socketOn =(emitName)=>{
    socket.on(emitName, data =>{
        if(data){
            const productsContainer = document.getElementById('productsContainer')
            productsContainer.innerHTML=''
            data.forEach(p => {
                const divProducto = document.createElement('div')
                divProducto.innerHTML = `
                                        <h3>${p.title}</h3>
                                        <p><span>Cod:</span>${p.code}</p>
                                        <p>${p.description}</p>
                                        <p><span>$</span>${p.price}</p>
                                        <div class="buttonContainer">
                                            <button id="borrar" onclick="borrar()">Borrar</button>
                                            <button id="actualizar" onclick="actualizar()">Actualizar</button>
                                        </div>
                                        `
                divProducto.className='productContainer'
                divProducto.id= p._id
                productsContainer.appendChild(divProducto)
        })
            
        }
    })
}

socketOn('realTimeProducts')
socketOn('realTimeProducts-delete')
socketOn('realTimeProducts-upload')
socketOn('massiveProductsUpload')

//Funcion para agregar productos

const formAddProduct = document.getElementById("formulario-producto")

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

    fetch('/api/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar el producto");
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

})

//Funcion para borrar productos

const borrar =()=>{
    const id = document.activeElement.parentNode.parentNode.id
    console.log(id);
    fetch(`/api/products/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al borrar el producto");
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

//Funcion para actualizar productos

const actualizar =()=>{
    idToUpDate = document.activeElement.parentNode.parentNode.id
    console.log(idToUpDate);
    const upDateform = document.createElement('div')
    const main = document.getElementsByTagName('main')
    upDateform.className = 'upDateform'
    main[0].appendChild(upDateform)
    upDateform.innerHTML = `
    <form id="formulario-actualizacion">
        <h4>Ingrese los campos que desea modificar:</h4>
        <input type="text" name="title" placeholder="Nombre del producto">
        <input type="text" name="code" placeholder="Codigo del producto">
        <input type="text" name="category" placeholder="Categoría del producto">
        <input type="text" name="sub-category" placeholder="Sub-categoría del producto">
        <input type="text" name="thumbnail" placeholder="Ruta de la foto">
        <input type="number" name="cost" placeholder="Costo del producto">
        <input type="number" name="markdown" placeholder="Porcentaje de marcado del producto">
        <input type="number" name="stock" placeholder="Stock del producto">
        <textarea name="description" placeholder="Descripción del producto"></textarea>
        <button type="submit">Actualizar</button>
        <button id="cancelarUpload" >Cancelar</button>
    </form>
    `

    const updateForm = document.getElementById("formulario-actualizacion")

    updateForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    const updatedProduct = {
        code: updateForm.elements["code"].value,
        category: updateForm.elements["category"].value,
        subCategory: upDateform.elements["sub-category"].value,
        title: updateForm.elements["title"].value,
        description: updateForm.elements["description"].value,
        cost: upDateform.elements["cost"].value,
        markdown: parseFloat(upDateform.elements["markdown"].value),
        thumbnail: parseFloat(updateForm.elements["thumbnail"].value),
        stock: parseInt(updateForm.elements["stock"].value),
        brand: upDateform.elements["brand"].value,
        provider: upDateform.elements["provider"].value
    }

    fetch(`/api/products/${idToUpDate}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)

    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al modificar el producto");
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        upDateform.parentNode.removeChild(upDateform)
    })
    .catch(error => {
        console.error("Error:", error);
    }); 

    })

    const cancelUpload = document.getElementById("cancelarUpload")
    cancelUpload.addEventListener('click',(e)=>{
        upDateform.parentNode.removeChild(upDateform)
    })
    

}

//Carga masiva de productos mediante un excel

const formularioCargaMasiva = document.getElementById("formulario-cargaMasiva")

formularioCargaMasiva.addEventListener("submit", (e)=> {
    e.preventDefault()

    const file = new FormData(formularioCargaMasiva)

    fetch('/api/upload/bdFile', {
        method: "POST",
        body: file
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar el producto");
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

})

//Agregar Categorias

const formAddCategory = document.getElementById("formulario-categoria")

formAddCategory.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newCategory = {
        categoryName: formAddCategory.elements["categoryName"].value,
    }

    fetch('/api/products/categories', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar Categoria");
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    location. reload()
})

//Agegar sub-Categoria a las categorias

const formAddSubCategory = document.getElementById("formulario-subCategoria")

formAddSubCategory.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newSubCategory = {
        categoryName: formAddSubCategory.elements["categoryName"].value,
        subCategoryName: formAddSubCategory.elements["subCategoryName"].value
    }

    fetch('/api/products/subCategories', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSubCategory)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar Categoria");
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    location. reload()
})

//Obtener sub-categorias de manera dinamica en los select segun la categoria que se elija

const categoryInput = document.getElementById('categoryInput')
categoryInput.addEventListener('change',(e) =>{
    const categoryName = categoryInput.value
    console.log(categoryName);
    const subCategoriesInput = document.getElementById('subCategories')
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


//Agregar Marca 

const formAddBrand = document.getElementById("formulario-marca")

formAddBrand.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newBrand = {
        brandName: formAddBrand.elements["brandName"].value,
    }

    fetch('/api/products/brands', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBrand)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar Categoria");
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    location. reload()
})

//Funcion replicada (falta modularizar y agrupar)

const categoryInputForPrice = document.getElementById('categoryInputForPrice')
categoryInputForPrice.addEventListener('change',(e) =>{
    const categoryName = categoryInputForPrice.value
    console.log(categoryName);
    const subCategoriesInput = document.getElementById('subCategoriesForPrice')
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