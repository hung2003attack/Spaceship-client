import { useState } from 'react';
import Login, { PropsLogin } from './Login/Login';
import Register, { PropsRegister } from './Register/Register';
import styled from 'styled-components';

const DivBackground = styled.div`
    width: 100%;
    height: 900px;
    background: #202124;
    @media (min-width: 600px) {
        height: 100%;
        position: fixed;
    }
`;
const Authentication: React.FC<{ dataLogin: PropsLogin; dataRegister: PropsRegister }> = ({
    dataLogin,
    dataRegister,
}) => {
    const [transfer, setTransfer] = useState<boolean>(false);

    return (
        <>
            <DivBackground>
                {transfer ? (
                    <Register setTransfer={setTransfer} transfer={transfer} dataRegister={dataRegister} />
                ) : (
                    <Login transfer={transfer} setTransfer={setTransfer} data={dataLogin} />
                )}
            </DivBackground>
        </>
    );
};
export default Authentication;
