import { Link, useNavigate } from "react-router-dom";
import { BoardTitle, Table, TableBox, Th, Btn } from "./BulletinBoard";
import Nav from "../Nav";
import { useEffect } from "react";

function FreeBoard() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) {

            navigate('/notfound');
        }
    }, []);
    return (
        <>
            <Nav />
            <BoardTitle>자유 게시판</BoardTitle>
            <TableBox>
                <Table>
                    <thead>
                        <Th width={"6%"}>No.</Th>
                        <Th width={"57%"}>Title</Th>
                        <Th width={"11%"}  >Author</Th>
                        <Th width={"16%"}>Date</Th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>자유 게시판 첫번째 글</td>
                            <td>신짱구</td>
                            <td>2022-04-19</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>자유 게시판 두번째 글</td>
                            <td>신짱구</td>
                            <td>2022-04-19</td>
                        </tr>
                    </tbody>
                </Table>
            </TableBox>
            <Link to="/writeonfreeboard"><Btn>글쓰기</Btn></Link>

        </>
    );
}

export default FreeBoard;