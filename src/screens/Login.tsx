import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Form, Input, LoginBtn, Message, IForm, Container, LoginBox, LogoBox, Span, Title, ToggleBtn, ToggleForm } from "../components/LoginForm";

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
    const { register, handleSubmit, setError, clearErrors, formState: { errors }, getValues } = useForm<IForm>();
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
    const clearLoginError = () => {
        clearErrors("result");
    };
    const onLogIn = (data: IForm) => {
        if (loading) {
            return;
        }
        const { email, password } = getValues();
        login({
            variables: { email, password }
        });
    };
    const onClick = () => {
        navigate('/account');
    };
    return (
        <Container>
            <LogoBox>
                <Title>bulletin BOARD</Title>
            </LogoBox>
            <LoginBox>
                <Form onSubmit={handleSubmit(onLogIn)} onChange={clearLoginError}>
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
            </LoginBox>
        </Container>
    );
}
export default Login;