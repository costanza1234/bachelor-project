/**
 * Renders an image element representing a map island.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} [props.className] - Optional CSS class for the image.
 * @param {Object} [props.style] - Optional inline styles for the image.
 * @param {function} [props.onClick] - Optional click handler for the image.
 * @returns {JSX.Element} The rendered image element.
 */
export default function MapIsland({ key, src, alt, className, style, onClick }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            onClick={onClick}
        />
    );
}