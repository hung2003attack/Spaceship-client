import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './register.module.scss';
import { CheckI, CloseI, EmailI, LGBTI, PhoneI, UndoIRegister } from '~/assets/Icons/Icons';
import Images from '~/assets/images';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import Authentication from '~/restAPI/requestGetDate/auth';
import { useNavigate } from 'react-router-dom';
import { Input } from '~/reUsingComponents/styleComponents/styleComponents';
interface Rgt {
    setTransfer: any;
    transfer: boolean;
}
const Register: React.FC<Rgt> = ({ setTransfer, transfer }) => {
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
    const [valueGender, setValueGender] = useState<number | null>(null);
    const [valueDate, setValueDate] = useState<string>('');

    //check

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
                    icon: 'Email không hợp lệ.',
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
                setCheckPhoneNumberEmail({ check: true, icon: '', title: 'số điện thoại phải từ 9 - 11 ký tự số.' });
            }
            setPhoneNumberEmail({ value: e.target.value, icon: <PhoneI /> });
        }
    };

    const handleValuePassword1 = (e: { target: any }) => {
        setValuePassword({ ...valuePassword, password1: e.target.value });
        setCheckAll({ ...checkAll, password1: false });
        if (e.target.value !== valuePassword.password2 && e.target.value !== '') {
            setCheckPassword({ check: true, icon: 'password không đúng.' });
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
            setCheckPassword({ check: true, icon: 'password không đúng.' });
        } else if (e.target.value === '') {
            setCheckPassword({ check: false, icon: '' });
            setCheckAll({ ...checkAll, password2: true });
        } else {
            setCheckPassword({ check: false, icon: '' });
        }
        setCheckAll({ ...checkAll, password2: false });
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
    const handleBirthDate = (e: { target: any }) => {
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
                setCheckDate({ check: true, icon: 'Ngày sinh không hợp lệ.' });
            }
        } else if (e.target.value === '') {
            setCheckDate({ check: false, icon: '' });
            setCheckAll({ ...checkAll, date: true });
        } else {
            setCheckDate({ check: true, icon: 'Ngày sinh không hợp lệ.' });
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
            if (checkPhoneNumberEmail.check === false && checkPassword.check === false && checkDate.check === false) {
                delete valuePhoneNumberEmail.icon;
                delete valuePassword.password2;
                console.log(valueUserName, valuePhoneNumberEmail, valuePassword, valueGender, valueDate);
                await Authentication.register(
                    valueUserName,
                    valuePhoneNumberEmail.value,
                    valuePassword.password1,
                    valueGender,
                    valueDate,

                    dispatch,
                );
                setTransfer(!transfer);
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
        if (!valueUserName) {
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

    return (
        <div className={clsx(styles.formRegister)}>
            <p className={clsx(styles.title)}>Register</p>

            <form onSubmit={handleSubmit}>
                <div className={clsx(styles.formGroup)}>
                    <Input
                        color={clsx(checkAll.username ? 'true' : 'false')}
                        type="text"
                        placeholder="your name"
                        name="fullName"
                        onChange={(e) => {
                            setValueUserName(e.target.value);
                            if (e.target.value === '') {
                                setCheckAll({ ...checkAll, username: true });
                            } else {
                                setCheckAll({ ...checkAll, username: false });
                            }
                        }}
                    />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <Input
                        color={clsx(checkAll.phoneNumberEmail ? 'true' : 'false')}
                        type="text"
                        placeholder="email or phone number"
                        name="PhoneNumberEmail"
                        onChange={handlePhoneNumberEmail}
                    />
                    <span className={clsx(styles.phoneEmailI)}>{valuePhoneNumberEmail.icon}</span>
                    <p
                        className={clsx({
                            [styles.checkInvalid]: checkPhoneNumberEmail.check || checkPhoneNumberEmail.title,
                        })}
                    >
                        {checkPhoneNumberEmail.icon || checkPhoneNumberEmail.title}
                    </p>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <div className={clsx(styles.password)}>
                        <Input
                            color={clsx(checkAll.password1 ? 'true' : 'false')}
                            type="text"
                            placeholder="password"
                            name="Password"
                            onChange={handleValuePassword1}
                        />
                        <Input
                            color={clsx(checkAll.password2 ? 'true' : 'false')}
                            type="text"
                            placeholder="please re-enter password"
                            onChange={handleValuePassword2}
                        />
                    </div>
                    <p
                        className={clsx({
                            [styles.checkInvalidP]: checkPassword.check,
                        })}
                    >
                        {checkPassword.icon}
                    </p>
                </div>{' '}
                <div className={clsx(styles.formGroup)}>
                    <div className={clsx(styles.gender)}>
                        <div
                            className={clsx(styles.male, { [styles.option]: valueGender === 0 })}
                            onClick={handleValueMale}
                        >
                            Male
                        </div>

                        <div
                            className={clsx(styles.female, { [styles.option]: valueGender === 1 })}
                            onClick={handleValueFemale}
                        >
                            Female
                        </div>
                    </div>
                    <div
                        className={clsx(styles.lgbt, { [styles.option]: valueGender === 2 })}
                        onClick={handleValueOther}
                    >
                        <p>LGBT+</p>
                        <p>
                            <LGBTI />
                        </p>
                    </div>
                    <Hovertitle
                        anyTags="div"
                        title="let's be confident, Life's ours, whoever you are or what do you, then let's live your way "
                        Tags="img"
                        src={Images.lgbt}
                        alt="LGBT+ or LGBTQ+"
                        logoLGBTCL
                        lgbtTitleCL
                    />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <Input
                        color={clsx(checkAll.date ? 'true' : 'false')}
                        type="text"
                        placeholder="BirthDate       DD / MM / YY"
                        onChange={handleBirthDate}
                        name="birtDate"
                    />
                    <p
                        className={clsx({
                            [styles.checkInvalid]: checkDate.check,
                            [styles.checkValid]: !checkDate.check,
                        })}
                    >
                        {checkDate.icon}
                    </p>
                </div>
                <button className={clsx(styles.btnSubmit)}>
                    Register
                    <p className={clsx(styles.undo)} onClick={() => setTransfer(!transfer)}>
                        <UndoIRegister />
                    </p>
                </button>
            </form>
        </div>
    );
};

export default Register;
