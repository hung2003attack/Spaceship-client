import { Route, Routes } from 'react-router-dom';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeheaders } from '~/routes/routeSocialNetwork/routes';

import { onSetting } from '~/redux/hideShow';

import Search from './layout/Search/Search';
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
    search: string;
    location: string;
    friends: {
        title: string;
        children: PropsTextFriends;
    };
    //
    dataUser?: { avatar: string; fullName: string; gender: number };
}
const Header: React.FC<PropsSN> = ({ logo, sett, home, exchange, search, video, friends, location, dataUser }) => {
    const dispatch = useDispatch();
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
    const [searchC, setSearchC] = useState<boolean>(false);
    const handleSetting = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(onSetting());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleReload = () => {
        console.log('ok');
    };
    const handleSearch = (e: { target: any }) => {
        if (e.target.getAttribute('id') !== 'notS') setSearchC(!searchC);
    };

    console.log(exchange, 'home', colorBg);

    return (
        <>
            <DivHeader bg={colorBg}>
                <DivWrapper
                    css={`
                        ${searchC ? 'a{width: 0; display: none;}' : 'a{width: 70px;}'}
                        @media (min-width: 650px) {
                            a {
                                display: block;
                                width: 120px;
                            }
                        }
                        #${border} {
                            border-bottom: 8px solid #3e75bc;
                        }
                        #logo {
                            display: ${searchC ? 'block' : 'none'};
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
                        size="25px"
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
                        size="20px"
                        onClick={() => setBorder('exch')}
                    />
                    <Hovertitle
                        id="link"
                        colorBg={colorBg}
                        Tags={LinkCall}
                        to="/SN/callVideo"
                        children={<CameraI />}
                        title={video}
                        size="25px"
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
                        size="25px"
                        color={colorText}
                        onClick={() => setBorder('people')}
                    />
                    <Div
                        width="70px"
                        css={`
                            height: 100%;
                            align-items: center;
                            justify-content: center;
                            font-size: 28px;
                            cursor: var(--pointer);
                            transition: all 0.5s linear;
                            position: relative;
                            padding: 5px 0;
                            color: ${colorText};
                            ${searchC
                                ? 'width: 71%; input{display: block; width: 100%; height: 85%;} @media (min-width: 650px){width: 380px;}'
                                : 'input{ width: 0%}'}
                        `}
                        onClick={handleSearch}
                    >
                        <Input id="notS" color={colorText} placeholder={search} />
                        <Div
                            css={`
                                ${searchC
                                    ? 'width: 20%; right: -4px '
                                    : 'width: 100%; left: 50%; right: 50%; top: 50%; bottom: 50%; translate: -50% -50%;'};
                                height: 75%;
                                position: absolute;
                                align-items: center;
                                justify-content: center;
                                border-radius: 5px;
                                &:hover {
                                    background-color: #385d8c;
                                }
                            `}
                        >
                            <SearchI />
                        </Div>
                    </Div>
                    <Hovertitle
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
