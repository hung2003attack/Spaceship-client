import { BanI, BeforeI, NextI } from '~/assets/Icons/Icons';
import { Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItemsType, DivsetC } from './styleOptionType';
import OnlyImages from './TypeFile/Grid';
import Coverflow from './TypeFile/Coverflow';
import DefaultType from './TypeFile/DefaultType';

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
}> = ({ colorText, colorBg, file, setSelectType, setColumn, column }) => {
    const postTypes: { name: string; id: number; column?: number }[] = [
        {
            name: 'Coverflow',
            id: 1,
        },
        { name: 'Grid-Columns: ', id: 2, column: 3 },
    ];
    console.log('I know that');

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
                    font-size: 1.8rem;
                    font-family: 'Item Straight';
                    margin-bottom: 5px;
                    padding: 5px;
                    background-color: ${colorBg === 1 ? '#292a2d' : ''};
                `}
            >
                Pre-View your post here
            </Div>
            <Div>
                <Div css="font-size: 2rem; padding: 4px 7px;" onClick={() => setSelectType(0)}>
                    <BanI />
                </Div>
                <Div>
                    {postTypes.map((t) => (
                        <DivItemsType key={t.name} onClick={() => setSelectType(t.id)}>
                            {t.column ? (
                                <Div css="align-items: center;">
                                    {t.name}
                                    <DivsetC
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
        </Div>
    );
};
export default OptionType;
