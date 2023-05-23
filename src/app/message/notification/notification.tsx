import { CloseI, MoveI, NotificationI, UndoI } from '~/assets/Icons/Icons';
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
    const userId = cookies.k_user;
    const [notification, setNotification] = useState<boolean>(false);

    const handleShowHide = () => {
        setNotification(!notification);
    };
    useEffect(() => {
        socket.on(`Request others?id=${userId}`, (msg: any) => {
            console.log('Received message id:', socket.id);
            console.log('Received message', msg);
        });
    }, []);
    const handleUndo = () => {
        setlLeft(false);
        setBottom(false);
    };
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
                            <Div
                                wrap="wrap"
                                css="width: fit-content; height: fit-content; border: 1px solid #39393b; margin-bottom: 14px; padding-top: 5px;"
                            >
                                <DivItem color={colorText}>
                                    <Div css="height: fit-content;">
                                        <Avatar css="width: 40px; margin: 2px 5px;" radius="50%" gender={1} />
                                    </Div>
                                    <Div wrap="wrap" css="height: fit-content;">
                                        <Hname css="width: 100%; font-size: 1.4rem;">Nguyen Trong Hung</Hname>
                                        <P css="font-size: 1.2rem">Good boys</P>
                                    </Div>
                                </DivItem>
                                <Div wrap="wrap" css="padding: 2px 9px 2px 20px; height: fit-content;">
                                    <Ol
                                        type="1"
                                        css={`
                                            color: ${colorText};
                                            font-size: 1.3rem;
                                        `}
                                    >
                                        <Li>
                                            <Div
                                                wrap="wrap"
                                                css={`
                                                    color: ${colorText};
                                                    margin-bottom: 5px;

                                                    border: 1px solid #4f4f51;
                                                    padding: 6px;
                                                    border-radius: 5px;
                                                `}
                                            >
                                                <P css="width: 100%; font-size: 1.3rem; text-align: start;">
                                                    He has sent for you a friend request about 1 minute ago.
                                                    <Strong css="color: #59b6e8; font-size: 1.4rem; cursor: var(--pointer); padding: 4px 5px;">
                                                        Confirm
                                                    </Strong>
                                                    or
                                                    <Strong css="color: #ba4455; font-size: 1.4rem; cursor: var(--pointer); padding: 4px 5px;">
                                                        Refuse?
                                                    </Strong>
                                                </P>
                                                <P css="width: 100%; text-align: center; padding: 1px 0; font-size: 1.1rem; background-color: #4d4f52;">
                                                    You comfirmed about 2 minutes ago.
                                                </P>
                                            </Div>{' '}
                                        </Li>
                                    </Ol>
                                </Div>
                                <Button
                                    color={colorText}
                                    css="width: 100%; justify-content: center; padding: 4px; font-size: 1.3rem;"
                                >
                                    Hidden
                                </Button>
                            </Div>
                        </DivListIs>
                    </DivRes>
                </>
            )}
        </>
    );
};

export default memo(Notification);
