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
    justify-content: var(--justify-content-start);
    background-color: ${(props: { bg: number }) => (props.bg === 1 ? '#202023;' : '')};
    @media (min-width: 375px) {
        justify-content: center;
    }
`;

export const DivMainPage = styled.div`
    height: 100%;
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
    background-color: ${(props: { backgr: number }) => (props.backgr === 1 ? '#202023' : '')};
    overflow: hidden;
`;
interface PropsPersonal {
    width: string;
    height: string;
    margin?: string;
    wrap?: string;
    content?: string;
    css?: string;
}
export const DivPersonalPage = styled.div<PropsPersonal>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: ${(props) => props.margin};
    display: flex;
    flex-wrap: ${(props) => props.wrap};
    justify-content: ${(props) => props.content};
    align-items: center;
    border-radius: 5px;
    position: relative;
    ${(props) => props.css}
`;
export const DivAvatar = styled.div`
    width: 110px;
    height: 110px;
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;
    border: 1px solid var(--background-hover);
    ${(props: { css?: string }) => props.css}
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
    margin: 15px 0 0px 0;
`;
export const Pstatus = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    color: ${(props) => props.color};
    font-family: 'Robotol Straight', sans-serif;
`;
export const DivChangeColorBG = styled.div`
    top: 35px;
    left: 16px;
    position: absolute;
    @media (min-width: 800px) {
        right: 93px;
        left: unset;
    }
`;
export const Apage = styled(Link)`
    width: 111px;
    height: 130px;
    display: flex;
    font-size: 100px;
    margin: 0 10px 20px;
    padding: 0 30px 30px;
    background-color: ${(props: { color: string }) => (props.color === '#ffffffb8' ? '#cbcbcb ' : props.color)};
    box-shadow: -5px 7px 5px #00000082;
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
        width: 180px;
        height: 200px;
    }
`;
export const DivContainerChangeP = styled.div`
    //parent
    width: 540px;
    margin-top: 40px;
    padding-left: 10px;
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
    padding-left: 15px;
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
    width: 100%;
    font-size: 30px;
    color: rgba(64, 64, 64, 0.4509803922);
    display: flex;
    align-items: center;
    justify-content: start;

    @media (min-width: 837px) {
        font-size: 50px;
        justify-content: space-between;
    }
`;
export const DivElements = styled.div`
    display: flex;
    margin-right: 10px;
    cursor: var(--pointer);
    color: ${(props) => props.color};
`;
