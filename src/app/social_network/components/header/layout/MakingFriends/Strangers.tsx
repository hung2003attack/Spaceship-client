import { useCallback, useEffect, useRef, useState } from 'react';

import { Div, H3 } from '~/reUsingComponents/styleComponents/styleDefault';
import TagProfle from './TagProfle';
import peopleAPI from '~/restAPI/requestServers/socialNetwork/peopleAPI';
import { useCookies } from 'react-cookie';
import { DotI, LoadingI } from '~/assets/Icons/Icons';
import CommonUtils from '~/utils/CommonUtils';
import { socket } from 'src/mainPage/nextWeb';
import { useDispatch, useSelector } from 'react-redux';
import { people } from '~/redux/reload';
import { DivResults } from './styleMakingFriends';
import { DivLoading } from '~/reUsingComponents/styleComponents/styleComponents';
interface PropsData {
    avatar: any;
    birthday: string;
    fullName: string;
    gender: number;
    id: string;
    nickName: string;
    id_f_user: {
        idCurrentUser: string | null;
        idFriend: string | null;
        level: number | null;
        createdAt: string | null;
    };
    id_friend: {
        idCurrentUser: string | null;
        idFriend: string | null;
        level: number | null;
        createdAt: string | null;
    };
    id_r_user: {
        id_user: string | null;
        id_relative: string | null;
        title: string | null;
        really: number | null;
        createdAt: string | null;
    };
    id_relative: {
        id_user: string | null;
        id_relative: string | null;
        title: string | null;
        really: number | null;
        createdAt: string | null;
    };
}
const Strangers: React.FC<{
    type: string;
}> = ({ type = 'stranggers' }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState<PropsData[] | undefined>();
    const reload = useSelector((state: { reload: { people: number } }) => state.reload.people);

    const [cookies, setCookies] = useCookies(['tks', 'k_user']);
    const [loading, setLoading] = useState<boolean>(false);
    const offsetRef = useRef<number>(0);
    const limit: number = 3;
    const token = cookies.tks;
    const userId = cookies.k_user;
    const eleRef = useRef<any>();
    const dataRef = useRef<any>([]);
    const cRef = useRef<number>(0);
    const ids: any = new Set();

    const fetch = async (rel: boolean) => {
        cRef.current = 1;
        if (rel) {
            ids.clear();
            dataRef.current = [];
            cRef.current = 3;
            setLoading(true);
        }
        console.log(Array.from(ids), 'lll');

        const res = await peopleAPI.getStrangers(token, limit, Array.from(ids));
        console.log(dataRef.current.length, rel, 'strangers', res, Array.from(ids));
        res.map((f: { avatar: any; id: string }) => {
            ids.add(f.id);
            if (f.avatar) {
                const av = CommonUtils.convertBase64(f.avatar);
                f.avatar = av;
            }
        });
        dataRef.current = [...(dataRef.current ?? []), ...res];
        if (!rel) {
            setData(dataRef.current);
            offsetRef.current += limit;
        } else {
            setData(res);
            setLoading(false);
        }
        cRef.current = 1;
    };
    console.log(dataRef.current, data, 'data');

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = eleRef.current;
        console.log(scrollTop, clientHeight, scrollHeight);

        if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
            console.log(cRef.current);
            if (cRef.current !== 3) fetch(false);
        }
    };
    useEffect(() => {
        if (type === 'strangers' || cRef.current === 0) fetch(true);
        eleRef.current.addEventListener('scroll', handleScroll);
        return () => {
            eleRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [reload]);

    useEffect(() => {}, []);
    const handleAdd = async (id: string, kindOf: string = 'friend') => {
        const res: {
            id_friend: string;
            data: {
                createdAt: string;
                id: 79;
                idCurrentUser: string;
                idFriend: string;
            };
        } = await peopleAPI.setFriend(token, id);

        const newStranger = data?.filter((x: PropsData) => {
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
        setData(newStranger);
    };
    const handleAbolish = async (id: string, kindOf: string = 'friends') => {
        console.log('Abolish', kindOf, id);
        const res = await peopleAPI.delete(token, id, kindOf);
        console.log('Abolish', res);
        const newStranger = data?.filter((x: PropsData) => {
            if (
                (x.id_f_user.idCurrentUser === res.ok?.idCurrentUser && x.id_f_user.idFriend === res.ok?.idFriend) ||
                (x.id_f_user.idFriend === res.ok?.idCurrentUser && x.id_f_user.idCurrentUser === res.ok?.idFriend) ||
                (x.id_friend.idCurrentUser === res.ok?.idCurrentUser && x.id_friend.idFriend === res.ok?.idFriend) ||
                (x.id_friend.idCurrentUser === res.ok?.idFriend && x.id_friend.idFriend === res.ok?.idCurrentUser)
            ) {
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
        setData(newStranger);
    };
    const handleMessenger = (id: string) => {
        console.log('messenger', id);
    };
    const handleConfirm = async (id: string, kindOf: string = 'friends') => {
        const res = await peopleAPI.setConfirm(token, id, kindOf);
        console.log('confirm', kindOf, id, res);
        refresh(res);
        function refresh(res: any) {
            if (res.ok === 1) {
                const newStranger = data?.filter((x: PropsData) => {
                    if (
                        (x.id_f_user.idCurrentUser === res.id_fr && x.id_f_user.idFriend === userId) ||
                        (x.id_friend.idCurrentUser === res.id_fr && x.id_friend.idFriend === userId)
                    ) {
                        if (x.id_f_user.level) x.id_f_user.level = 2;
                        if (x.id_friend.level) x.id_friend.level = 2;
                        return x;
                    } else {
                        return x;
                    }
                });
                console.log('newStranger', newStranger);
                setData(newStranger);
            }
        }
    };
    const handleRemove = async (id: string, of: string = 'yes', kindOf?: string) => {
        if (of === 'no' && id) {
            const newData: any = data?.filter((d: { id: string }) => d.id !== id);
            setData(newData);
            console.log('newData', newData);
        } else {
            console.log('deleted', id);
            const res = await peopleAPI.delete(token, id, kindOf);
            if (res) {
                const newData: any = data?.filter((d: { id: string }) => d.id !== id);
                setData(newData);
            }
        }
    };

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
    return (
        <>
            <DivResults ref={eleRef} id="strangers">
                {loading && (
                    <DivLoading>
                        <LoadingI />
                    </DivLoading>
                )}

                {data?.map((vl) => {
                    const buttons = [];
                    const idU = vl.id_friend?.idCurrentUser || vl.id_f_user?.idCurrentUser;
                    const idFr = vl.id_f_user?.idFriend || vl.id_friend?.idFriend;
                    const level = vl.id_friend?.level || vl.id_f_user?.level;

                    if (level === 2 || level === 2) {
                        buttons.push({
                            text: 'Messenger',
                            css: css + ' background-color: #366ab3; ',
                            onClick: () => handleMessenger(vl.id),
                        });
                    } else {
                        if (idU === userId) {
                            buttons.push(
                                {
                                    text: 'Delete',
                                    css: css,
                                    onClick: () => handleRemove(vl.id, 'yes', 'friends'),
                                },
                                {
                                    text: 'Abolish',
                                    css: css + 'background-color: #af2c48; ',
                                    onClick: () => handleAbolish(vl.id),
                                },
                            );
                        } else if (idFr === userId) {
                            console.log('friend --others');
                            buttons.push(
                                {
                                    text: 'Delete',
                                    css: css,
                                    onClick: () => handleRemove(vl.id, 'yes', 'friends'),
                                },
                                {
                                    text: 'Confirm',
                                    css: css + 'background-color:   #1553a1; ',
                                    onClick: () => handleConfirm(vl.id),
                                },
                            );
                        } else {
                            console.log('else');
                            buttons.push(
                                {
                                    text: 'Remove',
                                    css: css,
                                    onClick: () => handleRemove(vl.id, 'no'),
                                },
                                {
                                    text: 'Add friend',
                                    css: css + ' background-color: #366ab3;',
                                    onClick: () => handleAdd(vl.id),
                                },
                            );
                        }
                    }

                    return (
                        <Div
                            key={vl.id}
                            wrap="wrap"
                            css={`
                                width: 185px;
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
                            <Div
                                css={`
                                    position: absolute;
                                    right: 9px;
                                    font-size: 20px;
                                `}
                            >
                                <DotI />
                            </Div>
                            <TagProfle profile button={buttons} cssImage={cssImage} data={vl} />
                        </Div>
                    );
                })}
            </DivResults>
        </>
    );
};
export default Strangers;
