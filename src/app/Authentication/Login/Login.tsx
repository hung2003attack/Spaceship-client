import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonSubmit, Htitle } from '~/reUsingComponents/styleComponents/styleComponents';
import Language from 'src/Language/Language';
import { changeLogin } from '~/redux/languageRD';

import { A, DivForm, DivLanguage, Perror, DivRegister, DivAccount } from './styleLogin';
import { useCookies } from 'react-cookie';
import authHttpRequest from '~/restAPI/requestServers/authRequest/authRequest';
import Eyes from '~/reUsingComponents/Eys/Eye';
import { Input } from '~/reUsingComponents/styleComponents/styleDefault';
import { PropsBg } from 'src/mainPage/nextWeb';
// eslint-disable-next-line @typescript-eslint/no-redeclare
interface InLogin {
    title: string;

    input: {
        id: number;
        type: string | string[];
        placeholder: string;
    }[];
    changePassword: string;
    submit: string;
    register: string;
}
export interface PropsLogin {
    [EN: string]: InLogin;
    VN: InLogin;
}
interface PropsState {
    persistedReducer: {
        language: {
            login: string;
        };
    };
}
const Login: React.FC<{
    data: PropsLogin;
    setWhatKind: React.Dispatch<React.SetStateAction<string>>;
}> = ({ data, setWhatKind }) => {
    const [, setCookies] = useCookies(['tks', 'k_user']);
    const dataLanguages = useSelector((state: PropsState) => state.persistedReducer?.language.login);
    const { colorBg, colorText } = useSelector((state: PropsBg) => state.persistedReducer.background);
    const [language, setLanguage] = useState<boolean>(false);

    const { title, input, changePassword, submit, register } = data[dataLanguages];

    const dispatch = useDispatch();
    //server
    const [errText, setErrText] = useState<string>('');
    //client
    const [value, setValue] = useState<{ nameAccount: string; password: string }>({
        nameAccount: '',
        password: '',
    });
    const checkRef = useRef<any>({ nameAccount: value.nameAccount, password: value.password });
    const [invalid, setInvalid] = useState<{ nameAccount: boolean; password: boolean }>({
        nameAccount: false,
        password: false,
    });
    const [showPass, setShowPass] = useState<{ icon: boolean; check: number }>({ icon: false, check: 1 });

    const handleInputChangeN = (e: { target: { value: string } }) => {
        setValue({ ...value, nameAccount: e.target.value });
    };
    const handleInputChangeP = (e: { target: any }) => {
        setValue({ ...value, password: e.target.value });
        setInvalid({ ...invalid, password: false });
        if (e.target.value) {
            setShowPass({ ...showPass, icon: true });
        } else {
            setShowPass({ ...showPass, icon: false });
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
                const params = {
                    nameAccount: value.nameAccount,
                    password: value.password,
                };
                const data = await authHttpRequest.postLogin(params, setCookies);
                console.log('res', data);

                if (data.errCode === 0) setErrText('Account is not exist or password wrong!');
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
        setWhatKind('register');
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
                <Htitle>{title}</Htitle>
                <form method="POST" onSubmit={handleSubmit}>
                    <DivAccount>
                        {input.map((val) => {
                            return (
                                <Input
                                    key={val.id}
                                    type={Array.isArray(val.type) ? val.type[showPass.check] : val.type}
                                    value={checkInput[val.id]}
                                    color={colorInput[val.id] ? 'rgb(255 97 97 / 83%)' : ''}
                                    placeholder={val.placeholder}
                                    onChange={eventsOnChange[val.id]}
                                    onFocus={handleInputFocus}
                                />
                            );
                        })}
                        <Eyes value={value.password} setShow={setShowPass} show={showPass} top="73px" />
                        <A onClick={() => setWhatKind('changePassword')} color={colorText}>
                            {changePassword}
                        </A>
                    </DivAccount>
                    {errText && <Perror> {errText}</Perror>}
                    <DivRegister onClick={handleRegister}>{register}</DivRegister>
                    <ButtonSubmit title={submit} />
                </form>
            </DivForm>
        </>
    );
};

export default Login;
