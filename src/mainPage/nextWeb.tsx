import clsx from 'clsx';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Socialnetwork from '~/social_network';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';

import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import styles from './nextWeb.module.scss';
import Study from '../app/study';
import NextListWeb from './listWebs/listWebs';
import ListWebBar from './listWebBar/listWebBar';
import SearchWeb from './searchProfle/searchWeb';
import { DotI, ProfileI, WebsiteI } from '~/assets/Icons/Icons';
import Profile from './profiles/profile';
import Background from 'src/backbround/background';
import { useDispatch, useSelector } from 'react-redux';
import { onPersonalPage } from '~/redux/authenRD';
import GetFriend from '~/restAPI/requestGetDate/friends';
const Website: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.login.currentUser?.user);

    const [darkShining, setDarkShining] = useState<boolean>(() => {
        const store = JSON.parse(localStorage.getItem('darkShining') || '{}') || false;
        return store.darkShiningMain;
    });
    useEffect(() => {
        // const data = GetFriend.friend(dispatch);
    }, []);
    useEffect(() => {
        localStorage.setItem('darkShining', JSON.stringify({ darkShiningMain: darkShining }));
    }, [darkShining]);

    const [nextWebsite, setNextWebsite] = useState<boolean>(false);
    const [threeWebsites, setThreeWebsites] = useState<number>(() => {
        return JSON.parse(localStorage.getItem("threeWebsites") || '{}').currentWeb || 0
    });
    useEffect(() => {
        localStorage.setItem("threeWebsites", JSON.stringify({ currentWeb: threeWebsites }))
    }, [threeWebsites]);
    const [option, setOption] = useState<boolean>(false);
    const TagRef1 = useRef<any>(Button);
    const TagRef2 = useRef<any>(Button);
    const TagRef3 = useRef<any>(Button);

    const localhostRef = useRef<any>('http://localhost:3000');
    const hrefRef = useRef<string>(`${window.location.href}`);
    const ref = useRef<any>(`${window.location.href}`);
    const [hrefState, setHrefState] = useState<string>('');

    window.addEventListener('popstate', (e) => {
        setHrefState(document.location.href);
        setThreeWebsites(0);
        window.history.go();
    });

    useEffect(() => {
        if (hrefState !== '') {
            hrefRef.current = hrefState;
        }
    }, [hrefState]);
    const hanNextWebsite1 = () => {
        setNextWebsite(true);
        setThreeWebsites(1);
        TagRef1.current = 'div';
    };

    const hanNextWebsite2 = () => {
        setNextWebsite(true);
        setThreeWebsites(2);
        TagRef2.current = 'header';
    };
    const hanNextWebsite3 = () => {
        setNextWebsite(true);
        setThreeWebsites(3);
        TagRef3.current = 'div';
    };

    if (ref.current !== 'http://localhost:3000/') {
        ref.current = hrefRef.current.indexOf(':3000');
        console.log(ref.current, `${hrefRef.current.slice(0, ref.current + 5)}`);
        localhostRef.current = `${hrefRef.current.slice(0, ref.current + 5)}`;

        console.log(
            `${hrefRef.current}` === `${hrefRef.current.slice(ref.current + isFinite(ref.current) && 0)}`,
            hrefRef.current,
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    console.log(`${localhostRef.current}/`, hrefRef.current);
    console.log(
        `${hrefRef.current}` === `${hrefRef.current.slice(ref.current + isFinite(ref.current) && 0)}` &&
        `${hrefRef.current}` !== `${localhostRef.current}/` &&
        `${hrefRef.current}` !== `${localhostRef.current}/SD` &&
        `${hrefRef.current}` !== `${localhostRef.current}/W`,
        hrefRef.current === `${localhostRef.current}/SN`,
    );

    useLayoutEffect(() => {
        if (
            hrefRef.current === `${localhostRef.current}/SN` ||
            (`${hrefRef.current}` === `${hrefRef.current.slice(ref.current + isFinite(ref.current) && 0)}` &&
                `${hrefRef.current}` !== `${localhostRef.current}/` &&
                `${hrefRef.current}` !== `${localhostRef.current}/SD` &&
                `${hrefRef.current}` !== `${localhostRef.current}/W`)
        ) {
            hanNextWebsite1();
        } else if (
            hrefRef.current === `${localhostRef.current}/SD` ||
            (`${hrefRef.current}` === `${hrefRef.current.slice(ref.current + isFinite(ref.current) && 0)}` &&
                `${hrefRef.current}` !== `${localhostRef.current}/` &&
                `${hrefRef.current}` !== `${localhostRef.current}/SN` &&
                `${hrefRef.current}` !== `${localhostRef.current}/W`)
        ) {
            hanNextWebsite2();
        } else if (
            hrefRef.current === `${localhostRef.current}/W` ||
            (`${hrefRef.current}` === `${hrefRef.current.slice(ref.current + isFinite(ref.current) && 0)}` &&
                `${hrefRef.current}` !== `${localhostRef.current}/` &&
                `${hrefRef.current}` !== `${localhostRef.current}/SD` &&
                `${hrefRef.current}` !== `${localhostRef.current}/SN`)
        ) {
            hanNextWebsite3();
        } else {
            setThreeWebsites(0);
            setNextWebsite(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hrefRef.current || hrefState]);
    const Tag1 = TagRef1.current;
    const Tag2 = TagRef2.current;
    const Tag3 = TagRef3.current;
    const props1 = {
        Tag1,
        Tag2,
        Tag3,
        nextWebsite,
        hanNextWebsite1,
        hanNextWebsite2,
        hanNextWebsite3,
        darkShining,
    };
    const props2 = {
        nextWebsite,
        hanNextWebsite1,
        hanNextWebsite2,
        hanNextWebsite3,
    };
    const handleProfile = () => {
        setOption(true);
    };
    const handleWebsite = () => {
        setOption(false);
    };
    const handleProfileMain = () => {
        dispatch(onPersonalPage());
    };

    return (
        <>
            <div className={clsx('Website')}>
                {nextWebsite && (
                    <>
                        {threeWebsites === 1 && <Socialnetwork />}
                        {threeWebsites === 2 && <Study />}
                        {threeWebsites === 3 && <div>hello personal</div>}
                    </>
                )}
                {!nextWebsite && (
                    <div className={clsx(styles.nextWebsite, { [styles.darkShining]: darkShining })}>
                        <div className={clsx(styles.personalPage)}>
                            <div className={clsx(styles.avatar)}>
                                {/* <Avatar
                                    onClick={handleProfileMain}
                                    src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
                                    alt=""
                                /> */}
                                <Avatar
                                    imageEditor
                                    image={user?.avatar ? user.avatar : 'nothing'}
                                    width={90}
                                    height={90}
                                    border={0}
                                    borderRadius={500}
                                    moveAvatar
                                />
                                <div className={clsx(styles.dot)} onClick={handleProfileMain}>
                                    <DotI />
                                </div>
                            </div>
                            <div className={clsx(styles.name, { [styles.color]: darkShining })}>{user?.fullName}</div>
                            <p className={clsx(styles.status, { [styles.color]: darkShining })}>{user?.status}</p>
                        </div>
                        <Background setDarkShining={setDarkShining} />
                        <div className={clsx(styles.currentOptions)}>
                            {option && <SearchWeb check={darkShining} />}
                            <div
                                className={clsx(styles.options, {
                                    [styles.margin]: !option,
                                })}
                            >
                                <div
                                    className={clsx(
                                        styles.profile,
                                        !darkShining ? { [styles.choosed]: option } : { [styles.choosedD]: option },
                                    )}
                                    onClick={handleProfile}
                                >
                                    <ProfileI />
                                </div>
                                <div
                                    className={clsx(
                                        styles.website,
                                        !darkShining ? { [styles.choosed]: !option } : { [styles.choosedD]: !option },
                                    )}
                                    onClick={handleWebsite}
                                >
                                    <WebsiteI />
                                </div>
                            </div>
                        </div>

                        <div className={clsx(styles.list, darkShining && styles.listT)}>
                            {option ? <Profile /> : <NextListWeb {...props1} />}
                        </div>
                    </div>
                )}
                {nextWebsite && <ListWebBar {...props2} />}
            </div>
        </>
    );
};

export default Website;
