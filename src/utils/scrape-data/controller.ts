import axios from "axios";
import FetchProduct from "./Models/FetchProduct";
import fetchProduct from "./Models/FetchProduct";
import Product from "../../model/Product";

let brands = ["Khaadi", "J.", "Saphire", "Gul ahmed", "Saya", "Bonanza Satrangi", "Samsung", "Huwawei"]

export const scrapeDummyStoreData = async () => {
    let limit = 100
    let data = await axios.get(`https://dummyjson.com/products?limit=${limit}`)
    data = data.data.products
    // @ts-ignore
    for( let i=0; i<data?.length; i++) {
        // @ts-ignore
        data[i]["quantity"] = data[i]["stock"]
        // @ts-ignore
        delete data[i]?.stock
    }
    let responseBody;
    if(data) responseBody = await FetchProduct.insertMany(data)

    return responseBody
}

export const scrapeFakeStoreApi = async () => {
    let data = await axios.get("https://fakestoreapi.com/products")

    data = data.data

    let productData: any = []
    // @ts-ignore
    data.map((dt) => {
        productData.push({
            title: dt.title,
            price: dt.price,
            description: dt.description,
            images: [dt.image],
            rating: parseInt(dt.rating.rate),
            discountPercentage: parseFloat((Math.random() * (5.0 - 0.0) + 0.0).toFixed(2)),
            brand: brands[Math.floor(Math.random() * 5)],
            category: dt.category,
            thumbnail: dt.image,
            quantity: Math.floor(Math.random()*100)
        })
    })

    let responseBody = await fetchProduct.insertMany(productData)
    return responseBody
}

export const scrapeStoreRestApi = async () => {
    let data = await axios.get("https://api.storerestapi.com/products")
    data = data?.data.data
    let products: any = []
    // @ts-ignore
    data.map((dt) => {
        products.push({
            title: dt.title,
            price: dt.price,
            description: dt.description,
            images: [dt?.image],
            rating: Math.floor(Math.random()),
            discountPercentage: parseFloat((Math.random() * (5.0 - 0.0) + 0.0).toFixed(2)),
            brand: brands[Math.floor(Math.random() * 6)],
            category: dt.category.name,
            thumbnail: dt.image || "",
            quantity: Math.floor(Math.random()*100)
        })
    })
    let responseBody = await fetchProduct.insertMany(products)
    return responseBody
}

export const StoreDataInDB = async () => {
    try {
        let data = await fetchProduct.find()
        let cnt = await Product.find()
        if( cnt.length < 1) await Product.insertMany(data)
    } catch (e) {

    }
}