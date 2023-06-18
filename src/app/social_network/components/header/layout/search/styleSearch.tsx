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
    background-color: #292a2d;
    transition: var(--transition-03s);
    color: ${(props) => props.color};
    height: 100%;
`;
export const DivResults = styled.div`
    width: 320px;
    height: 611px;
    top: 45px;
    left: -5px;
    position: absolute;
    background: ${(props: { bg: string }) => props.bg};
    transition: var(--transition-03s);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 9999;
`;
