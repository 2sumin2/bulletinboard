import moment from 'moment';
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IDataBoardElement {
    key: number;
    id: number;
    order: number;
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

const Orange = styled.td`
    color:#ff9900;

`;
const Gray = styled.td`
    opacity: 50%;

`;

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

function DataBoardElement({ order, id, classification, title, authorId, deadline, content, attachedFile, attachedFileUrl, createAt, updateAt }: IDataBoardElement) {
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
    const [color, setColor] = useState(true);
    useEffect(() => {
        if ((me.me.id === 0) || (me.me.id === authorId)) {
            setUrl("/postpower");
        }
        else {
            setUrl("/postgeneral");
            //setUrl("/postpower");
        }
        if (classification === "자료수집중") {
            setColor(true);
        } else {
            setColor(false);
        }
    }, []);
    return (
        <tr>
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{order}</Link></td>
            {color ?
                <Orange><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{classification}</Link></Orange> :
                <Gray><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{classification}</Link></Gray>
            }
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{title}</Link></td>
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{authorName}</Link></td>
            <td><Link to={url} state={{ id, classification, title, authorId, authorName, authorCompany, deadline, content, attachedFile, attachedFileUrl }}>{UpdatedDate}</Link></td>
        </tr>
    );
};

export default DataBoardElement;