import { Link } from "react-router-dom";
import { BoardTitle, Table, TableBox, Th, Btn } from "./BulletinBoard";
import Nav from "../Nav";
import DataBoardElement from "./DataBoardElement";
import { gql, useQuery } from "@apollo/client";

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
        createAt 
        updateAt 
        }
  }
`;

function DataBoard() {
    const { data, loading, error } = useQuery(SEE_LIST_QUERY);
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