import styled from 'styled-components';
import { Links } from '~/reUsingComponents/styleComponents/styleDefault';

export const DivHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background-color: ${(props: { bg: number }) => (props.bg === 1 ? '#292a2d' : '')};
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    box-shadow: 0 0 4px #676464;
`;
export const DivWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    ${(props: { css?: string }) => props.css}
`;
export const LinkHome = styled(Links)`
    border-radius: 5px;
`;
export const LinkExchange = styled(LinkHome)`
    font-size: 20px;
`;
export const LinkCall = styled(LinkHome)``;

export const SpanX = styled.span`
    font-size: 15px;
    margin: 0 5px;
    color: #aeaeae;
`;
export const ButtonSt = styled.button`
    width: 50px;
    height: 100%;
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
    height: 100%;
`;
