const addToCartForm = document.getElementById('addToCart')

addToCartForm.addEventListener("submit", (e)=> {
    e.preventDefault()

    const quantityToAdd = {quantity: addToCartForm.elements["quantity"].value}
    const pid = document.activeElement.parentNode.parentNode.parentNode.id
    console.log(pid);
    const route = `/api/carts/663b8b21e4aaa2c6dfa38648/products/${pid}`
    const headers={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(quantityToAdd)
    }

    fetchFunction(route,headers)
})