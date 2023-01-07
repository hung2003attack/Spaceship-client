import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { InitialStateHideShow, offAll, offSetting } from '~/redux/hideShow';

import { CloseI } from '~/assets/Icons/Icons';
import styles from './setting.module.scss';
import Bar from '~/reUsingComponents/Bar/Bar';
import { PropsSetting } from './interface';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import authHttpRequest from '~/restAPI/requestServers/authRequest/authRequest';
import { DivClose, DivContainer } from '../styleComponents/styleComponents';

const Settingcbl: React.FC<PropsSetting> = ({ data }) => {
    const showHideSettingn = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow?.setting);
    const [cookies, setCookie, removeCookie] = useCookies(['tks', 'k_user']);
    const token = cookies.tks;
    const k_user = cookies.k_user;
    console.log(token, 'setting');
    const navigate = useNavigate();
    const [showresult, setShowresult] = useState<ReactNode>();
    const [resultoption, setResultoption] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!showHideSettingn) setResultoption(false);
    }, [showHideSettingn]);
    const handleChangeLanguage = (lg: string) => {
        console.log(lg);
    };

    const handleResult = (data: any) => {
        setShowresult(() => {
            if (data) {
                setResultoption(true);

                return data.data.map((title: any, index: number) => {
                    return (
                        <div key={index} className={clsx(styles.title)}>
                            <p onClick={() => handleChangeLanguage(title.lg)}>{title.name}</p>
                        </div>
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
    const css1 = `
        min-width: 270px;
        position: fixed;
        top: 0px;
        right: 9px;
        box-shadow: 0 0 4px rgb(108 106 106);
        transition: all 0.3s linear;
        z-index: 9999;
        color: var(--color-text-light);
    `;
    const css2 = `
        margin-top: 49px;
        box-shadow: 0 0 1px;
    `;
    //
    // height: 500px;
    // background-color:;
    //
    //
    //
    // border-radius: 5px;
    //
    //
    // display: none;
    //
    // ;
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
                    {data.map((setting: any, index: number) => {
                        if (setting.logout) {
                        }
                        return (
                            <div key={index}>
                                {setting.logout ? (
                                    <div className={clsx(styles.language)} onClick={handleLogOut}>
                                        <p className={clsx(styles.title)}>{setting.title}</p>
                                    </div>
                                ) : (
                                    <div
                                        className={clsx(styles.language)}
                                        onClick={() => handleResult(setting.children)}
                                    >
                                        <p className={clsx(styles.title)}>{setting.title}</p>
                                        {setting.title === 'Language' && (
                                            <p className={clsx(styles.currentLanguage)}>( English ){setting.icon}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </DivContainer>
                {resultoption && <Bar onClick={() => setResultoption(false)} hideResultSetting />}
                {resultoption && <div className={clsx(styles.results)}> {showresult}</div>}
            </DivContainer>
        </>
    );
};

export default Settingcbl;
