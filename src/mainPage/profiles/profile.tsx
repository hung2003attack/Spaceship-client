import clsx from 'clsx';
import React from 'react';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';
import styles from './profile.module.scss';
import { useDispatch } from 'react-redux';
import { onPersonalPage } from '~/redux/authenRD';
const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const handlePersonalPage = () => {
        dispatch(onPersonalPage());
    };
    return (
        <>
            <div className={clsx(styles.profile)} onClick={handlePersonalPage}>
                <div className={clsx(styles.avatar)}>
                    <Avatar src="" alt="" />
                </div>
                <div className={clsx(styles.name)}>Nguyễn Trọng Hùng</div>
                <p className={clsx(styles.status)}> I love you or I'll hate you</p>
            </div>
            <div className={clsx(styles.profile)} onClick={handlePersonalPage}>
                <div className={clsx(styles.avatar)}>
                    <Avatar
                        src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
                        alt=""
                    />
                </div>
                <div className={clsx(styles.name)}>Trần thì mỹ Đinh</div>
                <p className={clsx(styles.status)}>
                    what do you love and fuck the rest and I love you or I'll hate you
                </p>
            </div>
        </>
    );
};

export default Profile;
