/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useLayoutEffect, useEffect, Suspense } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '~/reUsingComponents/Avatars/Avatar';
import Button from '~/reUsingComponents/Buttoms/ListButton/Buttons';
import ListWebBar from './listWebBar/listWebBar';
import {
    BookI,
    DotI,
    EarthI,
    FriendI,
    GridDotI,
    HomeI,
    NewI,
    PeopleI,
    ProfileI,
    WebsiteI,
    WorkI,
} from '~/assets/Icons/Icons';
import Background from 'src/backbround/background';
import { onPersonalPage, setTrueErrorServer } from '~/redux/hideShow';
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
import { io } from 'socket.io-client';
import Tools from './Tools/Tools';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';
import Profile from './profiles/profile';
import NextListWeb from './listWebs/ListWebs';
import PeopleRequest from '~/restAPI/requestServers/socialNetwork/people';
import WarningBrowser from '~/reUsingComponents/ErrorBoudaries/Warning_browser';
export const socket = io('http://localhost:3001', { transports: ['websocket'] });

interface PropsRes {
    avatar: string;
    fullName: string;
    status: string | number;
    gender: number;
    sn: string;
    l: string;
    w: string;
    as: number;
    warning_browser?: { err: number; dateTime: string; prohibit: boolean };
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
    const [userOnline, setUserOnline] = useState<string[]>([]);
    // const [friends, setFriends] = useState<{ idFriend: string }[]>([]);
    const [friendsOnline, setFriendsOnline] = useState<number>(0);
    const [friends, setFriends] = useState<{ idFriend: string; idCurrentUser: string }[]>([]);
    const [warningBrs, setWarningBrs] = useState<
        | {
              dateTime: string;
              err: number;
              prohibit: boolean;
          }
        | undefined
    >();
    const userId = cookies.k_user;
    useEffect(() => {
        //  const data = GetFriend.friend(dispatch);
        async function fectData() {
            const res: PropsRes = await HttpRequestUser.getById(cookies.tks, cookies.k_user, {
                avatar: 'avatar',
                fullName: 'fullname',
                status: 'status',
                gender: 'gender',
                as: 'as',
                sn: 'sn',
                l: 'l',
                w: 'w',
            });
            if (res?.status === 9999) {
                dispatch(setTrueErrorServer(''));
            } else {
                console.log(res, 'user heeheheh');
                if (res?.fullName) {
                    setUser(res);
                    setWarningBrs(res?.warning_browser);
                    dispatch(changeThree(res));
                }
                const friends: { idFriend: string; idCurrentUser: string }[] = await PeopleRequest.getfriendAll(
                    cookies.tks,
                );
                setFriends(friends);
            }
        }
        fectData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(friends);
    useEffect(() => {
        const browserId = navigator.userAgent;
        socket.on(userId + browserId + 'browserId', (data) => {
            console.log(JSON.parse(data));
            setWarningBrs(JSON.parse(data));
        });
    }, []);
    useEffect(() => {
        if (user?.as !== 0) {
            socket.emit('sendId', userId);
            socket.on('user connectedd', (re) => {
                console.log(`connected`, JSON.parse(re));
                setUserOnline(JSON.parse(re));
            });
            socket.on('user disconnected', (re) => {
                setUserOnline(JSON.parse(re));
                console.log('user disconnected', JSON.parse(re));
            });
        } else {
            socket.emit('offline', userId);
        }
    }, [user]);
    useEffect(() => {
        const am = friends?.reduce((total, value) => {
            return (userOnline.includes(value.idFriend) && !value.idFriend.includes(userId)) ||
                (userOnline.includes(value.idCurrentUser) && !value.idCurrentUser.includes(userId))
                ? total + 1
                : total;
        }, 0);
        setFriendsOnline(am);
        console.log(userOnline, 'dd');
    }, [friends, userOnline.length]);
    const [optionWebsite, setOptionWebsite] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        return JSON.parse(localStorage.getItem('currentPage') || '{}').currentWeb;
    });

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
    const handleNextStart = () => {
        setOptionWebsite(false);
        setCurrentPage(0);
    };
    const hanNextWebsite1 = () => {
        setOptionWebsite(true);
        setCurrentPage(1);
    };
    const hanNextWebsite2 = () => {
        setOptionWebsite(true);
        setCurrentPage(2);
    };
    const hanNextWebsite3 = () => {
        setOptionWebsite(true);
        setCurrentPage(3);
    };
    useLayoutEffect(() => {
        reTap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hrefState]);

    const props2 = {
        handleNextStart,
        hanNextWebsite1,
        hanNextWebsite2,
        hanNextWebsite3,
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
    const [option, setOption] = useState<React.ReactNode>(<NextListWeb data={buttonPage} />);

    const handleProfile = () => {
        setOption(<Profile />);
    };
    const handleWebsite = () => {
        setOption(<NextListWeb data={buttonPage} />);
    };
    const handleProfileMain = () => {
        dispatch(onPersonalPage());
    };

    console.log('userrrrrr', user);
    return (
        <>
            <DivMainPage>
                {warningBrs && (
                    <WarningBrowser currentPage={currentPage} warningBros={warningBrs} setWarningBrs={setWarningBrs} />
                )}
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
                                    <DivAvatar
                                        css={`
                                            ${userOnline.includes(userId) ? 'border: 2px solid #418a7a;' : ''}
                                        `}
                                    >
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
                                        <DivOptions>
                                            <DivElements color={colorText} onClick={handleWebsite}>
                                                <WebsiteI />
                                            </DivElements>
                                            <DivElements color={colorText} onClick={handleProfile}>
                                                <ProfileI />
                                            </DivElements>
                                            <DivElements
                                                color={colorText}
                                                onClick={() =>
                                                    setOption(
                                                        <Tools colorText={colorText} colorBg={colorBg} as={user.as} />,
                                                    )
                                                }
                                            >
                                                <GridDotI />
                                            </DivElements>
                                            <Div
                                                css={`
                                                    position: absolute;
                                                    top: 139px;
                                                    flex-direction: column;
                                                    font-size: 22px;
                                                    left: 18px;
                                                    color: ${colorText};
                                                `}
                                            >
                                                <Div>
                                                    <EarthI /> <P>{userOnline.length}</P>
                                                </Div>
                                                <Div>
                                                    <FriendI /> <P>{friendsOnline}</P>
                                                </Div>
                                            </Div>
                                        </DivOptions>
                                    </DivContainerChangeC>
                                    <DivContainer bg={colorBg}>{option}</DivContainer>
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
