import styled from 'styled-components';

export const DivTitleP = styled.div`
    width: 94%;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    justify-content: space-evenly;
    margin-top: 50px;
    box-shadow: 0 0 1px #949090;
    padding: 14px;
    border-radius: 5px;
    background-color: #2b2c2c;
`;
export const DivSearch = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: right;
    background-color: #333333;
    border: 1px solid #4e4d4a;
    position: relative;
    padding: 2px;
    input {
        width: 68%;
        height: 80%;
        display: block;
    }
    color: ${(props) => props.color};
`;
