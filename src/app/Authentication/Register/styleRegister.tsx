import styled from 'styled-components';
export const DivForm = styled.div`
    width: 400px;
    height: auto;
    margin: auto;
    flex-wrap: wrap;
    padding: 10px;
    text-align: center;
    position: relative;
    box-shadow: 0 0 20px #0a0a0a;
    background-image: linear-gradient(345deg, #7474740a, #00000021);
    @media (max-width: 400px) {
        max-width: 320px;
    }
`;

export const DivFormGroup = styled.div`
    width: 100%;
    margin: 10px 0;
    position: relative;
`;
export const PcontentPassword = styled.p`
    color: rgb(255, 142, 142);
    font-size: 1.2rem;
    width: 100%;
`;
export const Pcontent = styled.p`
    width: 100%;
    font-size: 1.1rem;
    text-align: left;
    color: rgb(255, 142, 142);
    font-family: 'Arima', sans-serif;
`;
export const SpanIconPhoneMail = styled.span`
    right: ${(props: { right?: string }) => props.right || '12px'};
    top: 13px;
    font-size: 2.5rem;
    position: absolute;
    color: #aeaeae;
`;
export const PcheckPhoneMail = styled.p`
    color: rgb(255, 142, 142);
    font-size: 1.2rem;
    width: 130px;
    margin: 0 0px 0 188px;
`;
export const DivGenderP = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
export const DivGenderC = styled.div`
    width: 189px;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 1.5rem;
    border: 1px solid #8686869e;
    color: #fff;
    cursor: pointer;
    background-color: ${(props) => props.color};
    &:hover {
        background-color: rgb(99, 99, 99);
    }
`;
export const DivLGBT = styled(DivGenderC)`
    margin-top: 10px;
    justify-content: space-evenly;
    border-radius: 5px;
    p {
        display: flex;
        color: var(--color-light);
    }
    &:hover {
        background-color: rgb(99, 99, 99);
    }
`;
export const Pmessage = styled.p`
    color: ${(props) => props.color};
    font-size: 1.3rem;
`;
