import moment from 'moment';
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';

interface IDataBoardElement {
    id: number;
    classification: string;
    title: string;
    authorId: number;
    deadline: number;
    content: string;
    attachedFile: string;
    createAt: number;
    updateAt: number;
}

const SEARCH_USER_QUERY = gql`
  query searchUser($id: Int) {
    searchUser(id: $id) {     
        name
    }
  }
`;
const ME_QUERY = gql`
  query me($token: String) {
    me(token: $token) {
        id      
        name
        email
        company
        createAt
        updateAt    
        }
  }
`;

function DataBoardElement({ id, classification, title, authorId, deadline, content, attachedFile, createAt, updateAt }: IDataBoardElement) {
    const token = localStorage.getItem("TOKEN");
    const { data: myId } = useQuery(ME_QUERY, {
        variables: {
            token
        },
    });
    const newDate = new Date().setTime(createAt);
    const date = moment(newDate).format("YYYY-MM-DD");
    const { data, loading, error } = useQuery(SEARCH_USER_QUERY, {
        variables: {
            id: authorId
        },
    });
    const [url, setUrl] = useState("/board");
    useEffect(() => {
        if (myId.me.id == authorId) {
            setUrl("/datapost");
        }
        else {
            setUrl("/board");
        }
    }, []);
    return (
        <tr>
            <td><Link to={url} state={{ title, deadline, content, attachedFile }}>{id}</Link></td>
            <td><Link to={url} state={{ title, deadline, content, attachedFile }}>{classification}</Link></td>
            <td><Link to={url} state={{ title, deadline, content, attachedFile }}>{title}</Link></td>
            <td><Link to={url} state={{ title, deadline, content, attachedFile }}>{data?.searchUser?.name}</Link></td>
            <td><Link to={url} state={{ title, deadline, content, attachedFile }}>{date}</Link></td>
        </tr>
    );
};

export default DataBoardElement;