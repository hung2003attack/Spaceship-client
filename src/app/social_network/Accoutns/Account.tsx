import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './account.module.scss';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { useDispatch } from 'react-redux';
import { offPersonalPage, onPersonalPage, setIdUser } from '~/redux/hideShow';
import { profile } from 'console';

const Account: React.FC<any> = ({ data, location }) => {
    console.log(window.location.host, 'data');
    const dispatch = useDispatch();
    return (
        <>
            {data.map((res: any) => (
                <div
                    key={res.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setIdUser([res.id]));
                        window.history.replaceState(null, 'perspnalPage', `/${location}/profile?id=${res.id}`);
                    }}
                    className={clsx(styles.userSearch)}
                >
                    <div className={clsx(styles.avatar)}>
                        <Avatar src={res.avatar || ''} alt={res.fullName} gender={res.gender} />
                    </div>
                    <div className={clsx(styles.title)}>
                        <h5 className={clsx(styles.fullname)}>{res.fullName}</h5>

                        {res.nickName && <p className={clsx(styles.nickname)}>{res.nickName}</p>}
                    </div>
                </div>
            ))}
        </>
    );
};

export default memo(Account);
