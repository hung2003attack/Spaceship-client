import styled from 'styled-components';
interface PropsDivHover {
    right?: string;
    left?: string;
    top?: string;
    bottom?: string;
    bg?: string;
}
export const DivHover = styled.div<PropsDivHover>`
    width: max-content;
    height: 80%;
    padding: 10px;
    display: none;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 5px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.bg};
    top: ${(props) => props.top};
    bottom: ${(props) => props.bottom || '-34px'};
    right: ${(props) => props.right || '50%'};
    left: ${(props) => props.left || '50%'};
    transform: translateX(-50%);
    color: ${(props) => props.color || 'var(--color-light)'};

    @media (min-width: 1111px) {
        display: flex;
    }
`;

export const DivIcon = styled.div`
    width: 100%;
    height: 100%;
    font-size: ${(props: { size?: string }) => props.size};
    color: ${(props) => props.color || 'var(--color-light)'};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: var(--pointer);
`;
