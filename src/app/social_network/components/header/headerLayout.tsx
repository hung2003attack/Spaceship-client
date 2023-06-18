import { Route, Routes } from 'react-router-dom';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeheaders } from '~/routes/routeSocialNetwork/routes';

import { onSetting } from '~/redux/hideShow';

import Search, { PropsSearchTextSN } from './layout/Search/Search';
import Images from '~/assets/images';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import { CameraI, ExchangeI, FriendI, HomeI, LanguageI, SearchI, SettingI } from '~/assets/Icons/Icons';
import {
    Alogo,
    ButtonSt,
    DivHeader,
    DivHollow,
    DivWrapper,
    LinkCall,
    LinkExchange,
    LinkHome,
    Plogo,
    SpanX,
} from './styleHeader';
import styled from 'styled-components';
import Socialnetwork from '~/social_network';
import { PropsBg } from 'src/mainPage/nextWeb';
import { PropsTextHome } from './layout/Home/Home';
import { PropsTextFriends } from './layout/MakingFriends/People';
import { DivItems, Input } from './layout/MakingFriends/styleMakingFriends';
import { Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { people } from '~/redux/reload';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { useCookies } from 'react-cookie';

//button
// to = Link tag, href = a tag
//classNames = name và chữ Cl phía sau, Icons = chữ cái đầu viết thường, Events [onClick],
export interface PropsSN {
    logo: string;
    sett: string;
    home: {
        title: string;
        children: PropsTextHome;
    };
    exchange: string;
    video: string;
    search: { title: string; children: PropsSearchTextSN };
    location: string;
    friends: {
        title: string;
        children: PropsTextFriends;
    };
}
const Header: React.FC<{
    dataText: PropsSN;
    dataUser: { avatar: string; fullName: string; gender: number };
}> = ({ dataText, dataUser }) => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(['k_user', 'tks']);
    const token = cookies.tks;
    const userId = cookies.k_user;

    const [searchC, setSearchC] = useState<boolean>(false);
    const [history, setHistory] = useState<
        {
            id: string;
            avatar: string;
            fullName: string;
            nickName: string;
            gender: number;
        }[]
    >([]);

    const { logo, sett, home, exchange, search, video, friends, location } = dataText;
    const { colorBg, colorText } = useSelector((state: PropsBg) => state.persistedReducer.background);
    const [border, setBorder] = useState<string>(() => {
        const location = window.location.pathname;
        console.log(
            'location',
            location,
            ['/SN/', '/SN'].includes(location)
                ? 'home'
                : location === '/SN/exchange'
                ? 'exch'
                : location === '/SN/callVideo'
                ? 'link'
                : 'people',
        );

        return ['/SN/', '/SN'].includes(location)
            ? 'home'
            : ['/SN/exchange', '/SN/exchange/'].includes(location)
            ? 'exch'
            : ['/SN/callVideo', '/SN/callVideo/'].includes(location)
            ? 'link'
            : 'people';
    });
    const handleSetting = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(onSetting());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(searchC, 'searchCC');
    const handleReload = () => {
        console.log('ok');
    };
    const handleSearch = async (e: any) => {
        if (e.target.getAttribute('id') !== 'notS') setSearchC(!searchC);
        if (!searchC) {
            console.log('ddddd');
            const res = await userAPI.getHistory(token);

            setHistory(res);
        }
        console.log(searchC, '--');
    };

    console.log(exchange, 'home', colorBg);

    return (
        <>
            <DivHeader bg={colorBg}>
                <DivWrapper
                    css={`
                        ${searchC ? 'a{width: 0; display: none;}' : 'a{width: 70px;}'}
                        #sett {
                            display: ${searchC ? 'none' : 'block'};
                        }
                        @media (min-width: 650px) {
                            a {
                                display: block;
                                width: 120px;
                            }
                            #sett {
                                display: block;
                            }
                        }
                        #${border} {
                            border-bottom: 8px solid #3e75bc;
                        }
                        #logo {
                            display: none;
                            width: 35px;
                            height: 35px;
                            @media (min-width: 769px) {
                                display: block;
                                position: relative;
                                div {
                                    align-items: end;
                                }
                            }
                        }
                    `}
                >
                    <Hovertitle id="logo" title={logo} Tags={Alogo} href="/">
                        <img src={Images.logo} alt="d" />
                        {/* <Plogo>Universe</Plogo> */}
                    </Hovertitle>
                    {/* <Search colorBg={colorBg} colorText={colorText} title={search} location={location} /> */}
                    <Hovertitle
                        id="home"
                        colorBg={colorBg}
                        Tags={LinkHome}
                        to="/SN/"
                        children={<HomeI />}
                        title={home.title}
                        size="20px"
                        color={colorText}
                        onClick={() => setBorder('home')}
                    />
                    <Hovertitle
                        id="exch"
                        colorBg={colorBg}
                        color={colorText}
                        Tags={LinkExchange}
                        to="/SN/exchange"
                        title={exchange}
                        children={<ExchangeI />}
                        size="17px"
                        onClick={() => setBorder('exch')}
                    />
                    <Hovertitle
                        id="link"
                        colorBg={colorBg}
                        Tags={LinkCall}
                        to="/SN/callVideo"
                        children={<CameraI />}
                        title={video}
                        size="20px"
                        color={colorText}
                        onClick={() => setBorder('link')}
                    />
                    <Hovertitle
                        id="people"
                        colorBg={colorBg}
                        Tags={LinkHome}
                        to="/SN/people"
                        children={<FriendI />}
                        title={friends.title}
                        size="20px"
                        color={colorText}
                        onClick={() => setBorder('people')}
                        onDoubleClick={() => {
                            dispatch(people(Math.random()));
                        }}
                        onTouchStart={() => dispatch(people(Math.random()))}
                    />
                    <Div
                        width="70px"
                        css={`
                            height: 100%;
                            align-items: center;
                            justify-content: start;
                            font-size: 20px;
                            transition: all 0.5s linear;
                            position: relative;
                            padding: 5px;
                            color: ${colorText};
                            cursor: var(--pointer);
                            @media (min-width: 768px) {
                                &:hover {
                                    background-color: #385d8c;
                                }
                            }
                            ${searchC
                                ? 'width: 100%; input{display: block; width: 100%; height: 85%;} @media (min-width: 650px){width: 380px;}'
                                : 'input{ width: 0%}'}
                        `}
                    >
                        {searchC && (
                            <Search
                                history={history}
                                location={location}
                                colorBg={colorBg}
                                colorText={colorText}
                                dataText={search.children}
                                title={search.title}
                            />
                        )}

                        <Div
                            css={`
                                ${searchC
                                    ? 'width: 16%; right: -4px '
                                    : 'width: 100%; left: 50%; right: 50%; top: 50%; bottom: 50%; translate: -50% -50%;'};
                                height: 75%;
                                position: absolute;
                                align-items: center;
                                justify-content: center;
                                border-radius: 5px;
                            `}
                            onClick={handleSearch}
                        >
                            <SearchI />
                        </Div>
                    </Div>
                    <Hovertitle
                        id="sett"
                        colorBg={colorBg}
                        color={colorText}
                        Tags={ButtonSt}
                        children={<SettingI />}
                        title={sett}
                        onClick={handleSetting}
                        size="25px"
                    />
                </DivWrapper>
            </DivHeader>
            <Routes>
                {routeheaders.map(({ path, Component }, key) => (
                    <Route
                        key={key}
                        path={path}
                        element={
                            <Component
                                home={home.children}
                                friendsT={friends.children}
                                dataUser={dataUser}
                                colorBg={colorBg}
                                colorText={colorText}
                            />
                        }
                    />
                ))}
            </Routes>
        </>
    );
};

export default memo(Header);
