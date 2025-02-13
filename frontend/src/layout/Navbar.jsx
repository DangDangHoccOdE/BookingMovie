import {Link, useNavigate} from "react-router-dom";
import {MovieService} from "../services/movieService";
import {use, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navbar(){
    const navigate = useNavigate();

    const movieService = new MovieService();

    const [moviesInVision, setMoviesInVision] = useState([]);
    const [comingSoonMovies, setComingSoonMovies] = useState([]);

    const useFromRedux = useSelector(state => state.user.payload)

    useEffect(() => {
        movieService.getAllDisplayingMovies()
            .then(result => setMoviesInVision(result.data));
        movieService.getAllComingSoonMovies()
            .then(result => setComingSoonMovies(result.data));
    }, []);

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div className="container px-5">
                    <Link to={"/"} style={{textDecoration: 'none'}}>
                        <a className="navbar-brand">MovieBooking</a>
                    </Link>
                    <button className="navbar-toggle" tyle="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggle-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {useFromRedux?.role[0] === "ADMIN"} ?
                                <li className="nav-item">
                                    <a className="nav-link" href="#!" onClick={() => navigate("/addMovie")}>
                                        Thêm mới phim
                                    </a>
                                </li> : null

                            <li className="nav-item">
                                <a className="nav-link" href="#!" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-control="offCanvasTop">
                                    Phim
                                </a>
                            </li>

                            {useFromRedux ? <LoggedIn/> : <LoggedOut/>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}