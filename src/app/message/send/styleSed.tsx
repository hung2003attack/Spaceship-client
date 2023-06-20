import styled from 'styled-components';

export const DivIconSend = styled.div`
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
export const DivSend = styled.div`
    flex-direction: column;
    height: 100%;
    position: fixed;
    background-color: #202124;
    width: 320px;
    right: 0px;
    z-index: 101;
    top: 0px;
    transition: var(--transition-03s);
    box-shadow: 0 0 10px;
`;
export const DivResults = styled.div`
    width: 100%;
    height: 94%;
    overflow-y: overlay;
`;
