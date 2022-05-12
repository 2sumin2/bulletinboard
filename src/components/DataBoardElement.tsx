import moment from 'moment';
import { gql, useQuery } from "@apollo/client";

interface IDataBoardElement {
    id: number;
    classification: string;
    title: string;
    authorId: number;
    deadLine: number;
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

function DataBoardElement({ id, classification, title, authorId, deadLine, content, attachedFile, createAt, updateAt }: IDataBoardElement) {
    const newDate = new Date().setTime(createAt);
    const date = moment(newDate).format("YYYY-MM-DD");
    const { data, loading, error } = useQuery(SEARCH_USER_QUERY, {
        variables: {
            id: authorId
        },
    });
    console.log(data, loading, error);
    return (
        <tr>
            <td>{id}</td>
            <td>{classification}</td>
            <td>{title}</td>
            <td>{data?.searchUser?.name}</td>
            <td>{date}</td>
        </tr>
    );
};

export default DataBoardElement;