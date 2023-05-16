import styled from 'styled-components';

export const DivRes = styled.div`
    height: 500px;
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    background-color: ${(props: { bg: string }) => props.bg};
    top: 53px;
    right: 3px;
    transition: var(--transition-03s);
`;
export const DivBar = styled.div`
    width: 100%;
    text-align: center;
    line-height: 31px;
    border-bottom: 1px solid #43464c;
    height: 30px;
    justify-content: space-between;
`;
export const DivListIs = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 4px;
    margin-top: 14px;
`;
export const DivItem = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    color: ${(props) => props.color};
`;
