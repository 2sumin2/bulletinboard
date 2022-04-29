import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
    font-size:28px;
    margin: 20px;
    cursor: pointer;
    font-weight: 600;
`;
const NavContainer = styled.div`
    height:100vh;
    position:fixed;
    right:0px;
    top:0px;
    display: flex;
    flex-direction: row;
    z-index: 2;
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
    cursor: pointer;
`;
const NavMenu = styled.div`
    padding:40px 50px;
    display: flex;
    flex-direction: column;
    cursor:default;
    height:100%;
    width:300px;
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
const NavMenuTitleH = styled(NavMenuTitle)`
    padding:20px;
    writing-mode: vertical-lr;
    letter-spacing: 5px;
`;

const NavMenuItem = styled.div`
    color:${props => props.theme.bgColor};
    font-size:18px;
    margin:5px;
    cursor:pointer;
    font-weight:600;
    &:hover{
        opacity: 60%;
    }
    *{
        font-family: 'Hahmlet', serif;
    }
    
`;
interface iNavUserItem {
    color?: string;
};
const NavUserItem = styled.div<iNavUserItem>`
    font-size:15px;
    color: ${props => props.theme.textColor};
    font-weight:600;
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
        setTimeout(function () { setHideMenu(!hideMenu) }, 100); clearTimeout();
    };
    const [hideUser, setHideUser] = useState(true);
    const handlerHideUser = () => {
        setTimeout(function () { setHideUser(!hideUser) }, 100); clearTimeout();
    };
    //onClick={handlerHideMenu} onMouseOut={() => setHideMenu(true)}
    //onClick={handlerHideUser} onMouseOut={() => setHideUser(true)}
    return (
        <>
            <Title><Link to={`/home`}>bulletin BOARD</Link></Title>
            <NavContainer>
                <NavItem onClick={handlerHideMenu} >
                    {hideMenu ? <NavMenuTitleH color="white">MENU</NavMenuTitleH> :
                        <NavMenu>
                            <NavMenuTitle color="white">MENU</NavMenuTitle>
                            <NavMenuItem><Link to={`/home`}>홈</Link></NavMenuItem>
                            <NavMenuItem><Link to={`/freeboard`}>자유 게시판</Link></NavMenuItem>
                            <NavMenuItem ><Link to={`/databoard`}>자료 취합 게시판</Link></NavMenuItem>
                        </NavMenu>}
                </NavItem>
                <NavItem bgColor="#bfd8f1" onClick={handlerHideUser}>
                    {hideUser ? <NavMenuTitleH>USER</NavMenuTitleH> :
                        <NavMenu>
                            <NavMenuTitle> USER</NavMenuTitle>
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