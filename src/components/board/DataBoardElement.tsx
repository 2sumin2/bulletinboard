import moment from 'moment';
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';

interface IDataBoardElement {
    key: number;
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
        id      
        name
        company    
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
    const { data: me } = useQuery(ME_QUERY, {
        variables: {
            token
        },
    });
    const newDate = new Date().setTime(createAt);
    const date = moment(newDate).format("YYYY-MM-DD");
    const { data: author } = useQuery(SEARCH_USER_QUERY, {
        variables: {
            id: authorId
        },
    });
    const authorName = author?.searchUser?.name;
    const authorCompany = author?.searchUser?.company;
    const [url, setUrl] = useState("/board");
    useEffect(() => {
        if (me.me.id === authorId) {
            setUrl("/postpower");
        }
        else {
            setUrl("/postgeneral");
            //setUrl("/postpower");
        }
    }, []);
    return (
        <tr>
            <td><Link to={url} state={{ classification, title, authorName, authorCompany, deadline, content, attachedFile }}>{id}</Link></td>
            <td><Link to={url} state={{ classification, title, authorName, authorCompany, deadline, content, attachedFile }}>{classification}</Link></td>
            <td><Link to={url} state={{ classification, title, authorName, authorCompany, deadline, content, attachedFile }}>{title}</Link></td>
            <td><Link to={url} state={{ classification, title, authorName, authorCompany, deadline, content, attachedFile }}>{authorName}</Link></td>
            <td><Link to={url} state={{ classification, title, authorName, authorCompany, deadline, content, attachedFile }}>{date}</Link></td>
        </tr>
    );
};

export default DataBoardElement;