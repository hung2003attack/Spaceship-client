import { Player } from 'video-react';
import { useState } from 'react';

import { FullScreenI, ScreenI } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';

const Grid: React.FC<{
    column: number;
    file: {
        link: string;
        type: string;
    }[];
    full: number;
    setFull: React.Dispatch<React.SetStateAction<number>>;
    colorText: string;
}> = ({ column, file, full, setFull, colorText }) => {
    const [bg, setBg] = useState<number>(1);
    let columns = '';
    if (column) {
        for (let i = 0; i < column; i++) {
            columns += '1fr ';
        }
    }

    return (
        <Div
            width="100%"
            css={`
                margin: 4px 0;
                background-color: ${full === 1 && bg === 0 ? '#fcfcfc' : '#1b1919'};
                ${full === 1
                    ? 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 12; overflow-y: overlay;'
                    : ''}
            `}
        >
            <Div
                width="100%"
                css={`
                    height: 100%;
                    display: grid;
                    gap: 2px;
                    border-radius: 5px;
                    padding: 4px 9px;
                    grid-template-columns: ${file.length === 1 ? '1fr' : columns};
                `}
            >
                {full !== 0 && (
                    <>
                        <DivPos
                            size="20px"
                            top="-25px"
                            right="11.5px"
                            color={colorText}
                            onClick={() => setFull(0)}
                            css={`
                                ${full > 0
                                    ? `${
                                          full > 1 ? 'background-color: #a1a1a18a;' : 'background-color: #0304048a;'
                                      };position: fixed; top: 8px; right: 11.5px; color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px;  transition: all 0.5s linear; `
                                    : ''}
                            `}
                        >
                            <ScreenI />
                        </DivPos>
                        <DivPos css="position: fixed; top: 130px; right: 11.5px; color: #e2d2d2; flex-direction: column;">
                            <Div onClick={() => setBg(0)}>White</Div>
                            <Div onClick={() => setBg(1)}>Black</Div>
                        </DivPos>
                    </>
                )}
                {file.map((f) => {
                    return (
                        <Div
                            key={f.link}
                            width="100%"
                            css={`
                                height: 100%;
                                margin: 0 1.5px;
                                border-radius: 5px;
                                ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                            `}
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
