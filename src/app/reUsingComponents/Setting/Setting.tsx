import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { InitialStateHideShow, offAll, offSetting } from '~/redux/hideShow';

import { CloseI } from '~/assets/Icons/Icons';
import Bar from '~/reUsingComponents/Bar/Bar';
import { PropsSetting } from './interface';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import authHttpRequest from '~/restAPI/requestServers/authRequest/authRequest';
import { DivClose, DivContainer } from '../styleComponents/styleComponents';
import HttpRequestUser from '~/restAPI/requestServers/accountRequest/user';
import { DivLanguages, DivResults } from './styleSetting';
import { P } from '../styleComponents/styleDefault';

const css1 = `
        min-width: 270px;
        position: fixed;
        top: 0px;
        right: 9px;
        box-shadow: 0 0 4px rgb(108 106 106);
        z-index: 9999;
        color: var(--color-light);
    `;
const css2 = `
        margin-top: 49px;
        box-shadow: 0 0 1px;
    `;
const css3 = `
        font-size: 12px;
        margin: 3px 0 0 3px;
        display: flex;
        align-items: self-end;
    `;
const Settingcbl: React.FC<{
    dataO: PropsSetting;
    setLg: React.Dispatch<React.SetStateAction<string>>;
    LgNow: string;
}> = ({ dataO, setLg, LgNow }) => {
    const datas = dataO.data;
    const showHideSettingn = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow?.setting);
    const [cookies, setCookie, removeCookie] = useCookies(['tks', 'k_user']);
    const token: string = cookies.tks;
    const k_user: string = cookies.k_user;
    const checkLg = useRef<string>(LgNow);

    const navigate = useNavigate();
    const [showresult, setShowresult] = useState<ReactNode>();
    const [resultoption, setResultoption] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!showHideSettingn) setResultoption(false);
    }, [showHideSettingn]);
    const handleChangeLanguage = async (lg: string) => {
        if (checkLg.current !== lg) {
            const res = await HttpRequestUser.update(token, k_user, lg);
            if (res === 1) {
                checkLg.current = lg;
                setLg(lg);
            }
        }
    };
    const handleResult = (data: any) => {
        const cssR = `
                transition: all 0.1s linear;
                width: 100%;
                padding: 5px;
                text-align: center;
                cursor: pointer;
                &:hover {
                    background-color: rgba(176, 176, 176, 0.08);
                }
        `;
        setShowresult(() => {
            if (data) {
                setResultoption(true);
                return data.data.map((title: any, index: number) => {
                    return (
                        <P css={cssR} key={index} onClick={() => handleChangeLanguage(title.lg)}>
                            {title.name}
                        </P>
                    );
                });
            }
            setResultoption(false);
        });
    };
    const handleLogOut = async () => {
        const res = await authHttpRequest.postLogOut(token);
        if (res === 1) {
            navigate('/');
            dispatch(offAll());
            removeCookie('tks');
            localStorage.clear();
        }
    };
    return (
        <>
            <DivContainer
                height="500px"
                display="flex"
                bg=" #202124"
                radius="5px"
                css={css1}
                onClick={(e) => e.stopPropagation()}
            >
                <DivClose
                    size="25px"
                    top="11px"
                    left="11px"
                    onClick={() => {
                        setResultoption(false);
                        dispatch(offSetting());
                    }}
                >
                    <CloseI />
                </DivClose>
                <DivContainer width="250px" css={css2}>
                    {datas.map((setting: any, index: number) => {
                        if (setting.logout) {
                        }
                        return (
                            <div key={index}>
                                {setting.logout ? (
                                    <DivLanguages onClick={handleLogOut}>
                                        <P css=" margin-left: 15px;">{setting.title}</P>
                                    </DivLanguages>
                                ) : (
                                    <DivLanguages onClick={() => handleResult(setting.children)}>
                                        <P css=" margin-left: 15px;">{setting.title}</P>
                                        {setting.title === 'Language' && <P css={css3}>( English ){setting.icon}</P>}
                                    </DivLanguages>
                                )}
                            </div>
                        );
                    })}
                </DivContainer>
                {resultoption && (
                    <Bar top="calc(50% - 10px);" onClick={() => setResultoption(false)} css="width: 5px;" />
                )}
                {resultoption && <DivResults> {showresult}</DivResults>}
            </DivContainer>
        </>
    );
};

export default Settingcbl;
