import { BanI, BeforeI, NextI } from '~/assets/Icons/Icons';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItemsType, DivsetC } from './styleOptionType';
import OnlyImages from './TypeFile/Grid';
import Coverflow from './TypeFile/Swipers/Coverflow';
import DefaultType from './TypeFile/DefaultType';
import { useState } from 'react';

const OptionType: React.FC<{
    colorText: string;
    colorBg: number;
    file: {
        link: string;
        type: string;
    }[];
    column: number;
    setColumn: React.Dispatch<React.SetStateAction<number>>;
    setSelectType: React.Dispatch<React.SetStateAction<number>>;
    setSelectChild: React.Dispatch<React.SetStateAction<number>>;
    selectChild: number;
    step: number;
    selectType: number;
}> = ({
    colorText,
    colorBg,
    file,
    setSelectType,
    setColumn,
    selectChild,
    setSelectChild,
    column,
    step,
    selectType,
}) => {
    const [children, setChildren] = useState<{ id: number; name: string }[]>();
    const postTypes: { name: string; id: number; column?: number; children?: { id: number; name: string }[] }[] = [
        {
            name: 'Swiper',
            id: 1,
            children: [
                {
                    id: 1,
                    name: 'Dynamic',
                },

                {
                    id: 2,
                    name: 'Fade',
                },
                {
                    id: 3,
                    name: 'Cards',
                },
                {
                    id: 4,
                    name: 'Coverflow',
                },
            ],
        },
        { name: 'Grid-Columns: ', id: 2, column: 3 },
    ];
    const [swiper, setSwiper] = useState<number>(0);
    console.log('I know that');
    const select = (sl: number) => {
        return selectType === sl;
    };

    return (
        <Div
            width="100%"
            wrap="wrap"
            css={`
                align-items: center;
                color: ${colorText};
            `}
        >
            <Div
                width="100%"
                css={`
                    display: block;
                    color: ${colorText};
                    text-align: center;
                    font-size: 1.5rem;
                    margin-bottom: 5px;
                    padding: 5px;
                    background-color: ${colorBg === 1 ? '#292a2d' : ''};
                `}
            >
                Pre-View your post here
            </Div>
            {file.length > 4 && (
                <Div width="100%" css="padding: 5px;">
                    <Div css="font-size: 2rem; padding: 4px 7px;" onClick={() => setSelectType(0)}>
                        <BanI />
                    </Div>
                    <Div>
                        {postTypes.map((t) => (
                            <DivItemsType
                                key={t.name}
                                onClick={() => {
                                    setSelectType(t.id);
                                    if (t.children) setChildren(t.children);
                                }}
                                css={`
                                    ${selectType === t.id ? 'background-color: #5b5e62b8;' : ''}
                                `}
                            >
                                {t.column ? (
                                    <Div
                                        css={`
                                            align-items: center;
                                            ${step === 1 && select(2)
                                                ? ' width: 50px; position: fixed; top: 55px; flex-direction: column; z-index: 9999; right: 4px; justify-content: center; div{background-color: #4e4343}'
                                                : ''}
                                        `}
                                    >
                                        {!(step === 1 && select(2)) && t.name}
                                        <DivsetC
                                            size={`${step === 1 && selectType === 2 ? '22px' : ''}`}
                                            onClick={() =>
                                                setColumn((pre) =>
                                                    file.length > 6
                                                        ? pre > 3
                                                            ? pre - 1
                                                            : pre
                                                        : file.length > 2
                                                        ? pre > 2
                                                            ? pre - 1
                                                            : pre
                                                        : file.length > 1
                                                        ? pre > 1
                                                            ? pre - 1
                                                            : pre
                                                        : 1,
                                                )
                                            }
                                        >
                                            <BeforeI />
                                        </DivsetC>
                                        {column}
                                        <DivsetC
                                            size={`${step === 1 && select(2) ? '22px' : ''}`}
                                            onClick={() =>
                                                setColumn((pre) => (pre < file.length && pre < 8 ? pre + 1 : pre))
                                            }
                                        >
                                            <NextI />
                                        </DivsetC>
                                    </Div>
                                ) : (
                                    t.name
                                )}
                            </DivItemsType>
                        ))}
                    </Div>
                </Div>
            )}
            {select(1) && (
                <Div width="100%" wrap="wrap" css="" onClick={(e) => e.stopPropagation()}>
                    {children?.map((c) => (
                        <P
                            z="1.3rem"
                            key={c.id}
                            css={`
                                width: fit-content;
                                padding: 5px;
                                margin: 0 8px;
                                border-radius: 5px;
                                ${selectChild === c.id ? 'background-color: #525252;' : ''}
                            `}
                            onClick={() => setSelectChild(c.id)}
                        >
                            {c.name}
                        </P>
                    ))}
                </Div>
            )}
        </Div>
    );
};
export default OptionType;
