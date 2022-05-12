import { Btn, ItemBox, WriteBox, ItemBoxAnother, Span, Input, Content } from "../board/BulletinBoard";
import { useLocation } from "react-router-dom";
import Nav from "../Nav";
import React, { useRef } from "react";

interface RouterState {
    state: {
        title: string;
        deadline: number;
        content: string;
        attachedFile: string;
        classification: string;
        authorName: string;
        authorCompany: string;
    }
}

function PostGeneralUser() {
    const { state } = useLocation() as RouterState;
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
                    <Input disabled value={state?.title}></Input>
                </ItemBox>
                <ItemBox>
                    <Span>Deadline</Span>
                    <Input type="date" disabled value={state?.deadline}></Input>
                    <Span>Classification</Span>
                    <Input disabled value={state?.classification}></Input>
                    <Span>Author</Span>
                    <Input disabled value={`${state?.authorName} / ${state?.authorCompany}`}></Input>
                </ItemBox>
                <Content disabled>{state?.content}</Content>
                <ItemBoxAnother>
                    <Span>첨부파일</Span>
                    <Input type="file" name="file" disabled value={state?.attachedFile}>
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