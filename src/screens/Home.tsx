import styled from "styled-components";
import Nav from "../components/Nav";
import img from "../images/search.png";

const SearchBox = styled.div`
    position:fixed;
    top:40%;
    left:23%;
    width: 50%;
    height: 50px;
    display:flex;
    flex-direction: row;
    align-items: center;
`;
const SearchItem = styled.div`
    border: 5px solid ${props => props.theme.accentColor};
    width: 100%;
    height: 50px;
    margin-right:15px;
`;
const Img = styled.img`
    height:45px;
    width:45px;
`;
function Home() {
    return (
        <>
            <SearchBox>
                <SearchItem></SearchItem>
                <Img src={`${img}`} alt="" />
            </SearchBox>

            <Nav />
        </>
    );
}
export default Home;