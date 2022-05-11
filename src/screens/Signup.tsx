import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Form, Input, LoginBtn, Message, IForm, Container, LoginBox, LogoBox, Span, Title, ToggleBtn, ToggleForm } from "../components/LoginForm";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount($email:String!, $company:String!, $name:String!, $password:String!){
        createAccount(email:$email, name:$name, company:$company, password:$password) {
            ok
            error
        }
    }
`;

function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, clearErrors, setError, formState: { errors }, getValues } = useForm<IForm>();
    const clearLoginError = () => {
        clearErrors("result");
    };
    const onCompleted = (data: any) => {
        console.log(data);
        const {
            createAccount: { ok, error },
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        navigate('/');
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const onSignUp = (data: IForm) => {
        if (loading) {
            return;
        }
        const { email, name, company, password } = getValues();
        createAccount({
            variables: { email, name, company, password }
        });
    };
    const onClick = () => {
        navigate('/');
    };
    return (
        <Container>
            <LogoBox>
                <Title>bulletin BOARD</Title>
            </LogoBox>
            <LoginBox>
                <Form onSubmit={handleSubmit(onSignUp)} onChange={clearLoginError}>
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
                    <LoginBtn type="submit" disabled={loading}>SIGNUP</LoginBtn>
                    <Message>{
                        errors?.name ? errors?.name?.message : (
                            errors?.email ? errors?.email?.message : (
                                errors?.company ? errors?.company?.message : (
                                    errors?.password ? errors?.password?.message : errors?.result?.message)))}</Message>
                </Form>
                <ToggleForm>
                    <Span>계정이 있으신가요?</Span>
                    <ToggleBtn onClick={onClick}>로그인</ToggleBtn>
                </ToggleForm>
            </LoginBox >
        </Container>
    );
}
export default Signup;