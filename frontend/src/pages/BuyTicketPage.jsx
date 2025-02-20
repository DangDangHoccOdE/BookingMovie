import {useNavigate} from "react-router-dom";
import {PaymentService} from "../services/paymentService";
import {useState} from "react";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {Form, Formik} from "formik";
import CustomTextInput from "../utils/customFormItems/CustomTextInput";
import Cleave from "cleave.js";

export default function BuyTicketPage(){
    const navigate = useNavigate();
    const paymentService = new PaymentService();
    const [ticketItem, setTicketItem] = useState('ticketSection');
    const [adultTicketNumber, setAdultTicketNumber] = useState(0);
    const [studentTicketNumber, setStudentTicketNumber] = useState(0);
    const [chairNumber, setChairNumber] = useState(studentTicketNumber + adultTicketNumber)
    const [chairNumberList, setChairNumberList] = useState([]);

    const movieState = useSelector(state => state.movie.payload);

    function checkChairIsEmpty(elementId){
        let classname = document.getElementById(elementId).className;
        if(classname === "taken"){
            return false;
        }
        return true;
    }

    function selectChair(elementId){
        let item = document.getElementById(elementId);
        if(checkChairIsEmpty(elementId) && chairNumber >0){
            item.style.background = "#ff6a00";
            item.className = 'taken';
            setChairNumberList([...chairNumberList,elementId]);
            setChairNumber(chairNumber - 1);
        }else{
            if(item.className === 'taken'){
                item.removeAttribute('style');
                item.className = 'empty';
                let list = chairNumberList.filter(item => item !== elementId);
                setChairNumberList(list);
                setChairNumber(chairNumber + 1);
            }
        }
    }

    return (
        <div className='ticket-page'>
            <div className='row justify-content-center align-item-start'>
                <div className='ticket-page-bg-img col-sm-12 col-md-4 text-light'>
                    <div className='mt-5 pt-5'>
                        <h3 className='mt-2'>{movieState?.movieName}</h3>
                        <img className='img-thumbnail w-50 mx-auto mt-5' src={movieState?.imageUrl} alt={movieState?.movieName || "Movie poster"}/>
                        <h5 className='pt-5'><i className='fa-solid fa-location-dot'></i>{movieState?.saloonName} </h5>
                        <h5 className='py-2'><i className='fa-solid fa-calendar-days'></i>{movieState?.movieDay} </h5>
                        <h5><i className='fa-regular fa-clock'></i>{movieState?.movieTime}</h5>
                    </div>
                </div>

                {/* for css ::after property */}
                <style dangerouslySetInnerHTML={{
                    __html: [
                        '.ticket-page-bg-img:after {',
                        '  content: " ";',
                        '  position: absolute;',
                        'z-index: -1;',
                        'inset: 0;',
                        `background-image: url(${movieState?.imageUrl});`,
                        'background-repeat: no-repeat;',
                        'background-size: cover;',
                        'background-position: top center;',
                        'opacity: 0.8;',
                        'min-height: 100vh;',
                        '-webkit-filter: blur(8px) saturate(1);',
                        '}'
                    ].join('\n')
                }}>
                </style>

                <div className='col-sm-12 col-md-8 pt-5'>
                    <div className='container pt-5'>
                        <div className='accordion accordion-flush' id='accordionPanelStayOpenExample'>
                            <div className='accorion-item'>
                                <h2 className='accordion-header' id='panelsStayOpen-headingTwo'>
                                    <div className='row pt-3 pb-1 px-4 align-items-center'>
                                        <div className='col-sm-6 text-start'>
                                            <h3>Chọn vé của bạn</h3>
                                        </div>

                                        {/* Select ticket*/}
                                        <div className='col-sm-6 mb-2 text-end'>
                                            {ticketItem === 'ticketSection' ?
                                                <button className='btn btn-dark'
                                                    data-bs-toggle='collapse'
                                                    data-bs-target='#panelStayOpen-collapseTwo'
                                                    onClick={() => {
                                                        if(studentTicketNumber === 0 && adultTicketNumber === 0 ){
                                                            toast.warning("Vui lòng chọn vé để tiếp tục",{
                                                                theme:"dark",
                                                                position:'top-center'
                                                            })
                                                        }else{
                                                            setTicketItem('placeSection')
                                                            setChairNumber(studentTicketNumber +adultTicketNumber)
                                                        }
                                                    }}>Tiếp tục</button>
                                                :
                                                <button className='btn btn-outline-dark'
                                                    data-bs-toggle='collapse'
                                                    data-bs-target='#panelsStayOpen-collapseOne' aria-expanded='true' aria-controls="panelsStayOpen-collapseOne"
                                                    onClick={() => setTicketItem("ticketSection")}>
                                                    Thay đổi
                                                </button> }
                                        </div>
                                    </div>
                                </h2>

                                {ticketItem === 'ticketSection' ?(
                                    <div id='panelsStayOpen-collapseOne' className='accordion-collapse collapse show' aria-labelledby='panelsSatyOpen-headingOne'>
                                        <div className='accordion-body'>
                                            <section>
                                                <div className='row'>
                                                    <div className='col-sm-6 text-start'>
                                                        <p>Sau khi chọn Phim và Phiên, bạn phải chọn loại vé.
                                                            Nếu là sinh viên, bạn đừng quên mang theo CMND.</p>
                                                    </div>
                                                </div>

                                                <div className='row mt-3 px-2 border border-2 align-items-center'>
                                                    <div className='col-sm-6 text-uppercase border-end'>
                                                        Đầy
                                                    </div>
                                                    <div className='col-sm-3 border-end'>
                                                        Giá 25$
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className='row justify-content-center align-item-center'>
                                                            <div className='col-sm-4'>
                                                                <button className='btn btn-dark' onClick={() => {
                                                                    if (adultTicketNumber > 0) {
                                                                        setAdultTicketNumber(adultTicketNumber - 1);
                                                                    }
                                                                }
                                                                }><i className='fa-solid fa-minus'></i>
                                                                </button>
                                                            </div>
                                                            <div className='col-sm-4'>
                                                                {adultTicketNumber}
                                                            </div>
                                                            <div className='col-sm-4 py-2'>
                                                                <button className='btn btn-dark' onClick={() =>
                                                                    setAdultTicketNumber(adultTicketNumber + 1)}>
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='row mt-1 px-2 border border-2 align-items-center'>
                                                    <div className='col-sm-6 text-uppercase border-end'>
                                                        Học sinh
                                                    </div>
                                                    <div className='col-sm-3 border-end'>
                                                        15$
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className='row justify-content-center align-items-center'>
                                                            <div className='col-sm-4'>
                                                                <button className='btn btn-dark'
                                                                        onClick={() => {
                                                                            if (studentTicketNumber > 0) {
                                                                                setStudentTicketNumber(studentTicketNumber - 1)
                                                                            }
                                                                        }}>
                                                                    <i className='fa-solid fa-minus'></i>
                                                                </button>
                                                            </div>
                                                            <div className='col-sm-4'>
                                                                {studentTicketNumber}
                                                            </div>
                                                            <div className='col-sm-4 py-2'>
                                                                <button className='btn btn-dark'
                                                                        onClick={() => setStudentTicketNumber(studentTicketNumber + 1)}>
                                                                    <i className="fa-solid fa-plus"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className='lead text-end mt-3 me-5'>Tổng số tiền: <strong>{(studentTicketNumber * 15.00 + adultTicketNumber * 25.00).toFixed(2)} ₺ </strong>
                                                </p>

                                            </section>
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* Place Section */}
                            <div className='accordion-item'>
                                <h2 className='accordion-header' id='panelsStayOpen-headingTwo'>
                                    <div className='col-sm-6 text-start'>
                                        Chọn chỗ ngồi
                                    </div>
                                    <div className='col-sm-6 mb-2 text-end'>
                                        {ticketItem === "placeSection" ?
                                            <button className='btn btn-dark' data-bs-toggle='collapse'
                                                    data-bs-target='#panelsStayOpen-collapseThree'
                                                    aria-expanded='false' aria-controls='panelsStayOpen-collapseThree'
                                                    onClick={() => {
                                                        if(chairNumber !== 0){
                                                            toast.warning('Vui lòng chọn tối đa số lượng vé!',{
                                                                theme: 'dark',
                                                                position: "top-center"
                                                            })
                                                        }else{
                                                            setTicketItem("paySection")
                                                        }
                                                    }}>Tiếp tục</button>
                                            :
                                            <button className='btn btn-outline-dark' data-bs-toggle='collapse'
                                                    data-bs-target='#panelsStayOpen-collapseTwo'
                                                    aria-expanded='false' aria-controls='panelsStayOpen-collapseTwo'
                                                    onClick={()=>{
                                                        setTicketItem('placeSection')
                                                    }
                                                    }>Thay đổi</button>
                                        }
                                    </div>
                                </h2>

                                    <div id='panelsStayOpen-collapseTwo' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingTwo'>
                                        <div className='accorion-body'>
                                            {ticketItem === 'placeSection' ?
                                                <table className='table'>
                                                    <tbody>
                                                    <tr>
                                                        <th scope='row'>F</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td id='F1' onClick={() => selectChair("F1")}><i
                                                            className='fa-solid fa-chair'></i></td>
                                                        <td id='F2' onClick={() => selectChair("F2")}><i
                                                            className='fa-solid fa-chair'></i></td>
                                                        <td id='F3' onClick={() => selectChair("F3")}><i
                                                            className='fa-solid fa-chair'></i></td>
                                                        <td id='F4' onClick={() => selectChair("F4")}><i
                                                            className='fa-solid fa-chair'></i></td>
                                                        <td id='F5' onClick={() => selectChair("F4")}><i
                                                            className='fa-solid fa-chair'></i></td>
                                                        <td id='F6' onClick={() => selectChair("F4")}><i
                                                            className='fa-solid fa-chair'></i></td>
                                                        <td id='F7' onClick={() => selectChair("F4")}><i
                                                            className='fa-solid fa-chair'></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th>E</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td id="E1" onClick={() => selectChair("E1")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="E2" onClick={() => selectChair("E2")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="E3" onClick={() => selectChair("E3")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="E4" onClick={() => selectChair("E4")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="E5" onClick={() => selectChair("E5")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="E6" onClick={() => selectChair("E6")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th>D</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td id="D1" onClick={() => selectChair("D1")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="D2" onClick={() => selectChair("D2")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="D3" onClick={() => selectChair("D3")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="D4" onClick={() => selectChair("D4")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="D5" onClick={() => selectChair("D5")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="D6" onClick={() => selectChair("D6")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th>C</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td id="C1" onClick={() => selectChair("C1")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="C2" onClick={() => selectChair("C2")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="C3" onClick={() => selectChair("C3")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="C4" onClick={() => selectChair("C4")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="C5" onClick={() => selectChair("C5")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="C6" onClick={() => selectChair("C6")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">B</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td id="B1" onClick={() => selectChair("B1")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="B2" onClick={() => selectChair("B2")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="B3" onClick={() => selectChair("B3")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="B4" onClick={() => selectChair("B4")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="B5" onClick={() => selectChair("B5")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="B6" onClick={() => selectChair("B6")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="B7" onClick={() => selectChair("B7")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="B8" onClick={() => selectChair("B8")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">A</th>
                                                        <td></td>
                                                        <td></td>
                                                        <td id="A1" onClick={() => selectChair("A1")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="A2" onClick={() => selectChair("A2")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="A3" onClick={() => selectChair("A3")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="A4" onClick={() => selectChair("A4")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="A5" onClick={() => selectChair("A5")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="A6" onClick={() => selectChair("A6")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="A7" onClick={() => selectChair("A7")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                        <td id="A8" onClick={() => selectChair("A8")}><i
                                                            className="fa-solid fa-chair"></i></td>
                                                    </tr>
                                                    </tbody>
                                                </table> : null }
                                                {ticketItem === "placeSection" ? (
                                                    <div>
                                                        <p className="pt-2">Trước</p>
                                                        <hr style={{height:"4px", color:"black"}}/>
                                                    </div>
                                                ): null
                                            }
                                        </div>
                                    </div>
                            </div>

                            {/* Pay Section */}
                            <div className='accordion-item'>
                                <h2 className='accordion-header' id='panelsStayOpen-headingThree'>
                                    <div className='row pt-3 pb-1 px-4 align-items-center'>
                                        <div className='col-sm-6 text-start'>
                                            Giá tiền:
                                        </div>
                                        <div className='col-sm-6 mb-2 text-end'>
                                            {ticketItem === 'paySection' ?
                                                <h3>Tổng cộng: {(studentTicketNumber * 15.00 + adultTicketNumber * 25.00).toFixed(2)} $</h3>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </h2>

                                <div id='panelsStayOpen-collapseThree' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingThree'>
                                    {ticketItem === 'paySection' ?
                                    <div className='accordion-body'>
                                        <Formik initialValues={{}} onSubmit={(values) => {
                                            let result = ""
                                            chairNumberList.map(item => result = result + " " + item);

                                            values.chairNumbers = result;
                                            values.movieName = movieState?.movieName;
                                            values.saloonName = movieState?.saloonName;
                                            values.movieDay = movieState?.movieDay;
                                            values.movieStartTime = movieState?.movieTime;

                                            paymentService.sendTicketDetail(values).then(result => {
                                                navigate("/paymentSuccess")
                                            })
                                        }}>
                                            <Form className='row justify-content-center align-items-start'>
                                                <div className='col-sm-12 col-md-6'>
                                                    <div className='input-group form-floating has-validation mb-3'>
                                                        <CustomTextInput name="fullName" type="text" class='form-control' id='fullName' placeholder="Nhập họ tên" required></CustomTextInput>
                                                        <label for='fullName'>Nhập họ và tên</label>
                                                    </div>
                                                    <div className='form-floating mb-3'>
                                                        <CustomTextInput name='email' type='email' class='form-control' id='email' placeholder='Email' required></CustomTextInput>
                                                        <label for='Email'>Email</label>
                                                    </div>
                                                    <div className='form-floating mb-3'>
                                                        <CustomTextInput name='phone' type='tel'  pattern="[0]{1} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}" class="form-control" id="phone" placeholder="0 5** *** ** **" required/>
                                                        <label for="phone">Telephone - 0 5** *** ** **</label>
                                                    </div>
                                                </div>

                                                <div className='col-sm-12 col-md-6 mb-3'>
                                                    <div className="form-floating mb-3">
                                                        <Cleave class="form-control" id="floatingCardNumber" placeholder='Số thẻ tín dụng' required
                                                                options={{creditCard:true}} />
                                                        <label for="floatingCardNumber">Số thẻ tín dụng</label>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-6'>
                                                            <div className="form-floating mb-3">
                                                                <Cleave type="text" class="form-control" id="floatingCardLastDate" placeholder='Thời hạn' required
                                                                        options={{date:true, datePattern: ['m','y']}} />
                                                                <label form="floatingCardLastDate">Thời hạn</label>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-6'>
                                                            <div className="form-floating mb-3">
                                                                <input type="text" className="form-control"  maxLength="3" size="3"  id="floatingSecurityNumber" placeholder="CCV" required/>
                                                                <label form="floatingSecurityNumber">CCV</label>
                                                            </div>
                                                        </div>
                                                        <p className='text-start'> <input className="form-check-input me-3" type="checkbox" value="" aria-label="Checkbox for following text input" required/>Điều kiện thông tin sơ bộ và
                                                            Tôi đã đọc và chấp nhận Thỏa thuận bán hàng từ xa.
                                                        </p>
                                                    </div>
                                                </div>

                                                <hr />
                                                <div className='text-end mt-1'>
                                                    <button type='submit' className='btn btn-dark col-3'>Ödeme</button>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                        : null}
                                </div>
                            </div>
                        </div>



                    </div>
                </div>


            </div>

            <ToastContainer />
        </div>
    )
}