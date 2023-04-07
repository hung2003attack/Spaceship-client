import styled from 'styled-components';
import { Links } from '~/reUsingComponents/styleComponents/styleDefault';

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
`;
export const DivWrapper = styled.div`
    width: 100%;
    height: 50%;
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
    position: relative;
`;
export const Plogo = styled.p`
    font-weight: bold;
    margin-left: 5px;
    font-size: 1.9rem;
`;
export const DivHollow = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;
export const Alogo = styled.a`
    width: 30px;
    position: relative;

    div {
        align-items: end;
    }
`;
