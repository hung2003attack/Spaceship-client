import { ReactElement, ReactNode, memo, useEffect, useRef, useState } from 'react';
import { Div, H3 } from '../styleComponents/styleDefault';
import { DivFonts, DivList, DivName, PItems } from './styleFontFamily';
import { DivClose } from '../styleComponents/styleComponents';
import { CloseI, ItalicI, StraightI } from '~/assets/Icons/Icons';
import { fontDatas } from 'src/dataMark/dataHomeForm';

const FontFamilys: React.FC<{
    fontFamily: { name: string; type?: string };
    setFontFamily: React.Dispatch<React.SetStateAction<{ name: string; type: string }>>;
    setDisplayFontText: React.Dispatch<React.SetStateAction<boolean>>;
    colorText: string;
    colorBg: number;
    displayEmoji: boolean;
}> = ({ fontFamily, setFontFamily, colorBg, colorText, displayEmoji, setDisplayFontText }) => {
    const [typeFont, setTypeFont] = useState<string>('');
    const [children, setChildren] = useState<ReactNode>();

    const handlePItems = (name: string, type: string) => {
        setFontFamily({ name, type });
    };

    console.log('fontFamily');
    return (
        <DivFonts bg={colorBg === 1 ? '#292a2d;' : ''}>
            <DivList color={colorText}>
                {fontDatas.map((f) => {
                    let leftPX = 23;
                    let widthPX = 11.5;
                    return (
                        <div key={f.id}>
                            <DivName
                                width="73px"
                                css={`
                                    margin-right: 4px;
                                    margin-bottom: ${f.name === typeFont && f.type.length >= 2 ? '35px' : '0'};
                                `}
                                position="relative"
                                bg={fontFamily.name === f.name ? '#345fccdb' : ''}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('ok');

                                    setTypeFont(f.name);
                                    setFontFamily({ type: f.type[0].name, name: f.name });
                                }}
                            >
                                {f.name}
                                {f.name === typeFont &&
                                    f.type.length >= 2 &&
                                    f.type?.map((t) => {
                                        if (t.id > 1) {
                                            leftPX += 50;
                                        }
                                        if (t.id > 2) widthPX += 50;
                                        console.log(widthPX);
                                        let bar = false;
                                        for (let i = 0; i < f.type.length; i++) {
                                            if (!bar) bar = f.type[i].id > 1 && f.type[i].name === fontFamily.type;
                                        }
                                        return (
                                            <div key={t.id}>
                                                {t.id >= 2 && (
                                                    <div>
                                                        <Div
                                                            css={`
                                                                width: 2px;
                                                                height: 7px;
                                                                background-color: ${bar ? '#345fccdb' : '#43464c'};
                                                                position: absolute;
                                                                left: 63px;
                                                                top: 27px;
                                                                z-index: 1;
                                                            `}
                                                        ></Div>
                                                        <Div
                                                            css={`
                                                                width: ${widthPX + 'px'};
                                                                height: 1.5px;
                                                                background-color: ${bar ? '#345fccdb' : '#43464c'};
                                                                position: absolute;
                                                                top: 33px;
                                                                left: 63px;
                                                                z-index: 1;
                                                            `}
                                                        ></Div>
                                                    </div>
                                                )}
                                                <Div
                                                    css={`
                                                        width: 1.5px;
                                                        background-color: ${fontFamily.type === t.name
                                                            ? '#345fccdb'
                                                            : '#43464c'};
                                                        height: ${t.id > 1 ? '9px' : '14px'};
                                                        position: absolute;
                                                        top: ${t.id > 1 ? '33px' : '28px'};
                                                        left: ${leftPX + 'px'};
                                                    `}
                                                ></Div>
                                            </div>
                                        );
                                    })}
                                {f.name === typeFont && f.type.length >= 2 && (
                                    <>
                                        <DivName
                                            width="auto"
                                            css={`
                                                display: flex;
                                                justify-content: center;
                                                bottom: -45px;
                                                left: -8px;
                                            `}
                                            position="absolute"
                                            bg="none"
                                        >
                                            {f.type?.length >= 2 &&
                                                f.type?.map((t, index) => {
                                                    return (
                                                        <PItems
                                                            key={index}
                                                            bg={fontFamily.type === t.name ? '#345fccdb' : '#43464c'}
                                                            onClick={(e) => {
                                                                e.stopPropagation();

                                                                setFontFamily({ type: t.name, name: f.name });
                                                                console.log(fontFamily, t.name);
                                                            }}
                                                        >
                                                            {t.icon}
                                                        </PItems>
                                                    );
                                                })}
                                        </DivName>
                                    </>
                                )}
                            </DivName>
                        </div>
                    );
                })}
            </DivList>
        </DivFonts>
    );
};
export default memo(FontFamilys);
