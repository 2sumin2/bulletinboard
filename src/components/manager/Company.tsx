import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ICompany {
    id: number;
    name: string;
}

const Td = styled.td`
    border:1px solid black;
    border: 1px solid black;
    width:${props => props.width};
    padding: 4px;
`;
function Company({ id, name }: ICompany) {

    return (
        <tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td><button></button></Td>
        </tr>
    );
};

export default Company;