import clsx from 'clsx';
import { Key, memo, useEffect, useRef, useState } from 'react';
import { ImageI, SignatureI } from '~/assets/Icons/Icons';
import styles from './home.module.scss';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Move from '~/reUsingComponents/Bar/MoveBar';
import * as httpRequest from '~/restAPI/requestGetDate/socialNetwork/home';
import httpRequestHome from '~/restAPI/requestGetDate/socialNetwork/home';
import { authFailed, logOutSuccess } from '~/redux/reducer';
import refreshToken from '~/refreshToken/refreshToken';
const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.auth.login);
    const user = currentUser?.user;

    useEffect(() => {
        if (!user) {
            dispatch(logOutSuccess());
            dispatch(authFailed());
            return;
        } else if (user?.accessToken) {
            const axiosJWTss = refreshToken.axiosJWTs(currentUser, dispatch);
            httpRequestHome.news(user?.accessToken, dispatch, axiosJWTss);
        }
    }, []);
    const [userList, setUserList] = useState();
    const upLoadRef = useRef<any>();
    const [upLoad, setUpLoad] = useState<any>([]);
    const [moveForm, setMoveForm] = useState<boolean>(false);
    // const handleUpload = (e: any) => {
    //     setUpLoad([...upLoad, e.target.files]);
    //     console.log(e.target.files);
    // };
    const [scroll, setScroll] = useState<boolean>(false);
    document.onscroll = () => {
        const scrolls = Math.round(window.scrollY || document.documentElement.scrollTop);

        if (scrolls >= 117) {
            setScroll(true);
        } else {
            setScroll(false);
            setMoveForm(false);
        }
    };
    console.log('home');

    return (
        <div className={clsx(styles.home)}>
            <div className={clsx(styles.form, { [styles.scroll]: scroll, [styles.move]: moveForm })}>
                <form encType="multipart/form-data" className={clsx({ [styles.formChildren]: scroll })}>
                    <div className={clsx(styles.upNews)}>
                        <input type="text" placeholder="breaking news" className={clsx(styles.input)} />
                        <div className={clsx(styles.tools)}>
                            <div className={clsx(styles.upImage)}>
                                <ImageI />
                            </div>
                            <div className={clsx(styles.signature)}>
                                <SignatureI />
                            </div>
                        </div>

                        {/* <input type="file" name="file[]" onChange={handleUpload} multiple /> */}
                    </div>
                    {scroll && <Move setMoveForm={setMoveForm} moveForm={moveForm} scrollUpNews />}
                </form>
            </div>
            {/* {upLoad.length > 0 &&
                upLoad.map((image: any, index: Key | null | undefined) => <img key={index} src={image[0].name} />)} */}
            <div className={clsx(styles.news)}>Xin chào mọi nguòi</div>
            <div className={clsx(styles.news)}>Xin chào mọi nguòi</div>
        </div>
    );
};

export default memo(Home);
