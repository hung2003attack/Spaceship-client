import styled from 'styled-components';

export const DivHover = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -34px;
`;
export const DivIcon = styled.div`
    width: 100%;
    height: 100%;
    font-size: ${(props: { size?: string }) => props.size};
    color: ${(props) => props.color || 'var(--color-text-light)'};
    display: flex;
    align-items: center;
    justify-content: center;
`;
