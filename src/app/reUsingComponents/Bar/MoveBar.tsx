import Bar from './Bar';
import React, { useCallback, useContext } from 'react';
interface MoveI {
    //useState
    setlLeft?: any;
    setBottom?: any;
    left?: any;
    bottom?: any;
    setMoveForm?: any;
    moveForm?: any;
    // class
    notificationLeft?: boolean;
    notificationRight?: boolean;
    notificationTop?: boolean;
    notificationBottom?: boolean;
    send?: boolean;
    notification?: boolean;
    scrollUpNews?: boolean;
}
const Move: React.FC<MoveI> = ({
    setlLeft,
    setBottom,
    bottom,
    left,
    setMoveForm,
    moveForm,
    send = false,
    notification = false,
    scrollUpNews = false,
}) => {
    console.log('disable');

    const handleLeftMove = useCallback(() => {
        setlLeft(!left);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [left]);

    const handleBottomMove = useCallback(() => {
        setBottom(!bottom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bottom]);
    const handleMoveUpNews = useCallback(() => {
        setMoveForm(!moveForm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moveForm]);

    return (
        <>
            {!scrollUpNews && (
                <>
                    <Bar notification={notification} notificationLeft onClick={handleLeftMove} send={send} sendLeft />
                    <Bar notification={notification} notificationRight onClick={handleLeftMove} send={send} sendRight />
                    <Bar notification={notification} notificationTop onClick={handleBottomMove} send={send} sendTop />
                    <Bar
                        notification={notification}
                        notificationBottom
                        onClick={handleBottomMove}
                        send={send}
                        sendBottom
                    />
                </>
            )}

            {scrollUpNews && <Bar onClick={handleMoveUpNews} scrollUpNews={scrollUpNews} />}
        </>
    );
};

export default Move;
