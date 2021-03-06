import { Btn, ItemBox, WriteBox, ItemBoxAnother, Span, Input, Content } from "../board/BulletinBoard";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from 'moment';
import Nav from "../Nav";
import React, { useRef } from "react";
import { useEffect } from "react";

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
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) {

            navigate('/notfound');
        }
    }, []);
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
                    <Span>????????????</Span>
                    {state?.attachedFileUrl && <FileBox as="a" href={state?.attachedFileUrl} target="_blank">{attachedFileName}</FileBox>}
                </ItemBoxAnother>
            </WriteBox>
            {(state?.classification == "??????") ? null : (
                <React.Fragment>
                    <input
                        ref={fileRef}
                        type="file"
                        style={{ display: "none" }}
                    />
                    <Btn onClick={onClick}>?????? ?????????</Btn>
                </React.Fragment>)}
        </>
    );
}
export default PostGeneralUser;