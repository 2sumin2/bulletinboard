import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataBoard from "./components/DataBoard";
import FreeBoard from "./components/FreeBoard";
import WriteDataBoard from "./components/WriteDataBoard";
import WriteFreeBoard from "./components/WriteFreeBoard";
import Home from "./components/Home";
import Login from "./components/Login";
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
            </Routes>
        </BrowserRouter>
    );
}
export default Router;