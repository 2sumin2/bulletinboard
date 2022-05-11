import Login from "./Login";
import Signup from "./Signup";
import { Container, LoginBox, LogoBox, Span, Title, ToggleBtn, ToggleForm, IForm } from "../components/LoginForm";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginSignup() {
    const { formState: { errors }, reset } = useForm<IForm>();
    const [isLogin, setIsLogin] = useState(true);
    const onClick = () => {
        setIsLogin(value => !value);
        reset();
    };
    return (
        <Container>
            <LogoBox>
                <Title>bulletin BOARD</Title>
            </LogoBox>
            <LoginBox>
                {isLogin ?
                    <>
                        <Login />
                        <ToggleForm>
                            <Span>계정이 없으신가요?</Span>
                            <ToggleBtn onClick={onClick} type="submit"> 회원가입</ToggleBtn>
                        </ToggleForm>
                    </> : <>
                        <Signup />
                        <ToggleForm>
                            <Span>계정이 있으신가요?</Span>
                            <ToggleBtn onClick={onClick}>로그인</ToggleBtn>
                        </ToggleForm>
                    </>}
            </LoginBox>
        </Container>
    );
}
export default LoginSignup;