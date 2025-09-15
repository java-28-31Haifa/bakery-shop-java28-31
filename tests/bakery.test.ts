import {addCategory, isCategoryExists, removeCategory} from "../src/firebase/firebaseDBService";
import {deleteApp} from 'firebase/app';
import { app } from "../src/configurations/firebase-config";
import {getRandomNumber} from "../src/utils/tools";


describe('BakeryShop tests', () => {
    const categories: string[] = ['bread', 'biscuits', 'croissants', 'cake', 'pizza']
    afterAll(async () => {
        await deleteApp(app);
    });

    test('Test:firebaseDbService.isCategoryExists', () => {
        expect(isCategoryExists('bread')).resolves.toBeTruthy();
        expect(isCategoryExists('milk')).resolves.toBeFalsy();
    })

    test('random category', async () => {
        const category = categories[getRandomNumber(0, categories.length)]
        await expect(isCategoryExists(category)).resolves.toBeTruthy();
    })

    test('all category exists', async () => {
        const promiseArr = categories.map(cat => isCategoryExists(cat));
        const resArr = await Promise.all(promiseArr);
        const res = resArr.every(item => item);
        expect(res).toBeTruthy();
    })

    test('remove add category', async () => {
        const cat = 'bread'
        await removeCategory(cat)
        expect(await isCategoryExists(cat)).toBeFalsy()
        await addCategory({categoryName: cat})
        expect(await isCategoryExists(cat)).toBeTruthy()
    })
})