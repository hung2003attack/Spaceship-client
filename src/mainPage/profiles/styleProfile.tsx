import styled from 'styled-components';

export const DivProfile = styled.div`
    width: 140px;
    height: 154px;

    display: flex;
    flex-wrap: wrap;
    margin: 12px;
    border: 1px solid #313131;
    align-items: center;
    justify-content: center;
    cursor: var(--pointer);
    color: #414547;
    background-color: rgb(29, 85, 90);
    border-radius: 5px;
    @media (min-width: 837px) {
        width: 189px;
        height: 200px;
    }
`;
export const Pname = styled.p`
    font-size: 1.3rem;
    color: var(--color-light);
    @media (min-width: 837px) {
        font-size: 1.6rem;
    }
`;
export const Pstatus = styled(Pname)`
    font-size: 0.9rem;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 0 5px;
    overflow: hidden;
    @media (min-width: 837px) {
        font-size: 1.1rem;
    }
`;
export const Ps = styled.p``;
