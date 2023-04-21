import { ReactElement, useRef, useState } from 'react';
import { Div, H3 } from '../styleComponents/styleDefault';
import { DivFonts, DivList, DivName, PItems } from './styleFontFamily';

const FontFamilys: React.FC<{
    fontFamily: { name: string; type?: string };
    setFontFamily: React.Dispatch<React.SetStateAction<{ name: string; type: string }>>;
    colorText: string;
    colorBg: string;
    displayEmoji: boolean;
}> = ({ fontFamily, setFontFamily, colorBg, colorText, displayEmoji }) => {
    const [typeFont, setTypeFont] = useState<string>('');
    const fonts: { name: string; type: string[] }[] = [
        { name: 'Noto Sans', type: ['Straight', 'Italics'] },
        { name: 'Raleway', type: ['Straight'] },
        { name: 'Arima', type: ['Straight'] },
        { name: 'Saira', type: ['Straight'] },
        { name: 'Robotol', type: ['Straight', 'Italics'] },
        { name: 'Item', type: ['Straight'] },
    ];
    const handleHover = (name: string) => {
        setTypeFont(name);
    };
    return (
        <DivFonts bg={colorBg === '#202124' ? '#1a1b1e' : colorBg}>
            <H3 css="text-align: center; " color={colorText}>
                Font Family
            </H3>
            <DivList color={colorText}>
                {fonts.map((f) => {
                    return (
                        <DivName
                            key={f.name}
                            position="relative"
                            bg={fontFamily.name === f.name ? '#345fccdb' : ''}
                            onClick={() => setFontFamily({ type: f.type[0], name: f.name })}
                            onMouseEnter={() => handleHover(f.name)}
                            onMouseLeave={() => setTypeFont('')}
                        >
                            {f.name}
                            {f.name === typeFont && f.type.length >= 2 && (
                                <>
                                    <DivName
                                        width="60%"
                                        position="absolute"
                                        css={`
                                            top: -6px;
                                            ${displayEmoji ? 'right' : 'left'}:-137px;
                                            display: flex;
                                            flex-wrap: wrap;
                                            justify-content: center;
                                        `}
                                        bg={colorBg === '#202124' ? '#1a1b1e' : colorBg}
                                    >
                                        <Div
                                            css={`
                                                width: 100%;
                                                height: 100%;
                                                position: absolute;
                                                ${displayEmoji ? 'left' : 'right'}: -33px;
                                                top: 0;
                                            `}
                                        />
                                        {f.type?.length >= 2 &&
                                            f.type?.map((t) => {
                                                return (
                                                    <PItems
                                                        key={t}
                                                        bg={fontFamily.type === t ? '#345fccdb' : ''}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFontFamily({ type: t, name: f.name });
                                                        }}
                                                    >
                                                        {t}
                                                    </PItems>
                                                );
                                            })}
                                    </DivName>
                                </>
                            )}
                        </DivName>
                    );
                })}
            </DivList>
        </DivFonts>
    );
};
export default FontFamilys;
