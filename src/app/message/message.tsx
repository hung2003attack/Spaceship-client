import Notification from './Notification/Notification';

import './message.scss';
import Send from './Send/Send';
import { DivMs } from './styleMessage';
import { useState } from 'react';

const Message: React.FC = () => {
    const [width, setWidth] = useState<string>('');

    window.addEventListener('onload', reloadMs);
    function reloadMs() {
        console.log('not', width);

        setWidth(window.location.pathname);
    }
    return (
        <DivMs
            about={width === '' ? 'left: 10px;flex-direction: column-reverse;' : 'right: 10px'}
            width="50px"
            top="47px"
        >
            <Notification />
            <Send />
        </DivMs>
    );
};

export default Message;
