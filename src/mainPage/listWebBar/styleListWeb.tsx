import { Link } from 'react-router-dom';
import styled from 'styled-components';
export const ButtonLink = styled(Link)`
    min-width: 96px;
    height: 90px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    &:hover {
        background-color: rgb(38, 37, 37);
    }
`;
export const DivList = styled.div`
    width: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-radius: left 10px;
    background-color: transparent;
    display: flex;
    justify-content: start;
    align-items: center;
    transition: var(--transition-03s);
    background-color: rgb(51, 51, 51);
    overflow-x: overlay;
`;
