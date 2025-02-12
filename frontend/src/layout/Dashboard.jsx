import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";

export default function Dashboard(){
    const userFromRedux = useSelector(state => state?.user?.payload)

    return(
        <div>
            <Routes>
                <Route path={"/"} element={<MainPage/>} />
            </Routes>
        </div>
    )
}