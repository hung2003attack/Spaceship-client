import { Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItems, DivMenu, DivOptions, DivResults, DivSearch, Input } from './styleMakingFriends';
import TagProfle from '~/social_network/components/Header/layout/MakingFriends/TagProfle';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PeopleRequest from '~/restAPI/requestServers/socialNetwork/people';
import { useCookies } from 'react-cookie';

import user from '~/restAPI/requestServers/accountRequest/user';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001', { transports: ['websocket'] });

export interface PropsTextFriends {
    option: string[];
    menu: string[];
    main: string;
}
export interface PropsUserPeople {
    avatar?: string;
    fullName?: string;
    gender?: number;
}
interface PropsMakingFriends {
    friends: PropsTextFriends;
    colorText: string;
    colorBg: number;
    dataUser?: PropsUserPeople;
}

const MakingFriends: React.FC<PropsMakingFriends> = ({ friends, colorText, colorBg, dataUser }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string[]>([]);
    const [cookies, setCookies] = useCookies(['tks', 'k_user']);
    const [button, setButton] = useState(['']);
    const [sName, setSName] = useState<string>('');
    const [sAge, setSAge] = useState<string>('');
    const [sBirth, setSBirth] = useState<string>('');
    const [sAddress, setSAddress] = useState<string>('');
    const accessToken: string = cookies.tks;
    const [data, setData] = useState<
        { id: string; avatar: string; fullName: string; nickName: string; gender: number; birthday: string }[]
    >([]);

    const idUser = cookies.k_user;
    useEffect(() => {
        async function fetch() {
            const res = await PeopleRequest.getPeople(accessToken);
            setData(res);
            console.log(res, 'res here');
        }
        fetch();
    }, []);

    const optionS = friends.option;
    const menu = friends.menu;
    const css = `    display: flex;
            align-items: center;
            padding: 4px 6px;
           background-color: #5e5e5e;
            color: #cbcbcb;
            cursor: var(--pointer);
            border-radius: 5px;
            font-size: 1.3rem;
            font-weight: 400;
          `;
    const cssImage = `
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
    const handleRemove = (id: string) => {
        if (id) {
            const newData = data.filter((d) => d.id !== id);
            setData(newData);
        }
    };
    const handleAdd = async (id: string, name: string) => {
        const res: {
            id_friend: string;
            mess: {
                id_message: string;
                status: number;
                title: string;
                createdAt: string;
            };
        } = await PeopleRequest.setFriend(accessToken, id, 'has sent for you a friend request');
        setButton([...button, res.id_friend]);
        if (res.id_friend) socket.emit('message request add friend', JSON.stringify(res));
        console.log('add', res);
    };
    console.log(button);
    const handleSearch = (e: { target: { getAttribute: (arg0: string) => any; value: any } }) => {
        const type = e.target.getAttribute('id');
        console.log(type, 'search', e.target.value);
        type === '0'
            ? setSName(e.target.value)
            : type === '1'
            ? setSAge(e.target.value)
            : type === '2'
            ? setSBirth(e.target.value)
            : setSAddress(e.target.value);
    };
    return (
        <DivOptions bg={colorBg === 1 ? '#373737' : ''} color={colorText}>
            <DivSearch>
                {optionS.map((i, index) => (
                    <DivItems
                        display="flex"
                        css={`
                            padding: 4px;
                            ${search.includes(i)
                                ? 'width: 100%;'
                                : search.length > 0
                                ? 'width: 0%; display: none; '
                                : 'width: 100%; '};
                            transition: all 0.2s linear;
                            ${search.includes(i)
                                ? ' input {display: block; width: 100%; transition: all 0.5s linear;} div {width: 25%; transition: all 0.5s linear;}'
                                : 'input {display: none; width: 0%;} div {width: 100%;}'};
                            @media (min-width: 600px) {
                                ${search.includes(i)
                                    ? 'width: 100%;'
                                    : search.length > 1
                                    ? 'width: 0%; '
                                    : 'width: 15%; display: block; '};
                            }
                            @media (min-width: 769px) {
                                width: 100%;
                                padding: 4px;
                            }
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
                    {menu.map((m) => (
                        <DivItems key={m}>{m}</DivItems>
                    ))}
                </DivMenu>
                <Div width="100%" css="position: relative;">
                    <DivResults>
                        {data.map((res) => {
                            return res.fullName.startsWith(sName, 0) ? (
                                <Div
                                    key={res.id}
                                    css={`
                                        width: 90%;
                                        height: 100px;
                                        padding: 5px;
                                        border: 1px solid #414141;
                                        margin: 10px;
                                        transition: all 0.2s linear;
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
                                    <TagProfle
                                        profile
                                        button={[
                                            { text: 'Remove', css: css, onClick: () => handleRemove(res.id) },
                                            {
                                                text: button.includes(res.id) ? 'Abolish' : 'Add friend',
                                                css: button.includes(res.id)
                                                    ? css + 'background-color: #af2c48;'
                                                    : css + ' background-color: #366ab3; ',
                                                onClick: () => handleAdd(res.id, res.fullName),
                                            },
                                        ]}
                                        cssImage={cssImage}
                                        data={res}
                                    />
                                </Div>
                            ) : (
                                <div key={res.id}></div>
                            );
                        })}
                    </DivResults>
                </Div>
            </Div>
        </DivOptions>
    );
};
export default MakingFriends;
