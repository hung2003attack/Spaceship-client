import { useEffect, useState } from 'react';
import { DivMessage } from './stylesErrorBoudaries';
import { P } from '../styleComponents/styleDefault';
import { useDispatch } from 'react-redux';
import { setFalseErrorServer } from '~/redux/hideShow';

function ErrorBoudaries(props: { check: boolean; message: string }) {
    const dispatch = useDispatch();
    if (props.check)
        return (
            <DivMessage onClick={() => dispatch(setFalseErrorServer())}>
                <P
                    color="#ff5252;"
                    css="    color: #ff5252;
    width: 70%;
    background-color: aliceblue;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    padding: 10px;"
                >
                    {props.message}
                    <br></br>
                    <span style={{ fontSize: '1.3rem' }}>( Click anywhere on the screen to out of the message. )</span>
                </P>
            </DivMessage>
        );

    return <></>;
}
export default ErrorBoudaries;
