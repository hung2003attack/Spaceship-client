import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './personalPage.module.scss';
import { useDispatch } from 'react-redux';
import { offPersonalPage } from '~/redux/hideShow';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import { CloseI, DotI } from '~/assets/Icons/Icons';
import Edit from '../editInformation/editInformation';
import Part from './result/result';
import { Img } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivContainer, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { DivPersonalPage } from '../styleNextWeb';

const Personalpage: React.FC<any> = ({ user, css }) => {
    console.log(user);

    const dispatch = useDispatch();
    const [edit, setEdit] = useState<boolean>(false);
    const handlePersonalPage = () => {
        dispatch(offPersonalPage());
    };
    const handloEdit = () => {
        setEdit(true);
    };
    console.log('personal');
    const cssDivPersonalPage = `
    @media (min-width: 600px){
        height: 60px;
    }@media (min-width: 1000px){
        height: 80px;
    }
`;

    return (
        <DivContainer css={css} wrap="wrap">
            <div className="personalPage">
                <div className="background">
                    {/* {user.background && ( */}
                    <Img
                        src="https://vaithuhayho.com/wp-content/uploads/2022/09/anh-gai-xinh-cute-50.jpg"
                        alt={user.fullName}
                    />
                    {/* )} */}
                </div>
                {/* <div className={clsx(styles.close)} onClick={handlePersonalPage}>
                <CloseI />
            </div> */}
                <DivPersonalPage width="90%" height="44px" margin="auto" css={cssDivPersonalPage}>
                    <div className="avatar">
                        <Avatar
                            src="https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-facebook-tiktok.jpg"
                            alt={user.fullName}
                            gender={user.gender}
                            radius="50%"
                        />
                    </div>
                    <div className="fullName">
                        <Hname>{user.fullName}</Hname>
                        <p className={clsx(styles.nickName)}>{user.nickName}I used to love you, but now will not</p>
                    </div>
                    <div className={clsx(styles.status)}>{user.status}</div>
                </DivPersonalPage>
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
                                        <p>Gender:</p>{' '}
                                        {user.gender == 0 ? 'Male' : user.gender == 1 ? 'Female' : 'LGBT+'}
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
        </DivContainer>
    );
};
export default Personalpage;
