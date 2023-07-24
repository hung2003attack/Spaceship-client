import clsx from 'clsx';
import { createRef, Fragment, Key, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DivPost } from './styleHome';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import HomeAPI from '~/restAPI/requestServers/socialNetwork/homeAPI';
import FormUpNews, { PropsFormHome } from './Layout/FormUpNews/FormUpNews';
import Posts, { PropsDataPosts } from './Layout/DataPosts/Posts';
import HttpRequestUser from '~/restAPI/requestServers/accountRequest/userAPI';
import { Div, H3, P } from '~/reUsingComponents/styleComponents/styleDefault';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { socket } from 'src/mainPage/nextWeb';
import { setTrueErrorServer } from '~/redux/hideShow';
import CookiesF from '~/reUsingComponents/cookies';
import homeAPI from '~/restAPI/requestServers/socialNetwork/homeAPI';

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
    const { userBar, form } = home;
    const [include, setInclude] = useState<boolean>(false); // show imotion of icon
    const [userList, setUserList] = useState();
    const [moveForm, setMoveForm] = useState<boolean>(false);
    const [dataPosts, setDataPosts] = useState<PropsDataPosts[]>([]);
    const { token } = CookiesF();
    const offest = useRef<number>(0);
    const limit = 5;
    console.log('nooo');

    const handleOpenForm = () => {
        console.log('ok very good');
    };

    useEffect(() => {
        async function fetch() {
            const data = await homeAPI.getPosts(token, limit, offest.current, 'friend');
            setDataPosts(data);
            console.log(data, 'fet');
        }
        fetch();
    }, []);
    const minWidth1 = '400px';
    const bgAther = colorBg === 1 ? '#17181af5' : colorBg;
    return (
        <Div
            width="100%"
            css={`
                overflow-y: overlay;
                height: 100%;
                padding-top: 50px;
                justify-content: center;
                background-color: ${bgAther};
            `}
            onClick={() => setInclude(!include)}
            onTouchStart={() => setInclude(!include)}
        >
            <DivPost>
                <Div
                    css={`
                        width: 100%;
                        margin-top: 18px;
                        border-radius: 10px;
                        background-color: #494c54cf;
                        border: 1px solid #6a6a6a;
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
                    form={form}
                    colorBg={colorBg}
                    colorText={colorText}
                    user={dataUser}
                    include={include}
                    setInclude={setInclude}
                />
                <Div display="block" css="margin: 20px 0;">
                    {dataPosts.map((p) => (
                        <Posts
                            key={p._id}
                            user={dataUser}
                            colorBg={colorBg}
                            colorText={colorText}
                            dataPosts={p}
                            include={include}
                            setInclude={setInclude}
                        />
                    ))}
                </Div>
            </DivPost>
        </Div>
    );
};

export default memo(Home);
