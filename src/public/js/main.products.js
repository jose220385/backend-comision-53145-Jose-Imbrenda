console.log('Script de products')

/* const socket = io()

socket.on('products-filtered', data =>{
    console.log(data.docs)
    const {docs,page,hasPrevPage, hasNextPage,prevPage,nextPage, brands, categories} = data ≈

});
*/

//Mantener seleccionados los select al momento de filtrar

/* loadInputsContent('categoryInput','category',`/api/products/categories/all`)
loadInputsContent('brandInput','brand',`/api/products/brands/all`) */

contentLoadWithFilter('categoryInput','category')
contentLoadWithFilter('brandInput','brand')
contentLoadWithFilter('orderInput','order')
contentLoadWithFilter('availabilityInput','status')



//Obtener sub-categorias en la barra de busqueda
/* getSubCategories('categoryInput', 'subCategories','DOMContentLoaded')
getSubCategories('categoryInput', 'subCategories','change') */

//Monitorea cambio en inputs y lanza funcion para filtrar productos
const filterInputs = document.querySelectorAll(".filterInput")
filterInputs.forEach(input => input.addEventListener('change', (e) => productsFilter('/products')))

//Monitorea cambios en paginacion y envia parametros para cambio de pagina
changePage('prevPage')
changePage('nextPage')

