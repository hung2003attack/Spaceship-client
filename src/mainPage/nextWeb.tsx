/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useLayoutEffect, useEffect, Suspense } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '~/reUsingComponents/Avatars/Avatar';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import ListWebBar from './listWebBar/listWebBar';
import { BookI, NewI, ProfileI, WebsiteI, WorkI } from '~/assets/Icons/Icons';
import Background from 'src/backbround/background';
import { onPersonalPage } from '~/redux/hideShow';
import HttpRequestUser from '~/restAPI/requestServers/accountRequest/user';
import CurrentPageL from './CurrentPage';
import {
    DivAvatar,
    DivPersonalPage,
    DivListWebProfile,
    DivMainPage,
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
import CurrentOptions from './CurrentOption';
import { changeThree } from '~/redux/languageRD';
import Progress from '~/reUsingComponents/Progress/Progress';

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
            colorBg: number;
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
            console.log(res, 'user heeheheh');

            setUser(res);
            dispatch(changeThree(res));
        }
        fectData();
        console.log('helllooo');

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log('userrrrrr', user);
    let dataUser;
    return (
        <>
            <DivMainPage>
                {user ? (
                    <>
                        <Suspense>
                            <CurrentPageL
                                currentPage={currentPage}
                                listPage={optionWebsite}
                                dataUser={{ avatar: user.avatar, fullName: user.fullName, gender: user.gender }}
                            />
                        </Suspense>
                        {!optionWebsite && (
                            <DivListWebProfile backgr={colorBg}>
                                <DivDate color={colorText}>
                                    <Time />
                                </DivDate>
                                <DivPersonalPage
                                    width="430px"
                                    height="150px"
                                    margin="10px"
                                    wrap="wrap"
                                    content="center"
                                >
                                    <DivAvatar>
                                        <Avatar
                                            profile
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
                                    1
                                </DivContainerChangeP>
                            </DivListWebProfile>
                        )}
                        {optionWebsite && <ListWebBar {...props2} colorBg={colorBg} colorText={colorText} />}
                    </>
                ) : (
                    <Progress
                        title={{
                            vn: 'Đang tải dữ liệu...',
                            en: 'loading data...',
                        }}
                    />
                )}
            </DivMainPage>
        </>
    );
};

export default Website;
