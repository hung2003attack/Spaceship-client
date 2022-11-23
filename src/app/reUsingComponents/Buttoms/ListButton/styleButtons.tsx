import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Clear
export const ButtonLink = styled(Link)`
    ${(props: { css?: string }) => props.css}
`;
export const ButtonA = styled.a`
    ${(props: { css?: string }) => props.css}
`;
export const ButtonStyle = styled.button`
    ${(props: { css?: string }) => props.css}
`;
