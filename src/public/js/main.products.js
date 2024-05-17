console.log('Script de products')

const socket = io()

socket.on('products-filtered', data =>{
    console.log(data.docs)
});

//Obtener sub-categorias en la barra de busqueda
getSubCategories('categoryInput', 'subCategories')

//Monitorea cambio en inputs y lanza funcion para filtrar productos
const filterInputs = document.querySelectorAll(".filterInput")
filterInputs.forEach(input => input.addEventListener('change', (e) => productsFilter()))



