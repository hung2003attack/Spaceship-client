import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import styles from './login.module.scss';
import { EyemI, EyedI } from '~/assets/Icons/Icons';

import Authentication from '~/restAPI/requestGetDate/auth';
import { useDispatch } from 'react-redux';
import Register from '../Register/Register';
import { Input } from '~/reUsingComponents/styleComponents/styleComponents';
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Login: React.FC = () => {
    const dispatch = useDispatch();
    //server
    const [errText, setErrText] = useState<string>('');

    //client
    const [show, setShow] = useState<{ icon: boolean; check: boolean }>({ icon: false, check: true });
    const [value, setValue] = useState<{ nameAccount: string; password: string }>({
        nameAccount: '',
        password: '',
    });
    const [loginOrRegister, setLoginOrRegister] = useState<boolean>(false);
    const checkRef = useRef<any>({ nameAccount: value.nameAccount, password: value.password });
    const [invalid, setInvalid] = useState<{ nameAccount: string; password: string }>({
        nameAccount: 'false',
        password: 'false',
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

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        checkRef.current = value;
        try {
            if (!value.nameAccount && !value.password) {
                setInvalid({ ...invalid, nameAccount: 'true', password: 'true' });
            } else if (!value.nameAccount) {
                setInvalid({ ...invalid, nameAccount: 'true', password: 'false' });
            } else if (!value.password) {
                setInvalid({ ...invalid, nameAccount: 'false', password: 'true' });
            } else {
                const data = await Authentication.login(value.nameAccount, value.password, dispatch);
                if (data) {
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
            setInvalid({ ...invalid, password: 'false' });
        } else {
            setInvalid({ ...invalid, nameAccount: 'false' });
        }
        setErrText('');
    };
    const handleRegister = () => {
        setLoginOrRegister(!loginOrRegister);
    };
    return (
        <>
            <div className={clsx(styles.background)}>
                {loginOrRegister ? (
                    <Register setTransfer={setLoginOrRegister} transfer={loginOrRegister} />
                ) : (
                    <div className={clsx(styles.formLogin)}>
                        <h4 className={clsx(styles.titleLogin)}>Log in</h4>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className={clsx(styles.account)}>
                                <Input
                                    type="text"
                                    value={value.nameAccount}
                                    color={invalid.nameAccount}
                                    placeholder="email or phone number"
                                    onChange={handleInputChangeN}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                            <div className={clsx(styles.account)}>
                                <Input
                                    type={show.check ? 'password' : 'text'}
                                    value={value.password}
                                    color={invalid.password}
                                    placeholder="Password"
                                    onChange={handleInputChangeP}
                                    onFocus={handleInputFocus}
                                />
                                <a href="/" className={clsx(styles.changePassword)}>
                                    Change the Password
                                </a>

                                {show.icon && (
                                    <>
                                        {show.check && value.password && (
                                            <p
                                                className={clsx(styles.eye)}
                                                onClick={() => setShow({ ...show, check: false })}
                                            >
                                                <EyemI />
                                            </p>
                                        )}
                                        {!show.check && value.password && (
                                            <p
                                                className={clsx(styles.close)}
                                                onClick={() => setShow({ ...show, check: true })}
                                            >
                                                <EyedI />
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                            {errText && <p className={clsx(styles.texterror)}> {errText}</p>}
                            <div onClick={handleRegister} className={clsx(styles.register)}>
                                Register
                            </div>
                            <button className={clsx(styles.submit)}>Login</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;
