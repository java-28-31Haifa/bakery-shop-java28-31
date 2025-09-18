import type {ShopCartProdType} from "../utils/app-types.ts";
import {doc, setDoc, getDoc, deleteDoc, query, onSnapshot, collection} from 'firebase/firestore'
import {db} from "../configurations/firebase-config.ts";
import {Observable, Subscriber} from "rxjs";
//import {prodColl} from "./firebaseDBService.ts";

export const addProductToCart = async(collName:string, product: ShopCartProdType) => {
    const ref = doc(db, collName, product.prodId);
    await setDoc(ref, product)
}
export const removeProductFromCart = async (collName:string, prodId: string):Promise<ShopCartProdType> => {
    const ref = doc(db, collName, prodId);
    const temp = await getDoc(ref);
    const removed = temp.data() as ShopCartProdType;
    if(!removed) throw new Error("product not found");
    await deleteDoc(ref)
    return removed;

}
export const addProductUnitToCart = async(collName: string, prodId:string) => {
    const ref = doc(db, collName, prodId);
    let count = 0;
    const temp = await getDoc(ref);
    const prodData = temp.data() as ShopCartProdType;
    if(prodData)
        count = prodData.count;
    count++;
    await addProductToCart(collName, {prodId, count});
    return count;
}
export const removeProductUnitFromCart = async (collName:string, prodId: string) => {
    const ref = doc(db, collName, prodId);
    const temp = await getDoc(ref);
    const decreased = temp.data() as ShopCartProdType;
    if(!decreased) throw new Error("product not found");
    const count = decreased.count;
    if(count == 1) {
        await removeProductFromCart(collName, prodId);
    }
    else await addProductToCart(collName, {prodId, count: count -1})
}

export const getAnyProductsCollObservable = <T>(collName:string) => {
    return new Observable((subscriber: Subscriber<T[]>) => {
        const q = query(collection(db, collName));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                const prods =
                    snapshot.docs.map(doc =>
                        ({...doc.data()} as T))
                subscriber.next(prods)
            },
            (err) => subscriber.error(err)
        );
        return () => unsubscribe()
    })
}