import styled from 'styled-components';

export const DivOptions = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    padding-top: 49px;
    overflow: hidden;
    color: ${(props) => props.color};
    background-color: ${(props: { bg?: string }) => props.bg};
    @media (min-width: 769px) {
        font-size: 1.6rem;
    }
`;
export const DivSearch = styled.div`
    width: 100%;
    border-bottom: 1px solid #9191919e;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;
interface PropsDivItems {
    display?: string;
    css?: string;
}
export const DivItems = styled.div<PropsDivItems>`
    display: ${(props) => props.display || 'block'};
    width: 100%;
    padding: 8px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: var(--pointer);
    ${(props) => props.css}
    &:hover {
        background-color: #444444;
    }
`;
export const DivMenu = styled.div`
    width: 30%;
    @media (min-width: 800px) {
        width: 200px;
    }
`;
export const DivResults = styled.div`
    min-width: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: center;
    overflow-y: overlay;
    right: 0;
    padding: 10px;
    background-color: #292a2c;
    @media (max-width: 768px) {
        width: min-content;
        &::-webkit-scrollbar {
            width: 0px;
            height: 10px;
            border-radius: 0;
        }
    }
`;
interface PropsInput {
    display?: string;
    border?: string;
}
export const Input = styled.input<PropsInput>`
    display: ${(props) => props.display || 'none'};
    width: 0%;
    border: ${(props) => props.border || '1px solid rgba(255, 255, 255, 0.83)'};
    border-radius: 25px;
    margin: 3px 0;
    padding: 0 10px;
    background-color: rgba(255, 255, 255, 0);
    color: ${(props) => props.color};
`;
