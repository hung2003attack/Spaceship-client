import { useState } from 'react';
import { DotI, ProfileI, TyOnlineI } from '~/assets/Icons/Icons';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { DivPos, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { PropsRoomChat } from './Send';

const ListAccounts: React.FC<{
    colorText: string;
    colorBg: number;
    setMoreBar: React.Dispatch<React.SetStateAction<boolean>>;
    data: PropsRoomChat;
}> = ({ colorText, colorBg, setMoreBar, data }) => {
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
    console.log(data, 'send room');

    return (
        <>
            {data.user.map((rs) => (
                <Div
                    key={rs.id}
                    onTouchMove={handleTouchMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
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
                        gender={0}
                        radius="50%"
                        css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                    />
                    <DivPos
                        bottom="2px"
                        left="32px"
                        size="10px"
                        css="color: #149314; padding: 2px; background-color: #1c1b1b;"
                    >
                        <TyOnlineI />
                    </DivPos>
                    <Div width="72%" wrap="wrap">
                        <Hname>{rs.fullName}</Hname>
                        <Div width="80%" css="align-items: center;">
                            <Avatar
                                src={data.room.user.avatar}
                                gender={0}
                                radius="50%"
                                css="min-width: 17px; width: 17px; height: 17px; margin-right: 5px;"
                            />
                            <P
                                z="1.2rem"
                                css="width: 100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-top: 3px; "
                            >
                                {data.room.text.t}
                            </P>
                            <P z="1.2rem">3h</P>
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
            ))}
        </>
    );
};
export default ListAccounts;
