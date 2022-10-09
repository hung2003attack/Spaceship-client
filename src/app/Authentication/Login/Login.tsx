import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

import styles from './login.module.scss';
import { EyemI, EyedI } from '~/assets/Icons/Icons';
import Authentication from '~/restAPI/requestGetDate/auth';
import Register from '../Register/Register';
import { Eye, Input } from '~/reUsingComponents/styleComponents/styleComponents';
import Language from 'src/Language/Language';
import { DivLanguage } from './styleLogin';
import { changeLanguage } from '~/redux/languageRD';
// eslint-disable-next-line @typescript-eslint/no-redeclare
interface PropsLogin {
    data: {
        [EN: string]: {
            title: string,

            input: {
                id: number;
                type: string | string[];
                placeholder: string;
            }[],
            changePassword: string;
            submit: string;
            register: string;
        },
        VN: {
            title: string,

            input: {
                id: number;
                type: string | string[];
                placeholder: string;
            }[],
            changePassword: string;
            submit: string;
            register: string;
        }
    }
}
interface PropsState {
    language: {
        login: string;
    }
}
const cookiesq = new Cookies();

const Login: React.FC<PropsLogin> = ({ data }) => {
    const dataLanguages = useSelector((state: PropsState) => state.language?.login)
    const [language, setLanguage] = useState<boolean>(false)
    const { title, input, changePassword, submit, register } = data[dataLanguages];
    console.log(dataLanguages);




    const dispatch = useDispatch();
    //server
    const [errText, setErrText] = useState<string>('');
    //client
    const [show, setShow] = useState<{ icon: boolean; check: number }>({ icon: false, check: 1 });
    const [value, setValue] = useState<{ nameAccount: string; password: string }>({
        nameAccount: '',
        password: '',
    });
    const [loginOrRegister, setLoginOrRegister] = useState<boolean>(false);
    const checkRef = useRef<any>({ nameAccount: value.nameAccount, password: value.password });
    const [invalid, setInvalid] = useState<{ nameAccount: boolean; password: boolean }>({
        nameAccount: false,
        password: false,
    });
    const handleInputChangeN = (e: { target: { value: string } }) => {


        setValue({ ...value, nameAccount: e.target.value });
    };
    const handleInputChangeP = (e: { target: any }) => {
        setValue({ ...value, password: e.target.value });
        if (e.target.value) {
            setShow({ ...show, icon: true });
        } else {
            setShow({ ...show, icon: false });
        }
    };
    console.log('time', new Date(new Date().getTime() + 2 * 60 * 1000));

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        checkRef.current = value;
        try {
            if (!value.nameAccount && !value.password) {

                setInvalid({ ...invalid, nameAccount: true, password: true });
            } else if (!value.nameAccount) {
                setInvalid({ ...invalid, nameAccount: true, password: false });
            } else if (!value.password) {
                setInvalid({ ...invalid, nameAccount: false, password: true });
            } else {
                const data = await Authentication.login(value.nameAccount, value.password, dispatch);
                if (data) {
                    cookiesq.set('tks', data.user?.accessToken, { path: '/', secure: false, sameSite: 'strict', expires: new Date(new Date().getTime() + 30 * 86409000), });

                    if (data.errCode) {
                        setErrText(data.errMessage);
                    }
                }
            }
        } catch (e) {
            console.log('errorLogin', e);
        }
    };
    const handleInputFocus = (e: { target: { getAttribute: any } }) => {
        if (e.target.getAttribute('placeholder') === 'Password') {
            setInvalid({ ...invalid, password: false });
        } else {
            setInvalid({ ...invalid, nameAccount: false });
        }
        setErrText('');
    };
    const handleRegister = () => {
        setLoginOrRegister(!loginOrRegister);
    }; console.log(invalid, value);
    const handlelanguage = () => {
        setLanguage(!language)
    }
    return (
        <>
            <div className={clsx(styles.background)}>

                {loginOrRegister ? (
                    <Register setTransfer={setLoginOrRegister} transfer={loginOrRegister} />
                ) : (
                    <div className={clsx(styles.formLogin)}>
                        <DivLanguage onClick={handlelanguage}><Language change={dispatch} language={language} /></DivLanguage>

                        <h4 className={clsx(styles.titleLogin)}>{title}</h4>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className={clsx(styles.account)}>
                                {input.map(val => {
                                    console.log((val.id === 1 ? invalid.nameAccount : invalid.password));
                                    return <Input
                                        key={val.id}
                                        type={Array.isArray(val.type) ? val.type[show.check] : val.type}
                                        value={val.id === 1 ? value.nameAccount : value.password}
                                        color={((val.id === 1 ? invalid.nameAccount : invalid.password) ? 'rgb(255 97 97 / 83%)' : '')}
                                        placeholder={val.placeholder}
                                        onChange={val.id === 1 ? handleInputChangeN : handleInputChangeP}
                                        onFocus={handleInputFocus}
                                    />
                                }

                                )}
                                <a href="/" className={clsx(styles.changePassword)}>
                                    {changePassword}
                                </a>
                                {show.icon && (
                                    <>
                                        {show.check && value.password ? (
                                            <Eye
                                                onClick={() => setShow({ ...show, check: 0 })}
                                            >
                                                <EyemI />
                                            </Eye>
                                        ) : (
                                            <Eye
                                                onClick={() => setShow({ ...show, check: 1 })}
                                            >
                                                <EyedI />
                                            </Eye>)}

                                    </>
                                )}
                            </div>

                            {errText && <p className={clsx(styles.texterror)}> {errText}</p>}
                            <div onClick={handleRegister} className={clsx(styles.register)}>
                                {register}
                            </div>
                            <button className={clsx(styles.submit)}>{submit}</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;
