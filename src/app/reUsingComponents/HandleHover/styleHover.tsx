import styled from 'styled-components';

export const DivHover = styled.div`
    width: max-content;
    height: 80%;
    display: none;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -34px;
    @media (min-width: 1111px) {
        display: flex;
    }
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
