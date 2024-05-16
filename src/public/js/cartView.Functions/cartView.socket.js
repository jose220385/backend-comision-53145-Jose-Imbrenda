const cartViewSocket = async (emitName) =>{
socket.on(emitName, data =>{
    console.log(data);
    if(data){
        const productsContainer = document.getElementById('productsContainer')
        productsContainer.innerHTML=''
        data.products.forEach(p => {
            const divProducto = document.createElement('div')
            divProducto.className = "productContainer"
            divProducto.id= p._id
            divProducto.innerHTML = `
                                    <div class="cartImageContainer">
                                        <p>img</p>
                                        <img src="" alt="">
                                    </div>
                                    <p>Cod: ${p.productId.code}</p>
                                    <p><strong> ${p.productId.title}</strong></p>
                                    <h4>$ <span>${p.productId.price}</span></h4>
                                    <input type="number" name="quantity" min="1" max="100" value=${p.quantity} onchange="getTotal()>
                                    <div class="buttonContainer">
                                        <button onclick="deleteProduct()">Borrar Item</button>
                                    </div>
                                    `
            divProducto.className='productContainer'
            divProducto.id= p.productId._id
            productsContainer.appendChild(divProducto)
            getTotal()
            })

    }
})
}