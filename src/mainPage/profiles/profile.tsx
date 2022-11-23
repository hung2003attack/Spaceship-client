import clsx from 'clsx';
import React from 'react';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';
import styles from './profile.module.scss';
import { useDispatch } from 'react-redux';
import { onPersonalPage } from '~/redux/hideShow';
import { DivProfile, Pname } from './styleProfile';
import { Pstatus } from './styleProfile';
const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const handlePersonalPage = () => {
        dispatch(onPersonalPage());
    };
    return (
        <>
            {/* <DivProfile onClick={handlePersonalPage}>
                <div className={clsx(styles.avatar)}>
                    <Avatar src="" alt="" />
                </div>
                <Pname>Nguyễn Trọng Hùng</Pname>
                <Pstatus> I love you or I'll hate you</Pstatus>
            </DivProfile>
            <DivProfile onClick={handlePersonalPage}>
                <div className={clsx(styles.avatar)}>
                    <Avatar
                        src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
                        alt=""
                    />
                </div>
                <Pname>Trần thì mỹ Đinh</Pname>
                <Pstatus>what do you love and fuck the rest and I love you or I'll hate you</Pstatus>
            </DivProfile> */}
        </>
    );
};

export default Profile;
