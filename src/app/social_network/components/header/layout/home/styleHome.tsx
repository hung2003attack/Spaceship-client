import styled from 'styled-components';

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 75px;
    background: ${(props: { bg: string }) => (props.bg === '#202124' ? '#202124f5' : props.bg)};
`;
interface PropsDivfrom {
    top: string;
}
export const DivForm = styled.div<PropsDivfrom>`
    margin-top: 60px;
    background-color: rgb(26 27 30);
    border-radius: 5px;
    transition: var(--transition-03s);
    top: ${(props) => props.top};
    position: fixed;
`;
export const Form = styled.form`
    position: relative;
`;
export const DivUpNews = styled.div`
    width: 511px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const DivNews = styled.div`
    width: 511px;
    height: 600px;
    margin: 50px;
    border-radius: 5px;
    background-color: rgb(26 27 30);
`;
export const Input = styled.input`
    width: 350px;
    padding: 11px 11px 11px 20px;
    color: #d5cdcd;
    border: 0;
    margin: 20px;
    background-color: rgb(52, 52, 52);
    border-radius: 50px;
`;
export const DivOptions = styled.div`
    display: flex;
    width: 70px;
    height: 50px;
    align-items: center;
    justify-content: space-between;
`;
export const DivUpImage = styled.div`
    display: flex;
    font-size: 25px;
    cursor: var(--pointer);
`;
export const DivSignature = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    cursor: var(--pointer);
`;
export const Label = styled.label`
    color: ${(props) => props.color};
    cursor: pointer;
`;
export const DivItems = styled.div`
    cursor: pointer;
    color: ${(props) => props.color};
`;

// export const css = {
//     home: `

// `,
//     news: `
//     `,

//     upNews: ``,

//     input: ``,

//     tools: ` `,

//     upImage: ``,

//     signature: ` `,

//     form: ' `;',
//     scroll: ` ;
//     top: -65px;`,

//     formChildren: ``,

//     move: ` `,
// };
