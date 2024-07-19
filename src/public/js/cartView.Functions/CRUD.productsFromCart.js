const deleteProductFromCart = async () =>{
    const cartId = document.querySelector(".cartContainer").id
    const pid = document.activeElement.parentNode.parentNode.id

    const route = `/api/carts/${cartId}/products/${pid}`
    const headers = {method: "DELETE"}

    fetchFunction(route,headers)
}

const changeProductQuantity = async() =>{
    const cartId = document.querySelector(".cartContainer").id
    /* const pid = document.activeElement.parentNode.id
    console.log(pid); */
    //const div = document.getElementById(pid)
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
}

/* const quantityInputs = document.querySelectorAll('.quantity')
quantityInputs.forEach(input => input.addEventListener('change', (e) => changeProductQuantity())) */