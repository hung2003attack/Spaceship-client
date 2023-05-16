import Notification from './Notification/Notification';

import './message.scss';
import Send from './Send/Send';
import { DivMs } from './styleMessage';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PropsBg } from 'src/mainPage/nextWeb';

const Message: React.FC = () => {
    const [width, setWidth] = useState<string>('');
    const { colorText, colorBg } = useSelector((state: PropsBg) => state.persistedReducer.background);

    window.addEventListener('onload', reloadMs);
    function reloadMs() {
        console.log('not', width);

        setWidth(window.location.pathname);
    }
    return (
        <DivMs width="50px" top="60px">
            <Notification colorText={colorText} colorBg={colorBg} />
            <Send colorText={colorText} colorBg={colorBg} />
        </DivMs>
    );
};

export default Message;
