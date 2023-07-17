import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { Button, Div, H3, Img, P, Span } from '~/reUsingComponents/styleComponents/styleDefault';
import { PropsUserHome } from '../../Home';
import {
    BanI,
    Bullseye,
    CameraI,
    DotI,
    FriendI,
    FullScreenI,
    HeartI,
    IconI,
    LikeI,
    LockI,
    NextI,
    PlayI,
    PrivateI,
    ScreenI,
    ShareI,
    SmileI,
} from '~/assets/Icons/Icons';
import { Player } from 'video-react';
import {
    DivAction,
    DivEmoji,
    DivItems,
    DivWrapButton,
    Label,
    SpanAmount,
    TextAreaPre,
    Textarea,
} from './styleFormUpNews';
import { useCallback, useEffect, useRef, useState } from 'react';
import Coverflow from './ViewPostFrame/TypeFile/Swipers/Coverflow';
import Grid from './ViewPostFrame/TypeFile/Grid';
import DefaultType from './ViewPostFrame/TypeFile/DefaultType';
import OptionType from './ViewPostFrame/OptionType';
import HttpRequestHome from '~/restAPI/requestServers/socialNetwork/home';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import OpText from '~/reUsingComponents/Options/text';
import Dynamic from './ViewPostFrame/TypeFile/Swipers/Dynamic';
import Fade from './ViewPostFrame/TypeFile/Swipers/Fade';
import Cards from './ViewPostFrame/TypeFile/Swipers/Cards';
import Comment from './Comment';
import Centered from './ViewPostFrame/TypeFile/Swipers/Centered';
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
    upload: {
        file: Blob;
        title: string;
    }[];
    handleImageUpload: (e: any, addMore?: boolean) => Promise<void>;
    dataCentered: {
        id: number;
        columns: number;
        data: {
            file: Blob;
            title: string;
        }[];
    }[];
    setDataCentered: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                columns: number;
                data: {
                    file: Blob;
                    title: string;
                }[];
            }[]
        >
    >;
    dataCenteredPre: {
        id: number;
        columns: number;
        data: {
            link: string;
            type: string;
        }[];
    }[];
    setDataCenteredPre: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                columns: number;
                data: {
                    link: string;
                    type: string;
                }[];
            }[]
        >
    >;
    handleClear: () => void;
}> = ({
    user,
    colorText,
    colorBg,
    file,
    upload,
    valueText,
    fontFamily,
    dataText,
    token,
    userId,
    handleImageUpload,
    dataCentered,
    setDataCentered,
    dataCenteredPre,
    setDataCenteredPre,
    handleClear,
}) => {
    // Select type of post
    const [selectType, setSelectType] = useState<number>(0);
    // select children of swiper
    const [selectChild, setSelectChild] = useState<number>(1);
    const [showColumn, setShowColumn] = useState<boolean>(false);

    // column
    const [column, setColumn] = useState<number>(3);
    const [bg, setBg] = useState<string>('#1b1919');
    // steps of feature
    const [step, setStep] = useState<number>(0);
    // show option of post
    const [options, setOptions] = useState<boolean>(false);
    const [include, setInclude] = useState<boolean>(false);
    const [showAc, setShowAc] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(false);

    const [showI, setShowI] = useState<{ id: number; icon: string } | undefined>();
    const [acEmo, setAcEmo] = useState<{ id: number; icon: React.ReactElement }>({ id: 1, icon: <LikeI /> });
    const textA = useRef<any>();

    // options of post
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
    const acList = [
        { id: 1, icon: <LikeI /> },
        { id: 2, icon: <HeartI /> },
    ];
    const font = fontFamily?.name + ' ' + fontFamily?.type;

    const [more, setMore] = useState<number[]>([-1]);
    const [OpSelect, setOpSelect] = useState<string[]>([]);

    const images: string[] = [];
    const videos: string[] = [];
    let checkImg = false;
    useEffect(() => {
        if (textA.current) {
            textA.current.setAttribute('style', 'height: auto');
            textA.current.setAttribute('style', `height: ${textA.current.scrollHeight - 20}px`);
        }
    }, [valueText]);
    useEffect(() => {
        if (selectType === 1 && selectChild === 5 && dataCentered.length === 0) {
            setDataCentered([{ id: 1, columns: 4, data: upload }]);
            setDataCenteredPre([{ id: 1, columns: 4, data: file }]);
        }
        console.log(dataCentered, 'ataCentered', dataCenteredPre);
    }, [selectChild]);

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

            let res: any;
            let id_c: string[] = [];
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
            console.log('private', typePrivate);

            switch (selectType) {
                case 0:
                    console.log('text', valueText, 'file', upload, 'title', 'fontFamily', font, Imotions);
                    // res = await HttpRequestHome.setPost(token, formData);
                    // console.log(res, 'res');
                    console.log(res, 'res');
                    // id_c = res.id_c;

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
            console.log(id_c, 'id_c');
            if (id_c.length > 0) {
                // const exp = await HttpRequestHome.exp(token, id_c, newExpire);
            }
        }
    };
    const postTypes = [
        <DefaultType colorText={colorText} file={file} step={step} setStep={setStep} upload={upload} />,
        file.length > 3 ? (
            [
                <Dynamic colorText={colorText} file={file} step={step} setStep={setStep} />,
                <Fade colorText={colorText} file={file} step={step} setStep={setStep} />,
                <Cards colorText={colorText} file={file} step={step} setStep={setStep} />,
                <Coverflow colorText={colorText} file={file} step={step} setStep={setStep} />,
                <Centered
                    colorText={colorText}
                    file={file}
                    step={step}
                    setStep={setStep}
                    handleImageUpload={handleImageUpload}
                    showColumn={showColumn}
                    dataCentered={dataCentered}
                    setDataCentered={setDataCentered}
                    dataCenteredPre={dataCenteredPre}
                    setDataCenteredPre={setDataCenteredPre}
                />,
            ][selectChild - 1]
        ) : (
            <P color="#c05d5d">Please select at least 3!</P>
        ),
        <Grid colorText={colorText} file={file} column={column} step={step} setStep={setStep} bg={bg} setBg={setBg} />,
    ];
    // show icion private
    let privateA = false;
    let privateI = false;
    let privateC = false;
    typePrivate.map((t) => {
        if (t.id === 1) privateA = true;
        if (t.id === 2) privateI = true;
        if (t.id === 3) privateC = true;
    });
    let timeS: any;
    const handleShowI = (e: any) => {
        timeS = setTimeout(() => {
            setInclude(true);
        }, 500);
    };
    const handleClearI = () => {
        clearTimeout(timeS);
    };

    return (
        <>
            <Div
                width="100%"
                css={`
                    display: block;
                    height: 100%;
                    margin-top: 75px;
                    position: relative;
                    color: ${colorText};
                `}
                onClick={() => setInclude(false)}
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
                {file.length > 0 && (
                    <OptionType
                        step={step}
                        selectType={selectType}
                        selectChild={selectChild}
                        setSelectChild={setSelectChild}
                        column={column}
                        setColumn={setColumn}
                        setSelectType={setSelectType}
                        colorText={colorText}
                        colorBg={colorBg}
                        file={file}
                    />
                )}
                {/* <Div
                    width="100%"
                    css={`
                        height: 25px;
                        border-left: 1px solid #353535;
                        border-right: 1px solid #353535;
                        border-top: 1px solid #353535;
                        border-bottom: 1px solid #525150;
                        border-top-left-radius: 5px;
                        border-top-right-radius: 5px;
                        background-color: #292a2d;
                    `}
                ></Div> */}
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
                    {selectType === 1 && selectChild === 5 && (
                        <>
                            {dataCenteredPre.length < 3 && (
                                <DivPos
                                    size="18px"
                                    top="25px"
                                    right="19px"
                                    css={`
                                        z-index: 1;
                                        label {
                                            font-size: 1.3rem;
                                        }
                                        div {
                                            width: fit-content;
                                        }
                                        @media (min-width: 370px) {
                                            top: 2px;
                                            right: 77px;
                                        }
                                    `}
                                    color={colorText}
                                >
                                    <DivItems>
                                        <input
                                            id="uploadCen"
                                            type="file"
                                            name="file[]"
                                            onChange={(e) => handleImageUpload(e, true)}
                                            multiple
                                            hidden
                                        />
                                        <Label htmlFor="uploadCen" color={colorText}>
                                            Thêm Hàng
                                        </Label>
                                    </DivItems>
                                </DivPos>
                            )}
                            <DivPos
                                size="18px"
                                top="30px"
                                right="105px"
                                css={`
                                    z-index: 1;
                                    p {
                                        font-size: 1.3rem;
                                        padding: 2px;
                                    }

                                    @media (min-width: 370px) {
                                        top: 32px;
                                        right: 88px;
                                    }
                                    @media (min-width: 450px) {
                                        top: 6px;
                                        right: 165px;
                                    }
                                `}
                                color={colorText}
                                onClick={() => setShowColumn(!showColumn)}
                            >
                                <P>Columns</P>
                            </DivPos>
                        </>
                    )}
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
                                @media (min-width: 768px) {
                                    &:hover .emoji div {
                                        margin: 0 7px;
                                    }
                                    &:hover .emoji div span {
                                        display: block;
                                    }
                                }
                            `}
                        >
                            <Div className="emoji" css="margin-left: 2px; align-items: flex-end;">
                                {Imotions.map((i) => (
                                    <DivEmoji key={i.id} index={i.id}>
                                        {i.icon}
                                    </DivEmoji>
                                ))}
                            </Div>
                        </Div>
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
                        onClick={(e) => e.stopPropagation()}
                    >
                        {Imotions.length > 0 && (
                            <DivAction
                                id="parent"
                                onTouchStart={handleShowI}
                                onTouchEnd={handleClearI}
                                onClick={() => {
                                    if (showI) {
                                        setShowI(undefined);
                                    } else {
                                        Imotions.forEach((i) => {
                                            if (i.id === acEmo.id) {
                                                setShowI(i);
                                            }
                                        });
                                    }
                                }}
                            >
                                {showI?.icon || acEmo.icon}
                                <Div
                                    css="font-size: 15px; position: absolute; right: 5px;"
                                    onClick={() => setShowAc(true)}
                                >
                                    <IconI />
                                </Div>
                                {showAc && (
                                    <Div
                                        css={`
                                            width: 100%;
                                            height: 100%;
                                            position: absolute;
                                            top: 3px;
                                            justify-content: center;
                                            align-items: center;
                                            background-color: #292a2d;
                                        `}
                                    >
                                        {showAc &&
                                            acList.map((a) => (
                                                <Div
                                                    key={a.id}
                                                    onClick={() => {
                                                        setAcEmo(a);
                                                        setShowAc(false);
                                                    }}
                                                >
                                                    {a.icon}
                                                </Div>
                                            ))}
                                    </Div>
                                )}
                                <Div
                                    id="emoBar"
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
                                        ${include && 'display: flex; top: -92px;'}
                                        div {
                                            min-width: 40px;
                                            height: 40px;
                                            padding-top: 2px;
                                            font-size: 28px;
                                            margin: 0;
                                            border-radius: 50%;
                                            cursor: var(--pointer);
                                        }
                                        @media (min-width: 768px) {
                                            &:hover {
                                                #emoBar {
                                                    display: flex;
                                                    top: -92px;
                                                }
                                            }
                                        }
                                    `}
                                >
                                    {Imotions.map((i) => (
                                        <DivEmoji
                                            key={i.id}
                                            css={`
                                                ${i.id === 1 ? 'padding-bottom: 6px;' : ''}
                                                ${showI?.id === i.id ? 'border: 1px solid #d6d6d6;' : ''}
                                            `}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowI({ id: i.id, icon: i.icon });
                                                setInclude(false);
                                            }}
                                        >
                                            {i.icon}
                                        </DivEmoji>
                                    ))}
                                </Div>
                            </DivAction>
                        )}
                        {!typePrivate.some((t) => t.id === 3) && (
                            <DivAction onClick={() => setShowComment(true)}>
                                <P css="font-size: 1.3rem;">...Comments</P>
                            </DivAction>
                        )}
                        {!typePrivate.some((t) => t.id === 4) && (
                            <DivAction>
                                <ShareI />
                            </DivAction>
                        )}
                    </Div>
                    {showComment && (
                        <Comment colorText={colorText} anony={typePrivate} setShowComment={setShowComment} />
                    )}
                    <DivWrapButton>
                        <Button
                            type="button"
                            size="1.5rem"
                            padding="5px 15px;"
                            bg="#d94755"
                            onClick={() => {
                                handleClear();
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
