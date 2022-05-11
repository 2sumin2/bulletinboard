import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    *{
        margin:10px;
    }
`;
export const LogoBox = styled.div`
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
export const LoginBox = styled.div`
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
export const Title = styled.span`
    text-align: center;
    color:black;
    font-size: 60px;
    font-weight: 500;
`;
export interface IForm {
    email?: string;
    password?: string;
    company?: string;
    name?: string;
    result?: string;
}
export const Form = styled.form<IForm>`
    display: flex;
    margin: 20px 50px;
    flex-direction: column;
    align-items:stretch;
`;
export const Input = styled.input`
    padding-left: 5px;
    background-color: #e9e9e9;
    color: ${props => props.theme.textColor};
`;
export const LoginBtn = styled.button`
    background-color: ${props => props.theme.bgColor};
    color:${props => props.theme.accentColor};
    font-weight: bold;
`;
export const ToggleForm = styled.div`
    display: flex;
    margin: 10px 50px;
    justify-content: center;
    align-items: center;
`;
export const ToggleBtn = styled.button`
    color:${props => props.theme.bgColor};
    font-weight: bold;
    width:80px;
    border: 0;
    background-color: transparent;
    font-size:15px;
`;
export const Message = styled.span`
    font-size:13px;
    color:red;
    text-align:center;
`;
export const Span = styled.span`
    color:${props => props.theme.bgColor};
`;