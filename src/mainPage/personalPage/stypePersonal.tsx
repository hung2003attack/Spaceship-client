import styled from 'styled-components';

export const DivBg = styled.div`
    width: 90%;
    height: 300px;
    margin: 15px auto;
    border-radius: 5px;
    background-color: rgb(200 200 200);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`;
export const DivIntr = styled.div`
    width: 90%;
    margin: 35px auto 10px;
    display: flex;
    align-items: flex-start;
`;
export const DivStories = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(255, 255, 255);
    box-shadow: 0 0 2px rgb(0 0 0);
    margin-top: 19px;
`;
export const DivOp = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    background-color: rgb(200 200 200);
`;
export const DivItems = styled.div`
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: var(--pointer);
    border-radius: 5px;
    &:hover {
        background-color: rgb(145 145 145);
    }
`;
export const DivPerson = styled.div`
    width: var(--full);
    height: auto;
    border-left: 1px solid;
    border-right: 1px solid;
`;
export const InputChangeP = styled.input`
    width: 100%;
    border: 0;
    padding: 5px 45px 5px 5px;
    border-radius: 5px;
    background-color: #3d3d3dd4;
    margin-bottom: 3px;
    color: ${(props) => props.color};
    @media (min-width: 600px) {
        padding: 8px 45px 8px 8px;
    }
`;
