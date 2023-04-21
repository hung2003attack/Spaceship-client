import { useEffect, useState } from 'react';
import { DivMessage } from './stylesErrorBoudaries';
import { P } from '../styleComponents/styleDefault';

function ErrorBoudaries(props: {
    check: boolean;
    setError: React.Dispatch<
        React.SetStateAction<{
            error: boolean;
            content: string;
        }>
    >;
    message: string;
}) {
    if (props.check)
        return (
            <DivMessage bg="#202124b8" onClick={() => props.setError({ error: false, content: '' })}>
                <P
                    color="#ff5252;"
                    css="width: 100%; height: 100%; font-size: 2rem; font-weight: bold; border-radius: 5px; text-align: center; margin-top: 50%"
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
