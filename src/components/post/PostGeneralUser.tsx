import { Btn, ItemBox, WriteBox, ItemBoxAnother, Span, Input, Content } from "../board/BulletinBoard";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import moment from 'moment';
import Nav from "../Nav";
import React, { useRef } from "react";

const FileBox = styled(Input)`
    width:max-content;
`;

interface RouterState {
    state: {
        title: string;
        deadline: number;
        content: string;
        attachedFile: string;
        attachedFileUrl: string;
        classification: string;
        authorName: string;
        authorCompany: string;
    }
}

function PostGeneralUser() {
    const { state } = useLocation() as RouterState;
    const newDate = new Date().setTime(state?.deadline);
    const date = moment(newDate).format("YYYY-MM-DD");
    const fileRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        fileRef.current?.click();
    };
    console.log(state.deadline);
    var attachedFileName = state?.attachedFileUrl;
    if (state?.attachedFileUrl) {
        const attachedFiles: any[] = attachedFileName.split('-');
        attachedFileName = attachedFiles[2];
    }
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
                    <Input type="date" disabled value={date}></Input>
                    <Span>Classification</Span>
                    <Input disabled value={state?.classification}></Input>
                    <Span>Author</Span>
                    <Input disabled value={`${state?.authorName} / ${state?.authorCompany}`}></Input>
                </ItemBox>
                <Content disabled>{state?.content}</Content>
                <ItemBoxAnother>
                    <Span>첨부파일</Span>
                    {state?.attachedFileUrl && <FileBox as="a" href={state?.attachedFileUrl} target="_blank">{attachedFileName}</FileBox>}
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