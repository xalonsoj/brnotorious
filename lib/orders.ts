import { db } from './firebase';
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    doc,
    getDoc,
    addDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

export const ORDERS_COLLECTION = 'orders';

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
        name: string;
        street: string;
        city: string;
        zipCode: string;
        country: string;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
    stripeSessionId?: string;
    locale: string;
}

/**
 * Save a new order to Firestore
 */
export async function saveOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...order,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error saving order to Firestore:", error);
        throw error;
    }
}

/**
 * Get all orders for a specific user
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
    try {
        const ordersRef = collection(db, ORDERS_COLLECTION);
        const q = query(
            ordersRef,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Order[];
    } catch (error) {
        console.error('Error getting user orders:', error);
        return [];
    }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Order;
        }
        return null;
    } catch (error) {
        console.error('Error getting order:', error);
        throw error;
    }
}
