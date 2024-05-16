const getTotal = () =>{
    const quantities = document.querySelectorAll('.productContainer input')
    const prices = document.querySelectorAll('.productContainer h4 span')
    const productTotals = []
    quantities.forEach((q,index) =>{
        const result = q.value * parseFloat(prices[index].innerText)
        productTotals.push(result)
    })
    const total = productTotals.reduce((acumulador, valorActual) => acumulador + valorActual, 0);

    const nodeTotal = document.getElementById("total")
    nodeTotal.innerText =""
    nodeTotal.innerText= total
}