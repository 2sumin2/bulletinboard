import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Btn, ItemBox, WriteBox, ItemBoxAnother, Span, Input, Content, SpanWide } from "../board/BulletinBoard";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const Container = styled.div`
    display:flex;
    flex-direction: row;
    position:fixed;
    top:18%;
    left:15%;
`;
const ContainerElement = styled(WriteBox)`
    width:32.4vw;
    position:relative;
    top:0%;
    left:0%;
    margin:2px;
`;
const BtnContainer = styled.div`
    position:fixed;
    top:12%;
    right:20%;
`;
const UpdateBtn = styled(Btn)`
    position:relative;
    top:0;
    right:0;
`;
const DeleteBtn = styled(Btn)`
    background-color: #cb1726;
    position:relative;
    top:0;
    right:0;
    margin-left:10px;
`;
const FileBox = styled(Input)`
    width:max-content;
`;

const DeleteFileBtn = styled.button`
    background-color: transparent;
    border:0;
`;
interface RouterState {
    state: {
        id: number;
        title: string;
        deadline: number;
        content: string;
        attachedFile: string;
        classification: string;
        authorId: number;
        authorName: string;
        authorCompany: string;
    }
}

interface iFormState {
    title?: String,
    content?: String,
    deadline?: String,
    files?: FileList | null,
}

const DELETE_BOARD_MUTATION = gql`
  mutation deleteBoard($deleteBoardId: Int!) {
    deleteBoard(id: $deleteBoardId) {
        ok
        error  
        }
  }
`;

const UPDATE_BOARD_MUTATION = gql`
  mutation UpdateBoard(
        $updateBoardId: Int!
        $classification: String!
        $title: String!
        $authorId: Int!
        $deadline: String!
        $content: String!
    ) {
    updateBoard(
        id: $updateBoardId
        classification: $classification
        title: $title
        authorId: $authorId
        deadline: $deadline
        content: $content
    ) {
        ok
        error
    }
}
`;

function PostPowerUser() {
    const navigate = useNavigate();
    const { state } = useLocation() as RouterState;
    const newDate = new Date().setTime(state?.deadline);
    const date = moment(newDate).format("YYYY-MM-DD");
    const [formState, setFormState] = useState<iFormState>();
    const onDeleteFile = () => {
        state.attachedFile = '';
        setFormState(formData => ({
            ...formData,
            files: null
        }));
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(formData => ({
            ...formData,
            [event.target.name]: event.target.value
        }));
    };
    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }
        setFormState(formData => ({
            ...formData,
            files: event.target.files
        }));
    };
    const onCompleted = (data: any) => {
        if (data.error) {
            alert(data.error);
        }
        navigate('/databoard');
        window.location.reload();
    };
    const onError = (error: any) => {
        alert("error");
        navigate('/databoard');
        window.location.reload();
    };
    const [deleteBoard, { loading: deleteLoading }] = useMutation(DELETE_BOARD_MUTATION, {
        onCompleted, onError
    });
    const onDelete = () => {
        if (deleteLoading) {
            return
        };
        deleteBoard({
            variables: { "deleteBoardId": state?.id }
        });
    };
    const [updateBoard, { loading: updateLoading }] = useMutation(UPDATE_BOARD_MUTATION, {
        onCompleted, onError
    });
    const onUpdate = () => {
        if (updateLoading) {
            return
        };
        const nowDate = new Date();
        const deadline = ((formState?.deadline) ? (formState?.deadline?.toString()) : state?.deadline);
        const deadlineDate = new Date(deadline);
        var classification = '';
        if (deadlineDate > nowDate) {
            classification = "자료수집중";
        }
        else {
            classification = "마감";
        }
        updateBoard({
            variables: {
                "updateBoardId": state?.id,
                classification,
                "title": ((formState?.title) ? (formState?.title) : state?.title),
                "authorId": state?.authorId,
                "deadline": deadlineDate,
                "content": ((formState?.content) ? (formState?.content) : state?.content)
            }
        });
    };
    var attachedFile = state?.attachedFile;
    if (state?.attachedFile) {
        const attachedFiles: any[] = attachedFile.split('-');
        attachedFile = attachedFiles[2];
    }
    return (
        <>
            <Nav />
            <Container>
                <ContainerElement>
                    <ItemBox>
                        <Span>Title</Span>
                        <Input name="title" defaultValue={state?.title} onChange={onChange} autoComplete="off"></Input>
                    </ItemBox>
                    <ItemBox>
                        <Span>deadline</Span>
                        <Input type="date" name="deadline" defaultValue={date} onChange={onChange} autoComplete="off"></Input>
                    </ItemBox>
                    <Content name="content" onChange={(e: any) => onChange(e)}>{state?.content}</Content>
                    {state?.attachedFile ? (
                        <ItemBoxAnother>
                            <Span>첨부파일</Span>
                            <FileBox as="a" href={state?.attachedFile} target="_blank">{attachedFile}</FileBox>
                            <DeleteFileBtn onClick={onDeleteFile}>🗑️</DeleteFileBtn>
                        </ItemBoxAnother>
                    ) :
                        <ItemBoxAnother>
                            <Span>첨부파일</Span>
                            <Input type="file" name="file" accept=".xlsx, .xls, .xls, .xlsx" onChange={onChangeFile}>
                            </Input>
                        </ItemBoxAnother>
                    }

                </ContainerElement>

                <ContainerElement>
                    <ItemBox>
                        <SpanWide>파일</SpanWide>
                    </ItemBox>
                    <Content as="div"></Content>
                </ContainerElement>
            </Container>

            <BtnContainer>
                <UpdateBtn onClick={onUpdate}>수정 완료</UpdateBtn>
                <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
            </BtnContainer>
            <Btn>자료 취합하기</Btn>
        </>
    );
}
export default PostPowerUser;
