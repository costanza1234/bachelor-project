import React from "react";
import Landing from "./components/Landing";
import Header from "./components/Header";

export default function HomePage() {
    return (
        <div className="mainContainer">
            <Header />
            <Landing />
        </div>
    );
}