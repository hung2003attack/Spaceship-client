import { useEffect, useState } from 'react';
import { DivMessage } from './stylesErrorBoudaries';
import { P } from '../styleComponents/styleDefault';
import { useDispatch } from 'react-redux';
import { setFalseErrorServer } from '~/redux/hideShow';

function ErrorBoudaries(props: { check: boolean; message: string }) {
    const dispatch = useDispatch();
    if (props.check)
        return (
            <DivMessage bg="#202124b8" onClick={() => dispatch(setFalseErrorServer())}>
                <P
                    color="#ff5252;"
                    css="width: 100%; height: 400px; background-color: aliceblue; padding-top: 97px; font-size: 2rem; font-weight: bold; border-radius: 5px; text-align: center; "
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
