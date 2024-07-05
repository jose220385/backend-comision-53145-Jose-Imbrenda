console.log('Script de products')



//Mantener seleccionados los select al momento de filtrar

contentLoadWithFilter('categoryInput','category')
contentLoadWithFilter('brandInput','brand')
contentLoadWithFilter('orderInput','order')
contentLoadWithFilter('availabilityInput','status')

//Monitorea cambio en inputs y lanza funcion para filtrar productos
const filterInputs = document.querySelectorAll(".filterInput")
filterInputs.forEach(input => input.addEventListener('change', (e) => productsFilter('/products')))

//Monitorea cambios en paginacion y envia parametros para cambio de pagina
changePage('prevPage')
changePage('nextPage')

