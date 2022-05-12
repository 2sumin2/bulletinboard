import moment from 'moment';
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

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

function DataBoardElement({ id, classification, title, authorId, deadline, content, attachedFile, createAt, updateAt }: IDataBoardElement) {
    const newDate = new Date().setTime(createAt);
    const date = moment(newDate).format("YYYY-MM-DD");
    const { data, loading, error } = useQuery(SEARCH_USER_QUERY, {
        variables: {
            id: authorId
        },
    });
    return (

        <tr>
            <td><Link to="/datapost" state={{ title, deadline, content, attachedFile }}>{id}</Link></td>
            <td><Link to="/datapost" state={{ title, deadline, content, attachedFile }}>{classification}</Link></td>
            <td><Link to="/datapost" state={{ title, deadline, content, attachedFile }}>{title}</Link></td>
            <td><Link to="/datapost" state={{ title, deadline, content, attachedFile }}>{data?.searchUser?.name}</Link></td>
            <td><Link to="/datapost" state={{ title, deadline, content, attachedFile }}>{date}</Link></td>
        </tr>

    );
};

export default DataBoardElement;