import { Player } from 'video-react';
import { useState } from 'react';

import { ColorsI, FullScreenI, ScreenI, SquareI } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import LogicType from './logicType';

const Grid: React.FC<{
    column: number;
    file: {
        link: string;
        type: string;
    }[];
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    colorText: string;
}> = ({ column, file, step, setStep, colorText }) => {
    const [bg, setBg] = useState<string>('#1b1919');
    const {
        moreFile,
        cc,
        handleStep,
        setMoreFile,
        ToolDefault,
        showTitle,
        update,
        setUpdate,
        showComment,
        setShowComment,
    } = LogicType(step, setStep, colorText);
    const [showColors, setShowColors] = useState(false);
    let columns = '';
    if (column) {
        for (let i = 0; i < column; i++) {
            columns += '1fr ';
        }
    }
    const colors = [
        { id: 1, color: '#1b1919' },
        { id: 2, color: '#fcfcfc' },
        { id: 3, color: 'antiquewhite' },
        { id: 4, color: 'coral' },
        { id: 5, color: '#e37bb5' },
        { id: 6, color: '#7185e1' },
        { id: 7, color: '#71cbe1' },
    ];

    return (
        <Div
            width="100%"
            css={`
                margin: 4px 0;
                background-color: ${step === 1 && bg};
                ${step === 1
                    ? 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 12; overflow-y: overlay;'
                    : ''}
            `}
        >
            <Div
                width="100%"
                css={`
                    height: fit-content;
                    display: grid;
                    gap: 2px;
                    border-radius: 5px;
                    padding: 2px 9px 7px 9px;
                    grid-template-columns: ${file.length === 1 ? '1fr' : columns};
                `}
            >
                {step !== 0 && (
                    <>
                        <DivPos
                            size="20px"
                            top="-25px"
                            right="11.5px"
                            color={colorText}
                            onClick={() => setStep(0)}
                            css={`
                                ${step > 0
                                    ? `${
                                          step > 1 ? 'background-color: #a1a1a18a;' : 'background-color: #0304048a;'
                                      };position: fixed; top: 8px; right: 11.5px; color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px;  transition: all 0.5s linear; `
                                    : ''}
                            `}
                        >
                            <ScreenI />
                        </DivPos>
                        <DivPos css="position: fixed; transition: all 5s linear; top: 180px; right: 12.5px; font-size: 30px; flex-direction: column; z-index: 1;">
                            <Div display="block" css="position: relative;">
                                <Div
                                    css={`
                                        position: absolute;
                                        top: 0;
                                        right: 0;
                                        color: #4e4343;
                                        z-index: 1;
                                    `}
                                    onClick={() => setShowColors(!showColors)}
                                >
                                    <ColorsI />
                                </Div>
                                {colors.map((cl) => (
                                    <Div
                                        key={cl.id}
                                        css={`
                                            width: 27px;
                                            height: 27px;
                                            border-radius: 5px;
                                            transition: all 0.5s linear;
                                            position: absolute;
                                            top: ${cl.id * 30}px;
                                            right: 2px;
                                            background-color: ${cl.color};
                                            ${!showColors && 'top: 0px; background-color: #00000000;'}
                                        `}
                                        onClick={() => setBg(cl.color)}
                                    ></Div>
                                ))}
                            </Div>
                        </DivPos>
                    </>
                )}
                <>
                    {step === 2 && ToolDefault(2)}
                    {step === 1 && ToolDefault(1)}
                </>
                {file.map((f) => {
                    return (
                        <Div
                            key={f.link}
                            width="100%"
                            css={`
                                height: 100%;
                                margin: 0 1.5px;
                                border-radius: 5px;
                                ${step > 1 && cc === f.link
                                    ? `position: fixed; top: 0; left:0; z-index: 88; background-color: #0e0e0d; img,div.video-react-controls-enabled{object-fit: contain; margin: auto;}`
                                    : ''}
                                ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                            `}
                            onClick={(e) => handleStep(e, f.link)}
                        >
                            {f.type === 'image' ? (
                                <Img src={f.link} alt={f.link} radius="5px" />
                            ) : f.type === 'video' ? (
                                <Player src={f.link} />
                            ) : (
                                ''
                            )}
                        </Div>
                    );
                })}
            </Div>
        </Div>
    );
};
export default Grid;
