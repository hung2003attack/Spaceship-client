import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { Button, Div, H3, Img, P, Span } from '~/reUsingComponents/styleComponents/styleDefault';
import { PropsUserHome } from '../../Home';
import {
    BanI,
    Bullseye,
    DotI,
    FriendI,
    FullScreenI,
    HeartI,
    LockI,
    NextI,
    PlayI,
    PrivateI,
    ScreenI,
    ShareI,
} from '~/assets/Icons/Icons';
import { Player } from 'video-react';
import { DivAction, DivEmoji, DivWrapButton, SpanAmount, TextAreaPre, Textarea } from './styleFormUpNews';
import { useCallback, useEffect, useRef, useState } from 'react';
import Coverflow from './ViewPostFrame/TypeFile/Coverflow';
import Grid from './ViewPostFrame/TypeFile/Grid';
import DefaultType from './ViewPostFrame/TypeFile/DefaultType';
import OptionType from './ViewPostFrame/OptionType';
import HttpRequestHome from '~/restAPI/requestServers/socialNetwork/home';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import OpText from '~/reUsingComponents/Options/text';
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
    colorBg: number;
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
    token: string;
    userId: string;
    upload: any;
}> = ({ user, setPreView, colorText, colorBg, file, upload, valueText, fontFamily, dataText, token, userId }) => {
    const [selectType, setSelectType] = useState<number>(0);
    const [column, setColumn] = useState<number>(3);
    const [step, setStep] = useState<number>(0);
    const [bg, setBg] = useState<string>('#1b1919');
    const [options, setOptions] = useState<boolean>(false);
    const textA = useRef<any>();

    const [typePrivate, setTypePrivate] = useState<{ id: number; name: string }[]>([]);
    const [typeExpire, setTypeExpire] = useState<{ cate: number; name: string; value: number }>();
    const [Imotions, setImotions] = useState<{ id: number; icon: string }[]>([
        { id: 1, icon: '👍' },
        { id: 2, icon: '❤️' },
        { id: 3, icon: '😂' },
        { id: 4, icon: '😍' },
        { id: 5, icon: '😘' },
        { id: 6, icon: '😱' },
        { id: 7, icon: '😡' },
    ]);
    const font = fontFamily?.name + ' ' + fontFamily?.type;

    const [more, setMore] = useState<number[]>([-1]);
    const [OpSelect, setOpSelect] = useState<string[]>([]);

    const images: string[] = [];
    const videos: string[] = [];
    let checkImg = false;
    useEffect(() => {
        if (textA.current) {
            textA.current.setAttribute('style', 'height: auto');
            textA.current.setAttribute('style', `height: ${textA.current.scrollHeight}px`);
        }
    }, [valueText]);
    for (let i = 0; i < file.length; i++) {
        if (file[i].type === 'image') images.push(file[i].link);
        if (file[i].type === 'video') videos.push(file[i].link);
        if (file[i].type === '!images' && checkImg === false) checkImg = true;
    }
    const handlePost = async () => {
        if (upload.length > 0 || valueText) {
            console.log('Option text', 'private', typePrivate, 'Expire', typeExpire);
            let newExpire;
            if (typeExpire?.cate === 1 && typeExpire?.name === 'Minute') {
                newExpire = typeExpire?.value * 60;
            } else if (typeExpire?.cate === 2 && typeExpire?.name === 'Hour') {
                newExpire = typeExpire?.value * 3600;
            } else if (typeExpire?.cate === 3 && typeExpire?.name === 'Date') {
                newExpire = typeExpire?.value * 86400;
            } else if (typeExpire?.cate === 4 && typeExpire?.name === 'Month') {
                newExpire = typeExpire?.value * 262974656;
            } else if (typeExpire?.cate === 5 && typeExpire?.name === 'Year') {
                newExpire = typeExpire?.value * 31536000;
            }

            let res: number | undefined;
            const formData = new FormData();
            formData.append('text', valueText);
            formData.append('category', String(selectType));
            formData.append('fontFamily', font);
            formData.append('private', JSON.stringify(typePrivate));
            formData.append('imotions', JSON.stringify(Imotions));
            if (newExpire) formData.append('expire', String(newExpire));
            for (let fil of upload) {
                if (fil.title) {
                    formData.append('files', fil.file, fil.title);
                } else {
                    formData.append('files', fil.file);
                }
            }

            switch (selectType) {
                case 0:
                    console.log('text', valueText, 'file', upload, 'title', 'fontFamily', font, Imotions);
                    res = await HttpRequestHome.setPost(token, formData);
                    // console.log(res, 'res');

                    break;
                case 1:
                    console.log('text', valueText, 'file', upload, 'fontFamily', font, 'coverflow');
                    // if (upload.length > 2) res = await HttpRequestHome.setPost(token, formData);
                    break;
                case 2:
                    console.log(
                        'text',
                        valueText,
                        'file',
                        upload,
                        'fontFamily',
                        font,
                        'color-bg',
                        bg,
                        'column',
                        column,
                    );
                    // res = await HttpRequestHome.setPost(token, formData);
                    break;
                default:
                    break;
            }
        }
        // const params = {}
        console.log(file, valueText);
    };
    const setHVideo = ` .video-react.video-react-fluid {
                        height: 100%;
                        padding: 0 !important;
                    }`;
    console.log('yess');
    const postTypes = [
        <DefaultType colorText={colorText} file={file} step={step} setStep={setStep} upload={upload} />,
        file.length > 3 ? (
            <Coverflow colorText={colorText} file={file} step={step} setStep={setStep} />
        ) : (
            <P color="#c05d5d">Please select at least 3!</P>
        ),
        <Grid colorText={colorText} file={file} column={column} step={step} setStep={setStep} bg={bg} setBg={setBg} />,
    ];
    let privateA = false;
    let privateI = false;
    let privateC = false;
    typePrivate.map((t) => {
        if (t.id === 1) privateA = true;
        if (t.id === 2) privateI = true;
        if (t.id === 3) privateC = true;
    });
    return (
        <>
            <Div
                width="100%"
                css={`
                    display: block;
                    height: 100%;
                    overflow: overlay;
                    margin-top: 75px;
                    position: relative;
                    color: ${colorText};
                    ${file.length === 1 ? setHVideo : ''};
                `}
            >
                {step < 1 && options && (
                    <OpText
                        more={more}
                        setMore={setMore}
                        OpSelect={OpSelect}
                        setOpSelect={setOpSelect}
                        setOptions={setOptions}
                        typePrivate={typePrivate}
                        setTypePrivate={setTypePrivate}
                        typeExpire={typeExpire}
                        setTypeExpire={setTypeExpire}
                        Imotions={Imotions}
                        setImotions={setImotions}
                    />
                )}
                {setPreView && (
                    <OptionType
                        step={step}
                        selectType={selectType}
                        column={column}
                        setColumn={setColumn}
                        setSelectType={setSelectType}
                        colorText={colorText}
                        colorBg={colorBg}
                        file={file}
                    />
                )}
                <Div
                    wrap="wrap"
                    css={`
                        width: 100%;
                        overflow: hidden;
                        background-color: ${colorBg === 1 ? '#292a2d' : ''};
                        position: relative;
                    `}
                >
                    {step === 0 && file.length > 0 && (
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
                    )}
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
                                <Span>{privateA ? <PrivateI /> : <FriendI />}</Span>
                            </P>
                        </Div>
                        <DivPos
                            size="21px"
                            top="4px"
                            right="10px"
                            color={colorText}
                            onClick={() => setOptions(!options)}
                        >
                            <DotI />
                        </DivPos>
                    </Div>

                    <Div width="100%" css="padding: 5px 6px 10px 6px;">
                        {valueText && (
                            <TextAreaPre
                                ref={textA}
                                value={valueText}
                                css={`
                                    padding: 5px;
                                    color: ${colorText};
                                    background-color: #292a2d;
                                    font-family: ${font}, sans-serif;
                                `}
                                readOnly
                            />
                        )}
                    </Div>
                    <Div
                        width="100%"
                        css={`
                            position: relative;
                            color: ${colorText};
                            ${step === 1
                                ? 'height: 100%; overflow-y: overlay; position: fixed; top: 0; left: 0; right: 0;  background-color: #1f2021; z-index: 8888; @media(max-width: 769px){&::-webkit-scrollbar {width: 0px;}}'
                                : ''};
                        `}
                    >
                        {postTypes[selectType]}
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
                                &:hover .emoji div {
                                    margin: 0 7px;
                                }
                                &:hover .emoji div span {
                                    display: block;
                                }
                            `}
                        >
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

                    {setPreView && (
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
                    )}
                </Div>
            </Div>
        </>
    );
};
export default PreviewPost;
