import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { LanguageI } from '~/assets/Icons/Icons';
import { InitialStateHideShow } from '~/redux/hideShow';
import { PropsSetting } from '~/reUsingComponents/Setting/interface';
import Settingcbl from '~/reUsingComponents/Setting/Setting';

import Header from './components/Header/HeaderLayout';
const settingData = [
    {
        title: 'Language',
        icon: <LanguageI />,
        children: {
            data: [
                { name: 'English', lg: 'EN' },
                { name: 'VietNamese', lg: 'VN' },
            ],
        },
    },
    {
        title: 'Log Out',
        logout: true,
    },
];
interface InNetWork {
    header: {
        logo: string;
        sett: {
            hover: string;
            data: PropsSetting;
        };
        home: string;
        exchange: string;
        video: string;
        search: string;
    };
    body: {};
}
interface PropsDataNetWork {
    data: {
        [VN: string]: InNetWork;
        EN: InNetWork;
    };
}
const Socialnetwork: React.FC<PropsDataNetWork> = ({ data }) => {
    const turnSetting = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow?.setting);
    console.log('social');

    return (
        <>
            <Header />
            {turnSetting && <Settingcbl data={settingData} />}
        </>
    );
};

export default Socialnetwork;
