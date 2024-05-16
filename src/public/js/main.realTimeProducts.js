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
getSubCategories('categoryInput', 'subCategories')


//Agregar Marca 

addBrand("formulario-marca")
