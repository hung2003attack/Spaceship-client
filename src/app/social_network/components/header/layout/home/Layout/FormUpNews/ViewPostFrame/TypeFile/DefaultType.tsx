import { Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { useState, useEffect } from 'react';
import { Player } from 'video-react';

const DefaultType: React.FC<{ file: { link: string; type: string }[] }> = ({ file }) => {
    const [moreFile, setMoreFile] = useState<number>(6);

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
            `}
        >
            {file.map((f, index, arr) => {
                if (index < moreFile) {
                    return (
                        <>
                            <Div
                                key={f.link}
                                id="baby"
                                width="100%"
                                css={`
                                    height: 100%;
                                    margin: auto;
                                    position: relative;
                                    ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                                `}
                            >
                                {f.type === 'image' ? (
                                    <Img src={f.link} id="baby" alt={f.link} />
                                ) : f.type === 'video' ? (
                                    <Player src={f.link} />
                                ) : (
                                    ''
                                )}
                                {index + 1 >= moreFile && arr.length > moreFile && (
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
                            {index + 1 === file.length && file.length > 6 && (
                                <Div
                                    key="pri"
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
