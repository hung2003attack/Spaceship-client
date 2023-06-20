import Notification from './Notification/Notification';

import './message.scss';
import Send from './Send/Send';
import { DivMs } from './styleMessage';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { PropsBg } from 'src/mainPage/nextWeb';
import { PropsUser } from 'src/App';

const Message: React.FC<{ dataUser: PropsUser; userOnline: string[] }> = ({ dataUser, userOnline }) => {
    const [width, setWidth] = useState<string>('');
    const { colorText, colorBg } = useSelector((state: PropsBg) => state.persistedReducer.background);
    const elRef = useRef<any>();
    const xRef = useRef<number | null>(null);
    const yRef = useRef<number | null>(null);

    const handleTouchMove = (e: any) => {
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const elementRect = elRef.current.getBoundingClientRect();
        console.log(x, y, viewportWidth, viewportHeight, elementRect);
        if (elRef.current) {
            if (viewportWidth - 20 >= x && x >= 15) {
                xRef.current = x - 20;
                elRef.current.style.left = `${x - 20}px`;
            }
            if (viewportHeight - 10 >= y && y >= 24) {
                yRef.current = y - 20;
                elRef.current.style.top = `${y - 40}px`;
            }
        }
        // Đặt vị trí cho phần tử
    };
    window.addEventListener('onload', reloadMs);
    function reloadMs() {
        console.log('not', width);

        setWidth(window.location.pathname);
    }
    return (
        <DivMs width="50px" top="60px" ref={elRef} onTouchMove={handleTouchMove}>
            <Notification dataUser={dataUser} userOline={userOnline} colorText={colorText} colorBg={colorBg} />
            <Send dataUser={dataUser} userOline={userOnline} colorText={colorText} colorBg={colorBg} />
        </DivMs>
    );
};

export default Message;
