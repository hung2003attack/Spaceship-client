import styled from 'styled-components';

export const DivRes = styled.div`
    height: 100%;
    width: 314px;
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    background-color: ${(props: { bg: string }) => props.bg};
    top: 0px;
    right: 3px;
    transition: var(--transition-03s);
    z-index: 12;
`;
export const DivBar = styled.div`
    width: 100%;
    text-align: center;
    line-height: 38px;
    border-bottom: 1px solid #43464c;
    height: 35px;
    justify-content: space-between;
`;
export const DivListIs = styled.div`
    width: 100%;
    height: 90%;
    padding: 4px;
    margin-top: 14px;
    overflow-y: overlay;
`;
export const DivItem = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    margin-bottom: 2px;
    color: ${(props) => props.color};
`;
