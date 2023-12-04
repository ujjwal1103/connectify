import { Outlet } from "react-router-dom"
import PageNotFound from "../PageNotFound/PageNotFound";

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    return user?.token ? <Outlet /> : <PageNotFound />
}

export default ProtectedRoute