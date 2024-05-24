const socket = io()

socketOn('realTimeProducts')
socketOn('realTimeProducts-delete')
socketOn('realTimeProducts-upload')
socketOn('massiveProductsUpload')

//Funcion para agregar productos

addProduct("formulario-producto")

//Funcion para borrar productos (se ejecuta en realTimeProducts.handlebars)

//Funcion para actualizar productos (se ejecuta en realTimeProducts.handlebars)

//Carga masiva de productos mediante un excel

massiveCharge("formulario-cargaMasiva")


//Agregar Categorias

addCategory("formulario-categoria")


//Agegar sub-Categoria a las categorias

addSubCategory("formulario-subCategoria")


//Obtener sub-categorias de manera dinamica en el form de aumento de precios: 
getSubCategories('categoryInputForPrice', 'subCategoriesForPrice')

//Obtener sub-categorias de manera dinamica en el form de carga de productos: 
getSubCategories('categoryInputForAdd', 'subCategoriesInAdd')


//Agregar Marca 

addBrand("formulario-marca")

//Funcion para checkear y descheckear radio
const raiseRadio = document.getElementById('raise');
const decreaseRadio = document.getElementById('decrease');

raiseRadio.addEventListener('click', function() {
  if (this.checked) {
    decreaseRadio.checked = false; 
  }
});

decreaseRadio.addEventListener('click', function() {
  if (this.checked) {
    raiseRadio.checked = false; 
  }
});

//Manejo de Filtros y Paginacion

//Mantener seleccionados los select al momento de filtrar

contentLoadWithFilter('categoryInput','category')
contentLoadWithFilter('brandInput','brand')
contentLoadWithFilter('orderInput','order')
contentLoadWithFilter('availabilityInput','status')

//Monitorea cambio en inputs y lanza funcion para filtrar productos
const filterInputs = document.querySelectorAll(".filterInput")
filterInputs.forEach(input => input.addEventListener('change', (e) => productsFilter('/realTimeProducts')))

//Monitorea cambios en paginacion y envia parametros para cambio de pagina
changePage('prevPage')
changePage('nextPage')
