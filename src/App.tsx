import { useDispatch, useSelector } from 'react-redux';
import { InitialStateHideShow, offAll, onPersonalPage, setIdUser } from './app/redux/hideShow';

import Personalpage from './mainPage/personalPage/PersonalPage';
import { login } from './dataMark/dataLogin';
import { register } from './dataMark/dataRegister';
import { useCookies } from 'react-cookie';
import React, { Suspense, useEffect, useState } from 'react';
import searchAPI from './app/restAPI/requestServers/socialNetwork/searchAPI_SN';
import { DivContainer, DivLoading, DivPos } from './app/reUsingComponents/styleComponents/styleComponents';
import styled from 'styled-components';
import { A, Div } from './app/reUsingComponents/styleComponents/styleDefault';
import Progress from './app/reUsingComponents/Progress/Progress';
import Cookies from 'universal-cookie';
import ErrorBoudaries from './app/reUsingComponents/ErrorBoudaries/ErrorBoudaries';
import { PropsBg } from './mainPage/nextWeb';
import { LoadingI, UndoI } from '~/assets/Icons/Icons';
import CommonUtils from '~/utils/CommonUtils';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { PropsTitleP } from './mainPage/personalPage/layout/Title';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
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
export interface PropsUser {
    id: string;
    avatar: any;
    fullName: string;
    nickName: string;
    gender: number;
    background: any;
    status: string;
    sn: string;
    l: string;
    w: string;
    as: number;
}
export interface PropsUserPer {
    id: string;
    avatar: any;
    fullName: string;
    nickName: string;
    gender: number;
    background: any;
    status: string;
    sn: string;
    l: string;
    w: string;
    as: number;
    id_f_user: {
        createdAt: string | null;
        idCurrentUser: string | null;
        idFriend: string | null;
        level: number | null;
    };
    id_friend: {
        createdAt: string | null;
        idCurrentUser: string | null;
        idFriend: string | null;
        level: number | null;
    };
    id_m_user: PropsTitleP;
    id_flwing: {
        flwed: number;
        flwing: number;
        id_followed: string;
        id_following: string;
        createdAt: string;
        updatedAt: string;
    };
    id_flwed: {
        flwing: number | null;
        flwed: number | null;
        id_following: string | null;
        id_followed: string | null;
        createdAt: string | null;
        updatedAt: string | null;
    };
    id_loved_user: {
        id_loved: string;
    };
}
const Authentication = React.lazy(() => import('~/Authentication/Auth'));
const Website = React.lazy(() => import('./mainPage/nextWeb'));
const Message = React.lazy(() => import('~/Message/message'));
function App() {
    const [cookies, setCookie] = useCookies(['tks', 'k_user', 'sn']);
    const dispatch = useDispatch();
    const { idUser, errorServer } = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow);
    const { setting, personalPage } = useSelector((state: any) => state.hideShow);
    const { colorText, colorBg } = useSelector((state: PropsBg) => state.persistedReducer.background);
    const [userData, setUserData] = useState<PropsUserPer[]>([]);

    const [userFirst, setUserFirst] = useState<PropsUser>();
    const [userOnline, setUserOnline] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [rePro, setRePro] = useState<boolean>(false);

    const token = cookies.tks;
    const k_user = cookies.k_user;
    async function fetch(id: string, first?: string) {
        if (!first) setLoading(true);
        const res = await userAPI.getById(
            token,
            id,
            {
                id: 'id',
                avatar: 'avatar',
                background: 'background',
                fullName: 'fullname',
                nickName: 'nickName',
                status: 'status',
                gender: 'gender',
                as: 'as',
                sn: 'sn',
                l: 'l',
                w: 'w',
            },
            {
                position: 'position',
                star: 'star',
                visit: 'visit',
            },
            first,
        );
        console.log(res, first, 'ssss', res?.avatar);
        if (res?.avatar) {
            const av = CommonUtils.convertBase64(res.avatar);
            res.avatar = av;
            console.log(res, 'sss');
        }
        if (res?.background) {
            const av = CommonUtils.convertBase64(res.background);
            res.background = av;
        }

        if (first) {
            setUserFirst(res);
        } else {
            setLoading(false);
            return res;
        }
    }
    console.log(userFirst, 'userFirst', cookies.tks);
    useEffect(() => {
        const search = async () => {
            const search = window.location.search;
            console.log('search', search, idUser);

            if (search && idUser.length === 0) {
                const id = search.split('id=');
                const ids = [];
                const datas = [];
                if (id.length < 3 && id.length > 0) {
                    for (let i = 1; i < id.length; i++) {
                        ids.push(id[i]);
                        console.log('hii', id[i]);
                        const data = await fetch(id[i]);
                        datas.push(data);
                    }
                    setUserData(datas);
                }
                dispatch(setIdUser(ids));
            }
        };
        search();
    }, []);
    useEffect(() => {
        const search = async () => {
            if (idUser.length === 1) {
                const data = await fetch(idUser[0]);
                setUserData([data]);
            }
        };
        search();
    }, [idUser]);
    const handleClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setUserData([]);
        dispatch(setIdUser([]));
    };
    useEffect(() => {
        if (k_user) fetch(k_user, 'first');
    }, [k_user]);

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
        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
            border-radius: 0;
        }

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
                {userFirst && (
                    <>
                        <Website
                            userOnline={userOnline}
                            setUserOnline={setUserOnline}
                            idUser={idUser}
                            dataUser={userFirst}
                        />
                        {(setting || personalPage) && <DivOpacity onClick={handleClick} />}
                        <Message />

                        {loading && (
                            <Div
                                width="100%"
                                css={`
                                    height: 100%;
                                    position: absolute;
                                    top: 0px;
                                    z-index: 1;
                                    color: ${colorText};
                                    font-size: 50px;
                                    align-items: center;
                                    justify-content: center;
                                    background-color: #2b2c2d78;
                                `}
                            >
                                <DivLoading css="width: auto;">
                                    <LoadingI />
                                </DivLoading>
                            </Div>
                        )}

                        {userData?.length > 0 && (
                            <DivContainer
                                width="100%"
                                height="100%"
                                css={css}
                                bg={`${colorBg === 1 ? '#272727' : 'white'}`}
                                content={leng === 1 ? 'center' : 'start'}
                                display="flex"
                            >
                                {userData?.length > 1 && (
                                    <Div
                                        css={`
                                            display: none;
                                            @media (max-width: 600px) {
                                                width: auto;
                                                height: auto;
                                                display: flex;
                                                position: fixed;
                                                flex-direction: column;
                                                top: ${rePro ? '140px' : '175px'};
                                                right: 7px;
                                                z-index: 88;
                                                border-radius: 50%;
                                            }
                                        `}
                                    >
                                        {userData.map((rs) => {
                                            if (rs.id === k_user) setRePro(true);
                                            return (
                                                <A key={rs.id} href={`#profiles${rs.id}`}>
                                                    <Avatar
                                                        src={rs.avatar}
                                                        alt={rs.fullName}
                                                        gender={rs.gender}
                                                        radius="50%"
                                                        id={cookies.k_user}
                                                        css=" width: 40px; height: 40px; cursor: var(--pointer);"
                                                    />
                                                </A>
                                            );
                                        })}
                                    </Div>
                                )}
                                {userData?.map((data: any, index: number) => (
                                    <Personalpage
                                        setUserFirst={setUserFirst}
                                        userFirst={userFirst}
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
                    </>
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
                dataLogin={{ en: login.en, vi: login.vi }}
                dataRegister={{ vi: register.vi, en: register.en }}
            />
        </Suspense>
    );
}

export default App;
