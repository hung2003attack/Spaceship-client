import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './personalPage.module.scss';
import { useDispatch } from 'react-redux';
import { offPersonalPage } from '~/redux/hideShow';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import { CloseI, DotI } from '~/assets/Icons/Icons';
import Edit from '../editInformation/editInformation';
import Part from './result/result';

const Personalpage: React.FC<any> = ({ user }) => {
    console.log(user);

    const dispatch = useDispatch();
    const [edit, setEdit] = useState<boolean>(false);
    const handlePersonalPage = () => {
        dispatch(offPersonalPage());
    };
    const handloEdit = () => {
        setEdit(true);
    };

    return (
        <div className={clsx(styles.personalPage)}>
            <div className={clsx(styles.background)}>
                {user.background && (
                    <img src="https://phunugioi.com/wp-content/uploads/2021/11/Anh-nhom-dep-2.jpg" alt="" />
                )}
            </div>
            {/* <div className={clsx(styles.close)} onClick={handlePersonalPage}>
                <CloseI />
            </div> */}
            <div className={clsx(styles.avatar)}>
                {/* <Avatar
                    imageEditor
                    image={user.avatar ? user.avatar : 'nothing'}
                    width={150}
                    height={150}
                    border={0}
                    borderRadius={150}
                    moveAvatar
                /> */}
            </div>
            <div className={clsx(styles.fullName)}>
                {user.fullName}
                <p className={clsx(styles.nickName)}>----- {user.nickName} -----</p>
            </div>
            <div className={clsx(styles.status)}>{user.status}</div>
            <div className={clsx(styles.introduction)}>
                <div className={clsx(styles.information)}>
                    {edit ? (
                        <Edit />
                    ) : (
                        <>
                            <div className={clsx(styles.dot)} onClick={handloEdit}>
                                <DotI />
                            </div>
                            {user.birthDate && (
                                <div className={clsx(styles.details)}>
                                    <p>BirthDate:</p> {user.birthDate}
                                </div>
                            )}
                            {isNaN(user.phoneNumberEmail) && user.phoneNumberEmail && (
                                <div className={clsx(styles.details)}>
                                    <p>Email:</p>
                                    {user.phoneNumberEmail}
                                </div>
                            )}
                            {!isNaN(user.phoneNumberEmail) && user.phoneNumberEmail && (
                                <div className={clsx(styles.details)}>
                                    <p>Phone:</p> {user.phoneNumberEmail}
                                </div>
                            )}
                            {user.adress && (
                                <div className={clsx(styles.details)}>
                                    <p>Adress:</p> {user.adress}
                                </div>
                            )}
                            {user.gender && (
                                <div className={clsx(styles.details)}>
                                    <p>Gender:</p> {user.gender == 0 ? 'Male' : user.gender == 1 ? 'Female' : 'LGBT+'}
                                </div>
                            )}
                            {user.hobby && (
                                <div className={clsx(styles.details)}>
                                    <p>hobby:</p> {user.hobby}
                                </div>
                            )}
                            {user.experience && (
                                <div className={clsx(styles.details)}>
                                    <p>Strengths:</p> {user.strengths}
                                </div>
                            )}
                            {user.skill && (
                                <div className={clsx(styles.details)}>
                                    <p>Skill:</p> {user.skill}
                                </div>
                            )}
                            {user.occupation && (
                                <div className={clsx(styles.details)}>
                                    <p>Occupation:</p> {user.occupation}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className={clsx(styles.myStores)}>
                    <div className={clsx(styles.optionBar)}>
                        <div className={clsx(styles.posts)}>post</div>
                        <div className={clsx(styles.friends)}>
                            <Button f friend />
                        </div>
                    </div>
                    <Part />
                    <div className={clsx(styles.results)}>hello it's my friend</div>
                </div>
            </div>
        </div>
    );
};
export default Personalpage;
