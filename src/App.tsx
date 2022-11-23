import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { offPersonalPage, offsettingOpacity } from './app/redux/hideShow';

import Website from './mainPage/nextWeb';
import Settingcbl from '~/reUsingComponents/Setting/Setting';
import { LanguageI } from '~/assets/Icons/Icons';
import Message from '~/Message/message';
import Personalpage from './mainPage/personalPage/personalPage';
import { login } from './dataMark/dataLogin';
import { register } from './dataMark/dataRegister';
import Authentication from '~/Authentication/Auth';
import { useCookies } from 'react-cookie';
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
    const showHideSettingn = useSelector((state: any) => state.hideShow?.setting);

    const handleClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(offsettingOpacity());
        dispatch(offPersonalPage());
    };
    const [cookies, setCookie] = useCookies(['tks', 'k_user', 'sn']);
    //   document.cookie.addListener("change", (event) => {
    //   console.log("1 change event");
    // });

    const token = cookies.tks;
    const k_user = cookies.k_user;
    // const operatingSystem = {
    //     name: 'Ubuntu',
    //     version: 18.04,
    //     license: 'Open Source',
    // };
    // // const news = Object.freeze(operatingSystem);
    // // Get the object key/value pairs
    // console.log((operatingSystem.name = 'hello world'));
    // console.log(operatingSystem);
    // const employees = ['Ron', 'April', 'Andy', 'Leslie'];

    // console.log(Object.getPrototypeOf(employees));

    const home = {
        id: 0,
        name: 'hung',
        avatar: 'url',
        image: 'images',
        dis: '...',
        feel: {
            like: '1',
            love: '5',
        },
        comment: [
            {
                id: 1 - 0,
                name: 'hung',
                avatar: 'url',
                reply: [
                    {
                        id: 2 - 1,
                        content: '...',
                        reply: [
                            {
                                id: 3 - 2,
                                name: 'han',
                                avatar: 'url',
                                reply: [
                                    {
                                        id: 1 - 3,
                                        content: '...',
                                        reply: [
                                            {
                                                id: 4,
                                                name: 'han',
                                                avatar: 'url',
                                                reply: [{ content: '...' }],
                                            },
                                        ],
                                    },
                                    {
                                        id: 3 - 1,
                                        content: '...',
                                    },
                                    { content: '...' },
                                ],
                            },
                            {
                                id: 2 - 3,
                                name: 'han',
                                avatar: 'url',
                                reply: [{ content: '...' }],
                            },
                            {
                                id: 2 - 2,
                                content: '...',
                            },
                            {
                                id: 1 - 2,
                                content: '...',
                            },
                            {
                                id: 2 - 1,
                                content: '...',
                            },
                        ],
                    },
                    {
                        id: 3 - 1,
                        content: '...',
                    },
                    {
                        id: 1 - 2,
                        content: '...',
                    },
                    {
                        id: 1 - 3,
                        content: '...',
                    },
                    {
                        id: 2 - 2,
                        content: '...',
                    },
                ],
            },
            {
                id: 6,
                name: 'han',
                avatar: 'url',
                comment: [
                    {
                        content: '...',
                        reply: {},
                    },
                    {
                        content: '...',
                    },
                    {
                        content: '...',
                    },
                ],
            },
        ],
    };
    // console.log(Math.round(Math.random() * 9573), 'heress');
    if (token && k_user) {
        return (
            <>
                <Website />
                <div
                    className={clsx((showHideSettingn && 'opacity') || (false && 'opacity'))}
                    onClick={handleClick}
                ></div>
                <Settingcbl data={setting} />
                {/* <Message />  */}
                {/* {store && <Personalpage user={currentUser?.user} />*/}
            </>
        );
    }

    return (
        <>
            <Authentication
                dataLogin={{ EN: login.EN, VN: login.VN }}
                dataRegister={{ VN: register.VN, EN: register.EN }}
            />
        </>
    );
}

export default App;
