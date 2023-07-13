import { useEffect, useState } from 'react';
import { Div, P } from '../styleComponents/styleDefault';
import { BeforeI, CheckI, NextI, OclockI, PrivateI, ResetI, UndoIRegister } from '~/assets/Icons/Icons';
import { DivPos } from '../styleComponents/styleComponents';

const OpText: React.FC<{
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    typePrivate: { id: number; name: string }[];
    typeExpire: { cate: number; value: number } | undefined;
    setTypePrivate: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                name: string;
            }[]
        >
    >;
    setTypeExpire: React.Dispatch<
        React.SetStateAction<
            | {
                  cate: number;
                  name: string;
                  value: number;
              }
            | undefined
        >
    >;
    setMore: React.Dispatch<React.SetStateAction<number[]>>;
    more: number[];
    setOpSelect: React.Dispatch<React.SetStateAction<string[]>>;
    OpSelect: string[];
    setImotions: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                icon: string;
            }[]
        >
    >;
    Imotions: { id: number; icon: string }[];
}> = ({
    typeExpire,
    typePrivate,
    setTypeExpire,
    setTypePrivate,
    setOptions,
    setMore,
    more,
    setOpSelect,
    OpSelect,
    setImotions,
    Imotions,
}) => {
    const option = [
        {
            id: 1,
            title: {
                name: 'Private',
                children: [
                    { id: 1, name: 'Post', value: 1 },
                    {
                        id: 2,
                        name: `Imotion ${Imotions.map((i) => i.icon).join(' ')}`,
                        value: [
                            { id: 1, icon: '👍' },
                            { id: 2, icon: '❤️' },
                            { id: 3, icon: '😂' },
                            { id: 4, icon: '😍' },
                            { id: 5, icon: '😘' },
                            { id: 6, icon: '😱' },
                            { id: 7, icon: '😡' },
                        ],
                    },
                    { id: 3, name: 'Comment', value: 3 },
                    { id: 4, name: 'Share', value: 4 },
                    { id: 5, name: 'Anonymous comment', value: 5 },
                ],
            },
        },
        {
            id: 2,
            title: {
                name: 'Expire',
                children: [
                    {
                        id: 1,
                        name: 'Minute',
                        value: [
                            5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                            29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52,
                            53, 54, 55, 56, 57, 58, 59,
                        ],
                    },
                    {
                        id: 2,
                        name: 'Hour',
                        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    },
                    {
                        id: 3,
                        name: 'Date',
                        value: [
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                            26, 27, 28, 29, 30,
                        ],
                    },
                    { id: 4, name: 'Month', value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
                    { id: 5, name: 'Year', value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                ],
            },
        },
    ];

    const handleReset = () => {
        setOpSelect([]);
        setTypeExpire(undefined);
        setTypePrivate([]);
    };
    const handleFirst = (rs: any, child: any) => {
        //Private
        if (rs.id === 1 && typeof child.value === 'number') {
            if (OpSelect?.includes(child.id + `${rs.id}`)) {
                setOpSelect(() => OpSelect.filter((v) => v !== child.id + `${rs.id}`));
            } else {
                const newData = [...OpSelect, child.id + `${rs.id}`];
                setOpSelect(() => {
                    const d = newData.filter((v) => {
                        if (child.id === 1) {
                            if (v === 1 + `${rs.id}`) return v;
                        } else {
                            if (v === 1 + `${rs.id}`) {
                            } else {
                                return v;
                            }
                        }
                    });
                    return d;
                });
            }

            if (child.value === 1) {
                typePrivate.push({ name: child.name, id: child.value });
                setTypePrivate(() => typePrivate.filter((t) => t.id === child.value));
            } else {
                const newType = typePrivate.filter((t) => t.id !== 1);
                let check = false;
                newType.forEach((t) => {
                    if (t.id === child.value) {
                        check = true;
                    }
                });
                if (check) {
                    setTypePrivate(() => newType.filter((t) => t.id !== child.value));
                } else {
                    setTypePrivate([...newType, { name: child.name, id: child.value }]);
                }
            }
        } else {
            if (OpSelect?.includes(child.id + `${rs.id}`)) {
                setOpSelect(() => OpSelect.filter((v) => v !== child.id + `${rs.id}`));
            } else {
                setOpSelect([...OpSelect, child.id + `${rs.id}`]);
            }
        }
        //Private and Expire
    };
    return (
        <Div
            display="block"
            css={`
                position: absolute;
                right: 0px;
                top: 0px;
                width: 100%;
                height: 100%;
                overflow-y: overlay;
                background-color: #292a2d;
                z-index: 10;
                padding: 10px;
            `}
        >
            <Div width="100%" css="justify-content: space-between;">
                <Div
                    width="30px"
                    css="height: 30px; font-size: 20px; align-items: center; justify-content: center;"
                    onClick={() => setOptions(false)}
                >
                    <UndoIRegister />
                </Div>
                <Div width="50px" css="align-items: center; justify-content: space-evenly;">
                    {typeExpire && <OclockI />}
                    {typePrivate.length > 0 && <PrivateI />}
                </Div>
                <Div
                    width="30px"
                    css="height: 30px; font-size: 20px; align-items: center; justify-content: center;"
                    onClick={handleReset}
                >
                    <ResetI />
                </Div>
            </Div>
            {option.map((rs, index, arr) => (
                <Div
                    width="100%"
                    wrap="wrap"
                    key={rs.id}
                    css={`
                        padding: 4px 5px;
                        margin: 1px 0;
                        background-color: #3f4041;
                        cursor: var(--pointer);
                        ${index === 0 && 'border-top-right-radius: 5px;border-top-left-radius: 5px'};
                        ${index === arr.length - 1 && 'border-bottom-right-radius: 5px;border-bottom-left-radius: 5px'}
                    `}
                >
                    <P
                        z="1.4rem"
                        css="width: 100%"
                        onClick={() => {
                            if (!more.includes(rs.id)) {
                                setMore([...more, rs.id]);
                            } else {
                                setMore(() => more.filter((v) => v !== rs.id));
                            }
                        }}
                    >
                        {rs.title.name +
                            (rs.id === 2 && typeExpire ? ' -- ' + rs.title.children[typeExpire.cate - 1].name : '')}
                    </P>
                    {more.includes(rs.id) && (
                        <Div
                            width="100%"
                            wrap="wrap"
                            css="margin-top: 5px; padding: 10px; border-radius: 5px; background-color: #272727;"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {rs.title.children.map((child, index2, ar2) => (
                                <Div
                                    width="100%"
                                    wrap="wrap"
                                    key={child.id}
                                    css={`
                                        position: relative;
                                        padding: 4px;
                                        cursor: var(--pointer);
                                        &:hover {
                                            background-color: #3a3a3a;
                                        }
                                        ${index2 === 0 && 'border-top-right-radius: 5px;border-top-left-radius: 5px'};
                                        ${index2 === ar2.length - 1 &&
                                        'border-bottom-right-radius: 5px;border-bottom-left-radius: 5px'}
                                    `}
                                >
                                    <P
                                        z="1.3rem"
                                        css={`
                                            width: 100%;
                                            ${OpSelect?.includes(child.id + `2`) && ' padding: 5px 0;'}
                                        `}
                                        onClick={() => handleFirst(rs, child)}
                                    >
                                        {child.name +
                                            ' ' +
                                            (rs.id === 2 && typeExpire?.cate === child.id ? typeExpire?.value : '')}
                                    </P>
                                    {OpSelect.includes(child.id + `${rs.id}`) && Array.isArray(child.value) && (
                                        <Div
                                            width="100%"
                                            wrap="wrap"
                                            css={`
                                                justify-content: center;
                                                background-color: ${typeof child.value[0] === 'number'
                                                    ? '#1c5689'
                                                    : '#5c5c5c'};
                                                padding: 8px;
                                                border-radius: 5px;
                                            `}
                                        >
                                            {child.value.map((s: number | { id: number; icon: string }) =>
                                                typeof s === 'number' ? (
                                                    <P
                                                        key={s}
                                                        z="1.2rem"
                                                        css={`
                                                            width: 30px;
                                                            height: 30px;
                                                            display: flex;
                                                            justify-content: center;
                                                            align-items: center;
                                                            box-shadow: 0 0 1px;
                                                            ${typeExpire?.value === s &&
                                                            typeExpire.cate === child.id &&
                                                            'background-color:  #272727'};
                                                        `}
                                                        onClick={(e) => {
                                                            e.stopPropagation();

                                                            setTypeExpire({
                                                                cate: child.id,
                                                                name: child.name,
                                                                value: s,
                                                            });
                                                        }}
                                                    >
                                                        {s}
                                                    </P>
                                                ) : (
                                                    <Div
                                                        key={s.id}
                                                        width="30px"
                                                        css={`
                                                            height: 30px;
                                                            justify-content: center;
                                                            align-items: center;
                                                            ${Imotions.some((i) => i.id === s.id) &&
                                                            'background-color: #2f2f2f;'}
                                                        `}
                                                        onClick={() => {
                                                            let checkH = false;
                                                            Imotions.forEach((i) => {
                                                                if (i.id === s.id) {
                                                                    checkH = true;
                                                                }
                                                            });
                                                            if (checkH) {
                                                                setImotions(() =>
                                                                    Imotions.filter((I) => I.id !== s.id),
                                                                );
                                                            } else {
                                                                setImotions([...Imotions, s]);
                                                            }
                                                        }}
                                                    >
                                                        {s.icon}
                                                    </Div>
                                                ),
                                            )}
                                        </Div>
                                    )}
                                    {OpSelect.includes(child.id + `${rs.id}`) && typeof child.value === 'number' && (
                                        <DivPos top="5px" left="150px" color="#61ff61;">
                                            <CheckI />
                                        </DivPos>
                                    )}
                                </Div>
                            ))}
                        </Div>
                    )}
                </Div>
            ))}
        </Div>
    );
};
export default OpText;
