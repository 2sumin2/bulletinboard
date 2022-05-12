import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataBoard from "./components/board/DataBoard";
import FreeBoard from "./components/board/FreeBoard";
import WriteCollectionPost from "./components/post/WriteCollectionPost";
import WriteFreeBoard from "./components/post/WrtieFreePost";
import Home from "./components/Home";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import PostGeneral from "./components/post/PostGeneralUser";
import PostPowerUser from "./components/post/PostPowerUser";


function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/postpower" element={<PostPowerUser />} />
                <Route path="/postgeneral" element={<PostGeneral />} />
                <Route path="/writeondataboard" element={<WriteCollectionPost />} />
                <Route path="/writeonFreeboard" element={<WriteFreeBoard />} />
                <Route path="/freeboard" element={<FreeBoard />} />
                <Route path="/databoard" element={<DataBoard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="/account" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;