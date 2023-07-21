import { DivContainer, DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { DivNews } from './stylePost';
import { useEffect, useRef, useState } from 'react';
import homeAPI from '~/restAPI/requestServers/socialNetwork/homeAPI';
import CookiesF from '~/reUsingComponents/cookies';
import { Div, H3, P, Span } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivAction } from '../FormUpNews/styleFormUpNews';
import { DotI, FullScreenI, LockI, ShareI } from '~/assets/Icons/Icons';
import Comment from '../FormUpNews/Comment';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { PropsUserHome } from '../../Home';

interface PropsPosts {
    user: PropsUserHome;
    colorBg: number;
    colorText: string;
}
const Posts: React.FC<PropsPosts> = ({ user, colorBg, colorText }) => {
    const [dataPosts, setDataPosts] = useState<
        {
            _id: string;
            category: number;
            id_user: string;
            feel: { like: string; love: string; smile: string; sad: string; only: string };
            commentsOne: string;
            amountComments: number;
            content: {
                options: {
                    default: {
                        comments: {
                            id_user: string;
                            anonymous: boolean;
                            content: {
                                text: string;
                                imageOrVideos: {
                                    file: string[];
                                    feel: {
                                        like: number;
                                        love: number;
                                        smile: number;
                                        sad: number;
                                        only: { id: string; icon: string };
                                    };
                                };
                            };
                            reply: [
                                {
                                    id_user: { type: string; maxLength: 50; required: true };
                                    content: { text: { type: string; text: string }; imageOrVideos: [String] };
                                    anonymous: { type: Boolean; defaultValue: false };
                                },
                            ];
                        };
                        file: string;
                        love: { id_user: string[] };
                        title: string;
                        _id: string;
                    }[];
                    grid: string;
                    onlyImage: string;
                    swiper: string;
                };
                text: string;
            };
            createdAt: string;
            private: string;
        }[]
    >([]);
    const { token } = CookiesF();
    const offest = useRef<number>(0);
    const limit = 5;
    const [showComment, setShowComment] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0);

    useEffect(() => {
        async function fetch() {
            const data = await homeAPI.getPosts(token, limit, offest.current, 'friend');
            console.log(data, 'fet');
        }
        fetch();
    }, []);
    return (
        <Div
            width="100%"
            css={`
                display: block;
                height: 100%;
                margin-top: 75px;
                position: relative;
                color: ${colorText};
            `}
        >
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
                        <Avatar radius="50%" src={user?.avatar} alt={user?.fullName} gender={user?.gender} />
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
                            {user?.fullName}
                        </H3>
                        <P css=" width: 52px; font-size: 1.1rem; color: #9a9a9a; display: flex; align-items: center; justify-content: space-around;">
                            <LockI />
                            <Span css="padding-top: 3px;">3h</Span>
                            {/* <Span>{valueSeePost.icon}</Span> */}
                        </P>
                    </Div>
                    {/* <DivPos size="21px" top="4px" right="10px" color={colorText} onClick={() => setOptions(!options)}>
                        <DotI />
                    </DivPos> */}
                </Div>

                <Div width="100%" css="padding: 5px 6px 10px 6px;">
                    {/* {valueText && (
                        <TextAreaPre
                            ref={textA}
                            value={valueText}
                            css={`
                                padding: 5px;
                                color: ${colorText};
                                background-color: #292a2d;
                                font-family: ${font}, sans-serif;
                                resize: none;
                            `}
                            readOnly
                        />
                    )} */}
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
                <Div
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
                </Div>
                <Div
                    width="100%"
                    css={`
                        text-align: center;
                        justify-content: space-evenly;
                        font-size: 2.4rem;
                        border-radius: 5px;
                        margin-bottom: 15px;
                        color: ${colorText};
                    `}
                    onClick={(e: any) => e.stopPropagation()}
                >
                    <DivAction onClick={() => setShowComment(true)}>
                        <P css="font-size: 1.3rem;">...Comments</P>
                    </DivAction>
                    <DivAction>
                        <ShareI />
                    </DivAction>
                </Div>
                {/* {showComment && <Comment colorText={colorText} anony={valuePrivacy} setShowComment={setShowComment} />} */}
            </Div>
        </Div>
    );
};
export default Posts;
