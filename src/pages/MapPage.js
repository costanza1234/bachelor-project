import Header from '../components/Header';
import Map from '../components/Map';

/**
 * MapPage component renders the main container for the map page,
 * including the Header and Map components.
 *
 * @component
 * @returns {JSX.Element} The rendered MapPage component.
 */
export default function MapPage() {
    return (
        <div className='mainContainer'>
            <Header />
            <Map />
        </div>
    );
}
