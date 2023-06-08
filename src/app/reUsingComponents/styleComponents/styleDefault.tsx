import { Link } from 'react-router-dom';
import styled from 'styled-components';

// wait
export const Links = styled(Link)`
    width: 70px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aeaeae;
    position: relative;
    &:hover {
        background-color: ${(props: { bg: number }) => (props.bg === 1 ? ' #385d8c;' : ' #202124')};
    }
`;
export const A = styled.a`
    ${(props: { css?: string }) => props.css}
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
    ${(props: { css?: string }) => props.css}
`;

interface Propss {
    size?: string;
    css?: string;
    repP?: string;
    padding?: string;
    bg?: string;
}
export const Button = styled.button<Propss>`
    display: flex;
    padding: ${(props) => props.padding || '2px 10px'};
    background-color: ${(props) => props.bg || 'transparent'};
    color: ${(props) => props.color || '#fff'};
    cursor: var(--pointer);
    border-radius: 5px;
    box-shadow: 0 0 1px #ffffff9c;
    font-size: ${(props) => props.size || '1.6rem'};
    font-weight: bold;
    ${(props) => props.css}
`;
interface PropsButtons {
    text: { css: string; text: string; tx?: string; onClick?: (args?: any) => void }[];
}
export const Buttons: React.FC<PropsButtons | any> = ({ text }) => {
    return text.map((vl: { css: string; text: string; tx: string; onClick?: (args: any) => void }) => (
        <Button key={vl.text + vl.tx} css={vl.css} onClick={vl.onClick}>
            {vl.text}
            <P z="1.2rem" css="margin-left: 3px;">
                {vl.tx}
            </P>
        </Button>
    ));
};
interface PropsImg {
    radius?: string;
    css?: string;
}
export const Img = styled.img<PropsImg>`
    border-radius: ${(props) => props.radius || '0'};
    ${(props) => props.css}
`;
interface PropsP {
    z?: string;
    css?: string;
}
export const P = styled.p<PropsP>`
    color: ${(props) => props.color};
    font-size: ${(props) => props.z};
    ${(props) => props.css}
`;
export const H3 = styled.h3`
    color: ${(props) => props.color};
    ${(props: { css?: string }) => props.css}
`;
interface PropsDiv {
    wrap?: string;
    css?: string;
    width?: string;
    display?: string;
}
export const Div = styled.div<PropsDiv>`
    width: ${(props) => props.width};
    display: ${(props) => props.display || 'flex'};
    flex-wrap: ${(props) => props.wrap || 'none'};
    ${(props) => props.css}
`;
export const Strong = styled.strong`
    ${(props: { css?: string }) => props.css}
`;
export const Ol = styled.ol`
    ${(props: { css?: string }) => props.css}
`;
export const Li = styled.li`
    ${(props: { css?: string }) => props.css}
`;
