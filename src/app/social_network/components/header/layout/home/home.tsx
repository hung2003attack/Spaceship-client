import clsx from 'clsx';
import { createRef, Fragment, Key, memo, useEffect, useRef, useState } from 'react';
import { DivHome } from './styleHome';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import HttpRequestHome from '~/restAPI/requestServers/socialNetwork/home';
import FormUpNews from './Layout/FormUpNews/FormUpNews';
import Posts from './Layout/DataPosts/Posts';
import HttpRequestUser from '~/restAPI/requestServers/accountRequest/user';
import { Div, H3, P } from '~/reUsingComponents/styleComponents/styleDefault';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
export interface PropsUserHome {
    avatar: string;
    fullName: string;
    gender: number;
}
const Home: React.FC<{ colorBg: string; colorText: string }> = ({ colorBg, colorText }) => {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['tks', 'k_user']);
    const [user, setUser] = useState<PropsUserHome>();
    const token = cookies.tks;

    useEffect(() => {
        const data = HttpRequestHome.news(token, dispatch);
    }, []);
    useEffect(() => {
        //  const data = GetFriend.friend(dispatch);
        async function fectData() {
            const res: PropsUserHome = await HttpRequestUser.getById(cookies.tks, cookies.k_user, {
                avatar: 'avatar',
                fullName: 'fullname',
                gender: 'gender',
            });
            setUser(res);
        }
        fectData();
    }, []);

    const [userList, setUserList] = useState();
    const [moveForm, setMoveForm] = useState<boolean>(false);
    const handleOpenForm = () => {
        console.log('ok very good');
    };
    const minWidth1 = '400px';
    return (
        <DivHome bg={colorBg}>
            <Div
                css={`
                    width: 277px;
                    margin-top: 18px;
                    border-radius: 10px;
                    background-color: #494c54cf;
                    @media (min-width: ${minWidth1}) {
                        width: 370px;
                    }
                `}
                onClick={handleOpenForm}
            >
                <Avatar
                    src={user?.avatar}
                    alt={user?.fullName}
                    gender={user?.gender}
                    width="38px"
                    radius="50%"
                    css={`
                        margin: 5px;
                        @media (min-width: ${minWidth1}) {
                            width: 50px;
                            height: 50px;
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
                            margin-top: 7px;
                        }
                    `}
                    wrap="wrap"
                >
                    <H3
                        css={`
                            font-size: 1.5rem;
                            height: fit-content;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            @media (min-width: ${minWidth1}) {
                                font-size: 1.8rem;
                            }
                        `}
                    >
                        {user?.fullName}
                    </H3>
                    <P
                        css={`
                            font-size: 1.2rem;
                            height: fit-content;
                            @media (min-width: ${minWidth1}) {
                                font-size: 1.3rem;
                            }
                        `}
                    >
                        What's on your mind? <span style={{ fontSize: '1rem' }}>( click here to post )</span>
                    </P>
                </Div>
            </Div>
            <FormUpNews colorBg={colorBg} colorText={colorText} dataUser={user} />
            <Posts colorBg={colorBg} colorText={colorText} />
        </DivHome>
    );
};

export default memo(Home);
