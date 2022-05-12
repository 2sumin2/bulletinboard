import moment from 'moment';

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

function DataBoardElement({ id, classification, title, authorId, deadLine, content, attachedFile, createAt, updateAt }: IDataBoardElement) {
    console.log(id, classification, title, authorId, deadLine, content, attachedFile, createAt, updateAt);
    const newDate = new Date().setTime(createAt);
    const date = moment(newDate).format("YYYY-MM-DD");
    return (
        <tr>
            <td>{id}</td>
            <td>{classification}</td>
            <td>{title}</td>
            <td>신짱구</td>
            <td>{date}</td>
        </tr>
    );
};

export default DataBoardElement;