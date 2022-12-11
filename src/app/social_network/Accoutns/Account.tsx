import React, { memo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './account.module.scss';
import Avatar from '~/reUsingComponents/Avatars/Avatar';

const Account: React.FC<any> = ({ data }) => {
    return (
        <>
            {/* {data.map((res: any) => (
                <Link key={res.id} to={`/SN/@${res.id}`} target="_self" className={clsx(styles.userSearch)}>
                    <div className={clsx(styles.avatar)}>
                        <Avatar src={res.avatar} alt={res.last_name} />
                    </div>
                    <div className={clsx(styles.title)}>
                        <h5 className={clsx(styles.fullname)}>{res.full_name}</h5>

                        <p className={clsx(styles.nickname)}>{res.nickname}</p>
                    </div>
                </Link>
            ))} */}
        </>
    );
};

export default memo(Account);
