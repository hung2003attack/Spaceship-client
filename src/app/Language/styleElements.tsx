import styled from 'styled-components';
export const Parent = styled.div`
    position: relative;
`;
export const StyleLanguage = styled.div`
    width: 50px;
    color: white;
    cursor: pointer;
`;
export const MenuLanguage = styled.div`
    width: 150px;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    padding: 5px;
    right: -56px;
    top: 26px;
    cursor: pointer;
    background-color: #535353;
    border-radius: 5px;
    z-index: 1;
`;
export const OptionLanguage = styled.button`
    width: 100%;
    background-color: transparent;
    color: white;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: #787777;
    }
`;
