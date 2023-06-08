import { Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { useState, useEffect } from 'react';
import { Player } from 'video-react';
import { FullScreenI, ScreenI } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { UndoI } from '~/assets/Icons/Icons';

const DefaultType: React.FC<{
    file: { link: string; type: string }[];
    colorText: string;
    full: number;
    setFull: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, full, setFull }) => {
    const [moreFile, setMoreFile] = useState<number>(6);
    const [cc, setCC] = useState<string>('');
    const [wh, setWh] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const handleFull = (e: any, link: string, width: number, height: number) => {
        console.log(width, height);
        setWh({ width: width, height: height });

        if (
            !e.target.getAttribute('class').includes('video-react-play-control') &&
            !e.target.getAttribute('class').includes('video-react-volume-menu-button') &&
            !e.target.getAttribute('class').includes('video-react-play-progress') &&
            !e.target.getAttribute('class').includes('video-react-icon-fullscreen') &&
            e.target.getAttribute('id') !== 'more'
        ) {
            setCC(link);
            if (full === 0) {
                setFull(3);
            } else if (full === 1) {
                setFull(2);
            } else if (full === 2 && e.target.getAttribute('class').includes('aaa')) {
                setFull(1);
            }
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
            {file.length > 4 && (
                <>
                    {full > 0 && (
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
                    )}
                    {full === 2 && (
                        <DivPos
                            size="20px"
                            top="50px"
                            right="11.5px"
                            onClick={() => setFull(1)}
                            css="position: fixed;  color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px; background-color: #a1a1a18a; transition: all 0.5s linear; "
                        >
                            <UndoI />
                        </DivPos>
                    )}
                </>
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
                                onClick={(e) => {
                                    const img = new Image();
                                    img.src = f.link;
                                    img.onload = () => {
                                        const width = img.width;
                                        const height = img.height;
                                        console.log(width, height);
                                        handleFull(e, f.link, width, height);
                                    };
                                }}
                                css={`
                                    height: 100%;
                                    margin: auto;
                                    position: relative;
                                    justify-content: center;
                                    align-items: center;
                                    ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                                    ${full > 1 && cc === f.link
                                        ? `position: fixed; top: 0; left:0; z-index: 88; background-color: #0e0e0d; img,div.video-react-controls-enabled{object-fit: contain; margin: auto;}`
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
