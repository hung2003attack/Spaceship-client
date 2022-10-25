import clsx from 'clsx';
import Notification from './Notification/Notification';

import './message.scss';
import Send from './Send/Send';
import { DivMs } from './styleMessage';

const Message: React.FC = () => {
    console.log('not');
    return (
        <DivMs>
            <Notification />
            <Send />
        </DivMs>
    );
};

export default Message;
