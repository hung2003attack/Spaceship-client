import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { offPersonalPage, offsettingOpacity } from './app/redux/reducer';
import { useEffect, useLayoutEffect, useState } from 'react';

import Website from './mainPage/nextWeb';
import Settingcbl from '~/reUsingComponents/Setting/Setting';
import { LanguageI } from '~/assets/Icons/Icons';
import Message from '~/Message/message';
import Login from './app/Authentication/Login/Login';
import Personalpage from './mainPage/personalPage/personalPage';

const setting = [
    {
        title: 'Language',
        icon: <LanguageI />,
        children: { data: [{ name: 'English' }, { name: 'English' }, { name: 'VietNamese' }] },
    },
    {
        title: 'Log Out',
        logout: true,
    },
];
function App() {
    const dispatch = useDispatch();
    const { component, currentUser, error } = useSelector((state: any) => state.auth.login);

    const store = useSelector((state: any) => state.auth.personalPage);
    const showHideSettingn = useSelector((state: any) => state.auth.showHideSettingn);

    const handleClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(offsettingOpacity());
        dispatch(offPersonalPage());
    };

    return (
        <>
            {component && !error ? (
                <>
                    <Website />
                    <div
                        className={clsx((showHideSettingn && 'opacity') || (store && 'opacity'))}
                        onClick={handleClick}
                    ></div>
                    <Settingcbl data={setting} />
                    <Message />
                    {store && <Personalpage user={currentUser?.user} />}
                </>
            ) : (
                <Login />
            )}
        </>
    );
}

export default App;
