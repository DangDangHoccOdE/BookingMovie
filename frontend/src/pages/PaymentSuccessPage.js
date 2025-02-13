export default function PaymentSuccessPage(){
    return(
        <div>
            <div className='mt-5 p-5 container' style={{height: '100vh'}}>
                <h2 className='mt-4'>Giao dịch thanh toán thành công</h2>
                <hr/>
                <h5 className='mt-4'>BookingMovie cảm ơn bạn đã lựa chọn.
                    Giao dịch thanh toán của bạn đã được hoàn tất. Thông tin chi tiết về vé đã được gửi đến địa chỉ email của bạn.
                </h5>

                <h5 className='pt-3'>
                    Với tư cách là Gia đình BookingMovie, chúng tôi chúc bạn có thời gian vui vẻ.
                </h5>
            </div>
        </div>
    )
}