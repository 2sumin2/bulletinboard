import { Link } from "react-router-dom";
import { Btn, ItemBox, WriteBox, Span, Input, Content } from "./BulletinBoard";
import Nav from "./Nav";

function WriteDataBoard() {
    return (
        <>
            <Nav />
            <WriteBox>
                <ItemBox>
                    <Span>Title</Span>
                    <Input></Input>
                </ItemBox>
                <ItemBox>
                    <Span>Deadline</Span>
                    <Input></Input>
                </ItemBox>
                <Content></Content>
            </WriteBox>
            <Btn><Link to="/databoard">작성완료</Link></Btn>
        </>
    );
};

export default WriteDataBoard;
