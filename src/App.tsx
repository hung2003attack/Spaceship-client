import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { offPersonalPage, offsettingOpacity } from './app/redux/authenRD';

import Website from './mainPage/nextWeb';
import Settingcbl from '~/reUsingComponents/Setting/Setting';
import { LanguageI } from '~/assets/Icons/Icons';
import Message from '~/Message/message';
import Personalpage from './mainPage/personalPage/personalPage';
import { login } from './dataMark/dataLogin';
import { register } from './dataMark/dataRegister';
import Authentication from '~/Authentication/Auth';
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
                <Authentication dataLogin={{ EN: login.EN, VN: login.VN }} dataRegister={{ VN: register.VN, EN: register.EN }} />
            )}
        </>
    );
}

export default App;
