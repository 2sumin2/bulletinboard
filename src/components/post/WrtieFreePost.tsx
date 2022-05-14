import { Link, useNavigate } from "react-router-dom";
import { Btn, ItemBox, WriteBox, Span, Input, Content } from "../board/BulletinBoard";
import Nav from "../Nav";
import { useEffect } from "react";

function WriteFreeBoard() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) {

            navigate('/notfound');
        }
    }, []);
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
