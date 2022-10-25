import styled from 'styled-components';

export const DivDateTime = styled.div`
    width: 200px;
    height: 100px;
    position: relative;
`;

export const P = styled.p`
    width: 100%;
    font-size: 2.5rem;
    font-weight: bold;
    position: absolute;
    font-family: 'Arima', sans-serif;
`;
export const Pdate = styled(P)`
    top: 0;
`;
export const Ptime = styled(P)`
    top: 40px;
`;
export const SpanTitle = styled.span`
    font-size: 1.3rem;
    font-weight: bold;
    position: absolute;
    right: 10px;
    bottom: 6px;
`;
