import styled from 'styled-components';

export const Peye = styled.p`
    width: 30px;
    height: 30px;
    display: flex;
    right: 10px;
    top: ${(props: { top: string }) => props.top};
    font-size: 20px;
    color: #aeaeae;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: transparent;
    cursor: pointer;
`;
export const Htitle = styled.h3`
    margin-bottom: 20px;
    color: #fff;
    position: relative;
`;
export const ButtonSubmit = styled.button`
    padding: 5px 20px;
    margin: 30px;
    color: #ddd8d8;
    border: 1px solid #a2a2a2;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
    &:hover {
        box-shadow: 0 0 5px #dcd7d7;
    }
    @media (min-width: 400px) {
        padding: 5px 23px;
    }
`;
interface PropsDivContainer {
    width?: string;
    height?: string;
    wrap?: string;
    content?: string;
    bk?: string;
    css?: string;
    padding?: string;
    margin?: string;
}
export const DivContainer = styled.div<PropsDivContainer>`
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bk || 'transparent'};
    display: flex;
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    align-items: center;
    justify-content: ${(props) => props.content || 'center'};
    padding: ${(props) => props.padding || '10px'};
    margin: ${(props) => props.margin || ''};
    border-radius: 5px;
    ${(props) => props.css};
`;
export const DivImg = styled.div<PropsDivContainer>`
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height};
`;
export const DivUserBar = styled.div`
    width: ${(props: { width?: string }) => props.width || '100%'};
`;

export const Hname = styled.h3`
    font-size: 1rem;
    display: -webkit-box;
    height: 16px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
