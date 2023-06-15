import clsx from 'clsx';
import React, { useState, useEffect, memo } from 'react';
import styles from './personalPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../app/reUsingComponents/Avatars/Avatar';

import Button from '../../app/reUsingComponents/Buttoms/ListButton/Buttons';

import Edit from '../editInformation/editInformation';
import Part from './layout/result';
import { Buttons, Div, Img, P, Span } from '../../app/reUsingComponents/styleComponents/styleDefault';
import { DivContainer, DivLoading, DivPos, Hname } from '../../app/reUsingComponents/styleComponents/styleComponents';
import { DivPersonalPage } from '../styleNextWeb';
import { DivBg, DivIntr, DivItems, DivOp, DivPerson, DivStories, InputChangeP } from './stypePersonal';
import { offPersonalPage, setTrueErrorServer } from '../../app/redux/hideShow';
import Title from './layout/Title';
import { CheckI, CloseI, DotI, HeartI, HeartMI, ImageI, LoadingI, UndoI } from '~/assets/Icons/Icons';
import { Label } from '~/social_network/components/Header/layout/Home/Layout/FormUpNews/styleFormUpNews';
import CommonUtils from '~/utils/CommonUtils';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { useCookies } from 'react-cookie';
import { PropsUser, PropsUserPer } from 'src/App';
import EditP from './layout/EditP';
import moment from 'moment';
import ErrorBoudaries from '~/reUsingComponents/ErrorBoudaries/ErrorBoudaries';
import peopleAPI from '~/restAPI/requestServers/socialNetwork/peopleAPI';
import LogicView from './logicPersonal';

interface PropsPer {
    user: PropsUserPer;
    leng: number;
    colorText: string;
    colorBg: number;
    online: string[];
    setUserFirst: React.Dispatch<React.SetStateAction<PropsUser | undefined>>;
    userFirst: PropsUser;
}

const Personalpage: React.FC<PropsPer> = ({ user, leng = 1, colorText, colorBg, online, userFirst, setUserFirst }) => {
    console.log(user, 'user herrrr');
    // const lg
    const dispatch = useDispatch();
    const [dataUser, setDataUser] = useState<PropsUserPer>(user);
    const {
        edit,
        setEdit,
        loading,
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
    } = LogicView(user, userFirst, setUserFirst, dataUser, setDataUser, leng, colorText, online);

    const handlePersonalPage = () => {
        dispatch(offPersonalPage());
    };
    console.log('dataUserFirst', userFirst);

    console.log(dataUser, 'dataUser', id_loved);

    const inputChange = (onEvent: (e: any) => void, value: string, holder: string) => {
        return (
            <Div width="196px" wrap="wrap" css="position: relative; @media(min-width: 600px){width: 250px}">
                <InputChangeP id="h" placeholder={holder} color={colorText} value={value} onChange={onEvent} />
                <Label
                    htmlFor="h"
                    css={`
                        font-size: 1.2rem;
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        @media (min-width: 600px) {
                            top: 7px;
                        }
                    `}
                >
                    {value.length} / 30
                </Label>
            </Div>
        );
    };

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
                    {dataUser.id !== userId && (
                        <DivPos
                            size="25px"
                            color={colorText}
                            bottom="-37px"
                            right="10%"
                            css={`
                                z-index: 1;
                                @media (min-width: 600px) {
                                    bottom: -43px;
                                    font-size: 30px;
                                    p {
                                        right: 16px;
                                    }
                                }
                            `}
                            onClick={handleLoves}
                        >
                            <HeartI />
                            <Div
                                css={`
                                    position: absolute;
                                    color: #444646;
                                    font-size: 17px;
                                    right: 4px;
                                    @media (min-width: 600px) {
                                        font-size: 22px;
                                        right: 4px;
                                    }
                                    ${(id_loved === userId || resTitle.love === 1) && 'color: #c73434; '}
                                `}
                            >
                                <HeartMI />
                            </Div>
                            <P z="26px" css="position: absolute;  color: #7c8787; right: 13px; z-index: 6; top: -17px;">
                                .
                            </P>
                        </DivPos>
                    )}
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
                            css="z-index: 1; cursor: var(--pointer);"
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
                        <Hname
                            css={`
                                @media (min-width: 600px) {
                                    font-size: 1.6rem;
                                }
                            `}
                        >
                            {valueName || dataUser.fullName}
                        </Hname>
                        {categories === 2 && inputChange(handleVName, valueName, user.fullName)}
                        <P css="width: 100%; @media (min-width: 600px) {font-size: 1.3rem;}" z="1.2rem">
                            {valueNickN || dataUser.nickName}
                        </P>
                        {categories === 3 && inputChange(handleVNickN, valueNickN, user.nickName)}
                    </Div>
                    {categories === 0 && userId === dataUser.id && (
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
                            editP={editDataText[lg]}
                            onClick={handleChangeAvatar}
                            onText={handleChangeText}
                            colorText={colorText}
                        />
                    )}
                </DivPersonalPage>
                {(categories === 2 || categories === 3) && (
                    <Div width="200px" css="margin: 55px auto 0; justify-content: space-evenly;">
                        <Buttons
                            text={[
                                {
                                    text: btName[lg].del,
                                    css: cssBt + 'background-color: #781111;',
                                    onClick: () => {
                                        setCategories(0);
                                        setErrText('');
                                        setValueName('');
                                    },
                                },
                            ]}
                        />

                        <Buttons
                            text={[
                                {
                                    text: btName[lg].ok,
                                    css: cssBt + 'background-color: #214795;',
                                    onClick: categories === 2 ? handleNameU : handleNickNameU,
                                },
                            ]}
                        >
                            <CheckI />
                        </Buttons>
                    </Div>
                )}
                <P
                    color={colorText}
                    css="width: 100%; padding: 10px; @media (min-width: 600px) {font-size: 1.3rem;}"
                    z="1.2rem"
                >
                    {errText}
                </P>
                {dataUser.id !== userId && (
                    <Div
                        width="95%"
                        css={`
                            justify-content: center;
                            margin: 46px auto 0;
                            position: relative;
                            @media (min-width: 500px) {
                                justify-content: right;
                            }
                        `}
                    >
                        <Buttons text={btss} />
                    </Div>
                )}
                <Title
                    id_loved={id_loved}
                    resTitle={resTitle}
                    id_o={id_f_user}
                    id_f={id_friend}
                    level={level}
                    colorText={colorText}
                    colorBg={colorBg}
                    data={dataUser.id_m_user}
                    status={dataUser.status}
                />
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
