import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { TableBox, Table, BoardTitle } from "../board/BulletinBoard";
import Nav from "../Nav";
import User from "./User";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const SEE_USERS_QUERY = gql`
  query seeUsers {
    seeUsers {
        id
        name
        email
        company
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

function UserManager() {
    const { data, loading, error } = useQuery(SEE_USERS_QUERY);
    var number = 1;
    const userlist = data?.seeUsers.slice(1);
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
    return (
        <>
            <Nav />
            <NewBoardTitle>User Management</NewBoardTitle>
            <NewTableBox>
                <Table>
                    <tbody>
                        <tr>
                            <NewTh width={"10%"}>No.</NewTh>
                            <NewTh width={"20%"}>Name</NewTh>
                            <NewTh width={"30%"}>Email</NewTh>
                            <NewTh width={"25%"}>Company</NewTh>
                            <NewTh width={"15%"}>Delete</NewTh>
                        </tr>
                        {!loading && !error && userlist.map((user: any) => (
                            <User
                                key={user.id}
                                id={user.id}
                                order={number++}
                                name={user.name}
                                email={user.email}
                                company={user.company}
                            />
                        ))}
                    </tbody>
                </Table>
            </NewTableBox>
        </>

    );
}
export default UserManager;