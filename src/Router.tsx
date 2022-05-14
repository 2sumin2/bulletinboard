import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataBoard from "./components/board/DataBoard";
import FreeBoard from "./components/board/FreeBoard";
import WriteCollectionPost from "./components/post/WriteCollectionPost";
import WriteFreeBoard from "./components/post/WrtieFreePost";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import PostGeneral from "./components/post/PostGeneralUser";
import PostPowerUser from "./components/post/PostPowerUser";
import UserManager from "./components/manager/UserManager";
import CompanyManager from "./components/manager/CompanyManager";


function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/usermanager" element={<UserManager />} />
                <Route path="/companymanager" element={<CompanyManager />} />
                <Route path="/postpower" element={<PostPowerUser />} />
                <Route path="/postgeneral" element={<PostGeneral />} />
                <Route path="/writeondataboard" element={<WriteCollectionPost />} />
                <Route path="/writeonFreeboard" element={<WriteFreeBoard />} />
                <Route path="/freeboard" element={<FreeBoard />} />
                <Route path="/databoard" element={<DataBoard />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="/account" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;