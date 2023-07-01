import { Button, Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { useState, useEffect } from 'react';
import { Player } from 'video-react';
import { ChangeI, FullScreenI, HeartMI, ScreenI, TitleI } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { UndoI } from '~/assets/Icons/Icons';
import LogicType from './logicType';
import { InputT } from './styleCoverflow';

const DefaultType: React.FC<{
    file: { link: string; type: string }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, step, setStep }) => {
    const { moreFile, cc, handleStep, setMoreFile, ToolDefault, showTitle, update, setUpdate } = LogicType(
        step,
        setStep,
        colorText,
    );
    return (
        <Div
            width="100%"
            css={`
                height: fit-content;
                position: relative;
                display: grid;
                grid-template-columns: ${file.length === 1
                    ? '1fr'
                    : file.length === 4 || file.length === 2
                    ? '1fr 1fr'
                    : '1fr 1fr 1fr'};
                ${step === 1 &&
                `
                grid-template-columns: 1fr;
                @media (min-width: 400px) {
                    grid-template-columns: 1fr 1fr;
                }

                @media (min-width: 769px) {
                    grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2px;
                }
                @media (min-width: 1240px) {
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 3px;
                }`}
            `}
        >
            <>
                {step > 0 && ToolDefault(0)}
                {step === 2 && ToolDefault(2)}
                {step === 1 && ToolDefault(1)}
            </>
            {file.map((f, index, arr) => {
                if (step === 0 ? index < moreFile : true) {
                    return (
                        <>
                            <Div
                                key={f.link}
                                id="baby"
                                className="aaa"
                                wrap="wrap"
                                width="100%"
                                onClick={(e) => {
                                    const img = new Image();
                                    img.src = f.link;
                                    img.onload = () => {
                                        const width = img.width;
                                        const height = img.height;
                                        console.log(width, height);
                                        handleStep(e, f.link, width, height);
                                    };
                                }}
                                css={`
                                    height: 100%;
                                    margin: auto;
                                    position: relative;
                                    justify-content: center;
                                    align-items: center;
                                    ${showTitle && ' padding-bottom: 24px;'}
                                    color: ${colorText};
                                    ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                                    ${step > 1 && cc === f.link
                                        ? `position: fixed; top: 0; left:0; z-index: 88; background-color: #0e0e0d; img,div.video-react-controls-enabled{object-fit: contain; margin: auto;}`
                                        : ''}
                                `}
                            >
                                {showTitle && step === 1 && (
                                    <Div
                                        wrap="wrap"
                                        css={`
                                            position: relative;
                                            font-size: 1.5rem;
                                            width: 100%;
                                            padding: 5px 10px;
                                            justify-content: center;
                                            background-color: #424040;
                                        `}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <P css="">Tiki Dress price 150$</P>

                                        <DivPos size="20px" top="5px" right="3px" onClick={() => setUpdate(index)}>
                                            <ChangeI />
                                        </DivPos>
                                        {update === index && (
                                            <Div width="100%" wrap="wrap" css="justify-content: center;">
                                                <InputT
                                                    onFocus={(e: any) => {
                                                        e.target.value = 'Tiki Dress price 150$';
                                                    }}
                                                />
                                                <Button color={colorText}>Change</Button>
                                                <Button color={colorText} onClick={() => setUpdate(-1)}>
                                                    Cancel
                                                </Button>
                                            </Div>
                                        )}
                                    </Div>
                                )}
                                {f.type === 'image' ? (
                                    <Div width="100%" css="height: 100%; position: relative;">
                                        <Img src={f.link} id="baby" alt={f.link} />
                                        <Div css="position: absolute; right: 10px; bottom: 90px; font-size: 25px; color: #d9d9d9;">
                                            <HeartMI />
                                        </Div>
                                    </Div>
                                ) : f.type === 'video' ? (
                                    <Player src={f.link} />
                                ) : (
                                    ''
                                )}
                                {step === 0 && index + 1 >= moreFile && arr.length > moreFile && (
                                    <Div
                                        id="more"
                                        css={`
                                            width: 100%;
                                            height: 100%;
                                            position: absolute;
                                            color: white;
                                            align-items: center;
                                            justify-content: center;
                                            background-color: #6d6f7273;
                                        `}
                                        onClick={() => setMoreFile((pre) => pre + 6)}
                                    >
                                        <P>More</P>
                                    </Div>
                                )}
                            </Div>
                            {step === 0 && index + 1 === file.length && file.length > 6 && (
                                <Div
                                    key={index + 1}
                                    css={`
                                        grid-column-end: 4;
                                        grid-column-start: 1;
                                        width: 100%;
                                        height: 100%;
                                        color: white;
                                        align-items: center;
                                        justify-content: center;
                                        background-color: #6d6f7273;
                                    `}
                                    onClick={() => setMoreFile(6)}
                                >
                                    <P>Less</P>
                                </Div>
                            )}
                        </>
                    );
                }
            })}
        </Div>
    );
};
export default DefaultType;
