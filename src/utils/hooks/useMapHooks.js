import { useState, useEffect, useCallback } from "react";

// Hook for tracking window dimensions
export const useWindowDimensions = () => {
    const [ dimensions, setDimensions ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return dimensions;
};


// Hook for auto-scaling map content
export const useAutoScale = (containerRef, contentRef, dependencies) => {
    const [ scale, setScale ] = useState(1);

    // Use `useCallback` to stabilize the function reference
    const handleScale = useCallback(() => {
        if (!containerRef.current || !contentRef.current) return;

        contentRef.current.style.transform = "none"; // Reset scale before measuring

        const containerRect = containerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();

        const newScale = Math.min(
            containerRect.width / contentRect.width,
            containerRect.height / contentRect.height
        );
        setScale(newScale);
    }, [ containerRef, contentRef ]); // Include refs inside `useCallback`

    useEffect(() => {
        window.addEventListener("resize", handleScale);
        handleScale(); // Run once on mount

        return () => window.removeEventListener("resize", handleScale);
    }, [ handleScale, ...dependencies ]); // Include `handleScale` instead of refs directly

    return scale;
};