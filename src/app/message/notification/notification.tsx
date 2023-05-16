import { CloseI, MoveI, NotificationI, UndoI } from '~/assets/Icons/Icons';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import clsx from 'clsx';
import React, { memo, useState } from 'react';
import { DivIconMs } from '../styleMessage';
import { DivBar, DivItem, DivListIs, DivRes } from './styleNot';
import { DivClose } from '~/reUsingComponents/styleComponents/styleComponents';
import { Buttons, Div, H3, P, Span, Strong } from '~/reUsingComponents/styleComponents/styleDefault';
import Avatar from '~/reUsingComponents/Avatars/Avatar';

const Notification: React.FC<{ colorText: string; colorBg: number }> = ({ colorText, colorBg }) => {
    const [left, setlLeft] = useState<boolean>(false);
    const [bottom, setBottom] = useState<boolean>(false);

    const [notification, setNotification] = useState<boolean>(false);

    const handleShowHide = () => {
        setNotification(!notification);
    };

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
                            <DivClose color={colorText} size="20px" top="4px" left="4px" onClick={handleShowHide}>
                                <CloseI />
                            </DivClose>
                            <H3 color={colorText} css="font-size: 1.6rem;">
                                Notification
                            </H3>
                        </DivBar>
                        <DivListIs>
                            <DivItem color={colorText}>
                                <Div css="height: fit-content;">
                                    <Avatar css="width: 40px; margin: 2px 5px;" radius="50%" gender={1} />
                                </Div>
                                <Div>
                                    <P css="font-size: 1.3rem; font-weight: 400;">
                                        <Strong css="font-size: 1.4rem;">Nguyen Trong Hung </Strong>
                                        has sent for you a friend request
                                        <Buttons
                                            text={[
                                                { css: '', text: 'Confirm' },
                                                { css: '', text: 'cancel' },
                                            ]}
                                        />
                                    </P>
                                </Div>
                            </DivItem>
                        </DivListIs>
                    </DivRes>
                </>
            )}
        </>
    );
};

export default memo(Notification);
