import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DivContainer = styled.div`
    width: 100%;
    height: 385px;
    padding: 20px;
    border: 1px solid rgb(74 73 73);
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: overlay;
    justify-content: center;
    color: ${(props) => props.color};
    @media (min-width: 375px) {
        justify-content: unset;
    }
`;

export const DivMainPage = styled.div`
    transition: var(--transition-03s);
`;
export const DivListWebProfile = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    background-color: ${(props) => props.color};
    overflow: hidden;
`;
export const DivPersonalPage = styled.div`
    width: 430px;
    height: 150px;
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;
export const DivAvatar = styled.div`
    width: 90px;
    height: 90px;
    position: relative;
    cursor: pointer;
`;
export const DivDot = styled.div`
    right: -43px;
    top: 3px;
    font-size: 2rem;
    position: absolute;
    color: ${(props) => props.color};
`;
export const HfullName = styled.h3`
    width: 100%;
    font-size: 1.8rem;
    text-align: center;
    color: ${(props) => props.color};
    margin: 15px 0 8px 0;
`;
export const Pstatus = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    color: ${(props) => props.color};
`;
export const DivChangeColorBG = styled.div`
    top: 35px;
    left: 52px;
    position: absolute;
    @media (min-width: 800px) {
        right: 93px;
        left: unset;
    }
`;
export const Apage = styled(Link)`
    width: 115px;
    height: 130px;
    display: flex;
    font-size: 100px;
    margin: 0 10px 20px;
    padding: 0 30px 30px;
    background-color: ${(props) => props.color};
    box-shadow: -9px 10px 14px black;
    align-items: center;
    justify-content: center;
    cursor: var(--pointer);
    color: #414547;
    border-radius: 5px;
    position: relative;
    transition: all 0.5s linear;
    &:hover {
        box-shadow: 0 0 1px transparent;
    }
    @media (min-width: 837px) {
        width: 189px;
        height: 200px;
    }
`;
export const DivContainerChangeP = styled.div`
    //parent
    width: 540px;
    margin-top: 40px;
    @media (min-width: 1220px) {
        width: 670px;
        margin-top: 80px;
    }
`;
export const DivContainerChangeC = styled.div`
    //Childred
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
`;
export const PtitleOptions = styled.p`
    width: 91%;
    display: flex;
    align-items: center;
    color: ${(props) => props.color};
    font-family: 'Item', sans-serif;
    font-size: 2.2rem;
`;
export const DivDate = styled.div`
    position: absolute;
    top: 50px;
    left: 100px;
    width: 400px;
    display: none;
    justify-content: space-evenly;
    color: ${(props) => props.color};
    @media (min-width: 1070px) {
        display: flex;
    }
`;
export const DivOptions = styled.div`
    width: 150px;
    font-size: 40px;
    color: rgba(64, 64, 64, 0.4509803922);
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @media (min-width: 837px) {
        font-size: 50px;
        justify-content: space-between;
    }
`;
export const DivElements = styled.div`
    display: flex;
    cursor: var(--pointer);
    color: ${(props) => props.color};
`;
