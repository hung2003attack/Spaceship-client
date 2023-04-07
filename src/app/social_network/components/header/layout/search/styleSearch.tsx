import styled from 'styled-components';

export const DivSearch = styled.div`
    width: 67%;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 10;
    position: relative;
    &::before {
        display: block;
        content: '';
        width: 100%;
        height: 0.5px;
        background-color: ${(props: { bg: string }) => props.bg};
        position: absolute;
        bottom: 7px;
        left: 1px;
    }
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
