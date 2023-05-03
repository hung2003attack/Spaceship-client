import styled from 'styled-components';

export const DivMessage = styled.div`
    border-radius: 5px;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    bottom: 50%;
    right: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: 1000;
    cursor: pointer;
    background-color: ${(props: { bg: string }) => props.bg};
`;
