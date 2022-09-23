import clsx from 'clsx';
import Notification from './Notification/Notification';

import './message.scss';
import Send from './Send/Send';

const Message: React.FC = () => {
    console.log('not');
    return (
        <div className={clsx('messages')}>
            <Send />
            <Notification />
        </div>
    );
};

export default Message;
