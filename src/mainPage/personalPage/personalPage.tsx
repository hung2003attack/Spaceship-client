import clsx from 'clsx';
import React, { useState, useEffect, memo } from 'react';
import styles from './personalPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../app/reUsingComponents/Avatars/Avatar';

import Button from '../../app/reUsingComponents/Buttoms/ListButton/Buttons';

import Edit from '../editInformation/editInformation';
import Part from './layout/result';
import { Buttons, Div, Img, P, Span } from '../../app//reUsingComponents/styleComponents/styleDefault';
import { DivContainer, DivLoading, DivPos, Hname } from '../../app//reUsingComponents/styleComponents/styleComponents';
import { DivPersonalPage } from '../styleNextWeb';
import { DivBg, DivIntr, DivItems, DivOp, DivPerson, DivStories, InputChangeP } from './stypePersonal';
import { offPersonalPage, setTrueErrorServer } from '../../app//redux/hideShow';
import Title from './layout/Title';
import { CheckI, CloseI, DotI, ImageI, LoadingI, UndoI } from '~/assets/Icons/Icons';
import { Label } from '~/social_network/components/Header/layout/Home/Layout/FormUpNews/styleFormUpNews';
import CommonUtils from '~/utils/CommonUtils';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { useCookies } from 'react-cookie';
import { PropsUserPer } from 'src/App';
import EditP from './layout/EditP';
import moment from 'moment';

