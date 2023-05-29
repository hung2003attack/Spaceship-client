import styled from 'styled-components';

export const DivMessage = styled.div`
    border-radius: 5px;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: baseline;
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
export const DivWarBs = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background-color: #00000087;
`;
export const DivInBs = styled.div`
    width: 70%;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    color: #333;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    @media (min-width: 700px) {
        width: 500px;
    }
`;
