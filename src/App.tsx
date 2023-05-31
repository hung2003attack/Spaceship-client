import { useDispatch, useSelector } from 'react-redux';
import { InitialStateHideShow, offAll, onPersonalPage, setIdUser } from './app/redux/hideShow';

import Personalpage from './mainPage/personalPage/personalPage';
import { login } from './dataMark/dataLogin';
import { register } from './dataMark/dataRegister';
import { useCookies } from 'react-cookie';
import React, { Suspense, useEffect, useState } from 'react';
import searchAPI from './app/restAPI/requestServers/socialNetwork/searchAPI_SN';
import { DivContainer } from './app/reUsingComponents/styleComponents/styleComponents';
import styled from 'styled-components';
import { Div } from './app/reUsingComponents/styleComponents/styleDefault';
import Progress from './app/reUsingComponents/Progress/Progress';
import Cookies from 'universal-cookie';
import ErrorBoudaries from './app/reUsingComponents/ErrorBoudaries/ErrorBoudaries';
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
const Authentication = React.lazy(() => import('~/Authentication/Auth'));
const Website = React.lazy(() => import('./mainPage/nextWeb'));
const Message = React.lazy(() => import('~/Message/message'));
const cookie = new Cookies();
function App() {
    const dispatch = useDispatch();
    const [reload, setReload] = useState<boolean>(false);
    const { setting, personalPage } = useSelector((state: any) => state.hideShow);
    const { idUser, errorServer } = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow);
    useEffect(() => {
        if (idUser.length > 0) dispatch(onPersonalPage());
    }, [idUser]);
    const handleClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(offAll());
        dispatch(setIdUser([]));
    };
    console.log(idUser, 'idUser');

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
    useEffect(() => {
        //seach on the url of web add profile?id=id
        const search = async () => {
            const search = window.location.search;
            if (search) {
                const id = search.split('id=');
                console.log('id', id);

                if (id.length < 4 && id.length > 0) {
                    const arrayData = [];
                    for (let i = 1; i < id.length; i++) {
                        const res = await searchAPI.user(id[i], cookies.tks);
                        console.log(res, 'sss');

                        if (res.status === 1) {
                            arrayData.push(res.data);
                        }
                    }
                    if (arrayData.length > 0) {
                        dispatch(setIdUser(arrayData));
                        dispatch(onPersonalPage());
                    }
                }
            } else {
                dispatch(setIdUser([]));
                dispatch(offAll());
            }
        };
        search();
    }, []);

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
                <Website />
                {(setting || personalPage) && <DivOpacity onClick={handleClick} />}
                <Message />
                {idUser?.length > 0 && (
                    <DivContainer width="80%" height="100%" css={css} bg="#fff" content="start" display="flex">
                        {idUser?.map((data: any, index: number) => (
                            <Personalpage user={data} key={index} leng={leng} />
                        ))}
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
