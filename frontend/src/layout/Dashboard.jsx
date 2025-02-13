import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";
import ProtectedRoute from "../utils/utilPages/ProtectedRoute";
import ErrorPage from "../utils/utilPages/CustomCheckBox";

export default function Dashboard(){
    const userFromRedux = useSelector(state => state?.user?.payload)

    return(
        <div>
            <Routes>
                <Route path={"/"} element={<MainPage/>} />

                <Route path={'/movie/:movieId'} element={<DetailPage/>} />

                <Route path='*' element={<ErrorPage/>} />
            </Routes>
        </div>
    )
}