import React from 'react';
import Images from '../app/assets/images';
import { DivBackground, Img } from './styleBackground';
interface Props {
    setDarkShining?: any;
}
const Background: React.FC<Props> = ({ setDarkShining }) => {
    const handleLight = () => {
        setDarkShining(true);
        console.log('light');
    };
    const handleDark = () => {
        setDarkShining(false);

        console.log('dark');
    };
    return (
        <DivBackground>
            <Img src={Images.light} alt="light" onClick={handleLight} ></Img>
            <Img src={Images.dark} alt="dark" onClick={handleDark} ></Img>
        </DivBackground>
    );
};
export default Background;
