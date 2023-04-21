import styled from 'styled-components';
interface PropsDivFonts {
    bg: string;
}
/* ${(props) => props.the}: -221px;the={displayEmoji ? 'right' : 'left'} */
export const DivFonts = styled.div<PropsDivFonts>`
    width: 210px;
    position: fixed;
    bottom: 0px;
    background-color: ${(props: { bg: string }) => props.bg};
    padding: 9px;
    border-radius: 5px;
    z-index: 2;
`;
export const DivList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    color: ${(props) => props.color};
    text-align: center;
`;
interface PropsDivName {
    position?: string;
    bg?: string;
    css?: string;
    width?: string;
}
export const DivName = styled.div<PropsDivName>`
    width: ${(props) => props.width || '100%'};
    padding: 4px;
    margin: 2px;
    cursor: pointer;
    border-radius: 5px;
    position: ${(props) => props.position};
    background-color: ${(props) => props.bg || '#292a2d'};
    ${(props) => props.css}
    &:hover:not(:has(*:hover)) {
        background-color: #345fccdb;
    }
`;
export const PItems = styled.p`
    width: 100%;
    padding: 3px;
    margin: 3px;
    font-size: 1.3rem;
    z-index: 1;
    background-color: ${(props: { bg: string }) => props.bg || '#292a2d'};

    &:hover {
        background-color: #345fccdb;
    }
`;
