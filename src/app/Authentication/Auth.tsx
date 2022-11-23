import { ReactNode, useState } from 'react';
import Login, { PropsLogin } from './Login/Login';
import Register from './Register/Register';

import styled from 'styled-components';
import { UndoIRegister } from '~/assets/Icons/Icons';
import Verify from './Verify/Verify';
import { PropsRegisterLanguage } from './Register/interfaceType';
import ChangePassword from './ChangePassword/ChangePassword';
const DivBackground = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background: #202124;
    overflow-y: overlay;
`;
export const Pnext = styled.p`
    font-size: 2rem;
    color: white;
    cursor: var(--pointer);
    position: absolute;
    top: 3px;
    display: flex;
`;
const Authentication: React.FC<{ dataLogin: PropsLogin; dataRegister: PropsRegisterLanguage }> = ({
    dataLogin,
    dataRegister,
}) => {
    const [transfer, setTransfer] = useState<boolean>(false);
    const [enable, setEnable] = useState<boolean>(false);
    const [account, setAccount] = useState<string | number>('');
    const [whatKind, setWhatKind] = useState<string>('');
    const Next: ReactNode = (
        <Pnext
            onClick={() => {
                setTransfer(false);
                setEnable(false);
                setWhatKind('');
            }}
        >
            <UndoIRegister />
        </Pnext>
    );

    const Element = () => {
        if (whatKind === 'register') {
            if (enable) return <Register dataRegister={dataRegister} account={account} Next={Next} />;
            return <Verify setEnable={setEnable} setAccount={setAccount} Next={Next} />;
        } else if (whatKind === 'changePassword') {
            if (enable) return <ChangePassword phoneMail={account} Next={Next} />;
            return <Verify setEnable={setEnable} setAccount={setAccount} Next={Next} />;
        } else {
            return <Login data={dataLogin} setWhatKind={setWhatKind} />;
        }
    };
    return (
        <>
            <DivBackground>
                <>{Element()}</>
            </DivBackground>
        </>
    );
};
export default Authentication;
