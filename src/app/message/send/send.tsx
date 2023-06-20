import { CloseI, SendI, MoveI, UndoI, BeforeI } from '~/assets/Icons/Icons';
import { memo, useEffect } from 'react';
import clsx from 'clsx';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import React, { useState } from 'react';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import useDebounce from '~/reUsingComponents/hook/useDebounce';
import { DivIconMs } from '../styleMessage';
import { DivResults, DivSend } from './styleSed';
import { Div, Input } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivPost } from '~/social_network/components/Header/layout/Home/styleHome';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import ListAccounts from './SendReults';
const Send: React.FC<{
    colorText: string;
    colorBg: number;
    dataUser: { id: string; avatar: any; fullName: string; nickName: string; gender: number };
    userOline: string[];
}> = ({ colorBg, colorText, dataUser, userOline }) => {
    const [send, setSend] = useState(false);

    const [left, setlLeft] = useState<boolean>(false);
    const [bottom, setBottom] = useState<boolean>(false);
    const [move, setMove] = useState<boolean>(false);
    const [searchUser, setSearchUser] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<any>([]);
    const handleShowHide = () => {
        setSend(!send);
    };
    const handleMove = () => {
        setMove(!move);
    };
    const handleUndo = () => {
        setlLeft(false);
        setBottom(false);
        setMove(false);
    };
    // const debounce = useDebounce(searchUser, 500);
    // useEffect(() => {
    //     if (!searchUser) {
    //         setResultSearch([]);
    //         return;
    //     }
    //     const fechApi = async () => {
    //         // const results = await userService.search(searchUser);
    //         // setResultSearch(results);
    //     };

    //     fechApi();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debounce]);
    const handleSearch = (e: { target: { value: string } }) => {
        setSearchUser(e.target.value);
    };
    console.log(searchUser);

    return (
        <>
            {!send && (
                <Hovertitle Tags={DivIconMs} title="Send" size="23px" color={colorText} onClick={handleShowHide}>
                    <SendI />
                    <p className={clsx('miss')}>+</p>
                </Hovertitle>
            )}
            {send && (
                <DivSend>
                    <Div
                        width="100%"
                        css={`
                            height: 40px;
                            align-items: center;
                            justify-content: space-evenly;
                            position: relative;
                            color: ${colorText};
                        `}
                    >
                        <Div
                            css="width: 40px; height: 100%; align-items: center; justify-content: center; font-size: 22px; "
                            onClick={handleShowHide}
                        >
                            <UndoI />
                        </Div>
                        <Input
                            type="text"
                            value={searchUser}
                            placeholder="Search"
                            onChange={handleSearch}
                            color={colorText}
                            border="0"
                            width="auto"
                            margin="0"
                        />
                        <DivPos width="35px" right="50px" onClick={() => setSearchUser('')}>
                            <CloseI />
                        </DivPos>
                        <Avatar
                            src={dataUser.avatar}
                            alt={dataUser.fullName}
                            gender={dataUser.gender}
                            radius="50%"
                            css="width: 35px; height: 35px;"
                        />
                    </Div>
                    <DivResults>
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                        <ListAccounts colorText={colorText} colorBg={colorBg} />
                    </DivResults>
                </DivSend>
            )}
        </>
    );
};

export default memo(Send);
