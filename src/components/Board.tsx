import { Link } from "react-router-dom";
import { Btn, ItemBox, WriteBox, Span, Input, Content } from "./BulletinBoard";
import Nav from "./Nav";
import styled from "styled-components";

const OtherWriteBox = styled(WriteBox)`
    height:65vh;
    top:15%;
`;
const RedBtn = styled(Btn)`
    background-color : #cb1726;
    top:8%;
`;
const BlueBtn = styled(Btn)`
    bottom:13%;
`;
const SpanWide = styled(Span)`
    width:100%;
`;
const OtherContent = styled(Content)`
    height: 70%;
`;
const FileBox = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    font-weight : 600;
`;
function Board() {
    return (
        <>
            <Nav />
            <OtherWriteBox>
                <ItemBox>
                    <Span>Title</Span>
                    <Input></Input>
                </ItemBox>
                <ItemBox>
                    <Span>Deadline</Span>
                    <Input></Input>
                </ItemBox>
                <OtherContent></OtherContent>
                <ItemBox><SpanWide>파일</SpanWide></ItemBox>
                <FileBox>

                </FileBox>
            </OtherWriteBox>
            <BlueBtn><Link to="/databoard">수정완료</Link></BlueBtn>
            <RedBtn>삭제</RedBtn>
        </>
    );
}
export default Board;