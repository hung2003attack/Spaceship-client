import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Socialnetwork from '~/social_network';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';

import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import Study from '../app/study';
import NextListWeb from './listWebs/ListWebs';
import ListWebBar from './listWebBar/listWebBar';
import { BookI, DotI, NewI, ProfileI, WebsiteI, WorkI } from '~/assets/Icons/Icons';
import Profile from './profiles/profile';
import Background from 'src/backbround/background';
import { useDispatch, useSelector } from 'react-redux';
import { onPersonalPage } from '~/redux/authenRD';
import GetFriend from '~/restAPI/requestGetDate/friends';

import {
    DivAvatar,
    DivPersonalPage,
    DivListWebProfile,
    DivMainPage,
    DivDot,
    HfullName,
    Pstatus,
    DivChangeColorBG,
    Apage,
    DivContainer,
    DivOptions,
    PtitleOptions,
    DivDate,
    DivElements,
    DivContainerChangeC,
    DivContainerChangeP,
} from './styleNextWeb';
import Time from './DateTime/DateTime';
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
        return JSON.parse(localStorage.getItem('threeWebsites') || '{}').currentWeb;
    });

    const [option, setOption] = useState<boolean>(false);
    const TagRef1 = useRef<any>(Button);
    const TagRef2 = useRef<any>(Button);
    const TagRef3 = useRef<any>(Button);
    const [hrefState, setHrefState] = useState<string>('');
    function reTap() {
        if (
            window.location.pathname.includes('SN') &&
            !window.location.pathname.includes('SD') &&
            !window.location.pathname.includes('W')
        ) {
            hanNextWebsite1();
        } else if (
            window.location.pathname.includes('SD') &&
            !window.location.pathname.includes('SN') &&
            !window.location.pathname.includes('W')
        ) {
            hanNextWebsite2();
        } else if (
            window.location.pathname.includes('W') &&
            !window.location.pathname.includes('SD') &&
            !window.location.pathname.includes('SN')
        ) {
            hanNextWebsite3();
        } else {
            setThreeWebsites(0);
            setNextWebsite(false);
        }
    }

    useEffect(() => {
        localStorage.setItem('threeWebsites', JSON.stringify({ currentWeb: threeWebsites }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threeWebsites]);
    window.addEventListener('popstate', reload);
    function reload() {
        setHrefState(document.location.href);
        // setThreeWebsites(0);
        // window.history.go();
        console.log('ok ok ok', hrefState, threeWebsites);
        reTap();
    }

    console.log('threeWebsites', threeWebsites);

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
    useLayoutEffect(() => {
        reTap();
        console.log('setThreeWebsites(0);');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hrefState]);
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
    const buttonPage = [
        {
            Tag: Apage,
            link: '/SN',
            next: hanNextWebsite1,
            name: 'News',
            icon: <NewI />,
        },
        {
            Tag: Apage,
            link: '/SD',
            next: hanNextWebsite2,
            name: 'Study',
            icon: <BookI />,
        },
        {
            Tag: Apage,
            link: '/W',
            next: hanNextWebsite3,
            name: 'Work',
            icon: <WorkI />,
        },
    ];
    console.log(user);

    return (
        <>
            <DivMainPage>
                {nextWebsite && (
                    <>
                        {threeWebsites === 1 && <Socialnetwork />}
                        {threeWebsites === 2 && <Study />}
                        {threeWebsites === 3 && <div>hello personal</div>}
                    </>
                )}
                {!nextWebsite && (
                    <DivListWebProfile color={darkShining ? '#fff' : 'rgb(22, 22, 22)'}>
                        <DivDate color={darkShining ? 'var(--color-text-dark)' : 'var(--color-text-light)'}>
                            <Time />
                        </DivDate>
                        <DivPersonalPage>
                            <DivAvatar>
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
                                <DivDot color={darkShining ? 'rgb(51, 51, 51)' : '#cbcbcb'} onClick={handleProfileMain}>
                                    <DotI />
                                </DivDot>
                            </DivAvatar>
                            <HfullName color={darkShining ? 'var(--color-text-dark)' : 'var(--color-text-light)'}>
                                {user?.fullName}
                            </HfullName>
                            <Pstatus color={darkShining ? 'rgb(51, 51, 51)' : '#cbcbcb'}>dang cam thay buon</Pstatus>
                        </DivPersonalPage>
                        <DivChangeColorBG>
                            <Background setDarkShining={setDarkShining} />
                        </DivChangeColorBG>
                        <DivContainerChangeP>
                            <DivContainerChangeC>
                                <PtitleOptions color={darkShining ? '#333' : '#cbcbcb'}>
                                    {option ? 'Family' : 'Tap'}
                                </PtitleOptions>
                                <DivOptions>
                                    <DivElements
                                        color={
                                            darkShining
                                                ? option
                                                    ? '#2f928a'
                                                    : ' #929292'
                                                : option
                                                ? '#2f928a'
                                                : '#7e7e7e'
                                        }
                                        onClick={handleProfile}
                                    >
                                        <ProfileI />
                                    </DivElements>
                                    <DivElements
                                        color={
                                            darkShining
                                                ? !option
                                                    ? '#2f928a'
                                                    : ' #929292'
                                                : !option
                                                ? '#2f928a'
                                                : '#7e7e7e'
                                        }
                                        onClick={handleWebsite}
                                    >
                                        <WebsiteI />
                                    </DivElements>
                                </DivOptions>
                            </DivContainerChangeC>

                            <DivContainer color={darkShining ? '' : 'rgb(192 192 192)'}>
                                {option ? <Profile /> : <NextListWeb data={buttonPage} darkShining={darkShining} />}
                            </DivContainer>
                        </DivContainerChangeP>
                    </DivListWebProfile>
                )}
                {nextWebsite && <ListWebBar {...props2} />}
            </DivMainPage>
        </>
    );
};

export default Website;
