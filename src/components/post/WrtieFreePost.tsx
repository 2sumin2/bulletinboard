import { Link } from "react-router-dom";
import { Btn, ItemBox, WriteBox, Span, Input, Content } from "../board/BulletinBoard";
import Nav from "../Nav";

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
            <Link to="/freeboard"><Btn>작성완료</Btn></Link>
        </>
    );
};

export default WriteFreeBoard;
