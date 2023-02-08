import { Route, Routes } from 'react-router-dom';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeheaders } from '~/routes/routeSocialNetwork/routes';

import { onSetting } from '~/redux/hideShow';

import Search from './layout/Search/Search';
import Images from '~/assets/images';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import { CameraI, ExchangeI, HomeI, LanguageI, SettingI } from '~/assets/Icons/Icons';
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
//button
// to = Link tag, href = a tag
//classNames = name và chữ Cl phía sau, Icons = chữ cái đầu viết thường, Events [onClick],
interface PropsTitle {
    title: {
        logo: string;
        sett: string;
        home: string;
        exchange: string;
        video: string;
        search: string;
    };
}
const Header: React.FC<PropsTitle> = ({ title }) => {
    const dispatch = useDispatch();

    const handleSetting = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(onSetting());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleReload = () => {
        console.log('ok');
    };
    const Div = styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 75px;
        background-color: #202124;
        z-index: 1;
    `;
    console.log(title.exchange, 'home');

    return (
        <Div>
            <DivHollow>
                <Hovertitle title={title.logo} Tags={Alogo} href="/" size="40px">
                    <img src={Images.logo} alt="d" />
                    {/* <Plogo>Universe</Plogo> */}
                </Hovertitle>
                <Search title={title.search} />
                <Hovertitle
                    Tags={ButtonSt}
                    children={<SettingI />}
                    title={title.sett}
                    onClick={handleSetting}
                    size="28px"
                />
            </DivHollow>
            <DivWrapper>
                <Hovertitle Tags={LinkHome} to="/SN/" children={<HomeI />} title={title.home} size="28px" />
                <Hovertitle
                    Tags={LinkExchange}
                    to="/SN/exchange"
                    title={title.exchange}
                    children={<ExchangeI />}
                    size="23px"
                />
                <Hovertitle Tags={LinkCall} to="/SN/callVideo" children={<CameraI />} title={title.video} size="30px" />
            </DivWrapper>

            <Routes>
                {routeheaders.map(({ path, Component }, key) => (
                    <Route key={key} path={path} element={<Component />} />
                ))}
            </Routes>
        </Div>
    );
};

export default memo(Header);
