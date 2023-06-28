import moment from 'moment';
import { MouseEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { PropsUser, PropsUserPer } from 'src/App';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { setTrueErrorServer } from '~/redux/hideShow';
import { onChat } from '~/redux/reload';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import peopleAPI from '~/restAPI/requestServers/socialNetwork/peopleAPI';
import CommonUtils from '~/utils/CommonUtils';
interface PropsLanguage {
    persistedReducer: {
        language: {
            sn: string;
            l: string;
            w: string;
        };
    };
}
export default function LogicView(
    user: PropsUserPer,
    userFirst: PropsUser,
    setUserFirst: React.Dispatch<React.SetStateAction<PropsUser | undefined>>,
    dataUser: PropsUserPer,
    setDataUser: React.Dispatch<React.SetStateAction<PropsUserPer>>,
    leng: number,
    colorText: string,
    online: string[],
) {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(['tks', 'k_user']);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        return JSON.parse(localStorage.getItem('currentPage') || '{}').currentWeb;
    });
    const language = useSelector((state: PropsLanguage) => state.persistedReducer.language);

    const [more, setMore] = useState<React.ReactElement | string>();
    const [valueName, setValueName] = useState<string>('');
    const [valueNickN, setValueNickN] = useState<string>('');
    const [categories, setCategories] = useState<number>(0);
    const [errText, setErrText] = useState<string>('');
    const [resTitle, setResTitle] = useState<{
        star: number;
        love: number;
        viste: number;
        followed: number;
        following: number;
    }>({ star: 0, love: 0, viste: 0, followed: 0, following: 0 });
    const [id_loved, setId_loved] = useState<string>(dataUser.id_loved_user.id_loved);

    const [room, setRoom] = useState<{ avatar: boolean; background: boolean }>({ avatar: false, background: false });
    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const userId = cookies.k_user;
    const token = cookies.tks;
    const lg = currentPage === 1 ? language.sn : currentPage === 2 ? language.l : language.w;

    const id_f_user = dataUser.id_f_user.idCurrentUser || dataUser.id_friend.idCurrentUser;
    const id_friend = dataUser.id_friend.idFriend || dataUser.id_f_user.idFriend;
    const id_fl = dataUser.id_flwing.id_following || dataUser.id_flwed.id_following;
    const id_fled = dataUser.id_flwing.id_followed || dataUser.id_flwed.id_followed;

    const level = dataUser.id_f_user.level || dataUser.id_friend.level;
    const following = dataUser.id_flwing.flwing || dataUser.id_flwed.flwing;
    const follwed = dataUser.id_flwing.flwed || dataUser.id_flwed.flwed;
    const handleChangeAvatar = async (e?: { target: { files: any } }, id?: number) => {
        setEdit(false);
        const data = e?.target.files;
        if (data?.length > 0) {
            const file = data[0];

            console.log('eee');

            if (file) {
                if (
                    file.type.includes('image/jpg') ||
                    file.type.includes('image/jpeg') ||
                    file.type.includes('image/png')
                ) {
                    const img = URL.createObjectURL(file);
                    const sizeImage = Number((file.size / 1024 / 1024).toFixed(1));
                    if (sizeImage <= 8) {
                        setLoading(true);
                        const base64 = await CommonUtils.getBase64(file);
                        const res = await userAPI.changesOne(
                            token,
                            userId,
                            base64,
                            id === 0 ? { background: 'background' } : { avatar: 'avatar' },
                        );
                        console.log('number', res, id);
                        if (res === 1) {
                            setLoading(false);
                            if (id === 0) {
                                setUserFirst({ ...userFirst, background: img });
                                setDataUser({ ...dataUser, background: img });
                            } else {
                                setUserFirst({ ...userFirst, avatar: img });
                                setDataUser({ ...dataUser, avatar: img });
                            }
                        }

                        //   uploadRef.current.push({ link: URL.createObjectURL(compressedFile), type: 'image' });
                    } else {
                        dispatch(setTrueErrorServer(`${sizeImage}MB big than our limit is 8MB`));
                    }
                }
            }
        } else {
            console.log('delete', id, data, dataUser.avatar);
            if (dataUser.avatar || dataUser.background) {
                setLoading(true);
                const res = await userAPI.changesOne(
                    token,
                    userId,
                    null,
                    id === 0 ? { background: 'background' } : { avatar: 'avatar' },
                );
                console.log('number', res, id);
                if (res === 1) {
                    setLoading(false);
                    if (id === 0) {
                        setUserFirst({ ...userFirst, background: null });
                        setDataUser({ ...dataUser, background: null });
                    } else {
                        setUserFirst({ ...userFirst, avatar: null });
                        setDataUser({ ...dataUser, avatar: null });
                    }
                }
            }
        }
    };
    const handleNameU = async () => {
        if (valueName && valueName.length <= 30 && valueName !== userFirst.fullName) {
            setLoading(true);
            const res = await userAPI.changesOne(token, userId, valueName, { fullName: 'fullName' });
            setLoading(false);
            if (res === 1) {
                setUserFirst({ ...userFirst, fullName: valueName });
                setCategories(0);
            } else {
                const dateT = moment(res, 'HH:mm:ss DD-MM-YYYY').locale(lg).fromNow();
                const textEr: { [en: string]: string; vi: string } = {
                    en: `You changed about ${dateT}. After a month you can keep change your name`,
                    vi: `Bạn đã thay đổi ${dateT}. Sau 1 tháng bạn mới có thể đổi lại lần nữa`,
                };
                setErrText(textEr[lg]);
            }
        }
    };
    const handleNickNameU = async () => {
        if (valueNickN.length <= 30 && valueNickN !== userFirst.nickName) {
            setLoading(true);
            const res = await userAPI.changesOne(token, userId, valueNickN, { nickName: 'nickName' });
            setLoading(false);
            if (res === 1) {
                setUserFirst({ ...userFirst, nickName: valueNickN });
                setCategories(0);
            } else {
                setValueNickN('');
                const textEr: { [en: string]: string; vi: string } = {
                    en: `You changed 10 times in 1 month. After a month you can keep change your nick name`,
                    vi: `Bạn đã thay đổi 10 lần trong 1 tháng rồi. Sau 1 tháng bạn mới có thể đổi lại 2 lần nữa`,
                };
                setErrText(textEr[lg]);
            }
        }
    };
    const handleEdit = () => {
        setEdit(!edit);
    };

    useEffect(() => {
        setDataUser(user);
    }, [user]);

    const handleChangeText = async (id: number) => {
        console.log('name', id);
        setEdit(false);
        setCategories(id);
    };
    const handleVName = (e: any) => {
        if (e.target.value.length <= 30) {
            setValueName(e.target.value);
        }
    };
    const handleVNickN = (e: any) => {
        if (e.target.value.length <= 30) {
            setValueNickN(e.target.value);
        }
    };
    const handleAddF = async (id: string) => {
        const res: {
            id_friend: string;
            data: {
                createdAt: string;
                id: 79;
                idCurrentUser: string;
                idFriend: string;
            };
            count_flwe: number;
            id: string;
            id_fl: string;
        } = await peopleAPI.setFriend(token, id, 'yes');
        setDataUser({
            ...dataUser,
            id_friend: {
                idCurrentUser: res.data.idCurrentUser,
                idFriend: res.data.idFriend,
                level: 1,
                createdAt: res.data.createdAt,
            },
            id_flwed: {
                ...dataUser.id_flwed,
                flwed: 1,
                flwing: 2,
                id_followed: res.id,
                id_following: res.id_fl,
            },
            id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
        });

        console.log(res, 'addfriend');
    };

    const handleConfirm = async (id: string) => {
        if (id) {
            const res = await peopleAPI.setConfirm(token, id, 'friends', true);
            if (res.ok === 1) {
                setDataUser({
                    ...dataUser,
                    id_f_user: { ...dataUser.id_f_user, level: 2 },
                    id_m_user: { ...dataUser.id_m_user, friends: res.count_friends },
                });
            }
        }
    };
    const handleAbolish = async (id: string, kindOf: string = 'friends') => {
        const res = await peopleAPI.delete(token, id, kindOf, 'yes');
        console.log('Abolish', kindOf, res);
        if (res) {
            setDataUser({
                ...dataUser,
                id_friend: {
                    idCurrentUser: null,
                    idFriend: null,
                    level: null,
                    createdAt: null,
                },
                id_f_user: {
                    idCurrentUser: null,
                    idFriend: null,
                    level: null,
                    createdAt: null,
                },
                id_flwed: {
                    updatedAt: null,
                    createdAt: null,
                    flwed: null,
                    flwing: null,
                    id_followed: null,
                    id_following: null,
                },
                id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
            });
        }
    };
    const handleMessenger = async (data: {
        id_room: string;
        user: { id: string; fullName: string; avatar: any; gender: number };
    }) => {
        dispatch(onChat(data));
        console.log('handleMessenger');
    };
    const handleFollower = async (id: string, follow?: string) => {
        console.log('handleFollowe', id);
        const res = await userAPI.follow(token, id, follow);
        console.log(res, 'followres');
        if (res.ok === 1) {
            if (dataUser.id_flwing.id_following) {
                if (res.follow === 'following') {
                    setDataUser({
                        ...dataUser,
                        id_flwing: { ...dataUser.id_flwing, flwing: 2 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                } else {
                    setDataUser({
                        ...dataUser,
                        id_flwing: { ...dataUser.id_flwing, flwed: 2 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                }
            } else if (dataUser.id_flwed.id_followed) {
                if (res.follow === 'following') {
                    setDataUser({
                        ...dataUser,
                        id_flwed: { ...dataUser.id_flwed, flwing: 2 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                } else {
                    setDataUser({
                        ...dataUser,
                        id_flwed: { ...dataUser.id_flwed, flwed: 2 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                }
            } else {
                setDataUser({
                    ...dataUser,
                    id_flwed: {
                        ...dataUser.id_flwed,
                        flwed: 1,
                        flwing: 2,
                        id_followed: res.id,
                        id_following: res.id_fl,
                    },
                    id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                });
            }
        }

        // dataUser({...dataUser, id_flwing: {...dataUser.id_flwed.}})
    };

    const handleUnFollower = async (id: string, unfollow: string) => {
        console.log('handleUnFollowe', id);
        const res = await userAPI.Unfollow(token, id, unfollow);
        console.log(res);

        if (res.ok === 1) {
            if (dataUser.id_flwing.id_following) {
                if (res.unfollow === 'following') {
                    setDataUser({
                        ...dataUser,
                        id_flwing: { ...dataUser.id_flwing, flwing: 1 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                } else {
                    setDataUser({
                        ...dataUser,
                        id_flwing: { ...dataUser.id_flwing, flwed: 1 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                }
            } else if (dataUser.id_flwed.id_followed) {
                if (res.unfollow === 'following') {
                    setDataUser({
                        ...dataUser,
                        id_flwed: { ...dataUser.id_flwed, flwing: 1 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                } else {
                    setDataUser({
                        ...dataUser,
                        id_flwed: { ...dataUser.id_flwed, flwed: 1 },
                        id_m_user: { ...dataUser.id_m_user, follow: res.count_flwe },
                    });
                }
            }
        }
    };

    const handleFriend = async (id: string) => {
        console.log('handleFriend');
        const tx = (
            <DivPos
                css={`
                    width: 100%;
                    height: 200px;
                    padding: 5px 0;
                    left: 0;
                    top: 40px;
                    border-radius: 5px;
                    background-color: #383838;
                    align-items: baseline;
                `}
            >
                <Div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAbolish(id);
                    }}
                    css={`
                        width: 100%;
                        justify-content: center;
                        padding: 5px;
                    `}
                >
                    Huỷ kết bạn
                </Div>
            </DivPos>
        );
        if (more) {
            setMore('');
        } else {
            setMore(tx);
        }
    };
    const handleLoves = async () => {
        if (id_loved !== userId) {
            const res = await userAPI.changesOne(token, dataUser.id, '', { more: { love: 'love' } });
            setId_loved(userId);
            setDataUser({ ...dataUser, id_m_user: { ...dataUser.id_m_user, love: res } });
        } else {
            const res = await userAPI.changesOne(token, dataUser.id, '', { more: { love: 'unlove' } });
            setId_loved('');
            setDataUser({ ...dataUser, id_m_user: { ...dataUser.id_m_user, love: res } });
        }
    };
    const editDataText: {
        [en: string]: { name: string; id: number; icon?: { id: number; name: string }[] }[];
        vi: { name: string; id: number; icon?: { id: number; name: string }[] }[];
    } = {
        en: [
            {
                name: 'Background',
                icon: [
                    { id: 1, name: 'Change' },
                    { id: 2, name: 'Delete' },
                ],
                id: 0,
            },
            {
                name: 'Avatar',
                icon: [
                    { id: 1, name: 'Change' },
                    { id: 2, name: 'Delete' },
                ],
                id: 1,
            },
            { name: 'Full name', id: 2 },
            { name: 'Nick name', id: 3 },
            { name: 'Status', id: 4 },
        ],
        vi: [
            {
                name: 'Nền',
                icon: [
                    { id: 1, name: 'Thay đổi' },
                    { id: 2, name: 'Xoá' },
                ],
                id: 0,
            },
            {
                name: 'Ảnh đại diện',
                icon: [
                    { id: 1, name: 'Thay đổi' },
                    { id: 2, name: 'Xoá' },
                ],
                id: 1,
            },
            { name: 'Tên', id: 2 },
            { name: 'Biệt danh', id: 3 },
            { name: 'Dòng trạng thái', id: 4 },
        ],
    };
    const cssBg = `width: 100%;
            height: 230px;
            border-radius: 5px;
            background-color: #494949cf;
            position: relative;
            img {
                border-radius: 5px;
            }
            @media (min-width: 400px){
                 height: 250px;
            }
            @media (min-width: 600px){
                  height: ${300 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            }
            @media (min-width: 769px){
                  height: ${300 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            }
            @media (min-width: 1025px){
                  height: ${400 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            };
            @media (min-width: 1201px){
                  height: ${450 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
            }
            @media (min-width: 1440px){
                width: 99%;
                margin: auto;
            }
            ${
                room.background
                    ? 'position: fixed; width: 100%; height:  100% !important; background-color:#000000fa; top: 0; left: 0; z-index: 888; margin: 0;img{object-fit: contain;}'
                    : ''
            }
            `;
    const cssName = ` 
            width: inherit;
            height: 30px;
            margin-bottom: 16px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: start;
            text-align: start;
            margin-left: 16px;
            margin-top: 24px;
            position: relative;
            @media (min-width: 600px){
                margin-bottom: 20px;
            }`;
    const css = `
            margin: 0 3px;
            width: 100%;
            height: 100%;
            overflow-y: overlay;
            &::-webkit-scrollbar {
                width: 0px;
            }
            @media (min-width: 768px) {
                &::-webkit-scrollbar {
                    width: 7px;
                }
            }
            @media (min-width: 1100px){
                width: 100%;
                ${leng === 1 && 'padding: 0 10%;'}
            }
            @media (max-width: 600px){
                min-width: 100%;
            }`;

    const cssBt = `color: ${colorText};
            width: 118px;
            justify-content: center;
            align-items: center;
            padding: 5px;
            font-size: 1.3rem;
            margin: 0 5px;
            background-color: #383838;
            @media(min-width: 678px){
                font-size: 1.5rem;
            }
    `;
    const cssDivPersonalPage = `
        position: relative;
        color: ${colorText};
    @media (min-width: 600px){
        height: 60px;
    }@media (min-width: 1000px){
        height: 80px;
    }
`;
    const cssAvatar = `min-width: 90px;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            padding: 3px;
            position: relative;
            overflow: hidden;
            @media (min-width: 600px){
                min-width: ${130 / (leng > 1 ? leng - 0.5 : leng) + 'px;'}
                width: ${130 / (leng > 1 ? leng - 0.5 : leng) + 'px;'}
                height: ${130 / (leng > 1 ? leng - 0.5 : leng) + 'px;'}
            }@media (min-width: 1000px){
                min-width: ${150 / (leng > 1 ? leng - 0.7 : leng) + 'px;'}
                width: ${150 / (leng > 1 ? leng - 0.7 : leng) + 'px;'}
                height: ${150 / (leng > 1 ? leng - 0.7 : leng) + 'px;'}
            }
            ${
                room.avatar
                    ? 'position: fixed; width: 100% !important; height:  100% !important; background-color:#000000fa; border-radius: 0; border: 0; top: 0; left: 0; z-index: 888; margin: 0;img{object-fit: contain; border-radius: 0;}'
                    : ''
            }
            `;
    const buttons: {
        [en: string]: { name: string; onClick: (id: string) => Promise<void> | void }[];
        vi: { name: string; onClick: (id: string) => Promise<void> | void }[];
    } = {
        en: [
            {
                name:
                    id_f_user !== userId
                        ? level === 1
                            ? 'Confirm'
                            : level === 2
                            ? 'Friend'
                            : 'Add Friend'
                        : level === 1
                        ? 'Abolish'
                        : level === 2
                        ? 'Friend'
                        : 'Add Friend',
                onClick: () =>
                    id_f_user !== userId
                        ? level === 1
                            ? handleConfirm(dataUser.id)
                            : level === 2
                            ? handleFriend(dataUser.id)
                            : handleAddF(dataUser.id)
                        : level === 1
                        ? handleAbolish(dataUser.id)
                        : level === 2
                        ? handleFriend(dataUser.id)
                        : handleAddF(dataUser.id),
            },
            {
                name: 'Messenger',
                onClick: () =>
                    handleMessenger({
                        id_room: '',
                        user: {
                            id: dataUser.id,
                            avatar: dataUser.avatar,
                            fullName: dataUser.fullName,
                            gender: dataUser.gender,
                        },
                    }),
            },
            id_fl === userId
                ? following === 1
                    ? { name: 'Follow', onClick: () => handleFollower(dataUser.id) }
                    : { name: 'Unfollow', onClick: () => handleUnFollower(dataUser.id, 'following') }
                : id_fled === userId
                ? follwed === 1
                    ? { name: 'Follow', onClick: () => handleFollower(dataUser.id) }
                    : { name: 'Unfollow', onClick: () => handleUnFollower(dataUser.id, 'followed') }
                : { name: 'Follow', onClick: () => handleFollower(dataUser.id) },
        ],
        vi: [
            {
                name:
                    id_f_user !== userId
                        ? level === 1
                            ? 'Chấp nhận'
                            : level === 2
                            ? 'Bạn bè'
                            : 'Kêt bạn'
                        : level === 1
                        ? 'Thu hồi'
                        : level === 2
                        ? 'Bạn bè'
                        : 'Kêt bạn',
                onClick: () =>
                    id_f_user !== userId
                        ? level === 1
                            ? handleConfirm(dataUser.id)
                            : level === 2
                            ? handleFriend(dataUser.id)
                            : handleAddF(dataUser.id)
                        : level === 1
                        ? handleAbolish(dataUser.id)
                        : level === 2
                        ? handleFriend(dataUser.id)
                        : handleAddF(dataUser.id),
            },
            {
                name: 'Nhắn tin',
                onClick: () =>
                    handleMessenger({
                        id_room: '',
                        user: {
                            id: dataUser.id,
                            avatar: dataUser.avatar,
                            fullName: dataUser.fullName,
                            gender: dataUser.gender,
                        },
                    }),
            },
            id_fl === userId
                ? following === 1
                    ? { name: 'Theo dõi', onClick: () => handleFollower(dataUser.id, 'following') }
                    : { name: 'Bỏ theo dõi', onClick: () => handleUnFollower(dataUser.id, 'following') }
                : id_fled === userId
                ? follwed === 1
                    ? { name: 'Theo dõi', onClick: () => handleFollower(dataUser.id, 'followed') }
                    : { name: 'Bỏ theo dõi', onClick: () => handleUnFollower(dataUser.id, 'followed') }
                : { name: 'Theo dõi', onClick: () => handleFollower(dataUser.id) },
        ],
    };
    console.log(lg, buttons, 'here');

    const btss = [
        { text: buttons[lg][0].name, css: cssBt + 'position: relative;', onClick: buttons[lg][0].onClick, tx: more },
        { text: buttons[lg][1].name, css: cssBt, onClick: buttons[lg][1].onClick },
        { text: buttons[lg][2].name, css: cssBt, onClick: buttons[lg][2].onClick },
    ];
    const btName: { [en: string]: { del: string; ok: string }; vi: { del: string; ok: string } } = {
        en: { del: 'Cancel', ok: 'Change' },
        vi: { del: 'Huỷ bỏ', ok: 'Thay đổi' },
    };

    return {
        edit,
        setEdit,
        loading,
        setLoading,
        setCurrentPage,
        valueName,
        setValueName,
        valueNickN,
        setValueNickN,
        categories,
        setCategories,
        errText,
        setErrText,
        room,
        setRoom,
        resTitle,
        token,
        userId,
        handleChangeAvatar,
        handleNameU,
        handleNickNameU,
        handleLoves,
        handleEdit,
        handleChangeText,
        handleVName,
        handleVNickN,
        editDataText,
        lg,
        cssBg,
        cssName,
        cssBt,
        css,
        cssDivPersonalPage,
        cssAvatar,
        btss,
        btName,
        id_loved,
        id_f_user,
        id_friend,
        level,
    };
}
