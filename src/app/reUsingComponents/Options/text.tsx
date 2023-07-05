import { useState } from 'react';
import { Div, P } from '../styleComponents/styleDefault';
import { CheckI } from '~/assets/Icons/Icons';
import { DivPos } from '../styleComponents/styleComponents';

const OpText: React.FC<{
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
}> = ({ typeExpire, typePrivate, setTypeExpire, setTypePrivate }) => {
    const [more, setMore] = useState<number[]>([-1]);
    const [OpSelect, setOpSelect] = useState<string[]>([]);
    const [select, setSelect] = useState<number>(-1);

    const option = [
        {
            id: 1,
            title: {
                name: 'Private',
                children: [
                    { id: 1, name: 'Post', value: 1 },
                    { id: 2, name: 'Imotion 🙂', value: 2 },
                    { id: 3, name: 'Comment', value: 3 },
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
                            if (v === 2 + `${rs.id}`) {
                            } else if (v === 3 + `${rs.id}`) {
                            } else {
                                return v;
                            }
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

            if (typePrivate.includes(child.value)) {
                setTypePrivate(() => typePrivate.filter((t) => t.id !== child.value));
            } else {
                setTypePrivate([...typePrivate, { name: child.name, id: child.value }]);
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
                background-color: #2a2a2a;
                z-index: 10;
                padding: 10px;
            `}
        >
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
                                            css="justify-content: center; background-color: #1c5689; padding: 8px; border-radius: 5px;"
                                        >
                                            {child.value.map((s: number) => (
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
                                                        ${typeExpire?.value === s && 'background-color:  #272727'};
                                                    `}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setTypeExpire({ cate: child.id, name: child.name, value: s });
                                                    }}
                                                >
                                                    {s}
                                                </P>
                                            ))}
                                        </Div>
                                    )}
                                    {OpSelect.includes(child.id + `${rs.id}`) && typeof child.value === 'number' && (
                                        <DivPos top="5px" left="90px" color="#61ff61;">
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
