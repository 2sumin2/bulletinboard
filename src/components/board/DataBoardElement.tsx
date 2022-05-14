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
    attachedFileUrl: string;
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

function DataBoardElement({ id, classification, title, authorId, deadline, content, attachedFile, attachedFileUrl, createAt, updateAt }: IDataBoardElement) {
    const token = localStorage.getItem("TOKEN");
    const { data: me } = useQuery(ME_QUERY, {
        variables: {
            token
        },
    });
    const newUpdatedDate = new Date().setTime(updateAt);
    const UpdatedDate = moment(newUpdatedDate).format("YYYY-MM-DD");

    const nowDate = new Date();
    var newdeadlineDate = new Date();
    newdeadlineDate.setTime(deadline);

    var classification = '';
    if (newdeadlineDate > nowDate) {
        classification = "자료수집중";
    }
    else {
        classification = "마감";
    }

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
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{id}</Link></td>
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{classification}</Link></td>
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{title}</Link></td>
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{authorName}</Link></td>
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{UpdatedDate}</Link></td>
        </tr>
    );
};

export default DataBoardElement;