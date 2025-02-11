import React from "react";
import {useDispatch} from "react-redux";

export default function LoggedIn() {
    const dispatch = useDispatch();


    return(
        <div>
            <ul className='navbar-nav ms-auto py-4 py-lg-0'>
                <li className='nav-item'>
                    <a className='nav-link' href="#!"
                        onClick={() => dispatch(removeUserfromState())}>
                        Đăng xuất
                    </a>
                </li>
            </ul>
        </div>
    )
}