import clsx from 'clsx';
import { createRef, Fragment, Key, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DivPost } from './styleHome';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import HttpRequestHome from '~/restAPI/requestServers/socialNetwork/home';
import FormUpNews, { PropsFormHome } from './Layout/FormUpNews/FormUpNews';
import Posts from './Layout/DataPosts/Posts';
import HttpRequestUser from '~/restAPI/requestServers/accountRequest/userAPI';
import { Div, H3, P } from '~/reUsingComponents/styleComponents/styleDefault';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { socket } from 'src/mainPage/nextWeb';
import { setTrueErrorServer } from '~/redux/hideShow';

console.log('eeeeeeeeeeeeeeeeeeeeeeeee');

export interface PropsUserHome {
    avatar: string;
    fullName: string;
    gender: number;
}
export interface PropsTextHome {
    userBar: {
        contentFirst: string;
        contentTwo: string;
    };
    form: PropsFormHome;
}
interface PropsHome {
    colorBg: number;
    colorText: string;
    home: PropsTextHome;
    dataUser: PropsUserHome;
}
const Home: React.FC<PropsHome> = ({ home, colorBg, colorText, dataUser }) => {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['tks', 'k_user']);
    const token = cookies.tks;
    const userId = cookies.k_user;

    const { userBar, form } = home;

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const data: any = await HttpRequestHome.news(token, dispatch);
            if (data?.status === 9999) dispatch(setTrueErrorServer(''));
            // ...
        }
        fetchData();
    }, []);
    // socket.on('connect', () => {

    console.log('nooo');

    const [userList, setUserList] = useState();
    const [moveForm, setMoveForm] = useState<boolean>(false);
    const handleOpenForm = () => {
        console.log('ok very good');
    };
    const minWidth1 = '400px';
    const minWidth2 = '600px';
    const bgAther = colorBg === 1 ? '#17181af5' : colorBg;
    return (
        <Div
            css={`
                justify-content: center;
                background-color: ${bgAther};
            `}
        >
            <DivPost>
                <Div
                    css={`
                        width: 100%;
                        margin-top: 18px;
                        border-radius: 10px;
                        background-color: #494c54cf;
                        z-index: 1;
                    `}
                    onClick={handleOpenForm}
                >
                    <Avatar
                        src={dataUser.avatar}
                        gender={dataUser.gender}
                        alt={dataUser.fullName}
                        radius="50%"
                        css={`
                            width: 38px;
                            height: 38px;
                            margin: 5px;
                            @media (min-width: ${minWidth1}) {
                                width: 45px;
                                height: 45px;
                                margin: 7px 7px 7px 10px;
                            }
                        `}
                        profile={false}
                    />
                    <Div
                        css={`
                            width: 75%;
                            height: fit-content;
                            color: ${colorText};
                            margin-top: 2px;
                            @media (min-width: ${minWidth1}) {
                                margin-top: 6px;
                            }
                        `}
                        wrap="wrap"
                    >
                        <H3
                            css={`
                                width: 100%;
                                font-size: 1.5rem;
                                height: fit-content;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                                @media (min-width: ${minWidth1}) {
                                    font-size: 1.6rem;
                                }
                            `}
                        >
                            {dataUser.fullName}
                        </H3>
                        <P
                            css={`
                                font-size: 1.2rem;
                                height: fit-content;
                                @media (min-width: ${minWidth1}) {
                                    font-size: 1.2rem;
                                }
                            `}
                        >
                            {userBar.contentFirst} <span style={{ fontSize: '1rem' }}>{userBar.contentTwo}</span>
                        </P>
                    </Div>
                </Div>
                <FormUpNews
                    userId={userId}
                    token={token}
                    form={form}
                    colorBg={colorBg}
                    colorText={colorText}
                    user={dataUser}
                />
                <Posts colorBg={colorBg} colorText={colorText} />
            </DivPost>
        </Div>
    );
};

export default memo(Home);
