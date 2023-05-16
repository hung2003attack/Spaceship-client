/* eslint-disable array-callback-return */
import { DivChangePass } from './styleChangePassword';
import { DivAccount } from '../Login/styleLogin';
import { ButtonSubmit, DivContainer, Hname, Htitle } from '~/reUsingComponents/styleComponents/styleComponents';
import Eyes from '~/reUsingComponents/Eys/Eye';
import { ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import { Div, Img, Input, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { Pmessage } from '../Register/styleRegister';
import TagProfle from '~/social_network/components/Header/layout/MakingFriends/TagProfle';
import accountRequest from '~/restAPI/requestServers/accountRequest/accountRequest';
import { useSelector } from 'react-redux';
import { PropsBg } from 'src/mainPage/nextWeb';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
interface PropsChangeP {
    Next: ReactNode;
    phoneMail: string | number;
}
const ChangePassword: React.FC<PropsChangeP> = ({ phoneMail, Next }) => {
    const [dataAccount, setDataAccount] = useState<
        {
            id: string;
            fullName: string;
            nickName: string | undefined;
            avatar: string | undefined;
            gender: number;
        }[]
    >();
    const [id, setId] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState<{ status: boolean; message: string }>({
        status: false,
        message: '',
    });
    const [success, setSuccess] = useState<boolean>(false);
    const [show1, setShow1] = useState<{ icon: boolean; check: number }>({ icon: false, check: 1 });
    const [show2, setShow2] = useState<{ icon: boolean; check: number }>({ icon: false, check: 1 });
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');

    const valueRef = useRef<{ value1: boolean; value2: boolean }>({
        value1: false,
        value2: false,
    });
    const messageRef = useRef<{ value1: boolean; value2: boolean }>({ value1: false, value2: false });
    const [checkValue, setCheckValue] = useState<{ value1: boolean; value2: boolean; message: string }>({
        value1: false,
        value2: false,
        message: '',
    });
    const handleInputChangeP1 = (e: { target: { value: string } }) => {
        setValue1(e.target.value);
        valueRef.current.value1 = false;
        if (e.target.value) {
            setShow1({ ...show1, icon: true });
        } else {
            setShow1({ ...show1, icon: false });
        }
        if (e.target.value === value2) {
            console.log('sdw');
            setCheckValue({ value1: valueRef.current.value1, value2: false, message: '' });
        } else {
            setCheckValue({
                value1: valueRef.current.value1,
                value2: false,
                message: 'The Password is Incorrect!',
            });
        }
    };
    const handleInputChangeP2 = (e: { target: { value: string } }) => {
        setValue2(e.target.value);
        valueRef.current.value2 = false;
        setShow2({ ...show2, icon: true });
        if (e.target.value === value1) {
            setCheckValue({ ...checkValue, value2: valueRef.current.value2, message: '' });
        } else {
            setCheckValue({ ...checkValue, value2: valueRef.current.value2, message: 'The Password is Incorrect!' });
        }
        if (e.target.value === '') {
            setShow2({ ...show2, icon: false });
        }
    };
    const type = ['text', 'password'];
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!success) {
            if (value1 && value2) {
                if (!checkValue.value1 && !checkValue.value2) {
                    if (value1.length > 5) {
                        if (value1 === value2) {
                            console.log('ok');
                            const params = {
                                id,
                                password: value1,
                            };
                            const res = await accountRequest.changePassword(params);
                            console.log(res);

                            if (res?.status === 1 || res?.status === 3) {
                                if (res?.status === 1) setSuccess(true);
                                setMessageStatus({ status: res.status === 1 ? true : false, message: res.message });
                            } else {
                                window.location.reload();
                            }
                        } else {
                            setCheckValue({ ...checkValue, value2: true, message: 'The Password is incorrect!' });
                        }
                    } else {
                        console.log('sd');

                        setCheckValue({
                            ...checkValue,
                            message: 'The length Password must than 6 character!',
                        });
                    }
                }
            }

            messageRef.current.value1 = !value1 ? true : false;
            messageRef.current.value2 = !value2 ? true : false;

            const mes = value1.length > 5 ? '' : 'The length Password must than 6 character!';
            setCheckValue({ ...messageRef.current, message: mes || checkValue.message });
        }
    };
    console.log(checkValue);

    useEffect(() => {
        const get = async () => {
            const params = { phoneMail: phoneMail };
            const res: any = await accountRequest.getPhoneMail(params);
            const { status, data } = res;
            if (status === 200 && data.status === 1) return setDataAccount(data.user);
            window.location.reload();
        };
        get();
    }, []);
    const handleChangePass = useCallback((id: string) => {
        setId(id);
    }, []);
    useEffect(() => {
        if (success) {
            const time = setTimeout(() => {
                window.location.reload();
            }, 2000);
            return () => clearTimeout(time);
        }
    }, [success]);
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <DivChangePass>
                    <Htitle>Change Password</Htitle>
                    {dataAccount?.map((data) => {
                        if (data.id === id)
                            return (
                                <div key={data.id}>
                                    <Div>
                                        <Div
                                            wrap="wrap"
                                            css="width: 183px; height: 150px; margin: 5px 15px; justify-content: center; color: #cbcbcb;background-color: #454646;"
                                        >
                                            <Avatar
                                                css="width: 100px; height: 100px;"
                                                src={data.avatar}
                                                alt={data.fullName}
                                                gender={data.gender}
                                                onClick={handleChangePass}
                                            />
                                            <Div width="100%">
                                                <Hname>{data.fullName}</Hname>
                                                <P>{data.nickName}</P>
                                            </Div>
                                        </Div>
                                    </Div>
                                    <DivAccount>
                                        <Input
                                            type={type[show1.check]}
                                            placeholder="Enter New Password"
                                            onChange={handleInputChangeP1}
                                            color={checkValue.value1 ? 'rgb(255 97 97 / 83%)' : ''}
                                        />
                                        <Eyes value={value1} setShow={setShow1} show={show1} top="15px" />
                                        <Input
                                            type={type[show2.check]}
                                            placeholder="Enter Repeat New Password"
                                            onChange={handleInputChangeP2}
                                            color={checkValue.value2 ? 'rgb(255 97 97 / 83%)' : ''}
                                        />
                                        <Pmessage
                                            color={messageStatus.status ? ' rgb(124, 245, 122)' : 'rgb(255, 142, 142)'}
                                        >
                                            {checkValue.message || messageStatus.message}
                                        </Pmessage>
                                        <Eyes value={value2} setShow={setShow2} show={show2} top="73px" />
                                    </DivAccount>
                                    <ButtonSubmit title="Change" />
                                </div>
                            );
                    })}
                    {Next}
                </DivChangePass>
            </form>

            <Div css="justify-content: center; margin: auto">
                {dataAccount?.map((data) => (
                    <Div
                        key={data.id}
                        wrap="wrap"
                        css="width: 183px; height: 150px;margin: 5px 15px; cursor: pointer; text-align: center; justify-content: center; color: #cbcbcb;background-color: #454646;"
                        onClick={() => handleChangePass(data.id)}
                    >
                        <Avatar
                            css="width: 100px; height: 100px;"
                            src={data.avatar}
                            alt={data.fullName}
                            gender={data.gender}
                        />
                        <Div width="100%">
                            <Hname>{data.fullName}</Hname>
                            <P>{data.nickName}</P>
                        </Div>
                    </Div>
                    // <TagProfle
                    //     cssImage="width: 100px"
                    //     data={data}
                    //     key={data.id}
                    //     onClick={handleChangePass}
                    //     button={[
                    //         { text: 'Hide', css: '' },
                    //         { text: 'Show', css: 't' },
                    //     ]}
                    //     margin="5px"
                    //     bg="#595959e0"
                    // />
                ))}
            </Div>
        </>
    );
};
export default ChangePassword;
