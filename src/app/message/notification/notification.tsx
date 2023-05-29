import { CloseI, DotI, MoveI, NotificationI, UndoI } from '~/assets/Icons/Icons';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import { DivIconMs } from '../styleMessage';
import { DivBar, DivItem, DivListIs, DivRes } from './styleNot';
import { DivClose, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { Button, Buttons, Div, H3, Li, Ol, P, Span, Strong } from '~/reUsingComponents/styleComponents/styleDefault';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { socket } from 'src/mainPage/nextWeb';
import { useCookies } from 'react-cookie';

const Notification: React.FC<{ colorText: string; colorBg: number }> = ({ colorText, colorBg }) => {
    const [left, setlLeft] = useState<boolean>(false);
    const [bottom, setBottom] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies(['k_user']);
    const [dataInfo, setDataInfo] = useState<{
        mes: { id: number; id_message: string; status: number; title: string; createAt: string };
        user: { id: string; avatar: string; fullName: string; nickName: string; gender: number };
    }>();
    const userId = cookies.k_user;
    const [notification, setNotification] = useState<boolean>(false);

    const handleShowHide = () => {
        setNotification(!notification);
    };
    useEffect(() => {
        socket.on(`Request others?id=${userId}`, (msg: any) => {
            console.log('Received message id:', socket.id);
            console.log('Received message', msg);
            setDataInfo({ mes: JSON.parse(msg).mes, user: JSON.parse(msg).user });
        });
    }, []);
    const handleUndo = () => {
        setlLeft(false);
        setBottom(false);
    };
    console.log(dataInfo);

    return (
        <>
            {!notification && (
                <Hovertitle Tags={DivIconMs} title="NoTi" size="29px" color={colorText} onClick={handleShowHide}>
                    <NotificationI />
                    <p className={clsx('miss')}>+</p>
                </Hovertitle>
            )}

            {notification && (
                <>
                    <DivRes bg={colorBg === 1 ? 'rgb(32 33 35)' : ''}>
                        <DivBar>
                            <DivClose color={colorText} size="20px" top="8px" left="4px" onClick={handleShowHide}>
                                <CloseI />
                            </DivClose>
                            <H3 color={colorText} css="font-size: 1.6rem;">
                                Notification
                            </H3>
                        </DivBar>
                        <DivListIs>
                            {dataInfo && (
                                <Div
                                    wrap="wrap"
                                    css="width: fit-content; height: fit-content; border: 1px solid #39393b; margin-bottom: 14px; padding-top: 5px; position: relative;"
                                >
                                    <DivItem color={colorText}>
                                        <Div css="height: fit-content;">
                                            <Avatar
                                                css="width: 40px; margin: 2px 5px;"
                                                src={dataInfo?.user.avatar}
                                                radius="50%"
                                                gender={dataInfo?.user.gender}
                                            />
                                        </Div>
                                        <Div wrap="wrap" css="height: fit-content; align-items: center;">
                                            {/* <Hname css="width: 100%; font-size: 1.4rem;"></Hname> */}
                                            <P css="width: 90%; font-size: 1.3rem; text-align: start;">
                                                <Strong css="font-size: 1.5rem;">
                                                    {dataInfo?.user.fullName + '. '}
                                                </Strong>
                                                {dataInfo?.mes.title}
                                                {dataInfo?.mes.status === 1 && (
                                                    <>
                                                        <Strong css="color: #59b6e8; font-size: 1.4rem; cursor: var(--pointer); padding: 4px 5px;">
                                                            Confirm
                                                        </Strong>
                                                        or
                                                        <Strong css="color: #ba4455; font-size: 1.4rem; cursor: var(--pointer); padding: 4px 5px;">
                                                            Refuse?
                                                        </Strong>
                                                    </>
                                                )}
                                            </P>
                                            <P css="font-size: 17px; display: flex; position: absolute; right: 9px; top: 3px;">
                                                <DotI />
                                            </P>
                                        </Div>
                                    </DivItem>

                                    <Button
                                        color={colorText}
                                        css="width: 100%; justify-content: center; padding: 4px; font-size: 1.3rem;"
                                    >
                                        More
                                    </Button>
                                </Div>
                            )}
                        </DivListIs>
                    </DivRes>
                </>
            )}
        </>
    );
};

export default memo(Notification);
