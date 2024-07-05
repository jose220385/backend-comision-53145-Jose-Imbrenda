const addToCartForm = document.getElementById('addToCart')

addToCartForm.addEventListener("submit", (e)=> {
    e.preventDefault()

    const quantityToAdd = {quantity: addToCartForm.elements["quantity"].value}
    const pid = document.activeElement.parentNode.parentNode.parentNode.id
    const cid = addToCartForm.getAttribute('data-cartID')
    console.log(cid);
    const route = `/api/carts/${cid}/products/${pid}`
    const headers={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(quantityToAdd)
    }

    fetchFunction(route,headers)
})