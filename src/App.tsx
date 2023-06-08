import { useDispatch, useSelector } from 'react-redux';
import { InitialStateHideShow, offAll, onPersonalPage, setIdUser } from './app/redux/hideShow';

import Personalpage from './mainPage/personalPage/personalPage';
import { login } from './dataMark/dataLogin';
import { register } from './dataMark/dataRegister';
import { useCookies } from 'react-cookie';
import React, { Suspense, useEffect, useState } from 'react';
import searchAPI from './app/restAPI/requestServers/socialNetwork/searchAPI_SN';
import { DivContainer, DivPos } from './app/reUsingComponents/styleComponents/styleComponents';
import styled from 'styled-components';
import { Div } from './app/reUsingComponents/styleComponents/styleDefault';
import Progress from './app/reUsingComponents/Progress/Progress';
import Cookies from 'universal-cookie';
import ErrorBoudaries from './app/reUsingComponents/ErrorBoudaries/ErrorBoudaries';
import { PropsBg } from './mainPage/nextWeb';
import { UndoI } from '~/assets/Icons/Icons';
import CommonUtils from '~/utils/CommonUtils';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { changeAvatar } from '~/redux/changeData';
import { PropsTitleP } from './mainPage/personalPage/layout/Title';
const DivOpacity = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #686767a1;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
`;
export interface PropsUserPer {
    id: string;
    avatar: any;
    fullName: string;
    nickName: string;
    gender: number;
    background: any;
    id_m_user: PropsTitleP;
}
const Authentication = React.lazy(() => import('~/Authentication/Auth'));
const Website = React.lazy(() => import('./mainPage/nextWeb'));
const Message = React.lazy(() => import('~/Message/message'));
const cookie = new Cookies();
function App() {
    const dispatch = useDispatch();
    const [reload, setReload] = useState<boolean>(false);
    const { setting, personalPage } = useSelector((state: any) => state.hideShow);
    const { idUser, errorServer } = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow);
    const { colorText, colorBg } = useSelector((state: PropsBg) => state.persistedReducer.background);
    const [userData, setUserData] = useState<PropsUserPer[]>([]);
    const [userOnline, setUserOnline] = useState<string[]>([]);
    async function fetch(id: string) {
        const res = await userAPI.getById(
            cookies.tks,
            id,
            {
                id: 'id',
                avatar: 'avatar',
                background: 'background',
                fullName: 'fullname',
                nickName: 'nickName',
                status: 'status',
                gender: 'gender',
            },
            {
                position: 'position',
                star: 'star',
                love: 'love',
                visit: 'visit',
                follow: 'follow',
                following: 'following',
            },
            'personal',
        );
        console.log(res, 'ssss', res.avatar);
        const datas = res.user;

        if (datas.avatar) {
            const av = CommonUtils.convertBase64(datas.avatar);
            datas.avatar = av;
            console.log(res, 'sss');
        }
        if (datas.background) {
            const av = CommonUtils.convertBase64(datas.background);
            datas.background = av;
        }

        console.log(datas, 'datar');
        setUserData([datas]);
    }
    useEffect(() => {
        const search = async () => {
            const search = window.location.search;
            console.log('search', search, idUser);

            if (search && idUser.length === 0) {
                const id = search.split('id=');
                const ids = [];
                if (id.length < 4 && id.length > 0) {
                    for (let i = 1; i < id.length; i++) {
                        ids.push(id[i]);
                        console.log('hii', id[i]);
                        fetch(id[i]);
                    }
                }
                dispatch(setIdUser(ids));
            } else if (idUser.length === 1 && !search) {
                console.log('search', idUser[0]);

                fetch(idUser[0]);
            }
        };
        search();
    }, [idUser]);
    const handleClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setUserData([]);
        dispatch(setIdUser([]));
    };
    console.log(idUser, 'idUser', userData);

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
    // useEffect(() => {
    //     //seach on the url of web add profile?id=id
    //     const search = async () => {
    //         const search = window.location.search;
    //         if (search) {
    //             const id = search.split('id=');

    //             if (id.length < 4 && id.length > 0) {
    //                 const arrayData = [];
    //                 const ids = [];
    //                 for (let i = 1; i < id.length; i++) {
    //                     ids.push(id[i]);
    //                     fetch(id[i]);
    //                 }
    //                 if (ids.length > 0) {
    //                     console.log('hereeeee');
    //                     dispatch(setIdUser(ids));
    //                 }
    //             }
    //         } else {
    //             dispatch(setIdUser([]));
    //             dispatch(offAll());
    //         }
    //     };
    //     search();
    // }, []);

    // const home = {
    //     id: 0,
    //     name: 'hung',
    //     avatar: 'url',
    //     image: 'images',
    //     dis: '...',
    //     feel: {
    //         like: '1',
    //         love: '5',
    //     },
    //     comment: [
    //         {
    //             id: 1 - 0,
    //             name: 'hung',
    //             avatar: 'url',
    //             reply: [
    //                 {
    //                     id: 2 - 1,
    //                     content: '...',
    //                     reply: [
    //                         {
    //                             id: 3 - 2,
    //                             name: 'han',
    //                             avatar: 'url',
    //                             reply: [
    //                                 {
    //                                     id: 1 - 3,
    //                                     content: '...',
    //                                     reply: [
    //                                         {
    //                                             id: 4,
    //                                             name: 'han',
    //                                             avatar: 'url',
    //                                             reply: [{ content: '...' }],
    //                                         },
    //                                     ],
    //                                 },
    //                                 {
    //                                     id: 3 - 1,
    //                                     content: '...',
    //                                 },
    //                                 { content: '...' },
    //                             ],
    //                         },
    //                         {
    //                             id: 2 - 3,
    //                             name: 'han',
    //                             avatar: 'url',
    //                             reply: [{ content: '...' }],
    //                         },
    //                         {
    //                             id: 2 - 2,
    //                             content: '...',
    //                         },
    //                         {
    //                             id: 1 - 2,
    //                             content: '...',
    //                         },
    //                         {
    //                             id: 2 - 1,
    //                             content: '...',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     id: 3 - 1,
    //                     content: '...',
    //                 },
    //                 {
    //                     id: 1 - 2,
    //                     content: '...',
    //                 },
    //                 {
    //                     id: 1 - 3,
    //                     content: '...',
    //                 },
    //                 {
    //                     id: 2 - 2,
    //                     content: '...',
    //                 },
    //             ],
    //         },
    //         {
    //             id: 6,
    //             name: 'han',
    //             avatar: 'url',
    //             comment: [
    //                 {
    //                     content: '...',
    //                     reply: {},
    //                 },
    //                 {
    //                     content: '...',
    //                 },
    //                 {
    //                     content: '...',
    //                 },
    //             ],
    //         },
    //     ],
    // };
    // console.log(Math.round(Math.random() * 9573), 'heress');
    const leng = idUser?.length;
    const css = `
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 11;
        overflow-y: overlay;

