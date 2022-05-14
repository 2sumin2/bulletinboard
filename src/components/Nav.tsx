import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Title = styled.div`
    font-size:28px;
    padding : 20px;
    cursor: pointer;
    font-weight: 600;
    width:max-content;
`;
const NavContainer = styled.div`
    height:100%;
    margin:0;
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
interface iNavMenuItem {
    color?: string;
};
const NavMenuItem = styled.div<iNavMenuItem>`
    color:${props => props.theme.textColor};
    color:${props => props.color};
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

const NavUserItem = styled.div`
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
const Button = styled.button`
    background: inherit;
    border:0;
    font-size:15px;
    font-weight:600;
    position: fixed;
    bottom:30px;
`;

const ME_QUERY = gql`
  query me($token: String) {
    me(token: $token) {
        id      
        name
        email
        company
        createAt
        updateAt    
        }
  }
`;

function Nav() {
    const token = localStorage.getItem("TOKEN");
    const { data } = useQuery(ME_QUERY, {
        variables: {
            token
        },
    });
    const [hideMenu, setHideMenu] = useState(true);
    const handlerHideMenu = () => {
        setTimeout(function () { setHideMenu(!hideMenu) }, 100); clearTimeout();
    };
    const [hideUser, setHideUser] = useState(true);
    const handlerHideUser = () => {
        setTimeout(function () { setHideUser(!hideUser) }, 100); clearTimeout();
    };
    const navigate = useNavigate();
    const onClick = () => {
        if (data?.me) {
            localStorage.removeItem("TOKEN");
            window.location.reload();
        }
        else {
            navigate('/');
        }

    };
    //onClick={handlerHideMenu} onMouseOut={() => setHideMenu(true)}
    //onClick={handlerHideUser} onMouseOut={() => setHideUser(true)}
    return (
        <>
            <Title><Link to={`/home`}>
                {data?.me?.id === 0 ? 'bulletin BOARD : manager' : 'bulletin BOARD'}
            </Link></Title>
            <NavContainer>
                <NavItem onClick={handlerHideMenu} >
                    {hideMenu ? <NavMenuTitleH color="white">MENU</NavMenuTitleH> :
                        <NavMenu>
                            <NavMenuTitle color="white">MENU</NavMenuTitle>
                            <Link to={`/home`}><NavMenuItem color="white">홈</NavMenuItem></Link>
                            <Link to={`/freeboard`}><NavMenuItem color="white">자유 게시판</NavMenuItem></Link>
                            <Link to={`/databoard`}><NavMenuItem color="white">자료 취합 게시판</NavMenuItem></Link>
                        </NavMenu>}
                </NavItem>
                <NavItem bgColor="#bfd8f1" onClick={handlerHideUser}>
                    {hideUser ? <NavMenuTitleH>USER</NavMenuTitleH> :
                        data?.me?.id === 0 ?
                            (<NavMenu>
                                <NavMenuTitle> USER</NavMenuTitle>
                                <Link to={`/usermanager`}><NavMenuItem>사용자 관리</NavMenuItem></Link>
                                <Link to={`/companymanager`}><NavMenuItem>회사 관리</NavMenuItem></Link>
                                <Button onClick={onClick}>{data?.me ? "로그아웃" : "로그인"}</Button>
                            </NavMenu>
                            ) : (
                                <NavMenu>
                                    <NavMenuTitle> USER</NavMenuTitle>
                                    <NavUserItem>
                                        {data?.me && <UserImg></UserImg>}{data?.me?.name}
                                    </NavUserItem>
                                    <NavUserItem>{data?.me?.email}</NavUserItem>
                                    <NavUserItem>{data?.me?.company}</NavUserItem>
                                    <Button onClick={onClick}>{data?.me ? "로그아웃" : "로그인"}</Button>
                                </NavMenu>
                            )
                    }
                </NavItem>
            </NavContainer>
        </>
    );
}
export default Nav;