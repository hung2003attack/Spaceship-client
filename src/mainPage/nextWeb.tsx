import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '~/reUsingComponents/Avatars/Avatar';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import Study from '../app/study';
import NextListWeb from './listWebs/ListWebs';
import ListWebBar from './listWebBar/listWebBar';
import { BookI, DotI, NewI, ProfileI, WebsiteI, WorkI } from '~/assets/Icons/Icons';
import Background from 'src/backbround/background';
import { onPersonalPage } from '~/redux/hideShow';
import HttpRequestUser, { PropsParamsById } from '~/restAPI/requestServers/socialNetwork/user';
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
import currentPageL from './CurrentPage';
import CurrentOptions from './CurrentOption';
import { changeMain } from '~/redux/background';
import { changeThree } from '~/redux/languageRD';

interface propsState {
    persistedReducer: {
        background: {
            main: boolean;
        };
    };
}
interface PropsRes {
    avatar: string;
    fullName: string;
    status: string;
    sn: string;
    l: string;
    w: string;
}
const Website: React.FC = () => {
    const dispatch = useDispatch();
    const backgr = useSelector((state: any) => state.persistedReducer.background?.main);
    const [cookies, setCookie] = useCookies(['tks', 'k_user']);
    const [darkShining, setDarkShining] = useState<boolean>(backgr);
    const [user, setUser] = useState<PropsParamsById>();
    useEffect(() => {
        //  const data = GetFriend.friend(dispatch);
        async function fectData() {
            const res: PropsRes = await HttpRequestUser.getById(cookies.tks, cookies.k_user, {
                avatar: 'avatar',
                fullName: 'fullname',
                status: 'status',
                sn: 'sn',
                l: 'l',
                w: 'w',
            });
            if (res) {
                dispatch(changeThree(res));
                setUser(res);
            }
        }
        fectData();
    }, []);
    useEffect(() => {
        dispatch(changeMain(darkShining));
    }, [darkShining]);
    const [optionWebsite, setOptionWebsite] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        return JSON.parse(localStorage.getItem('currentPage') || '{}').currentWeb;
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
            setCurrentPage(0);
            setOptionWebsite(false);
        }
    }

    useEffect(() => {
        localStorage.setItem('currentPage', JSON.stringify({ currentWeb: currentPage }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    window.addEventListener('popstate', reload);
    function reload() {
        setHrefState(document.location.href);
        reTap();
    }

    console.log('currentPage', currentPage);

    const hanNextWebsite1 = () => {
        setOptionWebsite(true);
        setCurrentPage(1);
        TagRef1.current = 'div';
    };
    const hanNextWebsite2 = () => {
        setOptionWebsite(true);
        setCurrentPage(2);
        TagRef2.current = 'header';
    };
    const hanNextWebsite3 = () => {
        setOptionWebsite(true);
        setCurrentPage(3);
        TagRef3.current = 'div';
    };
    useLayoutEffect(() => {
        reTap();
        console.log('setCurrentPage(0);');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hrefState]);

    const props2 = {
        optionWebsite,
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
    const changeColor = {
        profile: () => {
            return darkShining ? '#fff' : 'rgb(22, 22, 22)';
        },
        dark: () => {
            return darkShining ? 'var(--color-text-dark)' : 'var(--color-text-light)';
        },
        elementOp: () => {
            return {
                one: darkShining ? (option ? '#2f928a' : ' #929292') : option ? '#2f928a' : '#7e7e7e',
                two: darkShining ? (!option ? '#2f928a' : ' #929292') : !option ? '#2f928a' : '#7e7e7e',
            };
        },
        optionTitle: () => {
            return option ? 'Family' : 'Tap';
        },
    };

    return (
        <>
            <DivMainPage>
                {currentPageL(currentPage, optionWebsite)}
                {!optionWebsite && (
                    <DivListWebProfile color={changeColor.profile()}>
                        <DivDate color={changeColor.dark()}>
                            <Time />
                        </DivDate>
                        <DivPersonalPage width="430px" height="150px" margin="10px" wrap="wrap" content="center">
                            <DivAvatar>
                                <Avatar
                                    src={user?.avatar || ''}
                                    alt={user?.fullName}
                                    gender={0}
                                    radius="50%"
                                    id={cookies.k_user}
                                />

                                <DivDot color={changeColor.dark()} onClick={handleProfileMain}>
                                    <DotI />
                                </DivDot>
                            </DivAvatar>
                            <HfullName color={changeColor.dark()}>{user?.fullName}</HfullName>
                            <Pstatus color={changeColor.dark()}>{user?.status}</Pstatus>
                        </DivPersonalPage>
                        <DivChangeColorBG>
                            <Background setDarkShining={setDarkShining} />
                        </DivChangeColorBG>
                        <DivContainerChangeP>
                            <DivContainerChangeC>
                                <PtitleOptions color={changeColor.dark()}>{changeColor.optionTitle()}</PtitleOptions>
                                <DivOptions>
                                    <DivElements color={changeColor.elementOp().one} onClick={handleProfile}>
                                        <ProfileI />
                                    </DivElements>
                                    <DivElements color={changeColor.elementOp().two} onClick={handleWebsite}>
                                        <WebsiteI />
                                    </DivElements>
                                </DivOptions>
                            </DivContainerChangeC>
                            <DivContainer>
                                <CurrentOptions options={option} data={buttonPage} darkShining={darkShining} />
                            </DivContainer>
                        </DivContainerChangeP>
                    </DivListWebProfile>
                )}
                {optionWebsite && <ListWebBar {...props2} />}
            </DivMainPage>
        </>
    );
};

export default Website;
