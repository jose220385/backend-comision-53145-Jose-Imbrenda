const socket = io()

cartViewSocket('cartView-deleteProduct')
//Funcion para borrar producto del carrito y actualizar la vista
//deleteProductFromCart()

//Funcion para obtener el total de la compra (se ejecuta cada vez que se cambia la cantidad del carrito)

getTotal()
const quantityInputs = document.querySelectorAll(".quantity")
quantityInputs.forEach(input => input.addEventListener('change', (e) => getTotal()))


