import React from "react";
import GameStart from "./components/GameStart";
import Header from "./components/Header";

export default function HomePage() {
    return (
        <div className="mainContainer">
            <Header />
            <GameStart />
        </div>
    );
}