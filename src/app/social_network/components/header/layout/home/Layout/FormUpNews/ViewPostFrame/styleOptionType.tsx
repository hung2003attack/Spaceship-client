import styled from 'styled-components';

export const DivItemsType = styled.div`
    font-size: 1.4rem;
    padding: 4px;
    margin-right: 3px;
    border-radius: 5px;
    background-color: #292a2d;
    cursor: var(--pointer);
    ${(props: { css?: string }) => props.css}
`;
export const DivsetC = styled.div`
    display: flex;
    font-size: ${(props: { size?: string }) => props.size || '16px'};
    border-radius: 50%;
    padding: 2px;
    background-color: #338fdfe6;
    cursor: pointer;
    margin: 0 5px;
`;
