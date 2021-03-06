import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const AddBtn = styled.button`
    background-color:#8bbdff;
    position:fixed;
    top:17%;
    right:20%;
    margin-left:10px;
`;

const SEE_COMPANIES_QUERY = gql`
    query seeCompanies{
        seeCompanies {
            name
            id
        }
    }
`;
const ME_QUERY = gql`
  query me($token: String) {
    me(token: $token) {
        id        
        }
  }
`;
const CREATE_COMPANY_MUTATION = gql`
    mutation createCompany($name:String!){
        createCompany(name:$name) {
            ok
            error
        }
    }
`;

function CompanyManager() {
    const { data, loading, error } = useQuery(SEE_COMPANIES_QUERY);
    var number = 1;
    const companylist = data?.seeCompanies;

    const navigate = useNavigate();
    const token = localStorage.getItem("TOKEN");
    const { data: me, loading: meloading } = useQuery(ME_QUERY, {
        variables: {
            token
        }
    });
    if (!meloading && me?.me.id != 0) {
        navigate('/notfound');
    };

    const onCompleted = (data: any) => {
        const {
            createCompany: { ok, error },
        } = data;
        if (error) {
            alert(error);
        }
        window.location.reload();
    };
    const [createCompany] = useMutation(CREATE_COMPANY_MUTATION, {
        onCompleted
    });

    const addCompany = () => {
        const newCompany = window.prompt('???????????? ??????????????????');
        createCompany({
            variables: { name: newCompany }
        });
    }
    return (
        <>
            <Nav />
            <NewBoardTitle>Company Management</NewBoardTitle>
            <AddBtn onClick={addCompany}>add company</AddBtn>
            <NewTableBox>
                <Table>
                    <tbody>
                        <tr>
                            <NewTh width={"10%"}>No.</NewTh>
                            <NewTh width={"20%"}>Company</NewTh>
                            <NewTh width={"15%"}>Count_User</NewTh>
                            <NewTh width={"15%"}>Delete</NewTh>
                        </tr>
                        {!loading && !error && companylist.map((company: any) => (
                            <Company
                                key={company.id}
                                order={number++}
                                id={company.id}
                                name={company.name}
                            />
                        ))}
                    </tbody>
                </Table>
            </NewTableBox>
        </>

    );
}
export default CompanyManager;