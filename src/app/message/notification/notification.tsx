import { CloseI, MoveI, NotificationI, UndoI } from '~/assets/Icons/Icons';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import clsx from 'clsx';
import React, { memo, useState } from 'react';
import styles from './notification.module.scss';
import Move from '~/reUsingComponents/Bar/MoveBar';
const Notification: React.FC = () => {
    const [left, setlLeft] = useState<boolean>(false);
    const [bottom, setBottom] = useState<boolean>(false);
    const [move, setMove] = useState<boolean>(false);

    const [notification, setNotification] = useState<boolean>(false);

    const handleShowHide = () => {
        setNotification(!notification);
    };
    const handleMove = () => {
        setMove(!move);
    };
    const handleUndo = () => {
        setlLeft(false);
        setBottom(false);
        setMove(false);
    };
    return (
        <>
            {!notification && (
                <Hovertitle title="NoTi" notificationCL>
                    <div className={clsx('notification')} onClick={handleShowHide}>
                        <NotificationI />
                        <p className={clsx('miss')}>+</p>
                    </div>
                </Hovertitle>
            )}

            {notification && (
                <>
                    <div
                        className={clsx(styles.resultBar, {
                            [styles.left]: left,
                            [styles.bottom]: bottom,
                        })}
                    >
                        <div className={clsx(styles.moveClose)}>
                            <div className={clsx(styles.close)} onClick={handleShowHide}>
                                <CloseI />
                            </div>
                            {move && (
                                <div className={clsx(styles.undo)} onClick={handleUndo}>
                                    <UndoI />
                                </div>
                            )}
                            <div className={clsx(styles.move)} onClick={handleMove}>
                                <MoveI />
                            </div>
                        </div>
                        <div>results</div>

                        {move && (
                            <Move setlLeft={setlLeft} setBottom={setBottom} left={left} bottom={bottom} notification />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default memo(Notification);
