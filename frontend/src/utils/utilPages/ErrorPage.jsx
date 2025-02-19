import {Link} from "react-router-dom";

export default function ErrorPage() {
    return(
        <div className='d-flex container justify-content-center align-items-center text-center' style={{height:"75vh"}}>

            <main>
                <h1>Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm</h1>
                <h3>404 - Không tìm thấy trang</h3>
                <div className='container mt-4'>
                    <div className='col-sm-12 text-center'>
                        <Link to="/">
                            <button className='btn btn-primary'>Quay lại trang chủ
                                <i className='fa-solid fa-house'></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}