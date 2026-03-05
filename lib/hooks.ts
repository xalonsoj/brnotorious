import { useState, useEffect } from "react";

/**
 * Hook to check if a component has hydrated.
 * Useful for avoiding hydration mismatches when rendering content
 * that depends on client-only state (e.g. localStorage).
 */
export function useHasHydrated() {
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
}
