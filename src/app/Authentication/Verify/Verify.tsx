import { ReactNode, SetStateAction, useEffect, useState } from 'react';

import authHttpRequest from '~/restAPI/requestServers/authHttpRequest';

import { Htitle } from '~/reUsingComponents/styleComponents/styleComponents';
import { EmailI, LoadingI, PhoneI, SendOPTI, ResTartI, UndoIRegister } from '~/assets/Icons/Icons';
import { DivExpireTime, DivLoading, DivOtp, DivReSend, DivSendMail, DivVerifymail, Form } from './styleVerify';
import { Pcontent, SpanIconPhoneMail } from '../Register/styleRegister';
import { Button, Input } from '~/reUsingComponents/styleComponents/styleDefault';
interface PropsVerify {
    setEnable: React.Dispatch<SetStateAction<boolean>>;
    setAccount: React.Dispatch<React.SetStateAction<string | number>>;
    Next: ReactNode;
}
const Verify: React.FC<PropsVerify> = ({ setEnable, setAccount, Next }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [otpStatus, setOtpStatus] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>('');
    const [otpTime, setOtpTime] = useState<number>(61);
    const [error, setError] = useState<{ mail: string; otp: string }>({ mail: '', otp: '' });
    const [valuePhoneNumberEmail, setPhoneNumberEmail] = useState<{
        value: string;
        icon?: string | React.ReactElement;
    }>({ value: '', icon: '' });

    const [checkPhoneNumberEmail, setCheckPhoneNumberEmail] = useState<{
        check: boolean;
        title: string;
    }>({ check: false, title: '' });

    const handlePhoneNumberEmail = (e: { target: any }) => {
        if (isNaN(e.target.value)) {
            const validateEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,5})+$/;
            setPhoneNumberEmail({ value: e.target.value, icon: <EmailI /> });

            if (validateEmail.test(e.target.value) === true) {
                setCheckPhoneNumberEmail({ title: '', check: false });
            } else {
                setCheckPhoneNumberEmail({
                    check: false,
                    title: 'Email Invalid',
                });
            }
        } else if (e.target.value === '') {
            setPhoneNumberEmail({ value: '', icon: '' });
            setCheckPhoneNumberEmail({ check: false, title: '' });
        } else {
            if (e.target.value.length <= 11 && e.target.value.length >= 9) {
                setCheckPhoneNumberEmail({ check: false, title: '' });
            } else {
                setCheckPhoneNumberEmail({ check: false, title: 'Phone Number must 9 - 11 characters. ' });
            }
            setPhoneNumberEmail({ value: e.target.value, icon: <PhoneI /> });
        }
    };

    const handleInputOtp = (e: { target: { value: string } }) => {
        if (!isNaN(Number(e.target.value))) {
            if (e.target.value.length >= 0 && e.target.value.length < 7) {
                setOtp(e.target.value);
            }
        }
    };
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setError({ otp: '', mail: '' });

        if (!otpStatus) {
            if (!checkPhoneNumberEmail.check && valuePhoneNumberEmail.value) {
                const params = {
                    phoneMail: valuePhoneNumberEmail.value,
                };
                setLoading(true);
                const res = await authHttpRequest.postSendOTP(params);
                console.log('prohibit', res);

                setLoading(false);
                if (res?.status === 200 && res.data?.status === 1) {
                    setError({ otp: '', mail: '' });

                    setAccount(valuePhoneNumberEmail.value);
                    setOtpStatus(true);
                    setOtpTime(60);
                } else {
                    setError({ ...error, mail: res?.data.message });
                }
            }
            if (!valuePhoneNumberEmail.value)
                setCheckPhoneNumberEmail({ check: true, title: 'Please Enter your data!' });
        } else {
            if (otp.length === 6) {
                const params = {
                    phoneMail: valuePhoneNumberEmail.value,
                    otp: otp,
                };
                const res = await authHttpRequest.postVerifyOTP(params);
                console.log('wrong', res);

                if (res?.status === 200 && res?.data?.status === 1) {
                    setError({ otp: '', mail: '' });
                    setEnable(true);
                    setOtpStatus(false);
                    setOtpTime(0);
                } else {
                    setError({ ...error, otp: res?.data.message });
                }
            }
        }
    };
    // async check the email
    useEffect(() => {
        if (otpStatus) {
            if (otpTime === 0) {
                // setOtpStatus(false);
                return;
            }
            const time = setInterval(() => {
                setOtpTime((pre) => pre - 1);
            }, 1000);
            return () => clearInterval(time);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otpTime]);
    console.log(otpTime, otpStatus);
    const insertOTP = () => {
        if (otpStatus) {
            return (
                <DivOtp>
                    <DivExpireTime>Code expires in {otpTime} seconds!</DivExpireTime>
                    <Input placeholder="Enter your OTP." onChange={handleInputOtp} value={otp} />
                    <Pcontent>{error.otp}</Pcontent>
                    {otpStatus && btnSubmit().Div2()}
                    {btnSubmit().Div1()}
                </DivOtp>
            );
        }
    };
    const handleReSend = () => {
        setOtpStatus(false);
    };
    const btnSubmit = () => {
        const css1 = `
                padding: 0 15px;
                margin: 25px auto 0;
           `;
        const btn: any = {
            Div1: () => {
                if (otpStatus) {
                    return <DivReSend onClick={handleReSend}>Resend</DivReSend>;
                } else if (!loading) {
                    return btn.Div2();
                }
            },
            Div2: () => (
                <Button size="2.2rem" css={css1}>
                    <SendOPTI />
                </Button>
            ),
        };
        return btn;
    };
    console.log(error);

    return (
        <Form action="" onSubmit={handleSubmit}>
            <DivVerifymail>
                <Htitle>
                    Verify Email
                    {Next}
                </Htitle>
                <DivSendMail>
                    <Input
                        placeholder="Your Email"
                        onChange={handlePhoneNumberEmail}
                        color={checkPhoneNumberEmail.check ? 'rgb(255 97 97 / 83%)' : ''}
                    />

                    <Pcontent>{error.mail}</Pcontent>
                    <SpanIconPhoneMail right="11px">{valuePhoneNumberEmail.icon}</SpanIconPhoneMail>
                    <Pcontent>{checkPhoneNumberEmail.title}</Pcontent>
                </DivSendMail>
                {!otpStatus && btnSubmit().Div1()}
            </DivVerifymail>

            {loading && (
                <DivLoading>
                    <LoadingI />
                </DivLoading>
            )}
            {insertOTP()}
        </Form>
    );
};
export default Verify;
