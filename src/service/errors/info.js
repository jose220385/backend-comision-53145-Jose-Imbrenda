export const generateUserError = (user) =>{
    return `Hay al menos una de las propiedades del usuario incompleta o no valida.
    Listado de propiedades requeridas:
    *first_name: se necesita un string, se recibio ${user.first_name}
    last_name: se necesita un string, se recibio ${user.last_name}
    email: se necesita un string, se recibio ${user.email}
    age: se necesita un string, se recibio ${user.age}
    password: se necesita que no sea null o undefined, se recibio ${user.password}
    `
}

export const generateProductError = (product)=>{
    return `Hay al menos una de las propiedades del producto incompleta o no valida.
    Listado de propiedades requeridas:
    *code: se necesita que no sea null o undefined, se recibio ${product.code}*
    *category: se necesita un string, se recibio ${product.category}*
    *subCategory: se necesita un string, se recibio ${product.subCategory}*
    *title: se necesita un string, se recibio ${product.title}*
    *description: se necesita un string, se recibio ${product.description}*
    *description: se necesita un string, se recibio ${product.description}*
    *brand: se necesita un string, se recibio ${product.brand}*
    *provider: se necesita un string, se recibio ${product.provider}*
    *cost: se necesita un number, se recibio ${product.cost}*
    *markdown: se necesita un number, se recibio ${product.markdown}*
    *thumbnail: se necesita un string, se recibio ${product.thumbnail}*
    *stock: se necesita un number, se recibio ${product.stock}*
    `
}

export const duplicatedProductCodeError = (code)=>{
    return `El codigo ${code} ya se encuentra asignado a otro producto`
}

export const emptyCartError =()=>{
    return `Se esperan productos en el carrito para poder elaborar un ticket`
}

export const noTicketInSession =()=>{
    return `Se esperan los datos del ticket en req.session.ticket`
}