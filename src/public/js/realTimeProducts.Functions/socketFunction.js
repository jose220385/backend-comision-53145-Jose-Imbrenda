const socketOn =(emitName)=>{
    socket.on(emitName, data =>{
        console.log("cliente escuchando");
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
                                            <button id="borrar" onclick="deleteProduct()">Borrar</button>
                                            <button id="actualizar" onclick="updateProduct()">Actualizar</button>
                                        </div>
                                        `
                divProducto.className='productContainer'
                divProducto.id= p._id
                productsContainer.appendChild(divProducto)
        })
            
        }
    })
}