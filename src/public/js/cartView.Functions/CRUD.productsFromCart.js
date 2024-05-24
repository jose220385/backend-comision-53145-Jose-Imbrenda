const deleteProductFromCart = async () =>{
    const cartId = document.querySelector(".cartContainer").id
    const pid = document.activeElement.parentNode.parentNode.id

    const route = `/api/carts/${cartId}/products/${pid}`
    const headers = {method: "DELETE"}

    fetchFunction(route,headers)
}