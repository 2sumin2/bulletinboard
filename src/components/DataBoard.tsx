import { Link } from "react-router-dom";
import { BoardTitle, Table, TableBox, Th, Btn } from "./BulletinBoard";
import Nav from "./Nav";
function DataBoard() {
    return (
        <>
            <Nav />
            <BoardTitle>자료 취합 게시판</BoardTitle>
            <TableBox>
                <Table>
                    <thead>
                        <Th width={"5%"}>No.</Th>
                        <Th width={"15%"}>Class.</Th>
                        <Th width={"55%"}>Title</Th>
                        <Th width={"10%"}  >Author</Th>
                        <Th width={"15%"}>Date</Th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>자료수집중</td>
                            <td>자료 취합 게시판 첫번째 글</td>
                            <td>신짱구</td>
                            <td>2022-04-19</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>자료수집중</td>
                            <td>자료 취합 게시판 두번째 글</td>
                            <td>신짱구</td>
                            <td>2022-04-19</td>
                        </tr>

                    </tbody>

                </Table>
            </TableBox>
            <Btn><Link to="/writeondataboard">글쓰기</Link></Btn>

        </>
    );
}

export default DataBoard;