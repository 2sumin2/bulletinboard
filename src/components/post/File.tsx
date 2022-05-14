import styled from "styled-components";
import { ItemBox, Span } from "../board/BulletinBoard";


const FileBox = styled(ItemBox)`
    padding:30px 40px 10px 20px;
    display:grid;
    grid-template-columns: 3fr 2fr 30px;
`;

const FileItem = styled.span`
    text-align: center;
`;
interface iFile {
    url: string,
    company: string
}
//⇓▼⇩

function File({ url, company }: iFile) {
    var filename = url;
    if (url) {
        const files: any[] = filename.split('-');
        filename = files[2];
    }
    console.log(url, company);
    return (
        <FileBox>
            <FileItem>{filename}</FileItem>
            <FileItem>{company}</FileItem>
            <FileItem as="a" href={url} target="_blank">📥</FileItem>
        </FileBox>
    );
}

export default File;