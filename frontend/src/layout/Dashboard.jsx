import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";
import ProtectedRoute from "../utils/utilPages/ProtectedRoute";
import ErrorPage from "../utils/utilPages/ErrorPage";
import AddMoviePage from "../pages/admin/AddMoviePage";
import React from "react";
import AddActorsAndCityToMovie from "../pages/admin/AddActorsAndCityToMovie";
import BuyTicketPage from "../pages/BuyTicketPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";

export default function Dashboard(){
    const userFromRedux = useSelector(state => state?.user?.payload)

    return(
        <div>
            <Routes>
                <Route path={"/"} element={<MainPage/>} />
                <Route path={"/movie/:movieId"} element={<DetailPage/>} />
                <Route path={"movie/:movieId/buyTicket"}  element={<BuyTicketPage/>} />
                <Route path={"/paymentSuccess"}  element={<PaymentSuccessPage/>} />

                <Route path="/addMovie"  element={
                    <ProtectedRoute user={userFromRedux?.roles[0]}>
                        <AddMoviePage/>
                    </ProtectedRoute>
                } />

                <Route path="/addMovie/:movieId"  element={
                    <ProtectedRoute user={userFromRedux?.roles[0]}>
                        <AddActorsAndCityToMovie/>
                    </ProtectedRoute>
                } />

                <Route path='*' element={<ErrorPage />} />

            </Routes>
        </div>
    )
}