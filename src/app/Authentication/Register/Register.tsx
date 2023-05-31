import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmailI, LGBTI, PhoneI } from '~/assets/Icons/Icons';
import { ButtonSubmit, Htitle } from '~/reUsingComponents/styleComponents/styleComponents';
import {
    DivForm,
    DivFormGroup,
    DivGenderC,
    DivGenderP,
    DivLGBT,
    PcontentPassword,
    Pcontent,
    SpanIconPhoneMail,
    Pmessage,
} from './styleRegister';
import Language from '~/Language/Language';
import { changeRegister } from '~/redux/languageRD';
import { DivLanguage } from '../Login/styleLogin';
import authHttpRequest from '~/restAPI/requestServers/authRequest/authRequest';
import { PropsRegister, PropsState } from './interfaceType';
import { Input, P } from '~/reUsingComponents/styleComponents/styleDefault';
import Eyes from '~/reUsingComponents/Eys/Eye';
import { setTrueErrorServer } from '~/redux/hideShow';

const Register: React.FC<PropsRegister> = ({ acc, account, dataRegister, Next }) => {
    //dataLanguage
    const dataLanguages = useSelector((state: PropsState) => state.persistedReducer.language?.register);

    const [language, setLanguage] = useState<boolean>(false);
    const { title, input, submit, messagePhoneEmail, messagePassword, messageDate, messageName } =
        dataRegister[dataLanguages];
    // const {} = dataRegister;
    const dispatch = useDispatch();
    //value
    const [valueUserName, setValueUserName] = useState<string>('');
    const [valuePhoneNumberEmail, setValuePhoneNumberEmail] = useState<{
        value: any;
        icon?: string | React.ReactElement;
    }>({ value: account, icon: '' });
    const [valuePassword, setValuePassword] = useState<{ [password1: string]: string; password2: string }>({
        password1: '',
        password2: '',
    });
    const [showPass1, setShowPass1] = useState<{ icon: boolean; check: number }>({ icon: false, check: 1 });
    const [showPass2, setShowPass2] = useState<{ icon: boolean; check: number }>({ icon: false, check: 1 });

    const [valueGender, setValueGender] = useState<number | null>(null);
    const [valueDate, setValueDate] = useState<string>('');

    //check
    const [checkUserName, setCheckUserName] = useState<{ title: string; check: boolean }>({ title: '', check: false });
    const [registerStatus, setRegisterStatus] = useState<{ title: string; status: boolean }>({
        title: '',
        status: false,
    });
    const [checkPhoneNumberEmail, setCheckPhoneNumberEmail] = useState<{
        check: boolean;
        title: string;
    }>({ check: false, title: '' });

    const [checkDate, setCheckDate] = useState<{
        check: boolean;
        icon: React.ReactElement | string;
    }>({ check: false, icon: '' });

    const [checkPassword, setCheckPassword] = useState<{
        check: boolean;
        icon: React.ReactElement | string;
    }>({ check: false, icon: '' });
    //check all feild
    const [checkAll, setCheckAll] = useState<{
        username: boolean;
        phoneNumberEmail: boolean;
        password1: boolean;
        password2: boolean;
        date: boolean;
    }>({ username: false, phoneNumberEmail: false, password1: false, password2: false, date: false });
    const checkAllRef = useRef<{
        username: boolean;
        phoneNumberEmail: boolean;
        password1: boolean;
        password2: boolean;
        date: boolean;
    }>({
        username: false,
        phoneNumberEmail: false,
        password1: false,
        password2: false,
        date: false,
    });
    const [accs, setAccs] = useState<number>(acc);
    useEffect(() => {
        if (isNaN(valuePhoneNumberEmail.value)) {
            const validateEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,5})+$/;
            setValuePhoneNumberEmail({ ...valuePhoneNumberEmail, icon: <EmailI /> });

            if (validateEmail.test(valuePhoneNumberEmail.value) === true) {
                setCheckPhoneNumberEmail({ ...checkPhoneNumberEmail, check: false });
            } else {
                setCheckPhoneNumberEmail({
                    ...checkPhoneNumberEmail,
                    check: true,
                    title: messagePhoneEmail[0],
                });
            }
        } else if (valuePhoneNumberEmail.value === '') {
            setCheckAll({ ...checkAll, phoneNumberEmail: true });
            setValuePhoneNumberEmail({ value: '', icon: '' });
            setCheckPhoneNumberEmail({ check: false, title: '' });
        } else {
            if (valuePhoneNumberEmail.value.length <= 11 && valuePhoneNumberEmail.value.length >= 9) {
                setCheckPhoneNumberEmail({ check: false, title: '' });
            } else {
                setCheckPhoneNumberEmail({ check: true, title: messagePhoneEmail[1] });
            }
            setValuePhoneNumberEmail({ ...valuePhoneNumberEmail, icon: <PhoneI /> });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleValueUserName = (e: { target: { value: string } }) => {
        checkAllRef.current.username = false;
        if (e.target.value.length <= 30) setValueUserName(e.target.value);
        if (e.target.value.length >= 30 || e.target.value.length < 1) {
            setCheckUserName({ title: messageName, check: true });
        } else {
            setCheckUserName({ title: '', check: false });
        }
        setCheckAll({ ...checkAllRef.current });
    };

    const handleValuePassword1 = (e: { target: any }) => {
        if (e.target.value) {
            setShowPass1({ ...showPass1, icon: true });
        } else {
            setShowPass1({ ...showPass1, icon: false });
        }
        setValuePassword({ ...valuePassword, password1: e.target.value });
        checkAllRef.current.password1 = false;
        if (e.target.value === valuePassword.password2) {
            setCheckPassword({ check: false, icon: '' });
            checkAllRef.current.password2 = false;
        } else {
            setCheckPassword({ check: true, icon: messagePassword });
        }
        setCheckAll({ ...checkAllRef.current });
    };

    const handleValuePassword2 = (e: { target: any }) => {
        setValuePassword({ ...valuePassword, password2: e.target.value });
        setCheckAll({ ...checkAll, password2: false });
        if (e.target.value) {
            setShowPass2({ ...showPass2, icon: true });
        } else {
            setShowPass2({ ...showPass2, icon: false });
        }
        if (e.target.value === valuePassword.password1) {
            setCheckPassword({ check: false, icon: '' });
        } else {
            setCheckPassword({ check: true, icon: messagePassword });
        }
    };

    const handleBirthDate = (e: { target: any }) => {
        const date = e.target.value.includes('/', 1);
        const month = e.target.value.includes('/', 3);
        const year = new Date().getUTCFullYear();

        setValueDate(e.target.value);
        if (
            date &&
            month &&
            isNaN(e.target.value[2]) &&
            isNaN(e.target.value[5]) &&
            !isNaN(e.target.value[0]) &&
            !isNaN(e.target.value[1]) &&
            !isNaN(e.target.value[3]) &&
            !isNaN(e.target.value[4]) &&
            !isNaN(e.target.value[6]) &&
            !isNaN(e.target.value[7]) &&
            !isNaN(e.target.value[8]) &&
            !isNaN(e.target.value[9]) &&
            e.target.value.length < 11
        ) {
            if (
                e.target.value.slice(0, 2) <= 31 &&
                e.target.value.slice(0, 2) > 0 &&
                e.target.value.slice(3, 5) <= 12 &&
                e.target.value.slice(3, 5) > 0 &&
                e.target.value.slice(6, 10) <= year &&
                e.target.value.slice(6, 10) >= 1500
            ) {
                setCheckDate({ check: false, icon: '' });
            } else {
                setCheckDate({ check: true, icon: messageDate });
            }
        } else if (e.target.value === '') {
            setCheckDate({ check: false, icon: '' });
        } else {
            setCheckDate({ check: true, icon: messageDate });
        }
        checkAllRef.current.date = false;
        setCheckAll({ ...checkAllRef.current });
    };

    const handleSubmit = async (e: { preventDefault: () => void; target: any }) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (
            valueUserName !== '' &&
            valuePhoneNumberEmail.value !== '' &&
            valuePassword.password1 !== '' &&
            valueDate !== ''
        ) {
            setCheckAll({ username: false, phoneNumberEmail: false, password1: false, password2: false, date: false });
            if (
                checkPhoneNumberEmail.check === false &&
                checkPassword.check === false &&
                checkDate.check === false &&
                checkUserName.check === false
            ) {
                delete valuePhoneNumberEmail.icon;
                const params = {
                    name: valueUserName,
                    phoneMail: valuePhoneNumberEmail.value,
                    password: valuePassword.password1,
                    gender: valueGender,
                    date: valueDate,
                };
                const data = await authHttpRequest.postRegister(params);
                if (data.status === 9999) dispatch(setTrueErrorServer(''));
                if (data.check === 2) setRegisterStatus({ title: data.result, status: true });
                setAccs(data.acc);
                if (data.check === 1) {
                    setRegisterStatus({ title: data.result, status: false });
                } else if (data.check === 3) {
                    setRegisterStatus({ title: data.result, status: true });
                }
            }
        } else if (
            valueUserName === '' &&
            valuePhoneNumberEmail.value === '' &&
            valuePassword.password1 === '' &&
            valuePassword.password2 === '' &&
            valueDate === ''
        ) {
            setCheckAll({ username: true, phoneNumberEmail: true, password1: true, password2: true, date: true });
        }
        checkAllRef.current.username = !valueUserName ? true : false;
        checkAllRef.current.password1 = !valuePassword.password1 ? true : false;
        checkAllRef.current.password2 = !valuePassword.password2 ? true : false;
        checkAllRef.current.phoneNumberEmail = !valuePhoneNumberEmail.value ? true : false;
        checkAllRef.current.date = !valueDate ? true : false;
        setCheckAll({ ...checkAllRef.current });
    };

    const handleValueMale = () => {
        setValueGender(0);
    };
    const handleValueFemale = () => {
        setValueGender(1);
    };
    const handleValueOther = () => {
        setValueGender(2);
    };

    //input
    const handlePhoneNumberEmail = () => {};
    const eventsOnChange = [
        handleValueUserName,
        handlePhoneNumberEmail,
        handleValuePassword1,
        handleValuePassword2,
        handleBirthDate,
        handleBirthDate,
    ];
    const colorInput = (id: number) => {
        const colorInputs = [
            checkAll.username,
            checkAll.phoneNumberEmail,
            checkAll.password1,
            checkAll.password2,
            '',
            checkAll.date,
        ];
        return colorInputs[id] ? 'rgb(255 97 97 / 83%)' : '';
    };
    const handlelanguage = () => {
        setLanguage(!language);
    };
    const optionGender = [valueGender === 0, valueGender === 1, valueGender === 2];
    const eventsOnClickGender = [handleValueMale, handleValueFemale];

    const error = (val: string | undefined) => {
        return (
            <>
                {val === 'name' && <PcontentPassword>{checkUserName.title}</PcontentPassword>}
                {val === 'password2' && <PcontentPassword>{checkPassword.icon}</PcontentPassword>}
                {val === 'phoneEmail' && (
                    <>
                        <SpanIconPhoneMail>{valuePhoneNumberEmail.icon}</SpanIconPhoneMail>
                        <Pcontent>{checkPhoneNumberEmail.title}</Pcontent>
                    </>
                )}
                {val === 'date' && <Pcontent>{checkDate.icon}</Pcontent>}
            </>
        );
    };
    const value = [
        valueUserName,
        valuePhoneNumberEmail.value,
        valuePassword.password1,
        valuePassword.password2,
        valueDate,
    ];
    const pass = [];
    return (
        <DivForm>
            <Htitle>
                {title}
                {Next}
                <P>{accs} / 2</P>
            </Htitle>
            <DivLanguage onClick={handlelanguage}>
                <Language change={dispatch} language={language} changeLanguage={changeRegister} />
            </DivLanguage>
            <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                {input.map((val) => {
                    if (val.id === 4) {
                        return (
                            <DivFormGroup key={val.id}>
                                <DivGenderP>
                                    {val.gender?.map((valC) => {
                                        return valC.id !== 2 ? (
                                            <DivGenderC
                                                key={valC.id}
                                                color={optionGender[valC.id] ? 'rgb(99, 99, 99)' : ''}
                                                onClick={eventsOnClickGender[valC.id]}
                                            >
                                                {valC.type}
                                            </DivGenderC>
                                        ) : (
                                            <div key={valC.id}>
                                                <DivLGBT
                                                    key={valC.id}
                                                    color={optionGender[valC.id] ? 'rgb(99, 99, 99)' : ''}
                                                    onClick={handleValueOther}
                                                >
                                                    {valC.type}
                                                    <p>
                                                        <LGBTI />
                                                    </p>
                                                </DivLGBT>
                                            </div>
                                        );
                                    })}
                                </DivGenderP>
                            </DivFormGroup>
                        );
                    }
                    return (
                        <DivFormGroup key={val.id}>
                            <Input
                                color={colorInput(val.id)}
                                value={value[val.id]}
                                type={
                                    Array.isArray(val.type)
                                        ? val.type[val.role === 'password1' ? showPass1.check : showPass2.check]
                                        : val.type
                                }
                                placeholder={val.placeholder}
                                onChange={eventsOnChange[val.id]}
                            />
                            {val.role === 'password1' && (
                                <Eyes
                                    setShow={setShowPass1}
                                    show={showPass1}
                                    top="15px"
                                    value={valuePassword[val.role]}
                                />
                            )}
                            {val.role === 'password2' && (
                                <Eyes
                                    setShow={setShowPass2}
                                    show={showPass2}
                                    top="15px"
                                    value={valuePassword[val.role]}
                                />
                            )}
                            {error(val.role)}
                        </DivFormGroup>
                    );
                })}
                <ButtonSubmit title={submit} />
                <Pmessage color={registerStatus.status ? '#fa5f5f' : 'rgb(102 239 120)'}>
                    {registerStatus.title}
                </Pmessage>
            </form>
        </DivForm>
    );
};

export default Register;
