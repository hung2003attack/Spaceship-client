import { useState } from 'react';
import { Div, P } from '../styleComponents/styleDefault';

const OpText = () => {
    const [more, setMore] = useState<number[]>([-1]);
    const option = [
        {
            id: 1,
            title: {
                name: 'Private',
                children: [
                    { id: 1, name: 'All', value: false },
                    { id: 2, name: 'Imotion', value: false },
                    { id: 3, name: 'Comment', value: false },
                    { id: 4, name: 'Share', value: false },
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
                            53, 54, 55, 56, 57, 58, 59, 60,
                        ],
                    },
                    {
                        id: 2,
                        name: 'Hour',
                        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                    },
                    {
                        id: 3,
                        name: 'Date',
                        value: [
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                            26, 27, 28, 29, 30,
                        ],
                    },
                    { id: 4, name: 'Month', value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                    { id: 4, name: 'Year', value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                ],
            },
        },
    ];
    return (
        <Div
            wrap="wrap"
            css={`
                position: absolute;
                right: -10px;
                top: -12px;
                width: 320px;
                background-color: #2a2a2a;
                z-index: 1;
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
                    onClick={() => {
                        if (!more.includes(rs.id)) {
                            setMore([...more, rs.id]);
                        } else {
                            setMore(() => more.filter((v) => v !== rs.id));
                        }
                    }}
                >
                    <P z="1.4rem">{rs.title.name}</P>
                    {more.includes(rs.id) && (
                        <Div
                            width="100%"
                            wrap="wrap"
                            css="padding: 10px; border-radius: 5px; background-color: #272727;"
                        >
                            {rs.title.children.map((child, index2, ar2) => (
                                <Div
                                    width="100%"
                                    key={child.id}
                                    css={`
                                        padding: 4px;
                                        cursor: var(--pointer);
                                        ${index2 === 0 && 'border-top-right-radius: 5px;border-top-left-radius: 5px'};
                                        ${index2 === ar2.length - 1 &&
                                        'border-bottom-right-radius: 5px;border-bottom-left-radius: 5px'}
                                    `}
                                >
                                    <P z="1.3rem">{child.name}</P>
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
