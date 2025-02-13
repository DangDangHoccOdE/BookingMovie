import {UserService} from "../services/userService";
import {toast} from "react-toastify";
import {Form, Formik} from "formik";
import CustomTextInput from "../utils/customFormItems/CustomTextInput";

export default function RegisterModal(){
    const userService = new UserService()

    const registerCustomer = (values) =>{
        if(values.password === values.passwordAgain){
            let customer = {
                customerName: values.customerName,
                email: values.email,
                phone: values.phone,
                password: values.password
            };

            userService.addCustomer(customer).then(result => {
                if(result.status === 200){
                    document.querySelector('#loginModalLink').click();
                    toast("Tài khoản của bạn đã được tạo thành công! Vui lòng đăng nhập.",{
                        theme:"colored",
                        position:'top-center'
                    })
                }else{
                    toast.error('Mật khẩu không khớp!',{
                        theme:'colored',
                        position:'top-center'
                    })
                }
            })
        }
    }

    return (
        <div>
            <div className='modal-fade' id='registerModal' tabIndex='-1' aria-labelledby='registerModalLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header login-modal-header'>
                            <h5 className='modal-title' id='registerModalLabel'>Đăng ký</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal'
                                    aria-labelledby="Close"></button>
                        </div>
                        <Formik initialValues={{}} onSubmit={(values) =>
                            registerCustomer(values)}>
                            <Form>
                                <div className='modal-body'>
                                    <div className='form-floating mb-3'>
                                        <CustomTextInput type='text' name='customerName' classname='form-control'
                                                         id='customerName' placeholder="Tên họ"
                                                         required></CustomTextInput>
                                        <label form='customerName'>Tên - Họ</label>
                                    </div>
                                    <div className='form-floating mb-3'>
                                        <CustomTextInput type='email' name='email' classname='form-control'
                                                         id='email' placeholder="Email"
                                                         required></CustomTextInput>
                                        <label form='email'>Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <CustomTextInput type="tel" name="phone" className="form-control" id="phone"
                                                         placeholder='Telephone'
                                                         pattern="[0]{1} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
                                                         required/>
                                        <label htmlFor="phone">Telephone - 0 5** *** ** **</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <CustomTextInput type="password" name="password" className="form-control"
                                                             id="password" placeholder='Şifre' required/>
                                        <label form="password">Mật khẩu</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <CustomTextInput type="password" name="passwordAgain"
                                                             className="form-control" id="passwordAgain"
                                                             placeholder='Nhập lại mật khẩu' required/>
                                        <label form="passwordAgain">Nhập lại mật khẩu</label>
                                    </div>
                                    <p className='ps-2 text-start'>
                                        Bạn đã có tài khoản
                                        <a href='!#' id="loginModalLink" style={{color: "black"}}
                                           data-bs-toggle="modal" data-bs-target="#loginModal"> Đăng nhập </a>
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary login-modal-btn">Đăng ký</button>
                                </div>
                            </Form>
                     </Formik>
                </div>
                </div>
            </div>
        </div>
)
}