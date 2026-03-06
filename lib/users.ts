import { db } from './firebase';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';

export const USERS_COLLECTION = 'users';

export interface UserAddress {
    street: string;
    city: string;
    zipCode: string;
    country: string;
    isDefault?: boolean;
}

export interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    address?: UserAddress;
    role: 'admin' | 'customer';
    createdAt: any;
    updatedAt: any;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
        const docRef = doc(db, USERS_COLLECTION, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserProfile;
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
    try {
        const docRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

export async function createUserProfile(profile: UserProfile) {
    try {
        const docRef = doc(db, USERS_COLLECTION, profile.uid);
        await setDoc(docRef, {
            ...profile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
}
