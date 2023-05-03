import { Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { useState } from 'react';
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
            {file.map((f, index) => {
                if (index < moreFile) {
                    return (
                        <Div
                            id="baby"
                            key={f.link}
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
                            {index + 1 >= moreFile && (
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
                    );
                }
            })}
        </Div>
    );
};
export default DefaultType;
