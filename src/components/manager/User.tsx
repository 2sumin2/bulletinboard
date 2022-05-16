import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from "@apollo/client";

interface IUser {
    id: number;
    order: number;
    name: string;
    email: string;
    company: string;
}

const Td = styled.td`
    border:1px solid black;
    border: 1px solid black;
    width:${props => props.width};
    padding: 4px;
`;

const DELETE_USER_MUTATION = gql`
    mutation deleteUser($id:Int!){
        deleteUser(id:$id) {
            ok
            error
        }
    }
`;
function User({ order, id, name, email, company }: IUser) {
    const onCompleted = (data: any) => {
        console.log(data);
        const {
            deleteUser: { ok, error },
        } = data;
        if (error) {
            alert(error);
        }
        window.location.reload();
    };
    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        onCompleted
    });
    const onClick = () => {
        if (window.confirm(`'${name}'계정을 삭제하시겠습니까?`)) {
            deleteUser({
                variables: { id }
            });

        };
    };
    return (
        <tr>
            <Td>{order}</Td>
            <Td>{name}</Td>
            <Td>{email}</Td>
            <Td>{company}</Td>
            <Td><button onClick={onClick}>Delete</button></Td>
        </tr>
    );
};

export default User;