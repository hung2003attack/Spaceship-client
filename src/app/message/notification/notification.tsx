import clsx from 'clsx';

import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import peopleAPI from '~/restAPI/requestServers/socialNetwork/peopleAPI';

import { CloseI, DotI, MoveI, NotificationI, UndoI } from '~/assets/Icons/Icons';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import React, { memo, useEffect, useState } from 'react';
import { DivIconMs } from '../styleMessage';
import { DivBar, DivItem, DivListIs, DivRes } from './styleNot';
import { DivPos, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { Button, Buttons, Div, H3, Li, Ol, P, Span, Strong } from '~/reUsingComponents/styleComponents/styleDefault';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { socket } from 'src/mainPage/nextWeb';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Send from '../Send/Send';
import { setIdUser } from '~/redux/hideShow';
import moment from 'moment';
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
const Notification: React.FC<{
    colorText: string;
    colorBg: number;
    dataUser: { id: string; avatar: any; fullName: string; nickName: string; gender: number };
    userOline: string[];
}> = ({ colorText, colorBg, dataUser, userOline }) => {
    const dispatch = useDispatch();
    const language = useSelector((state: PropsLanguage) => state.persistedReducer.language);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        return JSON.parse(localStorage.getItem('currentPage') || '{}').currentWeb;
    });
    const lg = currentPage === 1 ? language.sn : currentPage === 2 ? language.l : language.w;

    const [left, setlLeft] = useState<boolean>(false);
    const [bottom, setBottom] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies(['k_user', 'tks']);
    const [dataInfo, setDataInfo] = useState<{
        quantity: number;
        user: {
            id: string;
            avatar: string;
            fullName: string;
            nickName: string;
            gender: number;
            status: number;
            id_f_user: { createdAt: string };
        }[];
    }>({ quantity: 0, user: [] });
    const userId = cookies.k_user;
    const token = cookies.tks;
    const [notification, setNotification] = useState<boolean>(false);
    const [dataTest, setDataTest] = useState<{
        quantity: number;
        user: {
            id: string;
            avatar: string;
            fullName: string;
            nickName: string;
            gender: number;
            status: number;
            id_f_user: { createdAt: string };
        };
    }>({
        quantity: 0,
        user: { id: '', avatar: '', fullName: '', nickName: '', gender: 0, status: 1, id_f_user: { createdAt: '' } },
    });
    const [delReq, setDelReq] = useState<{ st: number; id: string }>({ st: 0, id: '' });
    useEffect(() => {
        async function fetch() {
            const res = await userAPI.getNewMes(token);
            const newData = res.user.map((v: { avatar: any }) => {
                if (v.avatar) v.avatar = CommonUtils.convertBase64(v.avatar);
                return v;
            });
            res.user = newData;
            if (res) setDataInfo(res);
        }
        fetch();
        socket.on(`Request others?id=${userId}`, (msg: string) => {
            console.log('Received message id:', socket.id);
            console.log('Received message', JSON.parse(msg));
            const user = JSON.parse(msg).user;
            if (user.avatar) user.avatar = CommonUtils.convertBase64(user.avatar);
            setDataTest({ user: user, quantity: JSON.parse(msg).quantity });
        });
        socket.on(`Delete request friends or relatives${userId}`, (msg: string) => {
            console.log('Delete Request message id:', msg, delReq);
            setDelReq({ id: msg, st: Math.random() });
        });
    }, []);
    useEffect(() => {
        const newDa = dataInfo.user.filter((x) => x.id !== delReq.id);
        setDataInfo({ quantity: dataInfo.quantity > 0 ? dataInfo.quantity - 1 : 0, user: newDa });
    }, [delReq.id, delReq.st]);
    useEffect(() => {
        let ck = false;
        if (dataTest.user.id) {
            for (let i = 0; i < dataInfo.user.length; i++) {
                if (dataInfo.user[i].id === dataTest.user.id) {
                    ck = true;
                }
            }
            if (!ck) setDataInfo({ quantity: dataTest.quantity, user: [...dataInfo.user, dataTest.user] });
        }
    }, [dataTest.quantity, dataTest.user, dataTest]);

    const handleShowHide = async () => {
        setNotification(!notification);
        const res = await userAPI.delMessage(token);

        if (res.ok) setDataInfo({ ...dataInfo, quantity: 0 });
    };
    const handleUndo = () => {
        setlLeft(false);
        setBottom(false);
    };
    console.log(dataInfo, dataTest);
    const handleConfirm = async (id: string) => {
        if (id) {
            const res = await peopleAPI.setConfirm(token, id, 'friends', true);
            if (res.ok === 1) {
                const newData = dataInfo.user.filter((x) => {
                    if (x.id === res.id_fr) {
                        x.status = 0;
                        return x;
                    }

                    return x;
                });
                setDataInfo({ ...dataInfo, user: newData });
            }
        }
    };
    const handleDelete = async (id: string) => {
        const res = await peopleAPI.delete(token, id, 'friends');
        if (res) {
            const newData = dataInfo.user.filter((x) => {
                if (x.id === res.idCurrentUser) {
                    x.status = -1;
                    return x;
                }
                return x;
            });
            setDataInfo({ ...dataInfo, user: newData });
        }
        console.log('deleeeeeeeeeeeeeee', res);
    };
    // const gender = dataInfo?.user.gender;
    const dataText: {
        [en: string]: {
            title: string;
            mess: string;
            confirm: string;
            del: string;
            more: string;
            or: string;
        };
        vi: {
            title: string;
            mess: string;
            confirm: string;
            del: string;
            more: string;
            or: string;
        };
    } = {
        en: {
            title: 'Notification',
            mess: 'has sent for you a friend request',
            confirm: 'Confirm',
            del: 'Delete',
            more: 'More',
            or: 'or',
        },
        vi: {
            title: 'Thông báo',
            mess: 'đã gửi cho bạn một lời mời kết bạn',
            confirm: 'Chấp nhận',
            del: 'Từ chối lời mời',
            more: 'Xem thêm',
            or: 'hoặc',
        },
    };

    // `${gender === 0 ? 'He' : gender === 1 ? 'She' : 'Honey'} has sent for you a friend request`
    return (
        <>
            {!notification && (
                <Hovertitle
                    Tags={DivIconMs}
                    title="NoTi"
                    size="29px"
                    color={colorText}
                    colorBg={colorBg}
                    onClick={handleShowHide}
                >
                    <NotificationI />
                    <p className={clsx('miss')}>{dataInfo.quantity > 0 && dataInfo.quantity}</p>
                </Hovertitle>
            )}

            {notification && (
                <>
                    <DivRes bg={colorBg === 1 ? 'rgb(32 33 35)' : ''}>
                        <DivBar>
                            <DivPos color={colorText} size="20px" top="8px" left="4px" onClick={handleShowHide}>
                                <CloseI />
                            </DivPos>
                            <H3 color={colorText} css="font-size: 1.6rem;">
                                {dataText[lg].title}
                            </H3>
                            <Div css="position: absolute; top: 4px; right: 15px; ">
                                <Send
                                    dataUser={dataUser}
                                    userOline={userOline}
                                    colorText={colorText}
                                    colorBg={colorBg}
                                />
                            </Div>
                        </DivBar>
                        <DivListIs>
                            {dataInfo?.user.map((v) => {
                                const fm = moment(v.id_f_user.createdAt).format('HH:mm:ss DD-MM-YYYY');
                                const dateT = moment(fm, 'HH:mm:ss DD-MM-YYYY').locale(lg).fromNow();
                                return (
                                    <Div
                                        key={v.id}
                                        wrap="wrap"
                                        css="width: fit-content; height: fit-content; border: 1px solid #39393b; margin-bottom: 14px; padding-top: 5px; position: relative;"
                                    >
                                        <DivItem color={colorText}>
                                            <Div css="height: fit-content; width: 40px; height: 40px; min-width: 40px; margin: 2px 5px;">
                                                <Avatar
                                                    css=" var(--pointer)"
                                                    src={v.avatar}
                                                    radius="50%"
                                                    gender={v.gender}
                                                    id={v.id}
                                                    profile
                                                />
                                            </Div>
                                            <Div wrap="wrap" css="height: fit-content; align-items: center;">
                                                {/* <Hname css="width: 100%; font-size: 1.4rem;"></Hname> */}
                                                <P css="width: 90%; font-size: 1.3rem; text-align: start;">
                                                    <Strong
                                                        css={`
                                                            font-size: 1.5rem;
                                                            cursor: var(--pointer);
                                                            &:hover {
                                                                text-decoration: underline;
                                                            }
                                                        `}
                                                        onClick={() => dispatch(setIdUser([v.id]))}
                                                    >
                                                        {v.fullName + ' '}
                                                    </Strong>
                                                    {dataText[lg].mess}
                                                    {v?.status === 1 ? (
                                                        <>
                                                            <Strong
                                                                css="color: #59b6e8; font-size: 1.4rem; cursor: var(--pointer); padding: 4px 5px;"
                                                                onClick={() => handleConfirm(v.id)}
                                                            >
                                                                {dataText[lg].confirm}
                                                            </Strong>
                                                            {dataText[lg].or}
                                                            <Strong
                                                                css="color: #ba4455; font-size: 1.4rem; cursor: var(--pointer); padding: 4px 5px;"
                                                                onClick={() => handleDelete(v.id)}
                                                            >
                                                                {dataText[lg].del}
                                                            </Strong>
                                                        </>
                                                    ) : v.status !== -1 ? (
                                                        <Strong css="color: #59b6e8; font-size: 1.4rem; cursor: var(--pointer); padding: 4px 5px;">
                                                            Messenger
                                                        </Strong>
                                                    ) : (
                                                        ''
                                                    )}
                                                    <Span
                                                        css={`
                                                            color: ${colorText};
                                                            font-size: 1rem;
                                                        `}
                                                    >
                                                        {dateT}
                                                    </Span>
                                                </P>
                                                <P css="font-size: 17px; display: flex; position: absolute; right: 9px; top: 3px; cursor: pointer;">
                                                    <DotI />
                                                </P>
                                            </Div>
                                        </DivItem>

                                        <Button
                                            color={colorText}
                                            css="width: 100%; justify-content: center; padding: 4px; font-size: 1.3rem;"
                                        >
                                            {dataText[lg].more}
                                        </Button>
                                    </Div>
                                );
                            })}
                        </DivListIs>
                    </DivRes>
                </>
            )}
        </>
    );
};

export default memo(Notification);
