import React from "react";

export default function Footer(){
    return(
        <div>
            <footer className="py-5 bg-black">
                <div className="container px-5">
                    <div className="row justify-content-evenly align-center">
                        <div className="col">
                            <p className='m-1 lead text-center text-white'>Đang chiếu</p>
                            <p className='m-1 lead text-center text-white'>Sắp chiếu</p>
                            <p className='m-1 lead text-center text-white'>Rạp chiếu phim</p>
                        </div>
                        <div className='col'>
                            <p className='m-1 lead text-center text-white'>Vé điện tử</p>
                            <p className='m-1 lead text-center text-white'>Hoàn vé</p>
                            <p className='m-1 lead text-center text-white'>Hợp đồng mua bán</p>
                        </div>
                    </div>
                    <p className='mt-5 text-center text-white small'>
                        <strong>
                            Copyright &copy, BookingMovie 2025
                        </strong>
                    </p>
                </div>
            </footer>
        </div>
    )
}