`;

    if (token && k_user) {
        return (
            <Suspense
                fallback={
                    <Progress
                        title={{
                            vn: 'Đang tải dữ liệu...',
                            en: 'loading data...',
                        }}
                    />
                }
            >
                <ErrorBoudaries
                    check={errorServer.check}
                    message={errorServer.message || 'Server is having a problem. Please try again later!'}
                />
                <Website userOnline={userOnline} setUserOnline={setUserOnline} idUser={idUser} />
                {(setting || personalPage) && <DivOpacity onClick={handleClick} />}
                <Message />
                {userData?.length > 0 && (
                    <DivContainer
                        width="100%"
                        height="100%"
                        css={css}
                        bg={`${colorBg === 1 ? '#272727' : 'white'}`}
                        content="start"
                        display="flex"
                    >
                        {userData?.map((data: any, index: number) => (
                            <Personalpage
                                colorText={colorText}
                                colorBg={colorBg}
                                user={data}
                                online={userOnline}
                                key={index}
                                leng={leng}
                            />
                        ))}
                        <DivPos
                            position="fixed"
                            size="30px"
                            top="20px"
                            right="11px"
                            color={colorText}
                            onClick={handleClick}
                        >
                            <UndoI />
                        </DivPos>
                    </DivContainer>
                )}
            </Suspense>
        );
    }
    return (
        <Suspense
            fallback={
                <Progress
                    title={{
                        vn: 'Vui lòng chờ trong giây lát để thệ thông cập nhật thông tin cho bạn. Xin cảm ơn đã sử dụng dịch vụ của chúng tôi!',
                        en: 'Please wait a while to update your information. Thank you for using our services!',
                    }}
                />
            }
        >
            <Authentication
                dataLogin={{ EN: login.EN, VN: login.VN }}
                dataRegister={{ VN: register.VN, EN: register.EN }}
            />
        </Suspense>
    );
}

export default App;
