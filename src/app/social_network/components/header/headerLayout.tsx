import clsx from 'clsx';
import { Route, Routes } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeheaders } from '~/routes/routeSocialNetwork/routes';
import styles from './header.module.scss';

import Buttons from '~/reUsingComponents/Buttoms/Buttom';
import { logOutSuccess, onsettingOpacity, userData } from '~/redux/reducer';

import Search from './layout/Search/Search';
import Images from '~/assets/images';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
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
            <div className={clsx(styles.header)}>
                <Search />
                <div className={clsx(styles.homeExhangePersonal)}>
                    <Buttons to="/SN/" h homeCl onDoubleClick={handleReload} />
                    <Buttons to="/SN/exchange" e exchangeCl />
                    <Buttons to="/SN/callVideo" cv callVideo />
                </div>
                <Buttons s settingCl onClick={handleSetting} />

                <Hovertitle
                    title="Start"
                    anyTags="a"
                    href="/"
                    Tags="img"
                    src={Images.logo}
                    alt="socailNetworld"
                    logoCL
                />
            </div>

            <Routes>
                {routeheaders.map(({ path, Component }, key) => (
                    <Route key={key} path={path} element={<Component />} />
                ))}
            </Routes>
        </>
    );
};

export default Header;
