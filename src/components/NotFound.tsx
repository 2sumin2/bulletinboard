import styled from "styled-components";

const Span = styled.span`
    width: 100vw;
    height: 100vh;
    padding-top: 200px;
    display: block;
    text-align: center;
    color:black;
    font-size: 30px;
    font-weight: 500;
`;

function NotFound() {
    return <Span>NOT FOUND</Span>;
}
export default NotFound;