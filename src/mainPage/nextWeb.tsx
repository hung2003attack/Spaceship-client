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
import HttpRequestUser, { PropsParamsById } from '~/restAPI/requestServers/accountRequest/user';
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
import { changeThree } from '~/redux/languageRD';

interface PropsRes {
    avatar: string;
    fullName: string;
    status: string;
    gender: number;
    sn: string;
    l: string;
    w: string;
}
export interface PropsBg {
    persistedReducer: {
        background: {
            colorText: string;
            colorBg: string;
        };
    };
}
const Website: React.FC = () => {
    const dispatch = useDispatch();
    const { colorText, colorBg } = useSelector((state: PropsBg) => state.persistedReducer.background);
    const [cookies, setCookie] = useCookies(['tks', 'k_user']);
    // const [darkShining, setDarkShining] = useState<boolean>(backgr);
    const [user, setUser] = useState<PropsRes>();
    useEffect(() => {
        //  const data = GetFriend.friend(dispatch);
        async function fectData() {
            const res: PropsRes = await HttpRequestUser.getById(cookies.tks, cookies.k_user, {
                avatar: 'avatar',
                fullName: 'fullname',
                status: 'status',
                gender: 'gender',
                sn: 'sn',
                l: 'l',
                w: 'w',
            });
            console.log(user, 'user');

            if (res) {
                setUser(res);
                dispatch(changeThree(res));
            }
        }
        fectData();
    }, []);

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

    return (
        <>
            <DivMainPage>
                {currentPageL(currentPage, optionWebsite)}
                {!optionWebsite && (
                    <DivListWebProfile backgr={colorBg}>
                        <DivDate color={colorText}>
                            <Time />
                        </DivDate>
                        <DivPersonalPage width="430px" height="150px" margin="10px" wrap="wrap" content="center">
                            <DivAvatar>
                                <Avatar
                                    src={user?.avatar || ''}
                                    alt={user?.fullName}
                                    gender={user?.gender}
                                    radius="50%"
                                    id={cookies.k_user}
                                />
                            </DivAvatar>
                            <HfullName color={colorText}>{user?.fullName}</HfullName>
                            <Pstatus color={colorText}>{user?.status}</Pstatus>
                        </DivPersonalPage>
                        <DivChangeColorBG>
                            <Background dispatch={dispatch} />
                        </DivChangeColorBG>
                        <DivContainerChangeP>
                            <DivContainerChangeC>
                                <PtitleOptions color={colorText}>{option ? 'Family' : 'Tap'}</PtitleOptions>
                                <DivOptions>
                                    <DivElements color={colorText} onClick={handleProfile}>
                                        <ProfileI />
                                    </DivElements>
                                    <DivElements color={colorText} onClick={handleWebsite}>
                                        <WebsiteI />
                                    </DivElements>
                                </DivOptions>
                            </DivContainerChangeC>
                            <DivContainer bg={colorBg}>
                                <CurrentOptions options={option} data={buttonPage} />
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
