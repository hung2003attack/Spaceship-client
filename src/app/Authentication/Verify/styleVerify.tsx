import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const DivVerifymail = styled.div`
    width: 300px;
    margin: auto;
    text-align: center;
    @media (min-width: 400px) {
        width: 400px;
    }
`;
export const DivSendMail = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-wrap: wrap;
`;
export const DivOtp = styled.div`
    width: 300px;
    margin: 40px auto;
    border-top: 1px solid #fff;
    padding-top: 55px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    @media (min-width: 400px) {
        width: 400px;
    }
`;
export const DivLoading = styled.div`
    color: #fff;
    width: 100%;
    margin: 30px auto;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    animation: loading 1.5s linear infinite;

    @keyframes loading {
        100% {
            transform: rotate(360deg);
        }
    }
`;
export const DivReSend = styled.div`
    font-size: 1.2rem;
    bottom: 0;
    right: 3.5px;
    box-shadow: 0 0 5px #ffffff6e;
    padding: 1px 8px;
    color: #fff;
    cursor: var(--pointer);
    position: absolute;
    @media (min-width: 400px) {
        font-size: 1.5rem;
    }
`;
export const DivExpireTime = styled.div`
    color: #fff;
    font-family: 'Arima', sans-serif;
`;