interface PropsPer {
    user: PropsUserPer;
    leng: number;
    colorText: string;
    colorBg: number;
    online: string[];
    setUserFirst: React.Dispatch<React.SetStateAction<PropsUserPer | undefined>>;
    userFirst: PropsUserPer;
}
interface PropsLanguage {
    persistedReducer: {
        language: {
            sn: string;
            l: string;
            w: string;
        };
    };
}
const Personalpage: React.FC<PropsPer> = ({ user, leng = 1, colorText, colorBg, online, setUserFirst, userFirst }) => {
    console.log(user, 'user herrrr');
    // const lg
    const dispatch = useDispatch();
    const language = useSelector((state: PropsLanguage) => state.persistedReducer.language);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        return JSON.parse(localStorage.getItem('currentPage') || '{}').currentWeb;
    });
    const lg = currentPage === 1 ? language.sn : currentPage === 2 ? language.l : language.w;
    const [cookies, setCookies] = useCookies(['tks', 'k_user']);
    const userId = cookies.k_user;
    const token = cookies.tks;

    const [dataUser, setDataUser] = useState<PropsUserPer>(user);
    const id_f_user = dataUser.id_f_user.idCurrentUser || dataUser.id_friend.idCurrentUser;
    const id_friend = dataUser.id_f_user.idFriend || dataUser.id_friend.idFriend;

    const level = dataUser.id_f_user.level || dataUser.id_friend.level;

    const [edit, setEdit] = useState<boolean>(false);
    const [categories, setCategories] = useState<number>(0);
    const [valueName, setValueName] = useState<string>('');

    const [errText, setErrText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [room, setRoom] = useState<{ avatar: boolean; background: boolean }>({ avatar: false, background: false });
    const handlePersonalPage = () => {
        dispatch(offPersonalPage());
    };
    const handleEdit = () => {
        setEdit(!edit);
    };
    const editP: {
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
    useEffect(() => {
        setDataUser(user);
    }, [user]);
    const handleChangeAvatar = async (e?: { target: { files: any } }, id?: number) => {
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
    const handleChangeName = async (id: number) => {
        console.log('name', id);
        setEdit(false);
        setCategories(id);
    };
    const handleVName = (e: any) => {
        if (e.target.value.length <= 30) {
            setValueName(e.target.value);
        }
    };
    const handleNameU = async () => {
        if (valueName && valueName.length <= 30) {
            const res = await userAPI.changesOne(token, valueName, { fullName: 'fullName' });
            if (res === 1) {
                setCategories(0);
            } else {
                const dateT = moment(res, 'HH:mm:ss DD-MM-YYYY').locale(lg).fromNow();
                setErrText('You changed about ' + dateT + ' after a month you can keep change your name');
            }
        }
    };
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
           ${online.includes(userId) ? 'border: 1px solid #418a7a;' : 'border: 1px solid #696969;'};
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
    const cssBg = `width: 100%;
            height: 230px;
            border-radius: 5px;
            background-color: #494949cf;

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
                  height: ${500 / (leng > 1 ? leng - 0.7 : leng) + 'px'};
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
    const css = ` min-width: 100%;
    height: var(--full);
    overflow-y: overlay;
     @media (min-width: 1100px){
        min-width: ${100 / leng + '%;'}
    }
    @media (max-width: 600px){
        min-width: 100%;
    }`;
    console.log(room, 'room');

    const cssBt = `color: ${colorText};
            width: 110px;
            justify-content: center;
            padding: 9px;
            font-size: 1.3rem;
            margin: 0 5px;
            background-color: #383838;
            @media(min-width: 678px){
                font-size: 1.5rem;
            }
    `;
    const handleAddF = () => {
        console.log('add friend');
    };
    const handleConfirm = () => {
        console.log('handleConfirm');
    };
    const handleAbolish = () => {
        console.log('handleAbolish');
    };
    const handleMessenger = () => {
        console.log('handleMessenger');
    };
    const handleFollower = () => {
        console.log('handleFollowe');
    };
    const handleFriend = () => {
        console.log('handleFriend');
    };
    const buttons: {
        [en: string]: { name: string; onClick: () => void }[];
        vi: { name: string; onClick: () => void }[];
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
                onClick:
                    id_f_user !== userId
                        ? level === 1
                            ? handleConfirm
                            : level === 2
                            ? handleAddF
                            : handleAddF
                        : level === 1
                        ? handleAbolish
                        : level === 2
                        ? handleFriend
                        : handleAddF,
            },
            { name: 'Messenger', onClick: handleMessenger },
            { name: 'Follow', onClick: handleFollower },
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
                onClick:
                    id_f_user !== userId
                        ? level === 1
                            ? handleConfirm
                            : level === 2
                            ? handleAddF
                            : handleAddF
                        : level === 1
                        ? handleAbolish
                        : level === 2
                        ? handleFriend
                        : handleAddF,
            },
            { name: 'Nhắn tin', onClick: handleMessenger },
            { name: 'Theo dõi', onClick: handleFollower },
        ],
    };
    const moreCss =
        id_f_user !== userId
            ? level === 1
                ? 'background-color: #095b00;'
                : level === 2
                ? ''
                : ''
            : level === 1
            ? 'background-color: #902525;'
            : level === 2
            ? ''
            : '';
    const btss = [
        { text: buttons[lg][0].name, css: cssBt, onClick: buttons[lg][0].onClick },
        { text: buttons[lg][1].name, css: cssBt + 'background-color: #0d62b4;', onClick: buttons[lg][1].onClick },
        { text: buttons[lg][2].name, css: cssBt + 'padding: 9px 21px;', onClick: buttons[lg][2].onClick },
    ];

    return (
        <Div css={css}>
            {(room.background || room.avatar) && (
                <DivPos
                    position="fixed"
                    size="30px"
                    top="20px"
                    right="12px"
                    index={8888}
                    color={colorText}
                    onClick={() => setRoom({ avatar: false, background: false })}
                >
                    <UndoI />
                </DivPos>
            )}
            <DivPerson>
                <Div css={cssBg}>
                    {/* {user?.background && ( */}
                    {dataUser.background && (
                        <Img
                            src={dataUser.background}
                            alt={dataUser?.fullName}
                            onClick={() => setRoom({ ...room, background: true })}
                        />
                    )}
                    {/* )} */}
                </Div>
                {/* <div className={clsx(styles.close)} onClick={handlePersonalPage}>
                <CloseI />
            </div> */}
                <DivPersonalPage width="90%" height="44px" margin="auto" css={cssDivPersonalPage}>
                    <Div css={cssAvatar} onClick={() => setRoom({ ...room, avatar: true })}>
                        <Avatar
                            src={dataUser.avatar}
                            alt={dataUser?.fullName}
                            gender={dataUser?.gender}
                            radius="50%"
                            css="z-index: 1;"
                        />
                        {loading && (
                            <DivLoading
                                css={`
                                    position: absolute;
                                    top: -61px;
                                    right: 50%;
                                    left: 50%;
                                    translate: -50%;
                                `}
                            >
                                <Div
                                    css={`
                                        width: 70px;
                                        height: 200px;
                                        animation: bg-color-animation 5s infinite;
                                        @keyframes bg-color-animation {
                                            0% {
                                                background-color: #f67575;
                                            }
                                            10% {
                                                background-color: #fdf982;
                                            }
                                            20% {
                                                background-color: #97ff60;
                                            }
                                            30% {
                                                background-color: #904ef3;
                                            }
                                            40% {
                                                background-color: #7360ed;
                                            }
                                            50% {
                                                background-color: #ff7cf0;
                                            }
                                            60% {
                                                background-color: #88f588;
                                            }
                                            70% {
                                                background-color: #88cff5;
                                            }
                                            80% {
                                                background-color: #eef080;
                                            }
                                            90% {
                                                background-color: #ffffff;
                                            }
                                            100% {
                                                background-color: #373937;
                                            }
                                        }
                                    `}
                                ></Div>
                            </DivLoading>
                        )}
                    </Div>

                    <Div css={cssName}>
                        <Hname>{valueName || dataUser.fullName}</Hname>
                        {categories === 2 && (
                            <Div width="196px" wrap="wrap" css="position: relative;">
                                <InputChangeP
                                    id="h"
                                    placeholder={user.fullName}
                                    color={colorText}
                                    value={valueName}
                                    onChange={handleVName}
                                />
                                <Label htmlFor="h" css="font-size: 1.2rem; position: absolute; right: 5px; top: 5px;">
                                    {valueName.length} / 30
                                </Label>
                            </Div>
                        )}
                        <P css="width: 100%; " z="1.2rem">
                            {errText || 'I used to love you, but now will not'}
                            {dataUser?.nickName}
                        </P>
                    </Div>
                    {categories === 0 && cookies.k_user === dataUser.id && (
                        <DivPos
                            size="25px"
                            right="0"
                            top="7px"
                            css={`
                                ${edit
                                    ? 'width: 50px; background-color: #383838; border-radius: 5px !important; border: 1px solid #4b4848;'
                                    : ''};
                                @media (min-width: 450px) {
                                    width: 50px;
                                    top: 20px;
                                    background-color: #383838;
                                    border-radius: 5px;
                                    border: 1px solid #4b4848;
                                }
                            `}
                            onClick={handleEdit}
                        >
                            <DotI />
                        </DivPos>
                    )}
                    {edit && (
                        <EditP
                            editP={editP[lg]}
                            onClick={handleChangeAvatar}
                            onName={handleChangeName}
                            colorText={colorText}
                        />
                    )}
                </DivPersonalPage>
                {categories === 2 && (
                    <Div width="150px" css="margin: 30px auto 0; justify-content: space-evenly;">
                        <Div
                            css="font-size: 25px; background-color: #e7e7e7; color: #333; border-radius: 50%; z-index: 8"
                            onClick={() => {
                                setCategories(0);
                                setErrText('');
                                setValueName('');
                            }}
                        >
                            <CloseI />
                        </Div>
                        <Div
                            css="font-size: 25px; background-color: #e7e7e7; color: #333; border-radius: 50%; z-index: 8"
                            onClick={handleNameU}
                        >
                            <CheckI />
                        </Div>
                    </Div>
                )}
                <Div
                    width="95%"
                    css={`
                        justify-content: center;
                        margin: 46px auto 0;
                        @media (min-width: 500px) {
                            justify-content: right;
                        }
                    `}
                >
                    {dataUser.id !== userId && <Buttons text={btss} />}
                </Div>
                <Title colorText={colorText} colorBg={colorBg} data={dataUser.id_m_user} />
                {/* <DivIntr>
                    <DivStories>
                        <DivOp>
                            <DivItems>post</DivItems>
                            <DivItems>
                                <Button f friend />
                            </DivItems>
                        </DivOp>
                        <Part />
                        <div className={clsx(styles.results)}>hello it's my friend</div>
                    </DivStories>
                </DivIntr> */}
            </DivPerson>
        </Div>
    );
};
export default memo(Personalpage);
