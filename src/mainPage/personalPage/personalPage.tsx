import clsx from 'clsx';
import React, { useState, useEffect, memo } from 'react';
import styles from './personalPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../app/reUsingComponents/Avatars/Avatar';

import Button from '../../app/reUsingComponents/Buttoms/ListButton/Buttons';

import Edit from '../editInformation/editInformation';
import Part from './layout/result';
import { Buttons, Div, Img, P, Span } from '../../app//reUsingComponents/styleComponents/styleDefault';
import { DivContainer, DivPos, Hname } from '../../app//reUsingComponents/styleComponents/styleComponents';
import { DivPersonalPage } from '../styleNextWeb';
import { DivBg, DivIntr, DivItems, DivOp, DivPerson, DivStories, InputChangeP } from './stypePersonal';
import { offPersonalPage, setTrueErrorServer } from '../../app//redux/hideShow';
import Title from './layout/Title';
import { CheckI, CloseI, DotI, UndoI } from '~/assets/Icons/Icons';
import { Label } from '~/social_network/components/Header/layout/Home/Layout/FormUpNews/styleFormUpNews';
import CommonUtils from '~/utils/CommonUtils';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import { useCookies } from 'react-cookie';
import { PropsUserPer } from 'src/App';
import { changeAvatar, changeBackground } from '~/redux/changeData';
import EditP from './layout/EditP';
import moment from 'moment';

interface PropsPer {
    user: PropsUserPer;
    leng: number;
    colorText: string;
    colorBg: number;
    online: string[];
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
const Personalpage: React.FC<PropsPer> = ({ user, leng = 1, colorText, colorBg, online }) => {
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

    const [edit, setEdit] = useState<boolean>(false);
    const [categories, setCategories] = useState<number>(0);
    const [valueName, setValueName] = useState<string>('');

    const [errText, setErrText] = useState<string>('');
    console.log(dataUser, 'dataUser');

    const [room, setRoom] = useState<{ avatar: boolean; background: boolean }>({ avatar: false, background: false });
    const handlePersonalPage = () => {
        dispatch(offPersonalPage());
    };
    const handleEdit = () => {
        setEdit(!edit);
    };
    const editP: { [en: string]: { name: string; id: number }[]; vi: { name: string; id: number }[] } = {
        en: [
            { name: 'Background', id: 0 },
            { name: 'Avatar', id: 1 },
            { name: 'Full name', id: 2 },
            { name: 'Nick name', id: 3 },
            { name: 'Status', id: 4 },
        ],
        vi: [
            { name: 'Nền', id: 0 },
            { name: 'Ảnh đại diện', id: 1 },
            { name: 'Tên', id: 2 },
            { name: 'Biệt danh', id: 3 },
            { name: 'Dòng trạng thái', id: 4 },
        ],
    };
    useEffect(() => {
        setDataUser(user);
    }, [user]);
    const handleChangeAvatar = async (e: { target: { files: any } }, id: number) => {
        const data = e.target.files;
        const file = data[0];
        const options = {
            maxSizeMB: 10,
        };
        if (file) {
            if (
                file.type.includes('image/jpg') ||
                file.type.includes('image/jpeg') ||
                file.type.includes('image/png')
            ) {
                const img = URL.createObjectURL(file);
                const sizeImage = Number((file.size / 1024 / 1024).toFixed(1));
                if (sizeImage <= 8) {
                    const base64 = await CommonUtils.getBase64(file);
                    const res = await userAPI.changesOne(
                        token,
                        base64,
                        id === 0 ? { background: 'background' } : { avatar: 'avatar' },
                    );
                    console.log('number', res, id);
                    if (res === 1) {
                        if (id === 0) {
                            dispatch(changeBackground(img));
                            setDataUser({ ...dataUser, background: img });
                        } else {
                            dispatch(changeAvatar(img));
                            setDataUser({ ...dataUser, avatar: img });
                        }
                    }

                    //   uploadRef.current.push({ link: URL.createObjectURL(compressedFile), type: 'image' });
                } else {
                    dispatch(setTrueErrorServer(`${sizeImage}MB big than our limit is 8MB`));
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
    const buttons: { [en: string]: string[]; vi: string[] } = {
        en: ['Add Friend', 'Messenger', 'Follow'],
        vi: ['Kết bạn', 'Nhắn tin', 'Theo dõi'],
    };
    const cssBt = `color: ${colorText};
            padding: 9px;
            font-size: 1.3rem;
            margin: 0 5px;
            background-color: #383838;
            @media(min-width: 678px){
                font-size: 1.5rem;
            }
    `;

    // if (dataUser.background) {
    //     const bg = CommonUtils.convertBase64(dataUser.background);
    //     dataUser.background = bg;
    // }
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
                    {user.background && (
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
                            css=""
                        />
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
                    <Buttons
                        text={[
                            { text: 'Add Friend', css: cssBt },
                            { text: 'Messenger', css: cssBt },
                            { text: 'Follow', css: cssBt + 'padding: 9px 21px;' },
                        ]}
                    />
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
