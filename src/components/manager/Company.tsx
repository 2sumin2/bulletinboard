import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";

interface ICompany {
    id: number;
    order: number;
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
const DELETE_COMPANY_MUTATION = gql`
    mutation deleteCompany($id:Int!){
        deleteCompany(id:$id) {
            ok
            error
        }
    }
`;

function Company({ order, id, name }: ICompany) {
    const { data } = useQuery(SEARCH_USER_COMPANY_QUERY, {
        variables: {
            company: name
        },
    });
    const onCompleted = (data: any) => {
        console.log(data);
        const {
            deleteCompany: { ok, error },
        } = data;
        if (!ok) {
            alert(error);
        }
        if (ok) {
            window.location.reload();
        }
    };
    const [deleteCompany] = useMutation(DELETE_COMPANY_MUTATION, {
        onCompleted
    });
    const onClick = () => {
        if (data?.searchUserCompany?.length) {
            alert('삭제할 수 없는 항목입니다.');
        }
        else if (window.confirm(`'${name}'을 삭제하시겠습니까?`)) {
            deleteCompany({
                variables: { id }
            });

        };
    };
    return (
        <tr>
            <Td>{order}</Td>
            <Td>{name}</Td>
            <Td>{data?.searchUserCompany?.length}</Td>
            <Td><button onClick={onClick}>Delete</button></Td>
        </tr>
    );
};

export default Company;