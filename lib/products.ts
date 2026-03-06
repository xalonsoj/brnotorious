import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    featured: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export const PRODUCTS_COLLECTION = 'products';

export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const newProductRef = doc(productsRef);

    const product: any = {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    await setDoc(newProductRef, product);
    return newProductRef.id;
}

export async function updateProduct(id: string, productData: Partial<Product>) {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await setDoc(productRef, {
        ...productData,
        updatedAt: serverTimestamp(),
    }, { merge: true });
}

export async function deleteProduct(id: string, imageUrls: string[]) {
    // Delete images from storage first
    for (const url of imageUrls) {
        try {
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }

    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(productRef);
}

export async function uploadProductImage(file: File): Promise<string> {
    const filename = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `products/${filename}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
}

export async function getProducts() {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Product[];
}
