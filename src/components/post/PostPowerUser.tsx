import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Btn, ItemBox, WriteBox, ItemBoxAnother, Span, Input, Content, SpanWide } from "../board/BulletinBoard";
import Nav from "../Nav";
import moment from 'moment';

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

function PostPowerUser() {
    const { state } = useLocation() as RouterState;
    const newDate = new Date().setTime(state?.deadline);
    const date = moment(newDate).format("YYYY-MM-DD");
    return (
        <>
            <Nav />
            <Container>
                <ContainerElement>
                    <ItemBox>
                        <Span>Title</Span>
                        <Input name="title" defaultValue={state?.title} autoComplete="off"></Input>
                    </ItemBox>
                    <ItemBox>
                        <Span>deadline</Span>
                        <Input type="date" name="deadline" defaultValue={date} autoComplete="off"></Input>
                    </ItemBox>
                    <Content>{state?.content}</Content>
                    <ItemBoxAnother>
                        <Span>첨부파일</Span>
                        <Input type="file" name="file" accept=".xlsx, .xls, .xls, .xlsx" defaultValue={state?.attachedFile}>
                        </Input>
                    </ItemBoxAnother>
                </ContainerElement>

                <ContainerElement>
                    <ItemBox>
                        <SpanWide>파일</SpanWide>
                    </ItemBox>
                    <Content as="div"></Content>
                </ContainerElement>
            </Container>

            <BtnContainer>
                <UpdateBtn>수정 완료</UpdateBtn>
                <DeleteBtn>삭제</DeleteBtn>
            </BtnContainer>
            <Btn>자료 취합하기</Btn>
        </>
    );
}
export default PostPowerUser;
