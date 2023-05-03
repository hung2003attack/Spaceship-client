import { ItalicI, StraightI } from '~/assets/Icons/Icons';

export const fontDatas: { name: string; type: { name: string; icon: React.ReactNode; id: number }[]; id: number }[] = [
    {
        name: 'Noto Sans',
        type: [
            { name: 'Straight', icon: <StraightI />, id: 1 },
            { name: 'Italics', icon: <ItalicI />, id: 2 },
        ],
        id: 1,
    },
    { name: 'Raleway', type: [{ name: 'Straight', icon: <StraightI />, id: 1 }], id: 2 },
    { name: 'Arima', type: [{ name: 'Straight', icon: <StraightI />, id: 1 }], id: 3 },
    { name: 'Saira', type: [{ name: 'Straight', icon: <StraightI />, id: 1 }], id: 4 },
    {
        name: 'Robotol',
        type: [
            { name: 'Straight', icon: <StraightI />, id: 1 },
            { name: 'Italics', icon: <ItalicI />, id: 2 },
        ],
        id: 5,
    },
    { name: 'Item', type: [{ name: 'Straight', icon: <StraightI />, id: 1 }], id: 6 },
];
