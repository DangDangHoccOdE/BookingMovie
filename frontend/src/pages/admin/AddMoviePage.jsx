import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {ActorService} from "../../services/actorService";
import {CityService} from "../../services/cityService";
import {CategoryService} from "../../services/categoryService";
import {DirectorService} from "../../services/directorService";
import {MovieService} from "../../services/movieService";
import {useEffect, useState} from "react";
import * as yup from "yup";
import {Form, Formik} from "formik";
import CustomTextInput from "../../utils/customFormItems/CustomTextInput";
import CustomTextArea from "../../utils/customFormItems/CustomTextArea";
import CustomSelect from "../../utils/customFormItems/CustomSelect";
import CustomCheckBox from "../../utils/customFormItems/CustomCheckBox";

export default function AddMoviePage(){
    const userFromRedux = useSelector(state => state.user.payload)

    const navigate = useNavigate();
    const actorService = new ActorService();
    const cityService = new CityService();
    const categoryService = new CategoryService();
    const directoryService = new DirectorService();
    const movieService = new MovieService();

    const [actors, setActors] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        actorService.getall().then(result=> setActors(result.data));
        cityService.getall().then(result => setCities(result.data));
        categoryService.getall().then(result => setCategories(result.data));
        directoryService.getall().then(result => setDirectors(result.data))
    }, []);

    const initValues = {

    }

    const validationSchema= yub.object({

    })

    return(
        <div>
            <div className='mt-5 p-5 container' style={{height:"100vh"}}>
                <h2 className='mt-4'>Thêm film</h2>
                <hr/>

                <h5 className='my-4'>
                    Điền đầy đủ thông tin phim và tiến hành chọn diễn viên của phim.
                </h5>

                <Formik initialValues={initValues}
                        validationSchema={validationSchema}
                        onSubmit={(values => {
                            values.userAccessToken = userFromRedux.token;

                            if(values.directorId === undefined){
                                let director = {
                                    directorName: values.directorName,
                                    token: userFromRedux.token
                                }
                                directoryService.add(director).then(result => {
                                    values.directorId = result.data.directorId
                                    movieService.addMovie(values).then(result => {
                                        if(result.data!== ""){
                                            navigate("/addMovie/" + result.data.movieId)
                                        }
                                    })
                                })
                            }else{
                                movieService.addMovie(values).then(result => {
                                    if(result.data !== ""){
                                        navigate("/addMovie/"+ result.data.movieId);
                                    }
                                })
                            }
                        })}>

                    <Form>
                        <div className='form-floating mb-3'>
                            <CustomTextInput type="text" name='movieName' class='form-control' id='floatingInput' placeholder={"Tên phim"}/>
                            <label for='floatingInput'>Tên film</label>
                        </div>
                        <div class="form-floating mb-3">
                            <CustomTextArea name='description' class="form-control" id="floatingPassword" placeholder="Tóm tắt" />
                            <label for="floatingPassword">Tóm tắt phim</label>
                        </div>
                        <div class="form-floating mb-3">
                            <CustomTextInput name='duration' type="number" class="form-control" id="duration" placeholder="Thời lượng" />
                            <label for="duration">Thời lượng phim</label>
                        </div>
                        <div class="form-floating mb-3">
                            <CustomTextInput name='releaseDate' type="date" class="form-control" id="releaseDate" placeholder="Ngày khởi chiếu" />
                            <label for="releaseDate">Ngày khởi chiếu</label>
                        </div>

                        <div class="form-floating mb-3">
                            <CustomTextInput name='trailerUrl' type="text" class="form-control" id="trailerUrl" placeholder="URL trailer" />
                            <label for="trailerUrl">URL trailer</label>
                        </div>

                        <div class="form-floating mb-3">
                                <CustomSelect
                                    id="categoryId"
                                    className="form-select form-select-lg mb-3"
                                    name="categoryId"
                                    options={categories.map(category => (
                                        {key: category?.categoryId, text: category?.categoryName, value: category?.categoryName}
                                    ))}
                                />
                                <label for="categoryId">Thể loại</label>
                        </div>
                        <div class="form-floating mb-3">
                            <CustomSelect
                                    id="directorId"
                                    className="form-select form-select-lg mb-3"
                                    name="directorId"
                                    options={directors.map(director => (
                                        {key: director?.directorId, text: director?.directorName, value: director?.directorName}
                                    ))}
                                />
                            <label for="directorId">Đạo diễn</label>
                        </div>

                            <p>Nếu đạo diễn không có trong danh sách trên, vui lòng nhập vào đây.</p>
                            <div class="form-floating mb-3">
                                <CustomTextInput name='directorName' type="text" class="form-control" id="directorName" placeholder="Tên đạo diễn" />
                                <label for="directorName">Tên đạo diễn</label>
                            </div>

                            <div class="form-check mb-3 text-start">
                                <CustomCheckBox name="isInVision" class="form-check-input" type="checkbox" id="isInVision" />
                                <label class="form-check-label" for="isInVision">
                                    Phim đang chiếu rạp?
                                </label>
                            </div>

                            {/* Sau này sẽ thêm chức năng tải lên tệp */}
                            {/* <div class="input-group mb-3">
    <input type="file" class="form-control" id="image" />
</div> */}

                            <div className="d-grid gap-2 my-4 col-6 mx-auto">
                                <input
                                    type="submit"
                                    value="Tiếp theo"
                                    className="btn btn-block btn-primary"
                                />
                            </div>
                        </Form>
                    </Formik>
                </div>
        </div>
    )
}