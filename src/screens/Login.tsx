import styled from "styled-components";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    *{
        margin:10px;
    }
`;
const LogoBox = styled.div`
    margin-top:-10px;
    position:relative;
    width: 80vw;
    max-width:400px;
    min-width:300px;
    height: 500px;
    display: flex;
    align-items: center;
    text-align: center;
`;
const LoginBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 80vw;
    max-width:400px;
    min-width:300px;
    height: 500px;
    border:1px solid silver;
    background-color : ${props => props.theme.accentColor};
    input, button{
        height: 35px;
        margin:5px;
    }
`;
const Title = styled.span`
    text-align: center;
    color:black;
    font-size: 60px;
    font-weight: 500;
`;
interface IForm {
    email?: string;
    password?: string;
    company?: string;
    name?: string;
    result?: string;
}
const Form = styled.form<IForm>`
    display: flex;
    margin: 20px 50px;
    flex-direction: column;
    align-items:stretch;
`;
const Input = styled.input`
    padding-left: 5px;
    background-color: #e9e9e9;
    color: ${props => props.theme.textColor};
`;
const LoginBtn = styled.button`
    background-color: ${props => props.theme.bgColor};
    color:${props => props.theme.accentColor};
    font-weight: bold;
`;
const ToggleForm = styled.div`
    display: flex;
    margin: 10px 50px;
    justify-content: center;
    align-items: center;
`;
const ToggleBtn = styled.button`
    color:${props => props.theme.bgColor};
    font-weight: bold;
    width:80px;
    border: 0;
    background-color: transparent;
    font-size:15px;
`;
const Message = styled.span`
    font-size:13px;
    color:red;
    text-align:center;
`;
const Span = styled.span`
    color:${props => props.theme.bgColor};
`;
const LOGIN_MUTATION = gql`
    mutation login($email:String!, $password:String!){
        login(email:$email, password:$password) {
            ok
            token
            error
        }
    }
`;

function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const { register, handleSubmit, setError, formState: { errors }, reset, getValues } = useForm<IForm>();
    const onCompleted = (data: any) => {
        console.log(data);
        const {
            login: { ok, error, token },
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        if (token) {
            localStorage.setItem("token", token);
            navigate('/home');
        }
    };
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });
    const onClick = () => {
        setIsLogin(value => !value);
        reset();
    };
    const onLogIn = (data: IForm) => {
        if (loading) {
            return;
        }
        const { email, password } = getValues();
        login({
            variables: { email, password }
        });
        //reset();
        //navigate('/home');
    };
    const onSignUp = (data: IForm) => {
    };
    return (
        <Container>
            <LogoBox>
                <Title>bulletin BOARD</Title>
            </LogoBox>
            <LoginBox>
                {isLogin ?
                    (
                        <>
                            <Form onSubmit={handleSubmit(onLogIn)}>
                                <Input
                                    {...register("email", {
                                        required: '이메일을 입력하세요.',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9]+\.[a-zA-Z]+$/,
                                            message: "올바르지 않은 이메일 형식입니다."
                                        }, maxLength: {
                                            value: 50,
                                            message: "이메일은 50자 이어야 합니다."
                                        }
                                    })}
                                    placeholder="이메일 주소" />
                                <Input
                                    {...register("password", {
                                        required: '비밀번호를 입력하세요.',
                                        minLength: {
                                            value: 6,
                                            message: "비밀번호는 6자~12자 이어야 합니다."
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "비밀번호는 6자~12자 이어야 합니다."
                                        }
                                    })}
                                    type="password"
                                    placeholder="비밀번호" />
                                <LoginBtn type="submit" disabled={loading}>LOGIN</LoginBtn>
                                <Message>{errors?.email ? errors?.email?.message : errors?.password?.message ? errors?.password?.message : errors?.result?.message}</Message>
                            </Form>
                            <ToggleForm>
                                <Span>계정이 없으신가요?</Span>
                                <ToggleBtn onClick={onClick} type="submit"> 회원가입</ToggleBtn>
                            </ToggleForm>
                        </>
                    ) : (
                        <>
                            <Form onSubmit={handleSubmit(onSignUp)}>
                                <Input
                                    {...register("name", {
                                        required: '성명을 입력하세요.',
                                        maxLength: {
                                            value: 50,
                                            message: "성명은 50자 이어야 합니다."
                                        }
                                    })}
                                    placeholder="이름" />
                                <Input
                                    {...register("email", {
                                        required: '이메일을 입력하세요.',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9]+\.[a-zA-Z]+$/,
                                            message: "올바르지 않은 이메일 형식입니다."
                                        }, maxLength: {
                                            value: 50,
                                            message: "이메일은 50자 이어야 합니다."
                                        }
                                    })}
                                    placeholder="이메일 주소" />

                                <Input
                                    {...register("company", {
                                        required: '소속을 입력하세요.',
                                        maxLength: {
                                            value: 50,
                                            message: "소속은 50자 이어야 합니다."
                                        }
                                    },

                                    )}
                                    placeholder="소속(회사명)" />
                                <Input
                                    {...register("password", {
                                        required: '비밀번호를 입력하세요.',
                                        minLength: {
                                            value: 6,
                                            message: "비밀번호는 6자~12자 이어야 합니다."
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "비밀번호는 6자~12자 이어야 합니다."
                                        }
                                    })}
                                    type="password"
                                    placeholder="비밀번호" />
                                <LoginBtn type="submit">SIGNUP</LoginBtn>
                                <Message>{
                                    errors?.name ? errors?.name?.message : (
                                        errors?.email ? errors?.email?.message : (
                                            errors?.company ? errors?.company?.message : errors?.password?.message))}</Message>
                            </Form>
                            <ToggleForm>
                                <Span>계정이 있으신가요?</Span>
                                <ToggleBtn onClick={onClick}>로그인</ToggleBtn>
                            </ToggleForm>
                        </>
                    )}
            </LoginBox>
        </Container>
    );
}
export default Login;