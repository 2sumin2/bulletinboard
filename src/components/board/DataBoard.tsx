import { Link, useNavigate } from "react-router-dom";
import { BoardTitle, Table, TableBox, Th, Btn } from "./BulletinBoard";
import Nav from "../Nav";
import DataBoardElement from "./DataBoardElement";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const SEE_LIST_QUERY = gql`
  query seeList {
    seeList {
        id
        classification 
        title 
        authorId
        deadline
        content
        attachedFile
        attachedFileUrl
        createAt 
        updateAt 
        }
  }
`;

function DataBoard() {
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(SEE_LIST_QUERY);
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) {

            navigate('/notfound');
        }
    }, []);
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
                        <Th width={"15%"}>Update</Th>
                    </thead>
                    <tbody>
                        {!loading && !error && data.seeList.map((data: any) => (
                            <DataBoardElement
                                key={data.id}
                                id={data.id}
                                classification={data.classification}
                                title={data.title}
                                authorId={data.authorId}
                                deadline={data.deadline}
                                content={data.content}
                                attachedFile={data.attachedFile}
                                attachedFileUrl={data.attachedFileUrl}
                                createAt={data.createAt}
                                updateAt={data.updateAt}
                            />
                        ))}
                    </tbody>

                </Table>
            </TableBox>
            <Link to="/writeondataboard"><Btn>글쓰기</Btn></Link>
        </>
    );
}

export default DataBoard;