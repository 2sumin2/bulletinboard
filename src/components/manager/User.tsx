import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IUser {
    id: number;
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
function User({ id, name, email, company }: IUser) {

    return (
        <tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{email}</Td>
            <Td>{company}</Td>
            <Td><button></button></Td>
        </tr>
    );
};

export default User;