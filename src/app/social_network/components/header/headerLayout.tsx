import clsx from 'clsx';
import { Route, Routes } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeheaders } from '~/routes/routeSocialNetwork/routes';
import styles from './header.module.scss';

import { logOutSuccess, onsettingOpacity, userData } from '~/redux/authenRD';

import Search from './layout/Search/Search';
import Images from '~/assets/images';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import { CameraI, ExchangeI, HomeI, ImageI, SettingI, VideoI } from '~/assets/Icons/Icons';
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
import { Img, Span } from '~/reUsingComponents/styleComponents/styleComponents';
//button
// to = Link tag, href = a tag
//classNames = name và chữ Cl phía sau, Icons = chữ cái đầu viết thường, Events [onClick],

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { auth, currentUser } = useSelector((state: any) => state.auth.login);
    const user = currentUser?.user;
    console.log(user);

    const handleSetting = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(onsettingOpacity());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleReload = () => {
        console.log('ok');
    };

    return (
        <>
            <DivHollow></DivHollow>
            <DivHeader>
                <Search />
                <DivWrapper>
                    <Hovertitle Tags={LinkHome} to="/SN/" children={<HomeI />} title="Home" size="28px" />
                    <Hovertitle
                        Tags={LinkExchange}
                        to="/SN/exchange"
                        title="Exchange"
                        children={<ExchangeI />}
                        size="23px"
                    />
                    <Hovertitle
                        Tags={LinkCall}
                        to="/SN/callVideo"
                        children={<CameraI />}
                        title="Call Video"
                        size="30px"
                    />
                </DivWrapper>
                <Hovertitle
                    Tags={ButtonSt}
                    children={<SettingI />}
                    title="Setting"
                    onClick={handleSetting}
                    size="28px"
                    color="var(--color-text-light)"
                />

                <Hovertitle title="Start" Tags={Alogo} href="/">
                    <Img src={Images.logo} alt="d" width="30px" height="30px" about="none" />
                    <Plogo>Universe</Plogo>
                </Hovertitle>
            </DivHeader>

            <Routes>
                {routeheaders.map(({ path, Component }, key) => (
                    <Route key={key} path={path} element={<Component />} />
                ))}
            </Routes>
        </>
    );
};

export default Header;
