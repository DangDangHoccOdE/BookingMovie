import {UserService} from "../services/userService";
import {useDispatch} from "react-redux";
import {addUserToState, removeUserFromState} from "../store/actions/userActions";
import {toast, ToastContainer} from "react-toastify";
import {Form, Formik} from "formik";
import CustomTextInput from "../utils/customFormItems/CustomTextInput";
import {useEffect} from "react";

export default function LoginModal(){
    const userService = new UserService();

    const dispatch = useDispatch();

    function login(loginDto){
        dispatch(removeUserFromState())

        userService.login(loginDto).then(
            result => {
                if(result.status === 200){
                    dispatch(addUserToState(result.data))

                    let closeButton = document.getElementById("close-button");
                    closeButton?.click();

                    toast("Chào mừng!",{
                        theme:"colored",
                        position:"top-center"
                    })
                }
            }).catch(e => {
                toast.error("Email hoặc mật khẩu không đúng. Vui lòng thử lại",{
                    theme: "colored",
                    position: "top-center"
                })
        }
        )
    }

    return (
        <div>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header login-modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Đăng nhập</h5>
                            <button id='close-button' type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <Formik
                            initialValues={{}}
                            onSubmit={(value) => {
                                login(value);
                            }}>
                            <Form>
                                <div className="modal-body">
                                    <div className="form-floating mb-3">
                                        <CustomTextInput id="email" type="email" name="email" class="form-control"
                                                             placeholder="Email" required/>
                                        <label htmlFor="floatingInput">Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <CustomTextInput id="password" type="password" name="password"
                                                             class="form-control" placeholder="Mật khẩu" required/>
                                        <label htmlFor="floatingPassword">Mật khẩu</label>
                                    </div>
                                    <p className='ps-2 text-start'>
                                        Bạn chưa có tài khoản CineVision?
                                        <a href='!#' style={{color: "black"}}
                                           data-bs-toggle="modal" data-bs-target="#registerModal"> Đăng ký ngay </a>
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary login-modal-btn">Đăng nhập</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>

    )
}