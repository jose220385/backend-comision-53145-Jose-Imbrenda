const deleteProductFromCart = async () =>{
    const cartId = document.querySelector(".cartContainer").id
    console.log(cartId)
    const pid = document.activeElement.parentNode.parentNode.id
    console.log(pid);

    const route = `/api/carts/${cartId}/products/${pid}`
    const headers = {method: "DELETE"}

    fetchFunction(route,headers)
}