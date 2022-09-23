import styles from './bar.module.scss';
import clsx from 'clsx';
import { memo } from 'react';
interface bar {
    onClick?: () => void;
    notification?: boolean;
    send?: boolean;
    hideResultSearch?: boolean;
    nextBarWebsite?: boolean;
    hideResultSetting?: boolean;
    notificationLeft?: boolean;
    notificationRight?: boolean;
    notificationTop?: boolean;
    notificationBottom?: boolean;
    sendLeft?: boolean;
    sendRight?: boolean;
    sendBottom?: boolean;
    sendTop?: boolean;
    scrollUpNews?: boolean;
}
const Bar: React.FC<bar> = ({
    onClick,
    send = false,
    notification = false,
    hideResultSearch = false,
    nextBarWebsite = false,
    hideResultSetting,
    notificationLeft = false,
    notificationRight = false,
    notificationTop = false,
    notificationBottom = false,
    sendTop = false,
    sendBottom = false,
    sendLeft = false,
    sendRight = false,
    scrollUpNews = false,
}) => {
    console.log('sd');
    const ClassNames = clsx(
        {
            [styles.nextBarWebsite]: nextBarWebsite,
            [styles.hideResultSearch]: hideResultSearch,
            [styles.scrollUpNews]: scrollUpNews,
        },
        notification && {
            [styles.hideResultSetting]: hideResultSetting,
            [styles.notificationLeft]: notificationLeft,
            [styles.notificationRight]: notificationRight,
            [styles.notificationTop]: notificationTop,
            [styles.notificationBottom]: notificationBottom,
        },
        send && {
            [styles.sendTop]: sendTop,
            [styles.sendBottom]: sendBottom,
            [styles.sendLeft]: sendLeft,
            [styles.sendRight]: sendRight,
        },
    );

    const props = {
        onClick,
    };
    return (
        <div className={ClassNames} {...props}>
            <div className={clsx(styles.bar)}>
                <p className={clsx(styles.oneBar)}></p>
                <p className={clsx(styles.twoBar)}></p>
            </div>
        </div>
    );
};
export default memo(Bar);
