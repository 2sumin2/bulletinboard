import { Link } from "react-router-dom";
import { Btn, ItemBox, WriteBox, Span, Input, Content } from "./BulletinBoard";
import Nav from "./Nav";

function WriteFreeBoard() {
    return (
        <>
            <Nav />
            <WriteBox>
                <ItemBox>
                    <Span>Title</Span>
                    <Input></Input>
                </ItemBox>
                <Content></Content>
            </WriteBox>
            <Btn><Link to="/freeboard">작성완료</Link></Btn>
        </>
    );
};

export default WriteFreeBoard;
