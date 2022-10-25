import React, { useState, useRef } from 'react';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { EyemI, EyedI } from '~/assets/Icons/Icons';
import Authentication from '~/restAPI/requestGetDate/auth';
import { Eye, Input, TitleAuth } from '~/reUsingComponents/styleComponents/styleComponents';
import Language from 'src/Language/Language';
import { changeLogin } from '~/redux/languageRD';

import { A, DivForm, DivLanguage, Perror, DivRegister, ButtonSubmit, DivAccount } from './styleLogin';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface PropsLogin {
    [EN: string]: {
        title: string;

        input: {
            id: number;
            type: string | string[];
            placeholder: string;
        }[];
        changePassword: string;
        submit: string;
        register: string;
    };
    VN: {
        title: string;

        input: {
            id: number;
            type: string | string[];
            placeholder: string;
        }[];
        changePassword: string;
        submit: string;
        register: string;
    };
}
interface PropsState {
    language: {
        login: string;
    };
}
const cookiesq = new Cookies();

const Login: React.FC<{
    data: PropsLogin;
    transfer: boolean;
    setTransfer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, setTransfer, transfer }) => {
    const dataLanguages = useSelector((state: PropsState) => state.language?.login);
    const [language, setLanguage] = useState<boolean>(false);
    const { title, input, changePassword, submit, register } = data[dataLanguages];

    const dispatch = useDispatch();
    //server
    const [errText, setErrText] = useState<string>('');
    //client
    const [show, setShow] = useState<{ icon: boolean; check: number }>({ icon: false, check: 1 });
    const [value, setValue] = useState<{ nameAccount: string; password: string }>({
        nameAccount: '',
        password: '',
    });
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
                const data = await Authentication.login(value.nameAccount, value.password, dispatch, cookiesq);
                if (data.errCode === 3) setErrText(data.errMessage);
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
        setTransfer(!transfer);
    };
    console.log(invalid, value);
    const handlelanguage = () => {
        setLanguage(!language);
    };
    // Input
    const eventsOnChange = [handleInputChangeN, handleInputChangeP];
    const checkInput = [value.nameAccount, value.password];
    const colorInput = [invalid.nameAccount, invalid.password];
    return (
        <>
            <DivForm>
                <DivLanguage onClick={handlelanguage}>
                    <Language change={dispatch} language={language} changeLanguage={changeLogin} />
                </DivLanguage>
                <TitleAuth>{title}</TitleAuth>
                <form method="POST" onSubmit={handleSubmit}>
                    <DivAccount>
                        {input.map((val) => {
                            return (
                                <Input
                                    key={val.id}
                                    type={Array.isArray(val.type) ? val.type[show.check] : val.type}
                                    value={checkInput[val.id]}
                                    color={colorInput[val.id] ? 'rgb(255 97 97 / 83%)' : ''}
                                    placeholder={val.placeholder}
                                    onChange={eventsOnChange[val.id]}
                                    onFocus={handleInputFocus}
                                />
                            );
                        })}
                        <A href="/SN" target="_blank">
                            {changePassword}
                        </A>
                        {show.icon && (
                            <>
                                {show.check && value.password ? (
                                    <Eye onClick={() => setShow({ ...show, check: 0 })}>
                                        <EyemI />
                                    </Eye>
                                ) : (
                                    <Eye onClick={() => setShow({ ...show, check: 1 })}>
                                        <EyedI />
                                    </Eye>
                                )}
                            </>
                        )}
                    </DivAccount>
                    {errText && <Perror> {errText}</Perror>}
                    <DivRegister onClick={handleRegister}>{register}</DivRegister>
                    <ButtonSubmit>{submit}</ButtonSubmit>
                </form>
            </DivForm>
        </>
    );
};

export default Login;
