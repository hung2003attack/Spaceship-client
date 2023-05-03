import React, { ReactNode, useDeferredValue, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LanguageI } from '~/assets/Icons/Icons';
import { InitialStateHideShow } from '~/redux/hideShow';
import { PropsSetting } from '~/reUsingComponents/Setting/interface';
import Settingcbl from '~/reUsingComponents/Setting/Setting';
import Header, { PropsSN } from './components/Header/HeaderLayout';
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
    header: PropsSN;
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
            <Header
                logo={header.logo}
                sett={header.sett}
                home={header.home}
                exchange={header.exchange}
                video={header.video}
                search={header.search}
                location={header.location}
            />
            {turnSetting && <Settingcbl dataO={sett.data} setLg={setLg} LgNow={lg} />}
        </>
    );
};

export default Socialnetwork;
