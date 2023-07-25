import styled from 'styled-components';

export const Form = styled.form`
    position: relative;
`;
interface PropsDivfrom {
    top: string;
    position?: string;
}
export const DivForm = styled.div<PropsDivfrom>`
    width: 100%;
    margin-top: 5px;
    border-radius: 5px;
    transition: var(--transition-03s);
    top: ${(props) => props.top};
    position: ${(props) => props.position};
`;
export const DivUpNews = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    @media (min-width: 580px) {
        padding: 5px;
    }
`;

export const Input = styled.input`
    width: 350px;
    padding: 11px 11px 11px 20px;
    color: #d5cdcd;
    border: 0;
    background-color: rgb(52, 52, 52);
    border-radius: 50px;
`;
export const DivOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
`;
export const DivUpImage = styled.div`
    display: flex;
    font-size: 25px;
    cursor: var(--pointer);
`;
export const DivSignature = styled.div`
    display: flex;
    align-items: center;
    font-size: 3rem;
    cursor: var(--pointer);
`;
export const Label = styled.label`
    color: ${(props) => props.color};
    display: flex;
    justify-content: center;
    cursor: pointer;
    ${(props: { css?: string }) => props.css}
`;
interface PropsDivItems {
    position?: string;
    bg?: string;
}
export const DivItems = styled.div<PropsDivItems>`
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    margin: 0 5px;
    background-color: ${(props) => props.bg};
    color: ${(props) => props.color};
    position: ${(props) => props.position};
    @media (min-width: 500px) {
        font-size: 22px;
        width: 35px;
    }
    @media (min-width: 600px) {
        font-size: 2.4rem;
    }
`;
export const DivDataFake = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 580px) {
        margin: 5px;
    }
`;
interface PorpsTextarea {
    bg?: string;
    font?: string;
    BoBg?: string;
}

export const Textarea = styled.textarea<PorpsTextarea>`
    width: 100%;
    height: 42px;
    display: block;
    font-size: 1.3rem;
    font-family: inherit;
    padding: 10px 37px 10px 10px;
    margin-bottom: 10px;
    overflow: hidden;
    resize: none;
    border: 1px solid ${(props) => props.BoBg};
    border-radius: 5px;
    outline: none;
    color: ${(props) => props.color};
    background-color: ${(props) => props.bg};
    font-family: ${(props) => props.font}, sans-serif;
    &::placeholder {
        color: white;
    }
    @media (min-width: 580px) {
        font-size: 1.6rem;
    }
`;
interface PropsDivImage {
    src: string;
    border: string;
}
export const DivImage = styled.div<PropsDivImage>`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
    border: ${(props) => props.border};
    border-radius: 5px;
`;
export const DivWrapButton = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px 0;
`;
interface PropsEmo {
    index?: number;
    css?: string;
}
export const DivEmoji = styled.div<PropsEmo>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    margin-left: -6px;
    transition: all 0.4s linear;
    user-select: none;
    z-index: ${(props) => props.index};
    ${(props) => props.css};
    @media (min-width: 350px) {
        font-size: 13px;
    }
    @media (min-width: 768px) {
        font-size: 15px;
        /* margin-left: -10px; */
    }
`;
export const DivAction = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 0;
    font-size: 18px;
    position: relative;
    user-select: none;
    cursor: var(--pointer);
    svg {
        font-size: 21px;
    }
    ${(props: { css?: string }) => props.css};
    @media (min-width: 400px) {
        font-size: 18px;
    }
    @media (min-width: 600px) {
        svg {
            font-size: 23.5px;
        }
        font-size: 17px;
    }
    @media (min-width: 768px) {
        svg {
            font-size: 25px;
        }
        font-size: 18px;
    }
`;
export const SpanAmount = styled.span`
    display: none;
    font-size: 0.9rem;
    @media (min-width: 350px) {
        font-size: 1rem;
    }
`;
export const TextAreaPre = styled.textarea`
    border: 0;
    width: 100%;
    height: fit-content;
    font-size: 1.4rem;
    outline: none;
    ${(props: { css?: string }) => props.css}
`;
export const DivComment = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    @media (max-width: 550px) {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 7;
    }
`;
