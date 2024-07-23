import { faker } from "@faker-js/faker"

export const generateProducts = async() =>{
    return{
            code: faker.number.int,
            title: faker.commerce.productName,
            description: faker.commerce.productDescription,
            cost:faker.number.float,
            markdown: faker.number.float,
            price: faker.commerce.price,
            thumbnail: faker.image.url,
            stock: faker.number.int,
            category: faker.commerce.productAdjective,
            subCategory: faker.commerce.productAdjective,
            brand: faker.company.name,
            provider: faker.company.name,
            status: true,

    }
}