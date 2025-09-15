import type {ShopCartProdType} from "../utils/app-types.ts";
import {doc, setDoc, getDoc, deleteDoc, collection, getCountFromServer, query, onSnapshot} from 'firebase/firestore'
import {db} from "../configurations/firebase-config.ts";

export const addProductToCart = async(collName:string, product: ShopCartProdType) => {
    const ref = doc(db, collName, product.prodId);
    await setDoc(ref, product)
}
export const removeProductFromCart = async (collName:string, prodId: string):Promise<ShopCartProdType> => {

}
export const addProductUnitToCart = async(collName: string, prodId:string) => {
    const ref = doc(db, collName, prodId);
    let count = 0;
    const temp = await getDoc(ref);
    const prodData = temp.data() as ShopCartProdType;
    if(prodData)
        count = prodData.count
    await addProductToCart(collName, {prodId, count: count + 1})
}
export const removeProductUnitFromCart = async (collName:string, prodId: string) => {

}