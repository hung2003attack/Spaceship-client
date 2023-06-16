import styled from 'styled-components';

export const DivSearch = styled.div`
    width: 85%;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 10;
    position: relative;
`;
export const Input = styled.input`
    width: 100%;
    padding: 10px 30px 10px 10px;
    border: 0;
    background: transparent;
    transition: var(--transition-03s);
    color: ${(props) => props.color};
    height: 100%;
`;
export const DivResults = styled.div`
    width: 330px;
    height: 500px;
    top: 45px;
    left: 0;
    position: absolute;
    background: ${(props: { bg: string }) => props.bg};
    transition: var(--transition-03s);
    border-radius: 5px;
    z-index: 9999;
`;
