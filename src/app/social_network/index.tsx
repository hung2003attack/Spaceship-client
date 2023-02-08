import React, { ReactNode, useDeferredValue, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageI } from '~/assets/Icons/Icons';
import { InitialStateHideShow } from '~/redux/hideShow';
import { PropsSetting } from '~/reUsingComponents/Setting/interface';
import Settingcbl from '~/reUsingComponents/Setting/Setting';
import HttpRequestUser from '~/restAPI/requestServers/socialNetwork/user';
import Header from './components/Header/HeaderLayout';
import { useCookies } from 'react-cookie';
import { MdAirlineSeatLegroomExtra } from 'react-icons/md';
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
        sett: string;
        home: string;
        exchange: string;
        video: string;
        search: string;
    };
    sett: {
        data: PropsSetting;
    };
    body: {};
}
interface PropsDataNetWork {
    data: {
        [VN: string]: InNetWork;
        EN: InNetWork;
    };
}
interface PropsLanguage {
    persistedReducer: {
        language: {
            sn: string;
        };
    };
}

const Socialnetwork: React.FC<PropsDataNetWork> = ({ data }) => {
    const language = useSelector((state: PropsLanguage) => state.persistedReducer.language.sn);
    const [lg, setLg] = useState<string>(language);
    const { header, sett } = data[lg];

    const turnSetting = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow?.setting);
    console.log('social', lg);

    return (
        <>
            <Header title={header} />
            {turnSetting && <Settingcbl dataO={sett.data} setLg={setLg} LgNow={lg} />}
        </>
    );
};

export default Socialnetwork;
