import GameFinish from "../components/GameFinish";
import Layout from "../components/Layout"

/**
 * FinishPage component renders the final page of the application.
 * It wraps the GameFinish component inside a Layout.
 *
 * @component
 * @returns {JSX.Element} The rendered FinishPage component.
 */
export default function FinishPage() {
    return (
        <Layout>
            <GameFinish />
        </Layout>
    );
}