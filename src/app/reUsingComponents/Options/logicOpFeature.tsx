import { useState } from 'react';
import { EarthI, FriendI, PrivateI } from '~/assets/Icons/Icons';

const LogicText = (
    valuePrivacy: {
        id: number;
        name: string;
    }[],
    setTypeExpire: React.Dispatch<
        React.SetStateAction<
            | {
                  cate: number;
                  name: string;
                  value: number;
              }
            | undefined
        >
    >,
    setValuePrivacy: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                name: string;
            }[]
        >
    >,

    setOpSelect: React.Dispatch<React.SetStateAction<string[]>>,
    OpSelect: string[],
    setImotions: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                icon: string;
            }[]
        >
    >,
    Imotions: {
        id: number;
        icon: string;
    }[],

    ImotionsDel: {
        id: number;
        icon: string;
    }[],
    setImotionsDel: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                icon: string;
            }[]
        >
    >,
    valueSeePost: {
        id: number;
        name: string;
    },
    setValueSeePost: React.Dispatch<
        React.SetStateAction<{
            id: number;
            name: string;
            icon: React.ReactElement;
        }>
    >,
) => {
    const option = [
        {
            id: 1,
            title: {
                name: 'Privacy',
                children: [
                    {
                        id: 1,
                        name: `Imotion ${Imotions.map((i) => i.icon).join(' ')}`,
                        icon: [
                            { id: 1, icon: '👍' },
                            { id: 2, icon: '❤️' },
                            { id: 3, icon: '😂' },
                            { id: 4, icon: '😍' },
                            { id: 5, icon: '😘' },
                            { id: 6, icon: '😱' },
                            { id: 7, icon: '😡' },
                        ],
                    },
                    { id: 2, name: 'Comment', icon: '' },
                    { id: 3, name: 'Share', icon: '' },
                    { id: 4, name: 'Anonymous comment', icon: '' },
                ],
            },
        },
        {
            id: 2,
            title: {
                name: 'Who can see your posts',
                children: [
                    { id: 1, name: 'Only me', icon: <PrivateI /> },
                    { id: 2, name: 'Friends', icon: <FriendI /> },
                    { id: 3, name: 'Anyone', icon: <EarthI /> },
                ],
            },
        },
    ];

    const handleReset = () => {
        setOpSelect([]);
        setTypeExpire(undefined);
        setValuePrivacy([]);
        setValueSeePost({ id: 2, name: 'Friend', icon: <FriendI /> });
        setImotionsDel([]);
        setImotions([
            { id: 1, icon: '👍' },
            { id: 2, icon: '❤️' },
            { id: 3, icon: '😂' },
            { id: 4, icon: '😍' },
            { id: 5, icon: '😘' },
            { id: 6, icon: '😱' },
            { id: 7, icon: '😡' },
        ]);
    };
    const handleFirst = (rs: any, child: any) => {
        // show options selected

        if (rs.id === 1) {
            //set value of Privacy
            let check = false;
            valuePrivacy.forEach((t) => {
                if (t.id === child.id) {
                    check = true;
                }
            });
            if (check) {
                setValuePrivacy(() => valuePrivacy.filter((t) => t.id !== child.id));
            } else {
                setValuePrivacy([...valuePrivacy, { name: child.name, id: child.id }]);
            }
        } else if (rs.id === 2) {
            // set value of Who can see posts
            setValueSeePost({ id: child.id, name: child.name, icon: child.icon });
        }
        //Private and Expire
    };
    const handleImotion = (s: { id: number; icon: string }) => {
        let checkH = false;
        Imotions.forEach((i) => {
            if (i.id === s.id) {
                checkH = true;
            }
        });
        if (checkH) {
            let checkD = false;
            ImotionsDel.forEach((i) => {
                if (i.id === s.id) {
                    checkD = true;
                }
            });
            if (!checkD) setImotionsDel([...ImotionsDel, s]);
            setImotions(() => Imotions.filter((I) => I.id !== s.id));
        } else {
            const newID = ImotionsDel.filter((i) => i.id !== s.id);
            setImotionsDel(newID);
            setImotions(() =>
                [
                    { id: 1, icon: '👍' },
                    { id: 2, icon: '❤️' },
                    { id: 3, icon: '😂' },
                    { id: 4, icon: '😍' },
                    { id: 5, icon: '😘' },
                    { id: 6, icon: '😱' },
                    { id: 7, icon: '😡' },
                ].filter((i) => {
                    let checkF = false;
                    newID.forEach((iD) => {
                        if (iD.id === i.id) checkF = true;
                    });
                    if (newID.length > 0) {
                        if (!checkF) return i;
                    } else {
                        return i;
                    }
                }),
            );
        }
    };
    return {
        option,
        handleReset,
        handleFirst,
        handleImotion,
        valueSeePost,
    };
};
export default LogicText;
