import React from 'react';
import { changeBg, changeText } from '~/redux/background';
import Images from '../app/assets/images';
import { DivBackground } from './styleBackground';
import { Img } from '~/reUsingComponents/styleComponents/styleDefault';
interface Props {
    dispatch?: any;
}
const Background: React.FC<Props> = ({ dispatch }) => {
    const handleLight = () => {
        dispatch(changeBg(2));
        dispatch(changeText('#333'));
    };
    const handleDark = () => {
        dispatch(changeBg(1));
        dispatch(changeText('#cbcbcb'));
    };
    return (
        <DivBackground>
            <Img src={Images.light} alt="light" onClick={handleLight} css="cursor: pointer"></Img>
            <Img src={Images.dark} alt="dark" onClick={handleDark} css="cursor: pointer"></Img>
        </DivBackground>
    );
};
export default Background;
