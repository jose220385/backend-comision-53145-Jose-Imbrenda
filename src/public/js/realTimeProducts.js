const socket = io()

socket.on('realTimeProducts', data =>{
    if(data){
        const productsContainer = document.getElementById('productsContainer')
        productsContainer.innerHTML=''
        data.forEach(p => {
            const divProducto = document.createElement('div')
            divProducto.innerHTML = `
                                    <h3>${p.title}</h3>
                                    <p>${p.code}</p>
                                    <p>${p.description}</p>
                                    <p>${p.price}</p>
                                    <div class="buttonContainer">
                                        <button id="borrar" onclick="borrar()">Borrar</button>
                                        <button id="actualizar" onclick="actualizar()">Actualizar</button>
                                    </div>
                                    `
            divProducto.className='productContainer'
            divProducto.id= p.id
            productsContainer.appendChild(divProducto)
    })
        
    }
})

socket.on('realTimeProducts-delete', data =>{
    if(data){
        const productsContainer = document.getElementById('productsContainer')
        productsContainer.innerHTML=''
        data.forEach(p => {
            const divProducto = document.createElement('div')
            divProducto.innerHTML = `
                                    <h3>${p.title}</h3>
                                    <p>${p.code}</p>
                                    <p>${p.description}</p>
                                    <p>${p.price}</p>
                                    <div class="buttonContainer">
                                        <button id="borrar" onclick="borrar()">Borrar</button>
                                        <button id="actualizar" onclick="actualizar()">Actualizar</button>
                                    </div>
                                    `
            divProducto.className='productContainer'
            divProducto.id= p.id
            productsContainer.appendChild(divProducto)
    })
        
    }
})

socket.on('realTimeProducts-upload', data =>{
    if(data){
        const productsContainer = document.getElementById('productsContainer')
        productsContainer.innerHTML=''
        data.forEach(p => {
            const divProducto = document.createElement('div')
            divProducto.innerHTML = `
                                    <h3>${p.title}</h3>
                                    <p>${p.code}</p>
                                    <p>${p.description}</p>
                                    <p>${p.price}</p>
                                    <div class="buttonContainer">
                                        <button id="borrar" onclick="borrar()">Borrar</button>
                                        <button id="actualizar" onclick="actualizar()">Actualizar</button>
                                    </div>
                                    `
            divProducto.className='productContainer'
            divProducto.id= p.id
            productsContainer.appendChild(divProducto)
    })
        
    }
})

const formAddProduct = document.getElementById("formulario-producto")

formAddProduct.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newProduct = {
        code: form.elements["code"].value,
        category: form.elements["category"].value,
        title: form.elements["title"].value,
        description: form.elements["description"].value,
        price: form.elements["price"].value,
        thumbnail: form.elements["thumbnail"].value,
        stock: form.elements["stock"].value,
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

const borrar =()=>{
    const id = document.activeElement.parentNode.parentNode.id
    console.log(id)

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

const actualizar =()=>{
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
        <input type="text" name="category" placeholder="Categoría del producto">
        <input type="text" name="thumbnail" placeholder="Ruta de la foto">
        <input type="number" name="price" placeholder="Precio del producto">
        <input type="number" name="stock" placeholder="Stock del producto">
        <textarea name="description" placeholder="Descripción del producto"></textarea>
        <button type="submit">Actualizar</button>
        <button>Cancelar</button>
    </form>
    `
    
    const updateForm = document.getElementById("formulario-actualizacion")

    updateForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    const updatedProduct = {
        code: updateForm.elements["code"].value,
        category: updateForm.elements["category"].value,
        title: updateForm.elements["title"].value,
        description: updateForm.elements["description"].value,
        price: updateForm.elements["price"].value,
        thumbnail: updateForm.elements["thumbnail"].value,
        stock: updateForm.elements["stock"].value,
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

    })

}

/* const buttonDelete = document.getElementById('borrar')
console.log(buttonDelete.parentNode.parentNode.id)

buttonDelete.addEventListener('click',(e)=>{
    const IDtoDelete = buttonDelete.parentNode.parentNode.id
    console.log(IDtoDelete)
    fetch(`/api/products/${IDtoDelete}`, {
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

}) */

/* const buttonUpLoad = document.getElementById('actualizar')

buttonUpLoad.addEventListener('click',(e)=>{
    const IDtoUpLoad = buttonUpLoad.parentNode.parentNode.id
    console.log(IDtoUpLoad)
/    fetch(`/api/products/${IDtoUpLoad}`, {
        method: "PUT"
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

}) */
