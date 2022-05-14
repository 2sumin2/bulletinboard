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
    const onClick = () => {
        if (window.confirm(`'${name}'계정을 삭제하시겠습니까?`)) {
            console.log('ok');
        }
    };
    return (
        <tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{email}</Td>
            <Td>{company}</Td>
            <Td><button onClick={onClick}>Delete</button></Td>
        </tr>
    );
};

export default User;