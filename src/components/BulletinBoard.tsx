import styled from "styled-components";

export const BoardTitle = styled.div`
    width:100%;
    font-size:30px;
    padding-right:7%;
    text-align: center;
    font-weight:800;
    position:fixed;
    top:15%;

    
`;
export const TableBox = styled.div`
    width:65%;
    height:50vh;
    justify-content:center;
    position:fixed;
    top:30%;
    left:15%;
`;

export const Table = styled.table`
    max-height:100%;
    width:100%;
    justify-content:center;
    text-align: center;
    border-spacing:0;
    font-weight: 700;

    tbody{
        padding: 10px 0;
        &::before {
            content: '';
            display: block;
            height: 10px;
        }
    }
`;

export const Btn = styled.button`
    background-color:${props => props.theme.accentColor};
    color:${props => props.theme.bgColor};
    font-weight: 700;
    font-size:13px;
    height:40px;
    width: 130px;
    border:0;
    position:fixed;
    bottom:20%;
    right:20%;
    z-index: 1;
`;

interface iTh {
    width: string;
}

export const Th = styled.th<iTh>`
    font-size:13px;
    color: ${props => props.theme.accentColor};
    border-bottom: 1px solid black;
    width:${props => props.width};
    border-bottom: 1px solid ${props => props.theme.accentColor};
    &::after {
    content: '';
    display: block;
    height: 5px;
    }
`;

export const WriteBox = styled.div`
    border: 3px solid ${props => props.theme.accentColor};
    width:65vw;
    height:55vh;
    position:fixed;
    top:18%;
    left:15%;
    justify-content:center;
    display:flex;
    flex-direction: column;
    font-weight : 600;
`;
export const ItemBox = styled.div`
    border-bottom: 3px solid ${props => props.theme.accentColor};
    width:100%;
    display:flex;
    flex-direction: rows;
    font-size:15px;
`;
export const Span = styled.span`
    width: 150px;
    padding:10px 15px;
    background: ${props => props.theme.accentColor};
    color: ${props => props.theme.bgColor};
    text-align: center;
`;
export const Input = styled.input`
    padding:8px;
    width:100%;
    border:0;
    outline-style: none;
    font-size:15px;
    font-weight: 500;
`;
export const Content = styled.textarea`
    padding:15px;
    width:100%;
    height: 100%;
    outline-style: none;
    font-size:15px;
    font-weight: 600;
    resize:none;
`;
