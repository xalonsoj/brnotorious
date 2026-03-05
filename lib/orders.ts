import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface OrderData {
    items: any[];
    total: number;
    customer: {
        email: string;
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        postalCode: string;
    };
    locale: string;
    status: "pending" | "completed" | "failed";
    stripeSessionId?: string;
}

export async function saveOrder(order: OrderData) {
    try {
        const docRef = await addDoc(collection(db, "orders"), {
            ...order,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error saving order to Firestore:", error);
        throw error;
    }
}
