'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/store/useCart';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function CartSync() {
    const { user, loading } = useAuth();
    const { items, setItems } = useCart();
    const isInitialMount = useRef(true);
    const syncInProgress = useRef(false);

    // Load cart from Firestore on login
    useEffect(() => {
        if (!loading && user) {
            const loadCart = async () => {
                try {
                    const cartRef = doc(db, 'carts', user.uid);
                    const cartSnap = await getDoc(cartRef);

                    if (cartSnap.exists()) {
                        const firestoreItems = cartSnap.data().items || [];

                        // Merge logic: If local cart is empty, use Firestore cart
                        // If local cart has items, we could merge or ask, but for Brnotorious 
                        // we'll merge them (avoiding duplicates if possible)
                        if (items.length === 0) {
                            setItems(firestoreItems);
                        } else {
                            // Basic merge: keep local items, but could be more complex
                            // For now, let's just stick with local if it's there, 
                            // or merge by productId/variantId
                            const merged = [...items];
                            firestoreItems.forEach((fItem: any) => {
                                const exists = merged.find(m =>
                                    m.productId === fItem.productId && m.variantId === fItem.variantId
                                );
                                if (!exists) {
                                    merged.push(fItem);
                                }
                            });
                            setItems(merged);
                        }
                    }
                } catch (error) {
                    console.error('Error loading cart from Firestore:', error);
                }
            };
            loadCart();
        }
    }, [user, loading]);

    // Save cart to Firestore on change
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (!loading && user && !syncInProgress.current) {
            const saveCart = async () => {
                syncInProgress.current = true;
                try {
                    const cartRef = doc(db, 'carts', user.uid);
                    await setDoc(cartRef, {
                        items: items.map(item => ({
                            productId: item.productId,
                            variantId: item.variantId || null,
                            quantity: item.quantity,
                            // We don't save the full product object to avoid stale data,
                            // but useCart expects it. In a real app we'd fetch prices on load.
                            // For simplicity here, we'll save it but mark as "cached".
                            product: item.product
                        })),
                        updatedAt: serverTimestamp()
                    });
                } catch (error) {
                    console.error('Error saving cart to Firestore:', error);
                } finally {
                    syncInProgress.current = false;
                }
            };

            // Debounce save
            const timer = setTimeout(saveCart, 2000);
            return () => clearTimeout(timer);
        }
    }, [items, user, loading]);

    return null; // This is a logic-only component
}
