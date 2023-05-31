/* eslint-disable react-hooks/exhaustive-deps */
import { Div, H3, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItems, DivMenu, DivOptions, DivResults, DivSearch, Input } from './styleMakingFriends';
import TagProfle from '~/social_network/components/Header/layout/MakingFriends/TagProfle';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import PeopleRequest from '~/restAPI/requestServers/socialNetwork/people';
import { useCookies } from 'react-cookie';

import user from '~/restAPI/requestServers/accountRequest/user';
import { io } from 'socket.io-client';
import moment from 'moment';
import { DotI } from '~/assets/Icons/Icons';
import { text } from 'stream/consumers';
const socket = io('http://localhost:3001', { transports: ['websocket'] });

export interface PropsTextFriends {
    option: string[];
    menu: { name: string; id: string }[];
    main: string;
}
export interface PropsUserPeople {
    avatar?: string;
    fullName?: string;
    gender?: number;
}
interface PropsMakingFriends {
    friendsT: PropsTextFriends;
    colorText: string;
    colorBg: number;
    dataUser?: PropsUserPeople;
}
interface PropsDataUsers {
    family: {
        id: string;
        avatar: string;
        fullName: string;
        nickName: string;
        gender: number;
        birthday: string;
        id_r_user: {
            id_relative: string;
            id_user: string;
            really: number;
            title: string;
            createdAt?: string;
        };
        id_relative: {
            id_relative: string;
            id_user: string;
            really: number;
            title: string;
            createdAt?: string;
        };
    }[];
    friends: {
        id: string;
        avatar: string;
        fullName: string;
        nickName: string;
        gender: number;
        birthday: string;
        id_friend: {
            idCurrentUser: string;
            idFriend: string;
            level: number;
            createdAt: string;
        };
        id_f_user: {
            idCurrentUser: string;
            idFriend: string;
            level: number;
            createdAt: string;
        };
    }[];
    strangers: {
        id: string;
        avatar: string;
        fullName: string;
        nickName: string;
        gender: number;
        birthday: string;
        id_friend?: {
            idCurrentUser: string;
            idFriend: string;
            level: number;
            createdAt: string;
        };
    }[];
}
interface PropsStrangers {
    id: string;
    avatar: string;
    fullName: string;
    nickName: string;
    gender: number;
    birthday: string;
    id_friend: {
        idCurrentUser: string | null | undefined;
        idFriend: string | null | undefined;
        level: number | null | undefined;
        createdAt: string | null | undefined;
    };
    id_f_user: {
        idCurrentUser: string | null;
        idFriend: string | null;
        level: number | null;
        createdAt: string | null;
    };
}
const MakingFriends: React.FC<PropsMakingFriends> = ({ friendsT, colorText, colorBg, dataUser }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string[]>([]);
    const [cookies, setCookies] = useCookies(['tks', 'k_user']);
    const accessToken: string = cookies.tks;
    const userId = cookies.k_user;

    const [button, setButton] = useState(['']);
    const [sName, setSName] = useState<string>('');
    const [sAge, setSAge] = useState<string>('');
    const [sBirth, setSBirth] = useState<string>('');
    const [sAddress, setSAddress] = useState<string>('');
    const [type, setType] = useState<string>('strangers');
    const [data, setData] = useState<PropsDataUsers | any>({
        family: [
            {
                id: '',
                avatar: '',
                fullName: '',
                nickName: '',
                gender: 0,
                birthday: '',
                id_r_user: {
                    id_relative: '',
                    id_user: '',
                    really: 0,
                    title: '',
                },
                id_relative: {
                    id_relative: '',
                    id_user: '',
                    really: 0,
                    title: '',
                },
            },
        ],
        friends: [
            {
                id: '',
                avatar: '',
                fullName: '',
                nickName: '',
                gender: 0,
                birthday: '',
                id_friend: {
                    idCurrentUser: '',
                    idFriend: '',
                    level: 0,
                    createdAt: '',
                },
                id_user: {
                    idCurrentUser: '',
                    idFriend: '',
                    level: 0,
                    createdAt: '',
                },
            },
        ],
        strangers: [
            {
                id: '',
                avatar: '',
                fullName: '',
                nickName: '',
                gender: 0,
                birthday: '',
            },
        ],
    });
    const [dataTest, setDataTest] = useState<any>();
    const [dataConfirm, setDataConfirm] = useState<{ ok: number; id_fr: string; id: string }>();
    useEffect(() => {
        console.log('dataTest', data.strangers, dataTest);
        const newStranger = data.strangers.filter((x: PropsStrangers) => {
            console.log(x.id === dataTest?.data?.idCurrentUser, 'check', x.id, dataTest?.data?.idCurrentUser);

            if (x.id === dataTest?.data?.idCurrentUser) {
                x.id_f_user.idCurrentUser = dataTest?.data?.idCurrentUser;
                x.id_f_user.idFriend = dataTest?.data?.idFriend;
                x.id_f_user.createdAt = dataTest?.data?.createdAt;
                x.id_f_user.level = 1;
                console.log('xxxx', dataTest);

                return x;
            } else {
                return x;
            }
        });
        console.log('newStranger', newStranger, 'data', data);

        setData({ ...data, strangers: newStranger });
    }, [dataTest]);
    useEffect(() => {
        const newStranger = data.strangers.filter((x: PropsStrangers) => {
            if (x.id === dataConfirm?.id) {
                if (x.id_f_user.level) x.id_f_user.level = 2;
                if (x.id_friend.level) x.id_friend.level = 2;
                data.friends.push(x);
            } else {
                return x;
            }
        });
        setData({ ...data, strangers: newStranger });
    }, [dataConfirm]);
    async function fetch() {
        const res = await PeopleRequest.getPeople(accessToken);
        setData(res);
        console.log(res, 'res here');
    }
    useEffect(() => {
        fetch();
        socket.on(`Request others?id=${userId}`, (msg: string) => {
            setDataTest(JSON.parse(msg));
        });
        socket.on(`Del request others?id=${userId}`, (msg: string) => {
            setDataTest(JSON.parse(msg));
        });
        socket.on(`Confirmed ${userId}`, (msg: string) => {
            if (msg) setDataConfirm(JSON.parse(msg));
        });
        // socket.on(`Delete request friends or relatives${userId}`, (msg: any) => {
        //     fetch();
        //     console.log('Delete Request message id:', msg);
        // });
    }, []);

    const optionS = friendsT.option;
    const menu = friendsT.menu;
    const css = `    display: flex;
            align-items: center;
            padding: 4px 6px;
           background-color: #5e5e5e;
            color: #cbcbcb;
            cursor: var(--pointer);
            border-radius: 5px;
            font-size: 1.3rem;
            font-weight: 400;
            justify-content: center;
              @media (min-width: 769px){
                padding: 6px;
              }
          `;
    const cssImage = `
                    min-width: 40px;
                    width: 40px;
                    height: 40px;
                    margin-right: 5px;
                    cursor: var(--pointer); 
                    @media (min-width: 769px){
                            width: 100%;
                            height: 170px;
                            margin-right: 0;
                            img{border-radius: 5px 5px 0 0 !important; }
                    }
                    img{border-radius: 50% ;}`;
    console.log(search);
    const handleOption = (e: any, i: string) => {
        if (!['0', '1', '2', '3'].includes(e.target.getAttribute('id'))) {
            if (search.lastIndexOf(i) >= 0) {
                search.splice(search.indexOf(i), 1);
                setSearch([...search]);
            } else {
                setSearch([...search, i]);
            }
        }
    };
    const handleRemove = async (id: string, of: string = 'yes') => {
        if (of === 'no' && id) {
            const newData: any = data['strangers']?.filter((d: { id: string }) => d.id !== id);
            setData({ ...data, strangers: newData });
            console.log('newData', newData);
        } else {
            console.log('deleted', id);
            const res = await PeopleRequest.delete(accessToken, id);
            if (res) {
                const newData: any = data['strangers']?.filter((d: { id: string }) => d.id !== id);
                setData({ ...data, strangers: newData });
            }
        }
    };
    const handleAdd = async (id: string, gender: number, kindOf: string = 'friend') => {
        console.log('add friend', kindOf);

        const res: {
            id_friend: string;
            mess: {
                id_message: string;
                status: number;
                title: string;
                createdAt: string;
            };
            data: {
                createdAt: string;
                id: 79;
                idCurrentUser: string;
                idFriend: string;
                id_message: string;
            };
        } = await PeopleRequest.setFriend(
            accessToken,
            id,
            `${gender === 0 ? 'He' : gender === 1 ? 'She' : 'Honey'} has sent for you a friend request`,
        );

        const newStranger = data.strangers.filter((x: PropsStrangers) => {
            if (x.id === res.data.idFriend) {
                x.id_f_user.idCurrentUser = res.data.idCurrentUser;
                x.id_f_user.idFriend = res.data.idFriend;
                x.id_f_user.createdAt = res.data.createdAt;
                x.id_f_user.level = 1;
                console.log('xxxx', x);

                return x;
            } else {
                return x;
            }
        });
        console.log('newStranger', newStranger, 'data', data);

        setData({ ...data, strangers: newStranger });

        setButton([...button, res.id_friend]);

        console.log('add', res);
    };
    const handleAbolish = async (id: string, kindOf: string = 'friends') => {
        console.log('Abolish', kindOf, id);
        const res = await PeopleRequest.delete(accessToken, id, kindOf);
        console.log('Abolish', res);
        const newStranger = data.strangers.filter((x: PropsStrangers) => {
            if (
                (x.id_f_user.idCurrentUser === res.idCurrentUser && x.id_f_user.idFriend === res.idFriend) ||
                (x.id_f_user.idFriend === res.idCurrentUser && x.id_f_user.idCurrentUser === res.idFriend) ||
                (x.id_friend.idCurrentUser === res.idCurrentUser && x.id_friend.idFriend === res.idFriend) ||
                (x.id_friend.idCurrentUser === res.idFriend && x.id_friend.idFriend === res.idCurrentUser)
            ) {
                console.log('Deleted!', x);
                x.id_f_user.idCurrentUser = null;
                x.id_f_user.idFriend = null;
                x.id_f_user.level = null;
                x.id_f_user.createdAt = null;
                x.id_friend.idCurrentUser = null;
                x.id_friend.idFriend = null;
                x.id_friend.level = null;
                x.id_friend.createdAt = null;
                return x;
            } else {
                return x;
            }
        });
        console.log('newStranger', newStranger, 'data', data);

        setData({ ...data, strangers: newStranger });
    };
    const handleConfirm = async (id: string, kindOf: string = 'friends') => {
        const res = await PeopleRequest.setConfirm(accessToken, id, kindOf);
        console.log('confirm', kindOf, id, res);
        if (res.ok === 1) {
            const newStranger = data.strangers.filter((x: PropsStrangers) => {
                if (
                    (x.id_f_user.idCurrentUser === res.id_fr && x.id_f_user.idFriend === userId) ||
                    (x.id_friend.idCurrentUser === res.id_fr && x.id_friend.idFriend === userId)
                ) {
                    if (x.id_f_user.level) x.id_f_user.level = 2;
                    if (x.id_friend.level) x.id_friend.level = 2;
                    data.friends.push(x);
                    return x;
                } else {
                    return x;
                }
            });
            console.log('newStranger', newStranger);
            setData({ ...data, strangers: newStranger });
        }
    };
    const handleMessenger = (id: string) => {
        console.log('messenger', id);
    };
    console.log(button);
    const handleSearch = (e: { target: { getAttribute: (arg0: string) => any; value: any } }) => {
        const type = e.target.getAttribute('id');
        console.log(type, 'search', e.target.value);
        type === '0'
            ? setSName(e.target.value)
            : type === '1'
            ? setSBirth(e.target.value)
            : setSAddress(e.target.value);
    };
    console.log('type', type);
    let fixCssB = 0;
    const Tag = (res: any, typesc?: string) => {
        const dateTime = moment(res.id_user?.createdAt).format('DD-MM-YYYY HH:mm:ss');
        const id_fr = button.includes(res.id);
        const destroy = {
            name: type === 'strangers' ? 'Remove' : 'Delete',
        };
        const buttons = [];
        function checkPeople() {
            if (res.id_f_user?.level === 2 || res.id_friend?.level === 2) {
                buttons.push({
                    text: 'Messenger',
                    css: css + ' background-color: #366ab3; ',
                    onClick: () => handleMessenger(res.id),
                });
            } else {
                if (
                    (res.id_friend?.idCurrentUser ||
                        res.id_f_user?.idCurrentUser ||
                        res.id_friend?.idFriend ||
                        res.id_f_user?.idFriend) &&
                    (res.id_r_user?.id_user ||
                        res.id_relative?.id_user ||
                        res.id_r_user?.id_relative ||
                        res.id_relative?.id_relative)
                ) {
                    console.log('yessss');

                    if (
                        (res.id_friend?.idCurrentUser === userId || res.id_f_user?.idCurrentUser === userId) &&
                        (res.id_r_user?.id_user === userId || res.id_relative?.id_user === userId)
                    ) {
                        console.log('friend and relative ---you');

                        if (res.id_r_user?.id_user === userId || res.id_relative?.id_user === userId) {
                            fixCssB = 3;
                            buttons.push(
                                {
                                    text: 'Delete',
                                    css: css + '@media (min-width: 769px){width: 87%; margin-top: 5px;}',
                                    onClick: () => handleRemove(res.id),
                                },
                                {
                                    text: 'Abolish',
                                    tx: '(R)',
                                    css: css + 'background-color: #af2c48; ',
                                    onClick: () => handleAbolish(res.id, 'relatives'),
                                },
                                {
                                    text: 'Abolish',
                                    tx: '(F)',
                                    css: css + 'background-color: #af2c48; ',
                                    onClick: () => handleAbolish(res.id),
                                },
                            );
                        } else if (res.id_r_user?.id_relative === userId || res.id_relative?.id_relative === userId) {
                            fixCssB = 3;
                            buttons.push(
                                {
                                    text: 'Delete',
                                    css: css + '@media (min-width: 769px){width: 87%; margin-top: 5px;}',
                                    onClick: () => handleRemove(res.id),
                                },
                                {
                                    text: 'Confirm',
                                    tx: '(R)',
                                    css: css + 'background-color: #af2c48; ',
                                    onClick: () => handleConfirm(res.id, 'relative'),
                                },
                                {
                                    text: 'Abolish',
                                    tx: '(F)',
                                    css: css + 'background-color: #af2c48; ',
                                    onClick: () => handleAbolish(res.id),
                                },
                            );
                        } else {
                            fixCssB = 0;

                            buttons.push(
                                {
                                    text: 'Delete',
                                    css: css,
                                    onClick: () => handleRemove(res.id),
                                },
                                {
                                    text: 'Abolish',
                                    tx: '(F)',
                                    css: css + 'background-color: #af2c48; ',
                                    onClick: () => handleAbolish(res.id),
                                },
                            );
                        }
                    } else if (
                        (res.id_friend?.idFriend === userId || res.id_f_user?.idFriend === userId) &&
                        (res.id_r_user?.id_relative === userId || res.id_relative?.id_relative === userId)
                    ) {
                        console.log('friend and relative ---others');
                        fixCssB = 3;
                        buttons.push(
                            {
                                text: 'Delete',
                                css: css + '@media (min-width: 769px){width: 87%; margin-top: 5px;}',
                                onClick: () => handleRemove(res.id),
                            },
                            {
                                text: 'Confirm',
                                tx: '(F)',
                                css: css + ' background-color: #1553a1; ',
                                onClick: () => handleConfirm(res.id),
                            },
                            {
                                text: 'Confirm',
                                tx: '(R)',
                                css: css + 'background-color:  #1553a1; ',
                                onClick: () => handleConfirm(res.id, 'relative'),
                            },
                        );
                    } else if (
                        (res.id_friend?.idFriend === userId || res.id_f_user?.idFriend === userId) &&
                        (res.id_r_user?.id_user === userId || res.id_relative?.id_user === userId)
                    ) {
                        fixCssB = 3;
                        buttons.push(
                            {
                                text: 'Delete',
                                css: css + '@media (min-width: 769px){width: 87%; margin-top: 5px;}',
                                onClick: () => handleRemove(res.id),
                            },
                            {
                                text: 'Confirm',
                                tx: '(F)',
                                css: css + ' background-color: #1553a1; ',
                                onClick: () => handleConfirm(res.id),
                            },
                            {
                                text: 'Abolish',
                                tx: '(R)',
                                css: css + 'background-color: #af2c48; ',
                                onClick: () => handleAbolish(res.id, 'relative'),
                            },
                        );
                        console.log('friend --others-s __ relative --you-s');
                    } else if (
                        (res.id_friend?.idCurrentUser === userId || res.id_f_user?.idCurrentUser === userId) &&
                        (res.id_r_user?.id_relative === userId || res.id_relative?.id_relative === userId)
                    ) {
                        console.log('friend --you-s __ relative --others-s');
                        fixCssB = 3;
                        buttons.push(
                            {
                                text: 'Delete',
                                css: css + '@media (min-width: 769px){width: 87%; margin-top: 5px;}',
                                onClick: () => handleRemove(res.id),
                            },
                            {
                                text: 'Abolish',
                                tx: '(F)',
                                css: css + ' background-color: #af2c48; ',
                                onClick: () => handleAbolish(res.id),
                            },
                            {
                                text: 'Confirm',
                                tx: '(R)',
                                css: css + 'background-color: #1553a1; ',
                                onClick: () => handleConfirm(res.id, 'relative'),
                            },
                        );
                    }
                } else if (res.id_friend?.idCurrentUser === userId || res.id_f_user?.idCurrentUser === userId) {
                    console.log('friend --you', res);
                    fixCssB = 0;
                    buttons.push(
                        {
                            text: 'Delete',
                            css: css,
                            onClick: () => handleRemove(res.id),
                        },
                        {
                            text: 'Abolish',
                            tx: '(F)',
                            css: css + 'background-color: #af2c48; ',
                            onClick: () => handleAbolish(res.id),
                        },
                    );
                } else if (res.id_friend?.idFriend === userId || res.id_f_user?.idFriend === userId) {
                    console.log('friend --others');
                    fixCssB = 0;
                    buttons.push(
                        {
                            text: 'Delete',
                            css: css,
                            onClick: () => handleRemove(res.id),
                        },
                        {
                            text: 'Confirm',
                            tx: '(F)',
                            css: css + 'background-color:   #1553a1; ',
                            onClick: () => handleConfirm(res.id),
                        },
                    );
                } else if (res.id_r_user?.id_user === userId || res.id_relative?.id_user === userId) {
                    console.log('relative --you');
                    fixCssB = 0;
                    buttons.push(
                        {
                            text: 'Delete',
                            css: css,
                            onClick: () => handleRemove(res.id),
                        },
                        {
                            text: 'Abolish',
                            tx: '(R)',
                            css: css + 'background-color: #af2c48; ',
                            onClick: () => handleAbolish(res.id, 'relative'),
                        },
                    );
                } else if (res.id_r_user?.id_relative === userId || res.id_relative?.id_relative === userId) {
                    fixCssB = 0;
                    console.log('relative --others');
                    buttons.push(
                        {
                            text: 'Delete',
                            css: css,
                            onClick: () => handleRemove(res.id),
                        },
                        {
                            text: 'Confirm',
                            tx: '(R)',
                            css: css + 'background-color: #1553a1; ',
                            onClick: () => handleConfirm(res.id, 'relative'),
                        },
                    );
                } else {
                    console.log('else');
                    fixCssB = 0;
                    buttons.push(
                        {
                            text: 'Remove',
                            css: css,
                            onClick: () => handleRemove(res.id, id_fr ? 'yes' : 'no'),
                        },
                        {
                            text: 'Add friend',
                            css: css + ' background-color: #366ab3;',
                            onClick: () => handleAdd(res.id, res.gender),
                        },
                    );
                }
            }
        }
        // (res.id_r_user?.id_user === userId && res.id_r_user?.really === 0) ||
        // (res.id_relative?.id_user === userId && res.id_relative?.really === 0)
        if (type === 'friends') {
            if (typesc === 'friends') {
                if (
                    (res.id_r_user?.id_user === userId && res.id_r_user?.really === 0) ||
                    (res.id_relative?.id_user === userId && res.id_relative?.really === 0)
                ) {
                    buttons.push(
                        {
                            text: 'Messenger',
                            css: css + ' background-color: #366ab3; ',
                            onClick: () => handleMessenger(res.id),
                        },
                        {
                            text: 'Abolish',
                            tx: '(R)',
                            css: css + 'background-color: #af2c48; ',
                            onClick: () => handleAbolish(res.id, 'relative'),
                        },
                    );
                } else {
                    buttons.push({
                        text: 'Messenger',
                        css: css + ' background-color: #366ab3; ',
                        onClick: () => handleMessenger(res.id),
                    });
                }
            }
        } else {
            checkPeople();
        }

        return res.fullName.startsWith(sName, 0) && res.birthday.startsWith(sBirth, 0) && res.id ? (
            <Div
                key={res.id}
                wrap="wrap"
                css={`
                    width: 90%;
                    padding: 5px;
                    border: 1px solid #414141;
                    margin: 10px;
                    transition: all 0.2s linear;
                    position: relative;
                    &:hover {
                        box-shadow: 0 0 8px #6a48bc;
                    }
                    @media (min-width: 480px) {
                        width: 306px;
                    }
                    @media (min-width: 769px) {
                        width: 190px;
                        height: fit-content;
                        flex-wrap: wrap;
                        justify-content: center;
                        text-align: center;
                        background-color: #292a2c;
                        box-shadow: 0 0 5px #7b797987;
                        border-radius: 5px;
                        padding: 0 0 12px;
                    }
                `}
            >
                {typesc === 'family' && (
                    <P css="width: 100%; text-align: center; border-bottom: 1px solid #515150; font-size: 1.4rem;">
                        {res.id_r_user?.title || res.id_relative?.title}
                    </P>
                )}
                <Div
                    css={`
                        position: absolute;
                        top: ${typesc === 'family' ? '33px' : '9px'};
                        right: 9px;
                        font-size: 20px;
                    `}
                >
                    <DotI />
                </Div>
                <TagProfle fixCssB={fixCssB} profile button={buttons} cssImage={cssImage} data={res} typesc={typesc} />
            </Div>
        ) : (
            <div key={res.id}></div>
        );
    };
    const type_d = ['you sent', 'others sent'].includes(type) ? 'strangers' : type;
    return (
        <DivOptions bg={colorBg === 1 ? '#353535' : ''} color={colorText}>
            <DivSearch>
                {optionS?.map((i, index) => (
                    <DivItems
                        display="flex"
                        css={`
                            padding: 4px;
                            ${search.includes(i)
                                ? 'width: 100%; '
                                : search.length > 0
                                ? 'width: 0%; display: none; '
                                : 'width: 100%;'};
                            transition: all 0.2s linear;
                            ${search.includes(i)
                                ? ' input {display: block; width: 100%; transition: all 0.5s linear;} div {width: 25%; transition: all 0.5s linear;}'
                                : 'input {display: none; width: 0%;} div {width: 100%;}'};
                            @media (min-width: 600px) {
                                ${search.includes(i)
                                    ? 'width: 100%;'
                                    : search.length > 1
                                    ? 'width: 40%;  display: block;'
                                    : 'width: 20%; display: block; '};
                            }
                            /* @media (min-width: 769px) {
                                width: 100%;
                                padding: 4px;
                            } */
                        `}
                        key={i}
                        onClick={(e) => handleOption(e, i)}
                    >
                        <Input id={`${index}`} type="text" placeholder={i} color={colorText} onChange={handleSearch} />
                        <DivItems>{i}</DivItems>
                    </DivItems>
                ))}
            </DivSearch>
            <Div css="height: 91%">
                <DivMenu>
                    {menu?.map((m) => (
                        <DivItems
                            key={m.name}
                            css={`
                                ${m.id === type ? 'background-color: #444444;' : ''}
                            `}
                            onClick={() => setType(m.id)}
                        >
                            {m.name}
                        </DivItems>
                    ))}
                </DivMenu>
                <Div width="100%" css="position: relative; height: 100%; overflow-y: overlay;">
                    <DivResults>
                        <H3 css="width: 100%; text-align: center; padding: 3px; background-color: #353535; font-size: 1.5rem;">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </H3>

                        {data[type_d]?.map((res: any) => {
                            console.log(
                                res,
                                'res here',
                                data[type_d],

                                type,
                                type.charAt(0).toUpperCase() + type.slice(1),
                            );

                            if (type === 'you sent') {
                                if (
                                    (res.id_friend?.idCurrentUser === userId && res.id_friend?.level === 1) ||
                                    (res.id_f_user?.idCurrentUser === userId && res.id_f_friend?.level === 1) ||
                                    (res.id_r_user?.id_user === userId && res.id_r_user?.really === 0) ||
                                    (res.id_relative?.id_user === userId && res.id_relative?.really === 0)
                                )
                                    return Tag(res, type);
                            } else if (type === 'others sent') {
                                if (
                                    (res.id_f_user?.idFriend === userId && res.id_f_user?.level === 1) ||
                                    (res.id_relative?.id_relative === userId && res.id_relative?.really === 0) ||
                                    (res.id_friend?.idFriend === userId && res.id_f_user?.level === 1) ||
                                    (res.id_relative?.id_relative === userId && res.id_relative?.really === 0)
                                )
                                    return Tag(res, type);
                            } else if (type === 'friends') {
                                if (res.id_friend?.level === 2 || res.id_f_user?.level === 2) return Tag(res, type);
                            } else if (type === 'family') {
                                return Tag(res, type);
                            } else {
                                return Tag(res);
                            }
                        })}
                    </DivResults>
                </Div>
            </Div>
        </DivOptions>
    );
};
export default MakingFriends;
