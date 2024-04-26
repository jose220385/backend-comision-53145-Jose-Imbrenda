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
                                        <p>${p.code}</p>
                                        <p>${p.description}</p>
                                        <p>${p.price}</p>
                                        <div class="buttonContainer">
                                            <button id="borrar" onclick="borrar()">Borrar</button>
                                            <button id="actualizar" onclick="actualizar()">Actualizar</button>
                                        </div>
                                        `
                divProducto.className='productContainer'
                console.log(p._id)
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


const formAddProduct = document.getElementById("formulario-producto")

formAddProduct.addEventListener("submit", (e)=> {
    e.preventDefault()
    const newProduct = {
        code: formAddProduct.elements["code"].value,
        category: formAddProduct.elements["category"].value,
        title: formAddProduct.elements["title"].value,
        description: formAddProduct.elements["description"].value,
        price: formAddProduct.elements["price"].value,
        thumbnail: formAddProduct.elements["thumbnail"].value,
        stock: formAddProduct.elements["stock"].value,
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
        <input type="text" name="thumbnail" placeholder="Ruta de la foto">
        <input type="number" name="price" placeholder="Precio del producto">
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

const formularioCargaMasiva = document.getElementById("formulario-cargaMasiva")

formularioCargaMasiva.addEventListener("submit", (e)=> {
    e.preventDefault()
    /* const newProduct = {
        code: formAddProduct.elements["code"].value,
        category: formAddProduct.elements["category"].value,
        title: formAddProduct.elements["title"].value,
        description: formAddProduct.elements["description"].value,
        price: formAddProduct.elements["price"].value,
        thumbnail: formAddProduct.elements["thumbnail"].value,
        stock: formAddProduct.elements["stock"].value,
    } */

    const file = new FormData(formularioCargaMasiva)

    fetch('/api/upload/bdFile', {
        method: "POST",
        /* headers: {
            "Content-Type": "application/json"
        }, */
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