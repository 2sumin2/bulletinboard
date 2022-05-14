import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { TableBox, Table, BoardTitle, Th } from "../board/BulletinBoard";
import Nav from "../Nav";
import Company from "./Company";

const NewTableBox = styled(TableBox)`
    width:65%;
    height:60vh;
    justify-content:center;
    position:fixed;
    top:20%;
    left:15%;
    tbody{
        padding:0px;
        margin:0px;
    }
`;
const NewBoardTitle = styled(BoardTitle)`
    padding-left:15%;
    text-align: left;
`;
//font-size:13px;
interface iTh {
    width: string;
}

const NewTh = styled.th<iTh>`
    border: 1px solid black;
    width:${props => props.width};
    padding: 4px;
    background-color:#8bbdff;
`;

const SEE_COMPANIES_QUERY = gql`
    query seeCompanies{
        seeCompanies {
            name
            id
        }
    }
`;

function UserManager() {
    const { data, loading, error } = useQuery(SEE_COMPANIES_QUERY);
    var number = 1;
    const companylist = data?.seeCompanies.slice(1);
    return (
        <>
            <Nav />
            <NewBoardTitle>Company Management</NewBoardTitle>
            <NewTableBox>
                <Table>
                    <tbody>
                        <tr>
                            <NewTh width={"10%"}>No.</NewTh>
                            <NewTh width={"20%"}>Company</NewTh>
                            <NewTh width={"15%"}>Delete</NewTh>
                        </tr>
                        {!loading && !error && companylist.map((company: any) => (
                            <Company
                                key={company.id}
                                id={number++}
                                name={company.name}
                            />
                        ))}
                    </tbody>
                </Table>
            </NewTableBox>
        </>

    );
}
export default UserManager;