import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';

import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import Study from '../app/study';
import NextListWeb from './listWebs/ListWebs';
import ListWebBar from './listWebBar/listWebBar';
import { BookI, DotI, NewI, ProfileI, WebsiteI, WorkI } from '~/assets/Icons/Icons';
import Background from 'src/backbround/background';
import { useDispatch, useSelector } from 'react-redux';
import { onPersonalPage } from '~/redux/hideShow';
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
import currentPageL from './CurrentPage';
import CurrentOptions from './CurrentOption';
import { changeMain } from '~/redux/background';
import Cookies from 'universal-cookie';
const cooke = new Cookies();
const Website: React.FC = () => {
    const dispatch = useDispatch();
    const backgr = useSelector((state: any) => state?.background?.main);
    const [darkShining, setDarkShining] = useState<boolean>(backgr);
    useEffect(() => {
        // const data = GetFriend.friend(dispatch);
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
    const Tag1 = TagRef1.current;
    const Tag2 = TagRef2.current;
    const Tag3 = TagRef3.current;
    // const props1 = {
    //     Tag1,
    //     Tag2,
    //     Tag3,
    //     nextWebsite,
    //     hanNextWebsite1,
    //     hanNextWebsite2,
    //     hanNextWebsite3,
    //     darkShining,
    // };
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
                        <DivPersonalPage>
                            <DivAvatar>
                                {/* <Avatar
                                    onClick={handleProfileMain}
                                    src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
                                    alt=""
                                /> */}

                                <DivDot color={changeColor.dark()} onClick={handleProfileMain}>
                                    <DotI />
                                </DivDot>
                            </DivAvatar>
                            <HfullName color={changeColor.dark()}>Nguyen Trong Hung</HfullName>
                            <Pstatus color={changeColor.dark()}>dang cam thay buon</Pstatus>
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
