import moment from 'moment';
import 'moment/locale/vi';
import { useState } from 'react';
import { PropsReloadRD, onChat } from '~/redux/reload';
import { useDispatch, useSelector } from 'react-redux';

import Languages from '~/reUsingComponents/languages';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { DivPos, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';

import { DotI, ProfileI, TyOnlineI } from '~/assets/Icons/Icons';
import { PropsRoomChat } from './Send';

const ListAccounts: React.FC<{
    colorText: string;
    colorBg: number;
    setMoreBar: React.Dispatch<React.SetStateAction<boolean>>;
    data: PropsRoomChat;
    userId: string;
}> = ({ colorText, colorBg, setMoreBar, data, userId }) => {
    const dispatch = useDispatch();
    const { userOnline } = useSelector((state: { reload: PropsReloadRD }) => state.reload);

    const { lg } = Languages();

    let time: string | number | NodeJS.Timeout | undefined;
    const handleTouchStart = () => {
        time = setTimeout(() => {
            setMoreBar(true);
        }, 500);
    };
    const handleTouchMove = () => {
        clearTimeout(time);
    };
    const handleTouchEnd = () => {
        clearTimeout(time);
        console.log('no');
    };
    return (
        <>
            {data.user.map((rs) => {
                const who =
                    data.room._id === userId
                        ? 'You: '
                        : rs.gender === 0
                        ? 'Him: '
                        : rs.gender === 1
                        ? 'Her: '
                        : 'Cuy: ';
                const Time = moment(moment(data.room.createdAt).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss')
                    .locale(lg)
                    .fromNow();
                return (
                    <Div
                        key={rs.id}
                        onTouchMove={handleTouchMove}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onClick={() => dispatch(onChat({ id_room: data._id, user: rs }))}
                        width="100%"
                        css={`
                            height: 50px;
                            align-items: center;
                            padding: 0 3px;
                            margin: 5px 0;
                            user-select: none;
                            position: relative;
                            color: ${colorText};
                            transition: all 0.5s linear;
                            &:active {
                                background-color: #484848ba;
                            }
                            @media (min-width: 768px) {
                                cursor: var(--pointer);
                                &:hover {
                                    background-color: #484848ba;
                                }
                            }
                        `}
                    >
                        <Avatar
                            src={rs.avatar}
                            gender={rs.gender}
                            radius="50%"
                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                        />
                        {userOnline.includes(rs.id) && (
                            <DivPos
                                bottom="2px"
                                left="32px"
                                size="10px"
                                css="color: #149314; padding: 2px; background-color: #1c1b1b;"
                            >
                                <TyOnlineI />
                            </DivPos>
                        )}
                        <Div width="72%" wrap="wrap">
                            <Hname>{rs.fullName}</Hname>
                            <Div
                                width="80%"
                                css={`
                                    align-items: center;
                                    position: relative;
                                    ${data.room.seenBy.includes(userId) ? 'color: #eeeeee;' : ''};
                                `}
                            >
                                <P css="min-width: 21px; width: 17px; height: 17px; margin-right: 5px; font-size: 1.1rem; margin-top: 3px;">
                                    {who}
                                </P>
                                <P
                                    z="1.2rem"
                                    css="width: 100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-top: 3px; "
                                >
                                    {data.room.text.t}
                                </P>
                                <P z="1rem" css="width: 100%; margin-top: 5px; margin-left: 10px">
                                    {Time}
                                </P>
                                <Div
                                    width="15px"
                                    css={`
                                        position: absolute;
                                        top: 4px;
                                        right: -8px;
                                        height: 15px;
                                        border-radius: 50%;
                                        font-size: 1.1rem;
                                        justify-content: center;
                                        background-color: #af5454;
                                    `}
                                >
                                    3
                                </Div>
                            </Div>
                        </Div>
                        <Div
                            width="30px"
                            display="none"
                            css={`
                                height: 30px;
                                border-radius: 50%;
                                align-items: center;
                                justify-content: center;
                                border-radius: 50%;
                                @media (min-width: 768px) {
                                    display: flex;
                                    cursor: var(--pointer);
                                    &:hover {
                                        background-color: #161414ba;
                                    }
                                }
                            `}
                            onClick={() => setMoreBar(true)}
                        >
                            <DotI />
                        </Div>
                    </Div>
                );
            })}
        </>
    );
};
export default ListAccounts;
