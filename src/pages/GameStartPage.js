import GameStart from "../components/GameStart";
import Header from "../components/Header";

/**
 * GameStartPage component renders the main container for the game start page,
 * including the Header and GameStart components.
 *
 * @component
 * @returns {JSX.Element} The rendered game start page.
 */
export default function GameStartPage() {
    return (
        <div className="mainContainer">
            <Header />
            <GameStart />
        </div>
    );
}