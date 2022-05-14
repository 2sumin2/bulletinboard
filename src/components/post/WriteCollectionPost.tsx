import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, ItemBox, WriteBox, Span, Input, Content, ItemBoxAnother } from "../board/BulletinBoard";
import Nav from "../Nav";

const CREATE_BOARD_MUTATION = gql`
    mutation createBoard(
        $classification: String!,
        $title: String!,
        $authorId: Int!,
        $deadline: String!,
        $content: String!,
        $attachedFile: Upload
        $attachedFileUrl: String
    ){
        createBoard(
            classification: $classification,
            title: $title,
            authorId: $authorId,
            deadline: $deadline,
            content: $content,
            attachedFile: $attachedFile,
            attachedFileUrl: $attachedFileUrl,
        ) {
            ok
            error
        }
    }
`;

const ME_QUERY = gql`
  query me($token: String) {
    me(token: $token) {
        id      
        name
        email
        company
        createAt
        updateAt    
        }
  }
`;
interface iFormState {
    title?: String,
    content?: String,
    deadline?: String,
    files?: FileList | null,
}

function WriteCollectionPost() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) {

            navigate('/notfound');
        }
    }, []);
    const [formState, setFormState] = useState<iFormState>();
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
    const token = localStorage.getItem("TOKEN");
    const { data: me } = useQuery(ME_QUERY, {
        variables: {
            token
        },
    });
    const onCompleted = (data: any) => {
        console.log(data);
        const {
            createBoard: { ok, error },
        } = data;
        if (error) {
            console.log(ok, error);
        }
        if (ok) {
            navigate('/databoard');
            window.location.reload();
        }
    };
    const [createBoard] = useMutation(CREATE_BOARD_MUTATION, {
        onCompleted,
    });
    const onClick = async () => {
        if (!formState?.title || !formState?.deadline || !formState?.content) {
            alert("게시글을 작성해주세요.");
        }

        else {
            const nowDate = new Date();
            const deadlineDate = new Date(formState?.deadline.toString());
            var classification = '';
            if (deadlineDate > nowDate) {
                classification = "자료수집중";
            }
            else {
                classification = "마감";
            }
            if (formState.files?.length) {
                var uploadFile = formState?.files[0];
                createBoard({
                    variables: {
                        classification,
                        title: formState.title,
                        authorId: me.me.id,
                        deadline: deadlineDate,
                        content: formState.content,
                        attachedFile: uploadFile,
                    }
                });

            }
            else {
                createBoard({
                    variables: {
                        classification,
                        title: formState.title,
                        authorId: me.me.id,
                        deadline: deadlineDate,
                        content: formState.content
                    }
                });
            }
        }
    };
    return (
        <>
            <Nav />
            <WriteBox>
                <ItemBox>
                    <Span>Title</Span>
                    <Input name="title" onChange={onChange}></Input>
                </ItemBox>
                <ItemBox>
                    <Span>Deadline</Span>
                    <Input type="date" name="deadline" onChange={onChange}></Input>
                </ItemBox>
                <Content name="content" onChange={(e: any) => onChange(e)}></Content>
                <ItemBoxAnother>
                    <Span>첨부파일</Span>
                    <Input type="file" accept=".xlsx, .xls, .xls, .xlsx" onChange={onChangeFile} >
                    </Input>
                </ItemBoxAnother>
            </WriteBox>
            <Btn onClick={onClick}>작성완료</Btn>
        </>
    );
};

export default WriteCollectionPost;
