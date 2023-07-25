import { DivContainer, DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { DivNews } from './stylePost';
import { useEffect, useRef, useState } from 'react';
import homeAPI from '~/restAPI/requestServers/socialNetwork/homeAPI';
import CookiesF from '~/reUsingComponents/cookies';
import { Div, H3, Img, P, Span } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivAction, DivEmoji, TextAreaPre } from '../FormUpNews/styleFormUpNews';
import { DotI, FullScreenI, HeartI, LikeI, LockI, ShareI } from '~/assets/Icons/Icons';
import Comment from '../FormUpNews/Comment';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { PropsUserHome } from '../../Home';
import CommonUtils from '~/utils/CommonUtils';
import Images from '~/assets/images';
import moment from 'moment';
import Languages from '~/reUsingComponents/languages';
import OpUpdate from '~/reUsingComponents/Options/OpUpdate';
interface feel {
    amount: number;
    like: {
        act: number;
        id_user: string[];
    };
    love: {
        act: number;
        id_user: string[];
    };
    smile: {
        act: number;
        id_user: string[];
    };
    sad: {
        act: number;
        id_user: string[];
    };
    angry: {
        act: number;
        id_user: string[];
    };
    only: {
        id: number;
        icon: string;
    }[];
    act: number;
}
export interface PropsDataPosts {
    _id: string;
    user: { Avatar: Buffer; fullName: string; gender: number }[];
    category: number;
    id_user: string;
    feel: feel;
    commentsOne: {
        id_user: string;
        content: {
            text: string;
            imageOrVideos: {
                file: string[];
                feel: feel;
            };
        };
        feel: feel;
        reply: [
            {
                id_user: { type: string; maxLength: 50; required: true };
                content: { text: { type: string; text: string }; imageOrVideos: [String] };
                anonymous: { type: Boolean; defaultValue: false };
            },
        ];
    };
    amountComments: number;
    content: {
        text: string;
        fontFamily: string;
        options: {
            default: {
                comments: {
                    id_user: string;
                    content: {
                        text: string;
                        file: string[];
                    };
                    feel: feel;
                    reply: [
                        {
                            id_user: string;
                            content: {
                                text: string;
                                file: string[];
                            };
                            feel: feel;
                        },
                    ];
                };
                file: string;
                love: { id_user: string[] };
                title: string;
                _id: string;
            }[];
            swiper: {
                id: number;
                name: string;
                data: {
                    file: string[];
                    data?: {
                        file: string[];
                        centered: {
                            id: number;
                            column: number;
                            data: string[];
                        };
                    };
                };
            };
            grid: {
                file: string[];
                BgColor: string;
                column: number;
            };
            onlyImage: string[];
        };
    };
    anonymous: boolean;
    private: {
        id: number;
        name: string;
    }[];
    createdAt: string;
}

interface PropsPosts {
    user: PropsUserHome;
    colorBg: number;
    colorText: string;
    dataPosts: PropsDataPosts;
    include: boolean;
    setInclude: React.Dispatch<React.SetStateAction<boolean>>;
}

