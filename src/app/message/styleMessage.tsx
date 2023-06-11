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
    width: ${(props: { width: string }) => props.width || '100px'};
    position: fixed;
    right: 2px;
    top: ${(props: { top: string }) => props.top};
    z-index: 12;
    border-radius: 15px;
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
    flex-direction: column-reverse;
    z-index: 88;
`;
