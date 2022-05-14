import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

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
const SEARCH_USER_COMPANY_QUERY = gql`
    query searchUserCompany($company: String!) {
        searchUserCompany(company: $company) {
            id
        }
    }
`;

function Company({ id, name }: ICompany) {
    const { data } = useQuery(SEARCH_USER_COMPANY_QUERY, {
        variables: {
            company: name
        },
    });
    const onClick = () => {
        if (window.confirm(`${name} 을 삭제하시겠습니까?`)) {
            console.log('ok');
        }
    };
    return (
        <tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{data?.searchUserCompany?.length}</Td>
            <Td><button onClick={onClick}>Delete</button></Td>
        </tr>
    );
};

export default Company;