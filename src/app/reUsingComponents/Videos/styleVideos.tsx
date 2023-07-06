import styled from 'styled-components';

export const Video = styled.video`
    width: 100%;
    background-color: black;
    cursor: var(--pointer);
`;
export const DivControls = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    color: #cbcbcb;
    position: absolute;
    bottom: -10px;
    transition: all 0.3s linear;
    @media (min-width: 768px) {
        bottom: -25px;
        z-index: 1;
    }
`;
export const Progress = styled.progress`
    width: 100%;
    height: 5px;
`;
interface PropsInput {
    bgImage: string;
    css?: string;
    bo?: boolean;
}
export const Input = styled.input<PropsInput>`
    -webkit-appearance: none;
    /* margin-right: 15px; */
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    background-repeat: no-repeat;
    background-image: ${(props) => props.bgImage};
    cursor: var(--pointer);
    ${(props) => props.css};
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 100%;
        width: 10px;
        ${(props) => (props.bo ? 'height: 10px;  border-radius: 50%; background: rgb(45, 108, 209);' : '')}
        box-shadow: 0 0 2px 0 #555;
        transition: 0.5s ease-in-out;
    }
    &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }
`;
