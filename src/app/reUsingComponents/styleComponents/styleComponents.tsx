import styled from 'styled-components';
export const Input = styled.input`
    width: 100%;
    padding: 10px 30px 10px 10px;
    border: 1px solid rgba(255, 255, 255, 0.83);
    border-radius: 5px;
    margin: 10px 0;
    background-color: rgba(255, 255, 255, 0);
    color: #fff;
    border-color: ${(props: { color: string }) => props.color};
`;
export const Eye = styled.p`
    width: 30px;
    height: 30px;
    display: flex;
    right: 49px;
    top: 87px;
    font-size: 20px;
    color: #aeaeae;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: transparent;
    cursor: pointer;
`;
export const TitleAuth = styled.h3`
    margin-top: 30px;
    color: #fff;
`;
export const Span = styled.span`
    display: flex;
`;
export const Img = styled.img`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    @media (max-width: 600px) {
        display: ${(props) => props.about};
    }
`;
