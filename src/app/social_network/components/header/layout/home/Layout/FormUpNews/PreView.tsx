import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { Button, Div, H3, Img, P, Span } from '~/reUsingComponents/styleComponents/styleDefault';
import { PropsUserHome } from '../../Home';
import { Bullseye, DotI, FriendI, HeartI, LockI, NextI, ShareI } from '~/assets/Icons/Icons';
import { Player } from 'video-react';
import { DivAction, DivEmoji, DivWrapButton, SpanAmount } from './styleFormUpNews';
import { useCallback, useEffect, useRef, useState } from 'react';
import Coverflow from './ViewPostFrame/TypeFile/Coverflow';
import OnlyImages from './ViewPostFrame/TypeFile/OnlyImages';
import DefaultType from './ViewPostFrame/TypeFile/DefaultType';
export interface PropsPreViewFormHome {
    time: {
        hour: string;
        minute: string;
        second: string;
    };
    buttonFirst: string;
    buttonTwo: string;
}
const PreviewPost: React.FC<{
    user?: PropsUserHome;
    setPreView?: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    colorText: string;
    colorBg: string;
    file: {
        link: string;
        type: string;
    }[];
    fontFamily: {
        name: string;
        type: string;
    };
    valueText: string;
    dataText: PropsPreViewFormHome;
}> = ({ user, setPreView, colorText, colorBg, file, valueText, fontFamily, dataText }) => {
    const images: string[] = [];
    const videos: string[] = [];
    let checkImg = false;
    for (let i = 0; i < file.length; i++) {
        if (file[i].type === 'image') images.push(file[i].link);
        if (file[i].type === 'video') videos.push(file[i].link);
        if (file[i].type === '!images' && checkImg === false) checkImg = true;
    }
    console.log(images);
    const handleAbolish = () => {};
    const handlePost = () => {};
    const tRef = useRef<any>();
    const [t, setT] = useState<any>();
    const setHVideo = ` .video-react.video-react-fluid {
                        height: 100%;
                        padding: 0 !important;
                    }`;
    let i = 'bottom';
    let z = 0;

    return (
        <>
            <Div
                width="100%"
                css={`
                    display: block;
                    height: 100%;
                    overflow: overlay;
                    margin-top: 75px;
                    ${file.length === 1 ? setHVideo : ''}
                `}
            >
                {setPreView && (
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
                            background-color: #212225;
                        `}
                    >
                        Pre-View your post here
                    </Div>
                )}
                <Div
                    wrap="wrap"
                    css={`
                        width: 100%;
                        overflow: hidden;
                        background-color: #202124f5;
                    `}
                >
                    <Div width="100%" css="height: fit-content;">
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
                                <Span>
                                    <FriendI />
                                </Span>
                            </P>
                        </Div>
                    </Div>

                    <Div width="100%" css="padding: 5px 6px 10px 6px;">
                        <P
                            css={`
                                font-size: 1.4rem;
                                color: ${colorText};
                                font-family: ${fontFamily?.name + ' ' + fontFamily?.type}, sans-serif;
                            `}
                        >
                            {valueText}
                        </P>
                    </Div>
                    <Div css="position: relative;">
                        {/* {!checkImg && <OnlyImages images={images} />} */}
                        {/* {true && <DefaultType file={file} />} */}
                        <Coverflow file={file} />
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
                                background-color: #eeeeee4a;
                                border-radius: 11px;
                                margin: 8px;
                                &:hover .emoji div {
                                    margin: 0 7px;
                                }
                                &:hover .emoji div span {
                                    display: block;
                                }
                            `}
                        >
                            <Div
                                css="
                                    z-index: 8;
                                    @media (min-width: 350px) {
                                        font-size: 2.1rem;
                                    }
                                    @media (min-width: 450px) {
                                        font-size: 2.3rem;
                                    }"
                            >
                                <Bullseye />
                            </Div>
                            <Div className="emoji" css="margin-left: 2px; align-items: flex-end;">
                                <DivEmoji index={7}>
                                    👍<SpanAmount>10</SpanAmount>
                                </DivEmoji>
                                <DivEmoji index={6}>
                                    ❤️<SpanAmount>5</SpanAmount>
                                </DivEmoji>
                                <DivEmoji index={5}>
                                    😂<SpanAmount>4</SpanAmount>
                                </DivEmoji>
                                <DivEmoji index={4}>
                                    😍<SpanAmount>30</SpanAmount>
                                </DivEmoji>
                                <DivEmoji index={3}>😘</DivEmoji>
                                <DivEmoji index={2}>😱</DivEmoji>
                                <DivEmoji index={1}>😡</DivEmoji>
                            </Div>
                            <Div
                                css="
                                    @media (min-width: 350px) {
                                        font-size: 2rem;
                                    }
                                    @media (min-width: 450px) {
                                        font-size: 2.3rem;
                                    }"
                            >
                                <NextI />
                            </Div>
                        </Div>
                        {/* <DivEmoji>👍 20</DivEmoji>
                        <DivEmoji>❤️ 5</DivEmoji>
                        <DivEmoji>😂 30</DivEmoji>
                        <DivEmoji>😍</DivEmoji>
                        <DivEmoji>😘</DivEmoji>
                        <DivEmoji>😱</DivEmoji>
                        <DivEmoji>😡</DivEmoji> */}
                    </Div>
                    <Div
                        width="100%"
                        css={`
                            text-align: center;
                            justify-content: space-evenly;
                            font-size: 2.4rem;
                            border-radius: 5px;
                            border-top: 1px solid #555353de;
                            border-bottom: 1px solid #555353de;
                            color: ${colorText};
                        `}
                    >
                        <DivAction>
                            <HeartI />
                        </DivAction>
                        <DivAction>
                            <P css="font-size: 1.3rem;">...Comments</P>
                        </DivAction>
                        <DivAction>
                            <P css="font-size: 1.2rem;">325</P> <ShareI />
                        </DivAction>
                    </Div>

                    <DivWrapButton>
                        <Button
                            size="1.5rem"
                            padding="5px 15px;"
                            bg="#d94755"
                            onClick={() => {
                                if (setPreView) setPreView('');
                            }}
                        >
                            {dataText.buttonFirst}
                        </Button>
                        <Button size="1.5rem" padding="5px 14px" bg="#2e54c6" onClick={handlePost}>
                            {dataText.buttonTwo}
                        </Button>
                    </DivWrapButton>
                </Div>
            </Div>
        </>
    );
};
export default PreviewPost;
