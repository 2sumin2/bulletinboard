import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
    font-size:25px;
    margin: 20px;
    cursor: pointer;
`;
const NavContainer = styled.div`
    height:100vh;
    position:fixed;
    right:0px;
    top:0px;
    display: flex;
    flex-direction: row;
`;


interface iNavItem {
    bgColor?: string;
};

const NavItem = styled.div<iNavItem>`
    background-color:${props => props.theme.accentColor};
    background-color:${props => props.bgColor};
    min-width: 60px;
    display: flex;
    flex-direction: column;
`;
const NavMenu = styled.div`
    padding:40px 50px;
    display: flex;
    flex-direction: column;
`;
interface iNavMenuItem {
    color?: string;
};

const NavMenuTitle = styled.span<iNavMenuItem>`
    color:${props => props.theme.textColor};
    color:${props => props.color};
    font-size:20px;
    font-weight:600;
    text-align: center;
    margin-bottom:120px;
    cursor: default;
`;
const NavMenuItem = styled.div`
    color:${props => props.theme.bgColor};
    font-family: 'Hahmlet', serif;
    font-size:18px;
    font-weight:500;
    margin:5px;
    cursor:pointer;
    font-weight:600;
`;
const NavUserItem = styled(NavMenuItem)`
    font-size:15px;
    color: ${props => props.theme.textColor};
    cursor:default;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom:10px;
`;
const UserImg = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 1px solid gray;
    background-color: lightgray;
    margin-right:20px;
`;


function Nav() {
    const [hideMenu, setHideMenu] = useState(true);
    const handlerHideMenu = () => {
        setTimeout(function () { setHideMenu(false) }, 200); clearTimeout();
    };
    const [hideUser, setHideUser] = useState(true);
    const handlerHideUser = () => {
        setTimeout(function () { setHideUser(false) }, 200); clearTimeout();
    };
    return (
        <>
            <Title><Link to={`/home`}>bulletin BOARD</Link></Title>
            <NavContainer>
                <NavItem onMouseOver={handlerHideMenu} onMouseOut={() => setHideMenu(true)}>
                    {hideMenu ? null :
                        <NavMenu>
                            <NavMenuTitle color="white">MENU</NavMenuTitle>
                            <NavMenuItem>홈</NavMenuItem>
                            <NavMenuItem>자유 게시판</NavMenuItem>
                            <NavMenuItem >자료 취합 게시판</NavMenuItem>
                        </NavMenu>}
                </NavItem>
                <NavItem bgColor="#bfd8f1" onMouseOver={handlerHideUser} onMouseOut={() => setHideUser(true)}>
                    {hideUser ? null :
                        <NavMenu>
                            <NavMenuTitle>USER</NavMenuTitle>
                            <NavUserItem>
                                <UserImg></UserImg>신짱구
                            </NavUserItem>
                            <NavUserItem>123123@helloworld.com</NavUserItem>
                            <NavUserItem>짱구컴퍼니</NavUserItem>
                        </NavMenu>
                    }
                </NavItem>
            </NavContainer>
        </>
    );
}
export default Nav;