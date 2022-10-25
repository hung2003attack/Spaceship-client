import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmailI, LGBTI, PhoneI, UndoIRegister } from '~/assets/Icons/Icons';
import Images from '~/assets/images';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import { Input, TitleAuth } from '~/reUsingComponents/styleComponents/styleComponents';
import {
    DivForm,
    DivFormGroup,
    DivGenderC,
    DivGenderP,
    DivLGBT,
    PcontentPassword,
    Pcontent,
    PnextLogin,
    SpanIconPhoneMail,
    Pmessage,
} from './styleRegister';
import Language from 'src/Language/Language';
import { changeRegister } from '~/redux/languageRD';
import { ButtonSubmit, DivLanguage } from '../Login/styleLogin';
import Authentication from '~/restAPI/requestGetDate/auth';

export interface PropsRegister {
    [VN: string]: {
        title: string;
        input: {
            id: number;
            type?: string;
            gender?: {
                id: number;
                type: string;
            }[];
            placeholder?: string;
            role?: string;
        }[];
        submit: string;
        messagePhoneEmail: string[];
        messagePassword: string;
        messageDate: string;
        messageName: string;
    };
    EN: {
        title: string;
        input: {
            id: number;
            type?: string;
            gender?: {
                id: number;
                type: string;
            }[];
            placeholder?: string;
            role?: string;
        }[];
        submit: string;
        messagePhoneEmail: string[];
        messagePassword: string;
        messageDate: string;
        messageName: string;
    };
}
interface PropsState {
    language: {
        register: string;
    };
}
const Register: React.FC<{
    setTransfer: React.Dispatch<React.SetStateAction<boolean>>;
    transfer: boolean;
    dataRegister: PropsRegister;
}> = ({ setTransfer, transfer, dataRegister }) => {
    //dataLanguage
    const dataLanguages = useSelector((state: PropsState) => state.language?.register);

    const [language, setLanguage] = useState<boolean>(false);
    const { title, input, submit, messagePhoneEmail, messagePassword, messageDate, messageName } =
        dataRegister[dataLanguages];
    console.log(dataRegister[dataLanguages]);

    // const {} = dataRegister;
    const dispatch = useDispatch();
    //value
    const [valueUserName, setValueUserName] = useState<string>('');
    const [valuePhoneNumberEmail, setPhoneNumberEmail] = useState<{
        value: string;
        icon?: string | React.ReactElement;
    }>({ value: '', icon: '' });
    const [valuePassword, setValuePassword] = useState<{ password1: string; password2?: string }>({
        password1: '',
        password2: '',
    });
    console.log('valuePassword', valuePassword);

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
        icon: React.ReactElement | string;
        title: string;
    }>({ check: false, icon: '', title: '' });

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

    const handlePhoneNumberEmail = (e: { target: any }) => {
        setCheckAll({ ...checkAll, phoneNumberEmail: false });
        if (isNaN(e.target.value)) {
            const validateEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,5})+$/;
            setPhoneNumberEmail({ value: e.target.value, icon: <EmailI /> });

            if (validateEmail.test(e.target.value) === true) {
                setCheckPhoneNumberEmail({ ...checkPhoneNumberEmail, check: false, icon: '' });
            } else {
                setCheckPhoneNumberEmail({
                    ...checkPhoneNumberEmail,
                    check: true,
                    icon: messagePhoneEmail[0],
                    title: '',
                });
            }
        } else if (e.target.value === '') {
            setCheckAll({ ...checkAll, phoneNumberEmail: true });
            setPhoneNumberEmail({ value: '', icon: '' });
            setCheckPhoneNumberEmail({ check: false, icon: '', title: '' });
        } else {
            if (e.target.value.length <= 11 && e.target.value.length >= 9) {
                setCheckPhoneNumberEmail({ check: false, icon: '', title: '' });
            } else {
                setCheckPhoneNumberEmail({ check: true, icon: '', title: messagePhoneEmail[1] });
            }
            setPhoneNumberEmail({ value: e.target.value, icon: <PhoneI /> });
        }
    };

    const handleValuePassword1 = (e: { target: any }) => {
        setValuePassword({ ...valuePassword, password1: e.target.value });
        setCheckAll({ ...checkAll, password1: false });
        if (e.target.value !== valuePassword.password2 && e.target.value !== '') {
            setCheckPassword({ check: true, icon: messagePassword });
        } else if (e.target.value === '') {
            setCheckPassword({ check: false, icon: '' });
            setCheckAll({ ...checkAll, password1: true });
        } else if (e.target.value === valuePassword.password2) {
            setCheckPassword({ check: false, icon: '' });
        }
    };

    const handleValuePassword2 = (e: { target: any }) => {
        setValuePassword({ ...valuePassword, password2: e.target.value });
        if (e.target.value !== valuePassword.password1 && e.target.value !== '') {
            setCheckPassword({ check: true, icon: messagePassword });
        } else if (e.target.value === '') {
            setCheckPassword({ check: false, icon: '' });
            setCheckAll({ ...checkAll, password2: true });
        } else {
            setCheckPassword({ check: false, icon: '' });
            setCheckAll({ ...checkAll, password2: false });
        }
    };

    const handleBirthDate = (e: { target: any }) => {
        console.log(e.target.value);

        const date = e.target.value.includes('/', 1);
        const month = e.target.value.includes('/', 3);

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
                e.target.value.slice(3, 5) > 0
            ) {
                setValueDate(e.target.value);
                setCheckDate({ check: false, icon: '' });
            } else {
                setCheckDate({ check: true, icon: messageDate });
            }
        } else if (e.target.value === '') {
            setCheckDate({ check: false, icon: '' });
            setCheckAll({ ...checkAll, date: true });
        } else {
            setCheckDate({ check: true, icon: messageDate });
        }
        if (e.target.value !== '') {
            setCheckAll({ ...checkAll, date: false });
        }
    };

    const handleSubmit = async (e: { preventDefault: any }) => {
        e.preventDefault();
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
                delete valuePassword.password2;
                console.log('value', valueUserName, valuePhoneNumberEmail, valuePassword, valueGender, valueDate);
                const data = await Authentication.register(
                    valueUserName,
                    valuePhoneNumberEmail.value,
                    valuePassword.password1,
                    valueGender,
                    valueDate,
                    dispatch,
                );
                if (data.check === 1) {
                    setRegisterStatus({ title: data.result, status: false });
                    setTransfer(!transfer);
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
        if (!valueUserName || !checkUserName.check) {
            checkAllRef.current.username = true;
        } else {
            checkAllRef.current.username = false;
        }
        if (!valuePassword.password1) {
            checkAllRef.current.password1 = true;
        } else {
            checkAllRef.current.password1 = false;
        }
        if (!valuePassword.password2) {
            console.log('valuePassword.password2', valuePassword.password2);
            checkAllRef.current.password2 = true;
        } else {
            checkAllRef.current.password2 = false;
        }
        if (!valuePhoneNumberEmail.value) {
            checkAllRef.current.phoneNumberEmail = true;
        } else {
            checkAllRef.current.phoneNumberEmail = false;
        }
        if (!valueDate) {
            checkAllRef.current.date = true;
        } else {
            checkAllRef.current.date = false;
        }
        console.log(checkAllRef.current);

        setCheckAll({ ...checkAllRef.current });
    };
    const handleValueUserName = (e: { target: { value: string } }) => {
        setValueUserName(e.target.value);
        if (e.target.value === '' || e.target.value.length >= 30 || e.target.value.length < 1) {
            setCheckUserName({ title: messageName, check: true });
            setCheckAll({ ...checkAll, username: true });
        } else {
            console.log(e.target.value.length, e.target.value.length >= 30);

            setCheckUserName({ title: '', check: false });
            setCheckAll({ ...checkAll, username: false });
        }
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
    const eventsOnChange = [
        handleValueUserName,
        handlePhoneNumberEmail,
        handleValuePassword1,
        handleValuePassword2,
        handleBirthDate,
        handleBirthDate,
    ];
    const colorInput = [
        checkAll.username,
        checkAll.phoneNumberEmail,
        checkAll.password1,
        checkAll.password2,
        '',
        checkAll.date,
    ];
    const handlelanguage = () => {
        setLanguage(!language);
    };
    const optionGender = [valueGender === 0, valueGender === 1, valueGender === 2];
    const eventsOnClickGender = [handleValueMale, handleValueFemale];
    return (
        <DivForm>
            <TitleAuth>{title}</TitleAuth>
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
                                                {/* <Hovertitle
                                                    anyTags="div"
                                                    title="let's be confident, Life's ours, whoever you are or what do you, then let's live your way "
                                                    Tags="img"
                                                    src={Images.lgbt}
                                                    alt="LGBT+ or LGBTQ+"
                                                    logoLGBTCL
                                                    lgbtTitleCL
                                                /> */}
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
                                color={colorInput[val.id] ? 'rgb(255 97 97 / 83%)' : ''}
                                type={val.type}
                                placeholder={val.placeholder}
                                onChange={eventsOnChange[val.id]}
                            />
                            {val.role === 'name' && <PcontentPassword>{checkUserName.title}</PcontentPassword>}
                            {val.role === 'password2' && <PcontentPassword>{checkPassword.icon}</PcontentPassword>}
                            {val.role === 'phoneEmail' && (
                                <>
                                    <SpanIconPhoneMail>{valuePhoneNumberEmail.icon}</SpanIconPhoneMail>
                                    <Pcontent>{checkPhoneNumberEmail.icon || checkPhoneNumberEmail.title}</Pcontent>
                                </>
                            )}
                            {val.role === 'date' && <Pcontent>{checkDate.icon}</Pcontent>}
                        </DivFormGroup>
                    );
                })}
                <PnextLogin onClick={() => setTransfer(!transfer)}>
                    <UndoIRegister />
                </PnextLogin>
                <ButtonSubmit>{submit}</ButtonSubmit>
                <Pmessage color={registerStatus.status ? '#fa5f5f' : 'rgb(102 239 120)'}>
                    {registerStatus.title}
                </Pmessage>
            </form>
        </DivForm>
    );
};

export default Register;
