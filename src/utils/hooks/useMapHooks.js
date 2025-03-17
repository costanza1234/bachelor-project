import { useState, useEffect, useCallback } from "react";
import { shuffle } from "../helpers";

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

// Hook to shuffle island names on mount
export const useShuffledIslands = () => {
    const [ islandNames, setIslandNames ] = useState([]);

    useEffect(() => {
        const shuffledNames = shuffle([
            "island1.png",
            "island2.png",
            "island3.png",
            "island4.png",
            "island5.png",
            "island6.png",
        ]);
        shuffledNames.push("island7.png"); // Always add the 7th island
        setIslandNames(shuffledNames);
    }, []);

    return islandNames;
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