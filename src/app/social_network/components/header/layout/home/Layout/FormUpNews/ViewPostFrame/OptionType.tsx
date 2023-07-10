import { BanI, BeforeI, NextI } from '~/assets/Icons/Icons';
import { Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItemsType, DivsetC } from './styleOptionType';
import OnlyImages from './TypeFile/Grid';
import Coverflow from './TypeFile/Coverflow';
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
    step: number;
    selectType: number;
}> = ({ colorText, colorBg, file, setSelectType, setColumn, column, step, selectType }) => {
    const postTypes: { name: string; id: number; column?: number }[] = [
        {
            name: 'Swiper',
            id: 1,
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
            wrap="wrap"
            css={`
                align-items: center;
                margin: 4px 6px;
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
                <Div>
                    <Div css="font-size: 2rem; padding: 4px 7px;" onClick={() => setSelectType(0)}>
                        <BanI />
                    </Div>
                    <Div>
                        {postTypes.map((t) => (
                            <>
                                <DivItemsType key={t.name} onClick={() => setSelectType(t.id)}>
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
                                    {t.id === 1 && select(1) && <Div>hello world!</Div>}
                                </DivItemsType>
                            </>
                        ))}
                    </Div>
                </Div>
            )}
        </Div>
    );
};
export default OptionType;
