import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { Button, Div, H3, Img, P, Span } from '~/reUsingComponents/styleComponents/styleDefault';
import { PropsUserHome } from '../../Home';
import {
    BanI,
    Bullseye,
    CameraI,
    DotI,
    EarthI,
    FriendI,
    FullScreenI,
    HeartI,
    IconI,
    LikeI,
    LoadingCircleI,
    LoadingI,
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
import HomeAPI from '~/restAPI/requestServers/socialNetwork/homeAPI';
import { DivLoading, DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import OpFeature from '~/reUsingComponents/Options/OpFeature';
import Dynamic from './ViewPostFrame/TypeFile/Swipers/Dynamic';
import Fade from './ViewPostFrame/TypeFile/Swipers/Fade';
import Cards from './ViewPostFrame/TypeFile/Swipers/Cards';
import Comment from './Comment';
import Centered from './ViewPostFrame/TypeFile/Swipers/Centered';
import Circle from './ViewPostFrame/TypeFile/Circle';
import LogicPreView from './LogicPreView';
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
    user: PropsUserHome;
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
    include: boolean;
    setInclude: React.Dispatch<React.SetStateAction<boolean>>;
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
    include,
    setInclude,
}) => {
    // Select type of post
    const {
        selectType,
        setSelectType,
        selectChild,
        setSelectChild,
        ColumnCentered,
        setColumnCentered,
        column,
        setColumn,
        step,
        setStep,
        options,
        setOptions,
        showAc,
        setShowAc,
        showComment,
        setShowComment,
        showI,
        setShowI,
        acEmo,
        setAcEmo,
        textA,
        valuePrivacy,
        setValuePrivacy,
        valueSeePost,
        setValueSeePost,
        typeExpire,
        setTypeExpire,
        Imotions,
        setImotions,
        ImotionsDel,
        setImotionsDel,
        font,
        more,
        setMore,
        OpSelect,
        setOpSelect,
        images,
        videos,
        checkImg,
        handlePost,
        postTypes,
        handleShowI,
        handleClearI,
        acList,
        loading,
        setLoading,
        actImotion,
        setActImotion,
    } = LogicPreView(
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
        include,
        setInclude,
    );

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
            >
                <Div
                    width="100%"
                    css={`
                        display: block;
                        color: ${colorText};
                        text-align: center;
                        font-size: 1.5rem;
                        margin-bottom: 5px;
                        padding: 5px;
                        background-color: ${colorBg === 1 ? '#292a2d' : ''};
                    `}
                >
                    Pre-View your post here
                </Div>

                {step < 1 && options && (
                    <OpFeature
                        more={more}
                        setMore={setMore}
                        OpSelect={OpSelect}
                        setOpSelect={setOpSelect}
                        setOptions={setOptions}
                        valuePrivacy={valuePrivacy}
                        setValuePrivacy={setValuePrivacy}
                        typeExpire={typeExpire}
                        setTypeExpire={setTypeExpire}
                        Imotions={Imotions}
                        setImotions={setImotions}
                        ImotionsDel={ImotionsDel}
                        setImotionsDel={setImotionsDel}
                        valueSeePost={valueSeePost}
                        setValueSeePost={setValueSeePost}
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
                    {selectType === 1 && selectChild.id === 5 && (
                        <>
                            {dataCenteredPre.length < 3 && (
                                <DivPos
                                    size="18px"
                                    top="32px"
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
                                            top: 9px;
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
                                onClick={() => setColumnCentered(!ColumnCentered)}
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
                                <Span>{valueSeePost.icon}</Span>
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
                                {Imotions.map((i, index, arr) => (
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
                        onClick={(e: any) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        {Imotions.length > 0 && (
                            <DivAction
                                id="parent"
                                css={`
                                    @media (min-width: 768px) {
                                        &:hover {
                                            #emoBar {
                                                display: flex;
                                                top: -50px;
                                            }
                                        }
                                    }
                                `}
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
                                            acList.map((a) => {
                                                return Imotions.some((i) => i.id === a.id) ? (
                                                    <Div
                                                        key={a.id}
                                                        onClick={() => {
                                                            setAcEmo(a);
                                                            setShowAc(false);
                                                        }}
                                                    >
                                                        {a.icon}
                                                    </Div>
                                                ) : (
                                                    ''
                                                );
                                            })}
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
                                    {Imotions.map((i, index, arr) => (
                                        <DivEmoji
                                            key={i.id}
                                            css={`
                                                ${i.id === 1 ? 'padding-bottom: 6px;' : ''}
                                                ${showI?.id === i.id ? 'border: 1px solid #d6d6d6;' : ''}
                                            `}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowI({ id: i.id, icon: i.icon });
                                                setActImotion(false);
                                            }}
                                        >
                                            {i.icon}
                                        </DivEmoji>
                                    ))}
                                </Div>
                            </DivAction>
                        )}
                        {!valuePrivacy.some((t) => t.id === 2) && (
                            <DivAction onClick={() => setShowComment(true)}>
                                <P css="font-size: 1.3rem;">...Comments</P>
                            </DivAction>
                        )}
                        {!valuePrivacy.some((t) => t.id === 3) && (
                            <DivAction>
                                <ShareI />
                            </DivAction>
                        )}
                    </Div>
                    {showComment && (
                        <Comment colorText={colorText} anony={valuePrivacy} setShowComment={setShowComment} />
                    )}
                    <DivWrapButton>
                        {loading ? (
                            <Div width="50%" css="position: relative;">
                                <DivLoading
                                    css={`
                                        margin: 0;
                                        font-size: 40px;
                                    `}
                                >
                                    <LoadingCircleI />
                                </DivLoading>
                                <P
                                    z="1rem"
                                    css={`
                                        width: fit-content;
                                        height: fit-content;
                                        position: absolute;
                                        top: 50%;
                                        left: 50%;
                                        right: 50%;
                                        translate: -50% -50%;
                                        bottom: 50%;
                                    `}
                                >
                                    Posting
                                </P>
                            </Div>
                        ) : (
                            <>
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
                                <Button
                                    type="button"
                                    size="1.5rem"
                                    padding="5px 14px"
                                    bg="#2e54c6"
                                    onClick={handlePost}
                                >
                                    {dataText.buttonTwo}
                                </Button>
                            </>
                        )}
                    </DivWrapButton>
                </Div>
            </Div>
        </>
    );
};
export default PreviewPost;
