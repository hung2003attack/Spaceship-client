import styled from 'styled-components';
interface PropsDivFonts {
    bg: string;
}
/* ${(props) => props.the}: -221px;the={displayEmoji ? 'right' : 'left'} */
export const DivFonts = styled.div<PropsDivFonts>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 9px 0;
    border-radius: 5px;
    overflow-y: overlay;
    position: relative;
    background-color: ${(props: { bg: string }) => props.bg};
`;
export const DivList = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 1.3rem;
    color: ${(props) => props.color};
    &::-webkit-scrollbar {
        height: 4px !important;
    }
    &::-webkit-scrollbar-button {
        height: 4px !important;
    }
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
    background-color: ${(props) => props.bg || '#43464c'};
    ${(props) => props.css}
    &:hover:not(:has(*:hover)) {
        background-color: #345fccdb;
    }
`;
export const PItems = styled.p`
    width: 100%;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 3px 12px;
    margin: 3px;
    font-size: 20px;
    z-index: 1;
    background-color: ${(props: { bg: string }) => props.bg || '#292a2d'};

    &:hover {
        background-color: #345fccdb;
    }
`;
