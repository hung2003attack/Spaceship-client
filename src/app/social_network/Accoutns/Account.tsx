import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './account.module.scss';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { useDispatch } from 'react-redux';
import { offPersonalPage, onPersonalPage, setIdUser } from '~/redux/hideShow';
import { profile } from 'console';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { useCookies } from 'react-cookie';

const Account: React.FC<{
    data: {
        id: string;
        avatar: string;
        fullName: string;
        nickName: string;
        gender: number;
    }[];
    location: string;
}> = ({ data, location }) => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(['k_user', 'tks']);
    const token = cookies.tks;
    const userId = cookies.k_user;
    const handleHistory = async (res: {
        id: string;
        avatar: string;
        fullName: string;
        nickName: string;
        gender: number;
    }) => {
        const result = await userAPI.setHistory(token, res);
        console.log('sss');
    };
    return (
        <>
            {data.map((res) => (
                <div
                    key={res.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleHistory(res);
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