const Posts: React.FC<PropsPosts> = ({ user, colorBg, colorText, dataPosts, include, setInclude }) => {
    const { lg } = Languages();
    const { userId } = CookiesF();
    const [showComment, setShowComment] = useState<boolean>(false);
    const [actImotion, setActImotion] = useState<boolean>(false);
    const [options, setOptions] = useState<boolean>(false);
    const [imotion, setImotion] = useState<{ id: number; icon: React.ReactElement | string }>({
        id: dataPosts.feel.act,
        icon: dataPosts.feel.act === 1 ? <LikeI /> : <HeartI />,
    });
    const [step, setStep] = useState<number>(0);
    const textA = useRef<any>();
    // const avatar = CommonUtils.convertBase64(dataPosts.user[0].avatar);
    let timeS: any;
    const handleShowI = (e: any) => {
        timeS = setTimeout(() => {
            setActImotion(true);
        }, 500);
    };
    const handleClearI = () => {
        clearTimeout(timeS);
    };
    useEffect(() => {
        if (actImotion) setActImotion(false);
    }, [include]);
    const createdAt = moment(dataPosts.createdAt).format('LLLL');
    const fromNow = moment(moment(dataPosts.createdAt).format('HH:mm:ss DD-MM-YYYY'), 'HH:mm:ss DD-MM-YYYY')
        .locale(lg)
        .fromNow();
    return (
        <Div
            width="100%"
            css={`
                display: block;
                height: 100%;
                margin-top: 20px;
                position: relative;
                color: ${colorText};
            `}
        >
            {options && (
                <>
                    <P
                        z="1.2rem"
                        css={`
                            width: 100%;
                            text-align: center;
                            background-color: #292a2d;
                            padding: 4px;
                            border: 1px solid #565451;
                            @media (min-width: 580px) {
                                font-size: 1.3rem;
                            }
                        `}
                    >
                        This post created in {createdAt}
                    </P>
                    {userId === dataPosts.id_user && <OpUpdate createdAt={createdAt} setOptions={setOptions} />}
                </>
            )}
            <Div
                wrap="wrap"
                css={`
                    width: 100%;
                    overflow: hidden;
                    background-color: ${colorBg === 1 ? '#292a2d' : ''};
                    position: relative;
                    border: 1px solid #353535;
                    @media (min-width: 580px) {
                        border-radius: 5px;
                    }
                `}
            >
                {/* {step === 0 && file.length > 0 && (
                    <DivPos
                        size="18px"
                        top="11px"
                        right="46.5px"
                        css="z-index: 1;"
                        color={colorText}
                        onClick={() => setStep(1)}
                    >
                        <FullScreenI />
                    </DivPos>
                )} */}
                <Div width="100%" css="height: fit-content; margin-top: 5px; position: relative;">
                    <Div
                        css={`
                            width: 35px;
                            height: 35px;
                            margin: 5px;
                        `}
                    >
                        <Avatar
                            radius="50%"
                            src={dataPosts.user[0].Avatar}
                            alt={dataPosts.user[0].fullName}
                            gender={dataPosts.user[0].gender}
                        />
                    </Div>
                    <Div
                        width="60%"
                        wrap="wrap"
                        css={`
                            color: ${colorText};
                            font-size: 1.2rem;
                            padding-top: 2px;
                            align-items: center;
                            margin-bottom: 4px;
                        `}
                    >
                        <H3
                            css={`
                                width: 100%;
                                color: ${colorText};
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                            `}
                        >
                            {dataPosts.user[0].fullName}
                        </H3>
                        <P css=" width: 90px; font-size: 1.1rem; color: #9a9a9a; display: flex; align-items: center; justify-content: space-around; white-space: nowrap;">
                            <LockI />
                            <Span css="padding-top: 3px;">{fromNow}</Span>
                            {/* <Span>{valueSeePost.icon}</Span> */}
                        </P>
                    </Div>
                    <DivPos size="21px" top="4px" right="10px" color={colorText} onClick={() => setOptions(!options)}>
                        <DotI />
                    </DivPos>
                </Div>

                <Div width="100%" css="padding: 5px 6px 10px 6px;">
                    {dataPosts.content.text && (
                        <TextAreaPre
                            // ref={textA}
                            value={dataPosts.content.text}
                            css={`
                                padding: 5px;
                                color: ${colorText};
                                background-color: #292a2d;
                                font-family: ${dataPosts.content.fontFamily}, sans-serif;
                                resize: none;
                            `}
                            readOnly
                        />
                    )}
                </Div>
                <Div
                    width="100%"
                    css={`
                        justify-content: center;
                        position: relative;
                        color: ${colorText};
                        ${step === 1
                            ? 'height: 100%; overflow-y: overlay; position: fixed; top: 0; left: 0; right: 0; align-items: center;  background-color: #1f2021; z-index: 8888; @media(max-width: 769px){&::-webkit-scrollbar {width: 0px;}}'
                            : ''};
                    `}
                >
                    {/* {postTypes[selectType]} */}
                </Div>
                {/* <Div
                    css={`
                        width: 100%;
                        color: ${colorText};
                        font-size: 1.8rem;
                    `}
                >
                    <Div
                        css={`
                            width: fint-content;
                            border-radius: 11px;
                            margin: 8px;
                            @media (min-width: 768px) {
                                &:hover .emoji div {
                                    margin: 0 7px;
                                }
                                &:hover .emoji div span {
                                    display: block;
                                }
                            }
                        `}
                    ></Div>
                </Div> */}
                <Div
                    width="100%"
                    css={`
                        text-align: center;
                        justify-content: space-evenly;
                        font-size: 2.4rem;
                        border-radius: 5px;
                        margin-bottom: 5px;
                        color: ${colorText};
                    `}
                    onClick={(e: any) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    {dataPosts.feel.only.length > 0 && (
                        <DivAction
                            id="parent"
                            css={`
                                @media (min-width: 768px) {
                                    &:hover {
                                        #emoBarPost {
                                            display: flex;
                                            top: -50px;
                                        }
                                    }
                                }
                            `}
                            onTouchStart={handleShowI}
                            onTouchEnd={handleClearI}
                            onClick={() => {
                                if (!actImotion) {
                                    if (typeof imotion.icon === 'string') {
                                        setImotion({
                                            id: dataPosts.feel.act,
                                            icon: dataPosts.feel.act === 1 ? <LikeI /> : <HeartI />,
                                        });
                                    } else {
                                        dataPosts.feel.only.map((i, index, arr) => {
                                            if (i.id === imotion.id) {
                                                setImotion(i);
                                            }
                                        });
                                    }
                                }
                            }}
                        >
                            {imotion.icon}
                            <Div
                                id="emoBarPost"
                                width="fit-content"
                                className="showI"
                                display="none"
                                css={`
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    background-color: #292a2d;
                                    padding: 5px 20px 8px;
                                    border-radius: 50px;
                                    z-index: 7;
                                    ${actImotion && 'display: flex; top: -50px;'};
                                    div {
                                        min-width: 40px;
                                        height: 40px;
                                        padding-top: 2px;
                                        font-size: 28px;
                                        margin: 0;
                                        border-radius: 50%;
                                        cursor: var(--pointer);
                                    }
                                `}
                            >
                                {dataPosts.feel.only.map((i, index, arr) => (
                                    <DivEmoji
                                        key={i.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImotion({ id: i.id, icon: i.icon });
                                            setActImotion(false);
                                        }}
                                    >
                                        {i.icon}
                                    </DivEmoji>
                                ))}
                            </Div>
                        </DivAction>
                    )}
                    {/* compare with id of option in  post's OpText */}
                    {!dataPosts.private.some((p) => p.id === 2) && (
                        <DivAction onClick={() => setShowComment(true)}>
                            <P css="font-size: 1.3rem;">...Comments</P>
                        </DivAction>
                    )}
                    {!dataPosts.private.some((p) => p.id === 3) && (
                        <DivAction>
                            <ShareI />
                        </DivAction>
                    )}
                </Div>
                {/* {showComment && <Comment colorText={colorText} anony={valuePrivacy} setShowComment={setShowComment} />} */}
            </Div>
        </Div>
    );
};
export default Posts;
