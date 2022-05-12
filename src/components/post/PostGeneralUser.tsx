import { Btn, ItemBox, WriteBox, ItemBoxAnother, Span, Input, Content } from "../board/BulletinBoard";
import Nav from "../Nav";
import styled from "styled-components";
import React, { useRef } from "react";

function PostGeneralUser() {
    const fileRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        fileRef.current?.click();
    };
    return (
        <>
            <Nav />
            <WriteBox>
                <ItemBox>
                    <Span>Title</Span>
                    <Input disabled></Input>
                </ItemBox>
                <ItemBox>
                    <Span>Deadline</Span>
                    <Input type="date" disabled></Input>
                    <Span>Classification</Span>
                    <Input disabled></Input>
                    <Span>Author</Span>
                    <Input disabled></Input>
                </ItemBox>
                <Content disabled></Content>
                <ItemBoxAnother>
                    <Span>첨부파일</Span>
                    <Input type="file" name="file" disabled>
                    </Input>
                </ItemBoxAnother>
            </WriteBox>
            <React.Fragment>
                <input
                    ref={fileRef}
                    type="file"
                    style={{ display: "none" }}
                />
                <Btn onClick={onClick}>파일 업로드</Btn>
            </React.Fragment>
        </>
    );
}
export default PostGeneralUser;