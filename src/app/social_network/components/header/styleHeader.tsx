import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Links = styled(Link)`
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aeaeae;
    position: relative;
    &:hover {
        background-color: #383838;
    }
`;
export const DivHeader = styled.div`
    min-width: 100%;
    height: 40px;
    z-index: 5;
    top: 40px;
    box-shadow: 0 0 1px 0 rgb(100 91 91);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background: #202124;
`;
export const DivWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
export const LinkHome = styled(Links)`
    border-radius: 5px;
    transition: var(--transition-03s);
`;
export const LinkExchange = styled(LinkHome)`
    font-size: 25px;
`;
export const LinkCall = styled(Links)``;

export const SpanX = styled.span`
    font-size: 15px;
    margin: 0 5px;
    color: #aeaeae;
`;
export const ButtonSt = styled.button`
    background-color: transparent;
    position: fixed;
    right: 125px;
    top: 4px;
`;
export const Plogo = styled.p`
    font-weight: bold;
    margin-left: 5px;
    font-size: 1.9rem;
`;
export const DivHollow = styled.div`
    width: 100%;
    height: 40px;
    background-color: #202124;
    position: fixed;
`;
export const Alogo = styled.a`
    position: fixed;
    top: 7px;
    left: 0px;
    width: 100px;
    div {
        align-items: end;
    }
`;
