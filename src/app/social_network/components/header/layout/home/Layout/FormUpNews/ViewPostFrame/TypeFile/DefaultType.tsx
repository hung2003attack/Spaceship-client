import { Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { useState, useEffect } from 'react';
import { Player } from 'video-react';
import { FullScreenI, ScreenI } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';

const DefaultType: React.FC<{
    file: { link: string; type: string }[];
    colorText: string;
    full: number;
    setFull: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, full, setFull }) => {
    const [moreFile, setMoreFile] = useState<number>(6);
    const [cc, setCC] = useState<string>('');
    const handleFull = (e: any, link: string) => {
        setCC(link);
        if (full === 1) {
            setFull(2);
        } else if (full === 2 && e.target.getAttribute('class').includes('aaa')) {
            setFull(1);
        }
    };
    return (
        <Div
            width="100%"
            css={`
                position: relative;
                display: grid;
                grid-template-columns: ${file.length === 1
                    ? '1fr'
                    : file.length === 4 || file.length === 2
                    ? '1fr 1fr'
                    : '1fr 1fr 1fr'};
                @media (min-width: 769px) {
                    ${full === 1 ? 'grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2px;' : ''}
                }
                @media (min-width: 1240px) {
                    ${full === 1 ? 'grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 3px;' : ''}
                }
            `}
        >
            {file.length > 4 ? (
                full === 0 ? (
                    <DivPos size="18px" top="-56px" right="46.5px" color={colorText} onClick={() => setFull(1)}>
                        <FullScreenI />
                    </DivPos>
                ) : (
                    <DivPos
                        size="20px"
                        top="-25px"
                        right="11.5px"
                        color={colorText}
                        onClick={() => setFull(0)}
                        css={`
                            ${full > 0
                                ? `${
                                      full === 2 ? 'background-color: #a1a1a18a;' : 'background-color: #0304048a;'
                                  };position: fixed; top: 8px; right: 11.5px; color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px; transition: all 0.5s linear; `
                                : ''}
                        `}
                    >
                        <ScreenI />
                    </DivPos>
                )
            ) : (
                ''
            )}
            {file.map((f, index, arr) => {
                if (full === 0 ? index < moreFile : true) {
                    return (
                        <>
                            <Div
                                key={f.link}
                                id="baby"
                                className="aaa"
                                width="100%"
                                onClick={(e) => handleFull(e, f.link)}
                                css={`
                                    height: 100%;
                                    margin: auto;
                                    position: relative;
                                    ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                                    ${full === 2 && cc === f.link
                                        ? 'position: fixed; top: 0; left:0; z-index: 88; background-color: #0e0e0d; img,div.video-react-controls-enabled{position: absolute; height: auto; top: 50%; translate: -50% -50%; left: 50%; @media(min-width:413px){width: 413px}} '
                                        : ''}
                                `}
                            >
                                {f.type === 'image' ? (
                                    <Img src={f.link} id="baby" alt={f.link} />
                                ) : f.type === 'video' ? (
                                    <Player src={f.link} />
                                ) : (
                                    ''
                                )}
                                {full === 0 && index + 1 >= moreFile && arr.length > moreFile && (
                                    <Div
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
                            {full === 0 && index + 1 === file.length && file.length > 6 && (
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
