import { Link } from 'react-router-dom';
import styled from 'styled-components';

// wait
export const Links = styled(Link)`
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aeaeae;
    position: relative;
    &:hover {
        background-color: ${(props: { bg: string }) => (props.bg === '#ffffffb8' ? '#bebbbb94' : ' #202124')};
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px 44px 10px 10px;
    border: 1px solid rgba(255, 255, 255, 0.83);
    border-radius: 5px;
    margin: 10px 0;
    background-color: rgba(255, 255, 255, 0);
    color: #fff;
    border-color: ${(props: { color?: string }) => props.color || ''};
`;
export const Span = styled.span`
    display: flex;
`;

interface Propss {
    size?: string;
    css?: string;
    repP?: string;
    padding?: string;
    bk?: string;
}
export const Button = styled.button<Propss>`
    display: flex;
    padding: ${(props) => props.padding || '2px 10px'};
    background-color: ${(props) => props.bk || 'transparent'};
    color: ${(props) => props.color || '#fff'};
    cursor: var(--pointer);
    border-radius: 5px;
    box-shadow: 0 0 3px #ffffff9c;
    font-size: ${(props) => props.size || '1.6rem'};
    font-weight: bold;
    ${(props) => props.css}
    @media (min-width: 400px) {
        padding: ${(props) => props.repP || props.padding || '2px 22px'};
    }
`;
export const Img = styled.img`
    border-radius: ${(props: { radius?: string }) => {
        console.log('css', props);
        return props.radius || '0';
    }};
`;
export const P = styled.p`
    ${(props: { css: string }) => props.css}
`;
export const Div = styled.div`
    ${(props: { css: string }) => {
        return props.css;
    }}
`;
