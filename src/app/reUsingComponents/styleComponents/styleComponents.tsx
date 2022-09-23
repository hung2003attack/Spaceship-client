import styled from 'styled-components';
export const Input = styled.input`
    width: 100%;
    padding: 10px 30px 10px 10px;
    border: 1px solid rgba(255, 255, 255, 0.83);
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0);
    color: #fff;
    border-color: ${(props: any) => {
        console.log(props);

        return props.color === 'true' ? 'red' : 'rgba(255,255,255,0.83)';
    }};
`;
