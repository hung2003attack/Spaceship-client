import styled from 'styled-components';

export const DivIconMs = styled.div`
    display: flex;
    padding: 2px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    color: var(--color-icon);

    position: relative;

    cursor: var(--pointer);
    &:hover {
        background-color: #3c4043;
    }
`;
interface PropsDivMs {
    top: string;
    width: string;
}
export const DivMs = styled.div<PropsDivMs>`
    ${(props) => props.about};
    top: ${(props: { top: string }) => props.top};
    width: ${(props: { width: string }) => props.width || '100px'};
    z-index: 12;
    border-radius: 15px;
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    background-color: rgb(242 242 242 / 92%);
    padding: 10px;
`;
