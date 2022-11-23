import { DivChangePass } from './styleChangePassword';
import { DivAccount } from '../Login/styleLogin';
import { ButtonSubmit, DivContainer, DivUserBar, Htitle } from '~/reUsingComponents/styleComponents/styleComponents';
import Eyes from '~/reUsingComponents/Eys/Eye';
import { ReactNode, useRef, useState, useEffect } from 'react';
import { Button, Input } from '~/reUsingComponents/styleComponents/styleDefault';
import { Pcontent } from '../Register/styleRegister';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';
import UserBar from '~/reUsingComponents/Avatars&Edeter/Avatar';
import TagProfle from '~/reUsingComponents/TagProfile/TagProfle';
import authHttpRequest from '~/restAPI/requestServers/authHttpRequest';
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
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (value1 && value2) {
            if (!checkValue.value1 && !checkValue.value2) {
                if (value1 === value2) {
                    console.log('ok');
                } else {
                    setCheckValue({ ...checkValue, value2: true, message: 'The Password is incorrect!' });
                }
            }
        }

        messageRef.current.value1 = !value1 ? true : false;
        messageRef.current.value2 = !value2 ? true : false;

        setCheckValue({ ...messageRef.current, message: checkValue.message });
    };
    useEffect(() => {
        const get = async () => {
            const params = { phoneMail };
            const res = await authHttpRequest.getUser(params);
            if (res?.status === 200 && res.data.status === 1) setDataAccount(res.data.user);
            console.log(res);

            // window.location.reload();
        };
        get();
    }, []);
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <DivChangePass>
                    <Htitle>Change Password</Htitle>
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
                        <Pcontent>{checkValue.message}</Pcontent>
                        <Eyes value={value2} setShow={setShow2} show={show2} top="73px" />
                    </DivAccount>
                    <ButtonSubmit>Change</ButtonSubmit>
                    {Next}
                </DivChangePass>
            </form>
            <DivContainer>
                {dataAccount?.map((data) => (
                    <TagProfle data={data} key={data.id} />
                ))}
            </DivContainer>
        </>
    );
};
export default ChangePassword;
