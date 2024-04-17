

console.log('Script del Real Time')

const socket = io()
//let realTimeProducts = []

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
                                        <button id="borrar">Borrar</button>
                                        <button id="actualizar">Actualizar</button>
                                    </div>
                                    `
            divProducto.className='productContainer'
            divProducto.id= p.id
            productsContainer.appendChild(divProducto)
    })
        
    }
})

const form = document.getElementById("formulario-producto")

form.addEventListener("submit", (e)=> {
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

const buttonDelete = document.getElementById('borrar')
console.log(buttonDelete)

buttonDelete.addEventListener('click',(e)=>{
    const IDtoDelete = buttonDelete.parentNode.parentNode.id
    console.log(IDtoDelete)
/    fetch(`/api/products/${IDtoDelete}`, {
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

})

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
