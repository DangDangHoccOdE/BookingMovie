import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {CityService} from "../../services/cityService";
import {ActorService} from "../../services/actorService";
import {MovieImageService} from "../../services/movieImageService";
import {useEffect, useState} from "react";
import {Formik} from "formik";
import * as yup from "yup";

export default function AddActorsAndCityToMovie(){
    let {movieId} = useParams();
    const navigate = useNavigate()

    const userFromRedux = useSelector(state => state.user.payload)

    const cityService = new CityService();
    const actorService = new ActorService();
    const movieImageService = new MovieImageService();

    const [cities, setCities] = useState([])
    const [actors, setActors] = useState([])

    useEffect(() => {
        cityService.getall().then(result=>{
            let arr = [];
            result.data.forEach(element => {
                if(!arr.includes(element?.cityName)){
                    arr.push(element?.cityName)
                }
            });
            setCities(arr)
        })
        actorService.getall().then(result => {
            let arr = [];
            result.data.forEach(element => {
                if(!arr.includes(element?.actorName)){
                    arr.push(element?.actorName)
                }
            });
            setActors(arr);
        })
    }, []);

    const initValues = {

    }

    const validationSchema = yup.object({

    })

    return(
        <div>
            <div className='mt-5 p-5 container' style={{height: "100vh"}}>
                <h2 className='mt-4'>Thêm mới phim</h2>
                <hr/>

                <h5 className='py-4'>
                    Thêm thông tin diễn viên và thành phố của bộ phim bạn đã thêm.
                </h5>

                <Formik initialValues={initValues} validationSchema={validationSchema} onSubmit={(values) => {
                    let actorNameList;

                    if(!values.actorName && values.actorName.trim() !== ""){
                        if(values.actors !== undefined){
                            actorNameList = [...values.actors, ...values.actorName.split(', ')]
                        }else{
                            actorNameList = [...values.actorName.split(", ")]
                        }
                    }else{
                        actorNameList = [...values.actors]
                    }
                    let  actorDto = {
                        movieId: movieId,
                        actorNameList: actorNameList,
                        token: userFromRedux.token
                    }

                    let cityDto = {
                        movieId: movieId,
                        cityNameList: values.cities,
                        token: userFromRedux.token
                    }

                    let movieImageDto = {
                        movieId: movieId,
                        imageUrl: values.imageUrl,
                        token: userFromRedux.token
                    }

                    actorService.addActor(actorDto);
                    movieImageService.addMovieImage(movieImageDto);
                    cityService.addCity(cityDto).then(result => navigate('/addMovie'));
                }}>

                </Formik>
            </div>
        </div>
    )
}