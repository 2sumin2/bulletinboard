import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataBoard from "./screens/DataBoard";
import FreeBoard from "./screens/FreeBoard";
import WriteDataBoard from "./screens/WriteDataBoard";
import WriteFreeBoard from "./screens/WriteFreeBoard";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Board from "./components/Board";


function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/board" element={<Board />} />
                <Route path="/writeondataboard" element={<WriteDataBoard />} />
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