const socket = io()

cartViewSocket('cartView-deleteProduct')
//cartViewSocket('cartView-modifyQuantity')
//Funcion para borrar producto del carrito y actualizar la vista
//deleteProductFromCart()

//Funcion para obtener el total de la compra (se ejecuta cada vez que se cambia la cantidad del carrito)
getTotal()

//Funcion que actualiza el carrito en la BD si cambiamos la cantidad
const quantityInputs = document.querySelectorAll(".quantity")
quantityInputs.forEach(input => input.addEventListener('change', (e) => {
    const cartId = document.querySelector(".cartContainer").id
    const changedInput = e.target 
    const productContainer = changedInput.closest('.productContainer')
    const pid = productContainer.id
    const quantityToChange = parseInt(productContainer.querySelector('input').value)
    console.log(quantityToChange)
    const route = `/api/carts/${cartId}/changeQ/${pid}`
    const headers={
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({quantity : quantityToChange})
}
fetchFunction(route,headers)
}))
quantityInputs.forEach(input => input.addEventListener('change', (e) => getTotal()))

//Funcion que llama al endpoint para finalizar la compra
const purchaseButton = document.getElementById('purchaseButton')
purchaseButton.addEventListener('click', async (e)=>{
    const cartId = document.querySelector(".cartContainer").id
    const route = `/api/carts/${cartId}/purchase`
    //await fetchFunction(route,{})
    fetch(route)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la comunicacion con el servidor ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    window.location.href = 'http://localhost:8080/ticket'
  })
  .catch(error => {
    console.error('Error en la respuesta del servidor:', error);
  })
    
})


