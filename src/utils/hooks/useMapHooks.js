import { useState, useEffect, useCallback } from "react";


/**
 * Custom React hook that returns the current window dimensions (width and height).
 * It updates the dimensions whenever the window is resized.
 *
 * @returns {{ width: number, height: number }} The current width and height of the window.
 */
export const useWindowDimensions = () => {

    // Initialize state with current window width and height
    const [ dimensions, setDimensions ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {

        // Function to update state on window resize
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        // Add resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup: remove event listener on unmount
        return () => window.removeEventListener("resize", handleResize);

    }, []); // Empty dependency array: run once on mount

    return dimensions; // Return current dimensions
};


/**
 * Custom React hook that automatically scales the content to fit inside a container.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - Ref to the container element.
 * @param {React.RefObject<HTMLElement>} contentRef - Ref to the content element to be scaled.
 * @param {Array<any>} dependencies - Additional dependencies that trigger recalculation of scale.
 * @returns {number} The current scale value to fit the content inside the container.
 *
 * @example
 * const scale = useAutoScale(containerRef, contentRef, [someDependency]);
 * // Apply scale to content: style={{ transform: `scale(${scale})` }}
 */
export const useAutoScale = (containerRef, contentRef, dependencies) => {

    // State for current scale value
    const [ scale, setScale ] = useState(1);

    // Memoized function to calculate and set scale
    const handleScale = useCallback(() => {

        // If refs are not set, do nothing
        if (!containerRef.current || !contentRef.current) return;

        // Reset content transform before measuring
        contentRef.current.style.transform = "none";

        // Get bounding rectangles for container and content
        const containerRect = containerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();

        // Calculate new scale to fit content inside container
        const newScale = Math.min(
            containerRect.width / contentRect.width,
            containerRect.height / contentRect.height
        );
        // Update scale state
        setScale(newScale);
    }, [ containerRef, contentRef ]); // Recreate if refs change

    useEffect(() => {

        // Add resize event listener to recalculate scale
        window.addEventListener("resize", handleScale);

        // Run scale calculation once on mount
        handleScale();

        // Cleanup: remove event listener on unmount or dependencies change
        return () => window.removeEventListener("resize", handleScale);
    }, [ handleScale, ...dependencies ]); // Rerun if handleScale or dependencies change

    return scale; // Return current scale value
};