import React from 'react';
import clsx from 'clsx';
import Images from '../app/assets/images';
import styles from './background.module.scss';
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
        <div className={clsx(styles.background)}>
            <img src={Images.light} alt="light" onClick={handleLight} />
            <img src={Images.dark} alt="dark" onClick={handleDark} />
        </div>
    );
};
export default Background;
