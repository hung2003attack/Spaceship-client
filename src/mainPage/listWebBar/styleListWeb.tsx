import { Link } from 'react-router-dom';
import styled from 'styled-components';
export const ButtonLink = styled(Link)`
    width: 116px;
    height: 100px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    background-color: rgb(51, 51, 51);
    &:hover {
        background-color: rgb(38, 37, 37);
    }
`;
