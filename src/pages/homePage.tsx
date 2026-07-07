import {  useState } from "react";
import Navbar from "../components/navbar";
import HomeComponent from "../components/homeComponent";
import FilmSection from "../components/filmsComponent";

export default function HomePage(){
    const [view, setView] = useState<"home" | "movies">("home");    

    return (
        <div className="home-page m-5">
            <div>
                <Navbar  setView={setView} view={view}/>
            </div>

            {view === "home" ? <HomeComponent /> : <FilmSection />}
        </div>
    )
}