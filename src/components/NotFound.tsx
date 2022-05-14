import styled from "styled-components";
import Nav from './Nav';

const Span = styled.span`
    width: 100vw;
    height: 80vh;
    padding-top: 200px;
    display: block;
    text-align: center;
    color:black;
    font-size: 30px;
    font-weight: 500;
    margin:0;
`;

function NotFound() {
    return (
        <>
            <Nav />
            <Span>NOT FOUND</Span>
        </>
    );
}
export default NotFound;