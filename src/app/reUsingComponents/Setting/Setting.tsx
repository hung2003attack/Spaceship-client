import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { logOutSuccess, onsettingOpacity, offsettingOpacity } from '~/redux/authenRD';

import { CloseI } from '~/assets/Icons/Icons';
import Authentication from '~/restAPI/requestGetDate/auth';
import styles from './setting.module.scss';
import Bar from '~/reUsingComponents/Bar/Bar';
import { Setting } from './interface';
import { useNavigate } from 'react-router-dom';
import refreshToken from '~/refreshToken/refreshToken';
import { useCookies } from 'react-cookie';

const Settingcbl: React.FC<Setting> = ({ data }) => {
    const showHideSettingn = useSelector((state: any) => state.auth.showHideSettingn);
    const [cookies, setCookie] = useCookies(['tks']);
    const token = cookies.tks;
    const [showresult, setShowresult] = useState<ReactNode>();
    const [resultoption, setResultoption] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.auth.login);
    useEffect(() => {
        if (!showHideSettingn) setResultoption(false);
    }, [showHideSettingn]);
    const handleResult = (data: any) => {
        setShowresult(() => {
            if (data) {
                setResultoption(true);

                return data.data.map((title: any, index: number) => {
                    return (
                        <div key={index} className={clsx(styles.title)}>
                            <p>{title.name}</p>
                        </div>
                    );
                });
            }
            setResultoption(false);
        });
    };
    const handleLogOut = async () => {
        const axiosJWTss = refreshToken.axiosJWTs(token, currentUser, dispatch, setCookie);

        await Authentication.logOut(token, dispatch, axiosJWTss);

        //  window.history.go();
    };

    return (
        <>
            <div
                className={clsx(styles.option, showHideSettingn && styles.showOption)}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={clsx(styles.closeOption)}
                    onClick={() => {
                        setResultoption(false);
                        dispatch(offsettingOpacity());
                    }}
                >
                    <CloseI />
                </div>
                <div className={clsx(styles.optionsALL)}>
                    {data.map((setting: any, index: number) => {
                        if (setting.logout) {
                        }
                        return (
                            <div
                                key={index}
                                className={clsx(styles.options)}
                                onClick={() => handleResult(setting.children)}
                            >
                                {setting.logout ? (
                                    <div className={clsx(styles.language)} onClick={handleLogOut}>
                                        <p className={clsx(styles.title)}>{setting.title}</p>
                                    </div>
                                ) : (
                                    <div className={clsx(styles.language)}>
                                        <p className={clsx(styles.title)}>{setting.title}</p>
                                        {setting.title === 'Language' && (
                                            <p className={clsx(styles.currentLanguage)}>( English ){setting.icon}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {resultoption && <Bar onClick={() => setResultoption(false)} hideResultSetting />}
                {resultoption && <div className={clsx(styles.results)}> {showresult}</div>}
            </div>
        </>
    );
};

export default Settingcbl;
