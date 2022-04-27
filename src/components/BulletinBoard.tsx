import styled from "styled-components";

export const BoardTitle = styled.div`
    width:100%;
    font-size:30px;
    padding-right:5%;
    text-align: center;
    font-weight:600;
    margin-right:100px;
    margin-bottom:100px;
    
`;
export const TableBox = styled.div`
    width:100%;
    height:50vh;
    padding: 0 20% 0 15%;
    justify-content:center;
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

export const WriteBtn = styled.button`
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
