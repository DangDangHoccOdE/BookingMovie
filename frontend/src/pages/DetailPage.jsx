import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MovieService} from "../services/movieService";
import {CityService} from "../services/cityService";
import {ActorService} from "../services/actorService";
import {SaloonTimeService} from "../services/saloonTimeService";
import {CommentService} from "../services/commentService";
import {use, useEffect, useState} from "react";
import dateConverter from "../utils/dateConverter";
import {addMovieToState, cleanState} from "../store/actions/movieActions";
import {toast, ToastContainer} from "react-toastify";
import dateConvertForTicket from "../utils/dateConvertForTicket";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

export default function DetailPage() {
    let {movieId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userFromRedux = useSelector(state => state.user.payload);

    let date = new Date();

    const movieService = new MovieService();
    const cityService = new CityService();
    const actorService = new ActorService();
    const saloonTimeService = new SaloonTimeService();
    const commentService = new CommentService();

    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([]);
    const [otherMovies, setOtherMovies] = useState([]);
    const [cinemaSaloons, setCinemaSaloons] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedSaloon, setSelectedSaloon] = useState(null);
    const [saloonTimes, setSaloonTimes] = useState([]);
    const [selectedDay, setSelectedDay] = useState(dateConverter(date));
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [countOfComments, setCountOfComments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getNewVisionMovie(movieId);
    }, [movieId]);

    function getNewVisionMovie(movieId){
        movieService.getMovieById(movieId).then(result => setMovie(result.data))
        actorService.getActorsByMovieId(movieId).then(result => setActors(result.data))
        cityService.getCitiesByMovieId(movieId).then(result => setCinemaSaloons(result.data))
        movieService.getAllDisplayingMovies().then(result => {
            const films = result.data.filter(m => m.movieId !== movieId);
            setOtherMovies(films);
        })
        commentService.getCountOfComments(movieId).then(result => setCountOfComments(result.data))
        getComments(movieId, 1, 5);
    }

    function getSaloonTimes(saloonId, movieId){
        saloonTimeService.getMovieSaloonTimeSaloonAndMovieId(saloonId, movieId).then(result => {
            setSaloonTimes((result.data));
        })
    }

    function getComments(movieId, pageNo, pageSize = 5){
        commentService.getCommentsByMovieId(movieId, pageNo, pageSize).then(result => {
            if(comments.length > 0 && pageNo > 1){
                setComments([...comments, ...result.data])
            }else{
                setComments(result.data);
            }
        })
    }

    function addState(movieTime){
        dispatch(cleanState());

        let movieDto = {
            id: movie.movieId,
            movieName: movie.movieName,
            imageUrl: movie.imageUrl,
            saloonId: selectedSaloon.saloonId,
            saloonName: selectedSaloon.saloonName,
            movieDay: selectedDay,
            movieTime: movieTime
        }
        dispatch(addMovieToState(movieDto));
        navigate("buyTicket")
    }

    function sendCommentText(){
        if(userFromRedux){
            if(commentText.trim().length > 0){
                let commentDto = {
                    commentByUserId: userFromRedux.userId,
                    commentText: commentText,
                    commentBy: userFromRedux.fullName,
                    token: userFromRedux.token,
                    movieId: movieId,
                }

                commentService.addComment(commentDto).then(result => {
                    if(result.status === 200){
                        document.querySelector("#commentArea").value = "";
                        setComments([...comments, result.data])
                        toast.success("Thêm bình luận thành công!",{
                            theme:"light",
                            position: 'top-center'
                        })
                    }
                })
            }else{
                toast.warning("Bình luận của bạn không được để trống!",{
                    theme:"light",
                    position: "top-center"
                })
            }
        }else{
            toast.error("Vui lòng đăng nhập để bình luận!",{
                theme:"light",
                position:'top-center'
            })
        }
    }

    function deleteComment(commentId){
        let deleteCommentDto = {
            commentId: commentId,
            token: userFromRedux.token
        }

        commentService.deleteComment(deleteCommentDto).then(result => {
            if(result.status === 200){
                let newComments = comments.filter(c => c.commentId !== commentId);
                setComments(newComments);
            }
        })
    }

    return(
        <div>
            <section id="entry-section" className='detail-bg pt-5'>
                <div className="container mt-5">
                    <div className="row gx-0 pt-2 justify-content-center align-items-start">
                        <div className="col-sm-12 col-md-6 text-center mb-4">
                            <img className="img-thumbnail w-50" src={movie?.movieImageUrl} alt=""/>
                        </div>
                        <div className='col-sm-12 col-md-6 text-start text-light'>
                            <h3>{movie?.movieName}</h3>
                            <hr/>
                            <h5>Đạo diễn: {movie?.directorName}</h5>
                            <h5>Diễn viên: {actors?.map(actor => (
                                actor.actorName + " ,"
                            ))}
                            </h5>
                            <div className='row gy-1 justify-content-start align-items-end mt-5'>
                                <div className='col-sm-4'>
                                    <button className='detail-page-btn btn btn-light btn-lg col-12' type="button"
                                            onClick={() => document.querySelector("#ticketBuy").scrollIntoView(
                                                {behavior: "smooth",}
                                            )}>
                                        <strong>Mua vé</strong>
                                    </button>
                                </div>
                                <div className='col-sm-4'>
                                    <button className='detail-page-btn btn btn-light btn-lg col-12' type={"button"}
                                            onClick={() => {
                                                document.querySelector("#commentSection").scrollIntoView({
                                                    behavior: "smooth",
                                                })
                                            }}>
                                        <strong>Để lại một bình luận</strong>
                                    </button>
                                </div>
                                <div className='col-sm-4'>
                                    <button className='detail-page-btn btn btn-light btn-lg col-12' type={"button"}
                                            data-bs-toggle="modal" data-bs-target={"#movieTrailerModal"}>
                                        <strong>Trailer</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* for css ::after property */}
            <style dangerouslySetInnerHTML={{
                __html: [
                    '.detail-bg: after {',
                    '  content: "Hello";',
                    "   position: absolute;",
                    "z-index: -1;",
                    'inset: 0',
                    `background-image: url(${movie?.movieTrailerUrl});`,
                    'background-repeat: no-repeat;',
                    'background-size: cover;',
                    'background-position: top center;',
                    'opacity: 0.8;',
                    '-webkit-filter: blur(8px) saturate(1);',
                    '}'
                ].join('\n')
            }}>
            </style>

            <section className='p-5'>
                <div className='container'>
                    <div className='row justify-content-between ms-0 ms-md-5 ps-0 ps-md-5'>
                        <div className='col-sm-4 text-start'>
                            <p><strong>Ngày phát hành: </strong> {dateConverter(movie.releaseDate)}</p>
                            <p><strong>Thời lượng: </strong> {movie.duration}</p>
                            <p><strong>Tên thể loại: </strong> {movie.categoryName}</p>
                        </div>
                        <div className='col-sm-8 text-start'>
                            <p><strong>Mô tả: </strong> {movie.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ticket Buy Section */}
            <section id='ticketBuy' className={'pt-1 pb-3'}>
                <div className='container bg-primary rounded'>
                    <div className='row p-5'>
                        <div className='col-sm-4 mt-2 text-sm-start text-md-end text-light'>
                            <h2>Mua vé</h2>
                        </div>
                        <div className='col-sm-8 ps-3 mt-2'>
                            <button type={"button"} className='select-saloon-button btn btn-primary col-12'
                                    data-bs-toggle={"modal"} data-bs-target={"#saloonModal"}>
                                <strong>Chọn rạp chiếu phim</strong> <i className={"fa-solid fa-caret-down"}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ticket detail section */}
            {selectedSaloon ? (
                <section id='ticketDetailSection' className='px-5 py-1 pb-5'>
                    <hr/>
                    <div className='container py-2'>
                        <ul className='nav justify-content-center'>
                            {
                                [0, 1, 2, 3, 4, 5, 6].map((i) => (
                                    <li className='nav-item'>
                                        <a className='nav-link active date-converter-ticket' aria-current="page"
                                           href="#!"
                                           onClick={() => setSelectedDay(dateConverter(new Date().setDate(date.getDate() + i)))}>
                                            {dateConvertForTicket(new Date().setDate(date.getDate() + i))}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <hr/>
                    <div className='container bg-primary rounded'>
                        <h3 className='text-light p-3'>{selectedSaloon?.saloonName}</h3>
                    </div>
                    <div className='container pb-4'>
                        {saloonTimes?.map(time => (
                            <button className='saloonTime-btn btn btn-outline-dark mx-2 mt-3'
                                    onClick={() => addState(time.movieBeginTime)}>
                                <strong>{time.movieBeginTime} </strong>
                            </button>
                        ))}
                    </div>
                    <hr />

                </section>
            ): null}

            {/* Comment Modal */}
            <section id='commentSection' className='pt-5 pb-5 px-2'>
                <div className='container'>
                    <div className='row gy-2 justify-content-start align-items-start'>
                        <div className='col-sm-12 col-md-6 text-start'>
                            <h3>Bình luận</h3>
                            <div style={{height: "200px", overflow: "scroll", overflowX: 'hidden'}}>
                                {comments.length === 0 ? (
                                    <p className='lead mt-4'>Viết bình luận đầu tiên</p>
                                ) : null}

                                {comments.map(comment => (
                                    <div className='row align-item-center'>
                                        <div className='col-sm-10'>
                                            <p className='lead mt-4'>{comment.commentText}</p>
                                            <p className='small mt-0'>{comment.commentBy}</p>
                                        </div>
                                        {userFromRedux && comment.commentById === userFromRedux.userId ?
                                            <div className='col-sm-2'>
                                                <p className='small mb-0' onClick={() => {
                                                    deleteComment(comment.commentId)
                                                }}>
                                                    <i className='fa-solid fa-xmark'></i>
                                                </p>
                                            </div> : null
                                        }
                                    </div>
                                ))}
                                <hr/>
                                <div className='text-center'>
                                    {currentPage < Math.ceil(countOfComments / 5) && countOfComments > 5 ?
                                        <a href="#!" className='a-pagination lead mt-4'
                                           onClick={() => {
                                               getComments(movieId, currentPage + 1)
                                           }
                                           }>Hiển thị thêm </a> : null
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-12 col-md-6 text-start'>
                            <h3>Để lại một bình luận</h3>
                            <textarea id="commentArea" className='text-dark mb-3' placeholder='Bình luận của bạn'
                                      onChange={(e) => setCommentText(e.target.value)}></textarea>
                            <button className="comment-btn btn btn-dark btn-lg col-12" type="button"
                                    onClick={() => sendCommentText()}><strong>Gửi</strong></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Movie */}
            <section className='py-5'>
                <h3 className='text-center mb-4'>Các phim khác đang chiếu tại rạp</h3>
                <Swiper slidesPerView={5} spaceBetween={0} pagination={{clickable: true}} modules={[Pagination]}
                        className='mySwiper movie-slider'>
                    {otherMovies.map(movie => (
                        <SwiperSlide key={movie.movieId}>
                            <div className='slider-item' onClick={() => {
                                navigate("/movie/" + movie.movieId)
                                getNewVisionMovie(movie.movieId);
                                document.querySelector('#entry-section').scrollIntoView({behavior: "smooth"})
                            }
                            }>
                                <div
                                    className='slider-item-caption d-flex align-items-end justify-content-center h-100 w-100'>
                                    <div className='d-flex align-items-center flex-column mb-3'
                                         style={{height: "20rem"}}>
                                        <div className='mb-auto pt-5 text-white'>
                                            <h3>{movie.movieName}</h3>
                                        </div>
                                        <div className='p-2 d-grid gap-2'>
                                            <a className='slider-button btn btn-light btn-md rounded d-none d-sm-block'
                                               onClick={() => {
                                                   navigate("/movie/" + movie.movieId)
                                                   getNewVisionMovie(movie.movieId)
                                               }
                                               }>
                                                <strong>Để lại một bình luận</strong>
                                            </a>
                                            <a className='slider-button btn btn-light btn-md rounded d-none d-sm-block'
                                               onClick={() => {
                                                   navigate("/movie/" + movie.movieId)
                                                   getNewVisionMovie(movie.movieId);
                                               }}>
                                                <strong>Mua vé</strong>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <img src={movie.movieImageUrl}
                                     className='img-fluid mx-2' alt="..."/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* MovieTrailer Modal */}
            <div className='modal fade' id='movieTrailerModal' tabIndex="-1" aria-labelledby="movieTrailerModal"
                 aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-lg">
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='movieTrailerLabel'>Trailer</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={() => {
                                        let player = document.getElementById("videoPlayer").getAttribute("src");
                                        document.getElementById("videoPlayer").setAttribute("src", player);
                                    }}></button>
                        </div>
                        <div id='modalBody' className="modal-body">
                            <iframe id='videoPlayer' width="100%" height="500rem" frameborder="0"
                                    src={movie.movieTrailerUrl + "?autoplay=0"}>
                            </iframe>
                        </div>

                    </div>
                </div>
            </div>

            {/* Saloon Modal */}
            <div className='modal fade' id='saloonModal' tabIndex='-1' aria-labelledby='saloonModalLabel' aria-hidden="true" style={{height:"50%", overflow: 'auto'}}>
                <div className='modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='saloonModalLabel'>Chọn thành phố</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            {cinemaSaloons.map(saloon => (
                                <a className='text-start text-dark' href='#!'
                                    data-bs-target="#saloonModal2" data-bs-toggle="modal" data-bs-dismiss="modal"
                                    style={{textDecoration:"none"}} onClick={() => setSelectedCity((saloon))}>
                                    <h6 className='ps-1'>{saloon.cityName}</h6>
                                    <hr/>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Saloon Modal */}
            <div className='modal fade' id='saloonModal2' aria-hidden='true' aria-labelledby='saloonModal2ToggleLabel2' tabIndex='-1' style={{height:"50%", overflow:"auto"}}>
                <div className='modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <a href='!#' className='text-dark' data-bs-target="#saloonModal" data-bs-toggle="modal" data-bs-dismiss='modal' style={{textDecoration:'none'}}>
                                <h5 className='modal-title' id='saloonModal2ToggleLabel2'>
                                    <i className='fa-sharp fa-solid fa-chevron-left'></i>
                                    {selectedCity.cityName}
                                </h5>
                            </a>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className='modal-body'>
                            {selectedCity?.saloon?.map(s => (
                                <a className='text-start text-dark' href='#!' onClick={() => {
                                    setSelectedSaloon(s)
                                    getSaloonTimes(s.saloonId, movieId)
                                }}
                                data-bs-target="#saloonModal2" data-bs-toggle='modal' data-bs-dismiss='modal'
                                   style={{textDecoration:"none"}}>
                                    <h6 className='ps-1'>{s.saloonName}</h6>
                                    <hr/>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer/>
        </div>
    )
}