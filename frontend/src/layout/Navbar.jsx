import {Link, useNavigate} from "react-router-dom";
import {MovieService} from "../services/movieService";
import {use, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";

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
                        MovieBooking
                    </Link>
                    <button className="navbar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggle-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {useFromRedux?.role[0] === "ADMIN" ?
                                (<li className="nav-item">
                                    <a className="nav-link" href="#!" onClick={() => navigate("/addMovie")}>
                                        Thêm mới phim
                                    </a>
                                </li>) : null}

                            <li className="nav-item">
                                <a className="nav-link" href="#!" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offCanvasTop">
                                    Phim
                                </a>
                            </li>

                            {useFromRedux ? <LoggedIn/> : <LoggedOut/>}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            <LoginModal/>
            <RegisterModal/>

            {/* Movies OffCanvas */}
            <div className='offcanvas offcanvas offcanvas-top offcanvas-movie' tabIndex='-1' id='offcanvasTop'
                 aria-labelledby='offcanvasTopLabel' style={{offcanvasHeight:"100%"}}>
                <div className='offcanvas-body mt-5'>
                    <div className='container mb-5'>
                        <div className='row justify-content-between align-item-center'>
                            <div className='col-sm-12 col-md-6 text-white text-start'>
                                <div className='row justify-content-center align-items-center'>
                                    <div className='col-sm-6'>
                                        <img src={moviesInVision[0]?.movieImageUrl}
                                             className='img-fluid' alt='...'/>
                                    </div>
                                    <div className='col-sm-6'>
                                        <h3>{moviesInVision[0]?.movieName}</h3>
                                        <p onClick='last-movie-p'>{moviesInVision[0]?.description}</p>
                                        <a className='slider-button btn btn-light btn-md rounded' data-bs-dismiss='offcanvasTop' aria-label="Close"
                                           onClick={() => navigate("/movie/" + moviesInVision[0]?.movieId)}>
                                            <strong>Mua vé</strong>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12col-md-6'>
                                <div className='row justify-content-center align-items-start'>
                                    <div className='col-sm-7'>
                                        <h3 className='text-start ms-3'>Phim đang chiếu</h3>
                                        {/* 5 films*/}
                                        <div className='ms-3 mt-2'>
                                            {moviesInVision.map(movie => (
                                                <p className='nav-movie-p text-start text-decoration-none' href='#!'
                                                   onClick={() => navigate("/movie/" +movie.movieId)}>
                                                    {movie.movieName}
                                                </p>
                                            ))}
                                        </div>

                                        <a href="#!" className='text-decoration-none'><strong>Tất cả</strong></a>
                                    </div>
                                    <div className='col-sm-5'>
                                        <h3 className='text-start ms-3'>Chuẩn bị ra mắt</h3>
                                        <div className='ms-3 mt-2'>
                                            {comingSoonMovies.map(movie=>(
                                                <p className='nav-movie-p text-start text-decoration-none' href="#!"
                                                   onClick={() => navigate("/movie/" + movie.movieId)}>
                                                    {movie.movieName}
                                                </p>
                                            ))}
                                        </div>
                                        <a href='#!' className='text-decoration-none'><strong>Tất cả</strong></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}