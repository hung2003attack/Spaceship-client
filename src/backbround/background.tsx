import React from 'react';
import { changeBg, changeText } from '~/redux/background';
import Images from '../app/assets/images';
import { DivBackground, Img } from './styleBackground';
interface Props {
    dispatch?: any;
}
const Background: React.FC<Props> = ({ dispatch }) => {
    const handleLight = () => {
        dispatch(changeBg('#ffffffb8'));
        dispatch(changeText('#333'));
    };
    const handleDark = () => {
        dispatch(changeBg('#202124'));
        dispatch(changeText('#cbcbcb'));
    };
    return (
        <DivBackground>
            <Img src={Images.light} alt="light" onClick={handleLight}></Img>
            <Img src={Images.dark} alt="dark" onClick={handleDark}></Img>
        </DivBackground>
    );
};
export default Background;
