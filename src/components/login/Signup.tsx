import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Form, Input, LoginBtn, Message, IForm, Container, LoginBox, LogoBox, Span, Title, ToggleBtn, ToggleForm } from "./LoginForm";
import styled from "styled-components";
import Company from './Company';

const SelectInput = styled(Input)`
    margin-left: 5px;
    height:35px;
    width:96%;
`;

const SEE_COMPANIES_QUERY = gql`
    query seeCompanies{
        seeCompanies {
            name
            id
        }
    }
`;

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
    const { data } = useQuery(SEE_COMPANIES_QUERY, {
    });
    const onCompleted = (data: any) => {
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
                            required: '????????? ???????????????.',
                            maxLength: {
                                value: 50,
                                message: "????????? 50??? ????????? ?????????."
                            }
                        })}
                        placeholder="??????" />
                    <Input
                        {...register("email", {
                            required: '???????????? ???????????????.',
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9]+\.[a-zA-Z]+$/,
                                message: "???????????? ?????? ????????? ???????????????."
                            }, maxLength: {
                                value: 50,
                                message: "???????????? 50??? ????????? ?????????."
                            }
                        })}
                        placeholder="????????? ??????" />

                    <SelectInput as="select"
                        {...register("company", {
                            required: '????????? ???????????????.',
                        },
                        )}>
                        <option value="">??????(?????????)</option>
                        {data?.seeCompanies.map((company: any) => (
                            <Company
                                key={company.id}
                                id={company.id}
                                name={company.name}
                            />
                        ))}
                    </SelectInput>
                    <Input
                        {...register("password", {
                            required: '??????????????? ???????????????.',
                            minLength: {
                                value: 6,
                                message: "??????????????? 6???~12??? ????????? ?????????."
                            },
                            maxLength: {
                                value: 12,
                                message: "??????????????? 6???~12??? ????????? ?????????."
                            }
                        })}
                        type="password"
                        placeholder="????????????" />
                    <LoginBtn type="submit" disabled={loading}>SIGNUP</LoginBtn>
                    <Message>{
                        errors?.name ? errors?.name?.message : (
                            errors?.email ? errors?.email?.message : (
                                errors?.company ? errors?.company?.message : (
                                    errors?.password ? errors?.password?.message : errors?.result?.message)))}</Message>
                </Form>
                <ToggleForm>
                    <Span>????????? ????????????????</Span>
                    <ToggleBtn onClick={onClick}>?????????</ToggleBtn>
                </ToggleForm>
            </LoginBox >
        </Container>
    );
}
export default Signup;