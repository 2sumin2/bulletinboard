import { Link } from "react-router-dom";
import { BoardTitle, Table, TableBox, Th, Btn } from "../components/BulletinBoard";
import Nav from "../components/Nav";
import DataBoardElement from "../components/DataBoardElement";
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
            <Btn><Link to="/writeondataboard">글쓰기</Link></Btn>

        </>
    );
}

export default DataBoard;