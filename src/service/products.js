// source: ${uri}/docs

import { addSearchOptions } from "../utils/helper";

const uri = 'http://localhost:9000';


export const getProducts = async (limit = 20, page = 1, signal) => {
    const params = {
        limit,
        page,
    }
    const url = addSearchOptions(`${uri}/products`, params)
    return fetch(url, { signal }).then(res => res.json())
}

export const getProduct = (productId) => {
    return fetch(`${uri}/products/${productId}`).then(res => res.json())
}

export const addInCart = (products) => {
    return fetch(`${uri}/add-to-cart`, {
        method: "PUT",
        body: JSON.stringify(
            {
                userId: 3,
                date: "2019-12-10",
                products
            }
        )
    })
        .then(res => res.json())
}

export const markAsFavourate = (id, isFavourite) => {
    try {
        return fetch(`${uri}/product-liked/${id}`, {
            method: "POST",
        })
    } catch (e) {
        return true;
    }

}