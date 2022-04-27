import styled from "styled-components";

export const BoardTitle = styled.div`
    width:100%;
    font-size:30px;
    padding-right:5%;
    text-align: center;
    font-weight:600;
    margin-right:100px;
`;

export const Table = styled.table`
    width:100%;
    padding: 100px 25% 100px 20%;
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
