import React from "react";

export default function LoggedOut(){
    return(
        <div>
            <ul className='navbar-nav ms-auto py-4 py-lg-0'>
                <li className='nav-item'>
                    <a className='nav-link' href="#!"
                    data-bs-toggle="modal" data-bs-target='#registerModal'>Đăng ký</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#!"
                       data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a>
                </li>

            </ul>
        </div>
    )
}