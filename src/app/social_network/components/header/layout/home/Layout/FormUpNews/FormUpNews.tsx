import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import dataEmoji from '@emoji-mart/data/sets/14/facebook.json';
import Picker from '@emoji-mart/react';
import imageCompression from 'browser-image-compression';
import parse from 'html-react-parser';
import 'video-react/dist/video-react.css';
import './formUpNews.scss';

import { CloseI, IconI, ImageI, PreviewI, TextI, VideoI } from '~/assets/Icons/Icons';

import {
    DivDataFake,
    DivForm,
    DivImage,
    DivItems,
    DivOptions,
    DivUpNews,
    DivWrapButton,
    Form,
    Input,
    Label,
    Textarea,
} from './styleFormUpNews';
import { Button, Buttons, Div, H3, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import Bar from '~/reUsingComponents/Bar/Bar';
import ErrorBoudaries from '~/reUsingComponents/ErrorBoudaries/ErrorBoudaries';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import HoverTitle from '~/reUsingComponents/HandleHover/HoverTitle';
import FontFamilys from '~/reUsingComponents/Font/FontFamilys';
import { Player } from 'video-react';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { PropsUserHome } from '../../Home';
import PreviewPost, { PropsPreViewFormHome } from './PreView';
import { useDispatch } from 'react-redux';
import { setTrueErrorServer } from '~/redux/hideShow';
import CommonUtils from '~/utils/CommonUtils';
export interface PropsFormHome {
    textarea: string;
    buttonOne: string;
    buttonTwo: string;
    emoji: string;
    preView: PropsPreViewFormHome;
}
interface PropsFormUpNews {
    colorText: string;
    colorBg: number;
    user?: PropsUserHome;
    form: PropsFormHome;
    token: string;
    userId: string;
}
const FormUpNews: React.FC<PropsFormUpNews> = ({ form, colorText, colorBg, user, token, userId }) => {
    const dispatch = useDispatch();
    const [displayEmoji, setdisplayEmoji] = useState<boolean>(false);
    const [displayFontText, setDisplayFontText] = useState<boolean>(false);
    const mRef = useRef<any>(0);

    const [preView, setPreView] = useState<ReactNode>();
    const [upload, setupload] = useState<{ link: string; type: string }[]>([]);
    const [inputValue, setInputValue] = useState<any>('');
    const uploadRef = useRef<{ link: string; type: string }[]>([]);
    const [fontFamily, setFontFamily] = useState<{ name: string; type: string }>({
        name: 'Noto Sans',
        type: 'Straight',
    });

    const { textarea, buttonOne, buttonTwo, preView: dataTextPreView } = form;

    const handleOnKeyup = (e: any) => {
        e.target.setAttribute('style', 'height: auto');
        e.target.setAttribute('style', `height: ${e.target.scrollHeight}px`);
    };

    useEffect(() => {
        return clearInterval(mRef.current);
    }, [mRef.current]);
    console.log(form);
    let fileAmount = 15;
    const handleImageUpload = async (e: any) => {
        uploadRef.current = [];
        const file = e.target.files;
        const options = {
            maxSizeMB: 10,
        };

        if (file.length > 0 && file.length < fileAmount) {
            for (let i = 0; i < file.length; i++) {
                console.log(file[i]);
                if (
                    file[i].type.includes('video/mp4') ||
                    file[i].type.includes('video/mov') ||
                    file[i].type.includes('video/x-matroska')
                ) {
                    const url = URL.createObjectURL(file[i]);
                    const vid = document.createElement('video');
                    // create url to use as the src of the video
                    vid.src = url;
                    // wait for duration to change from NaN to the actual duration
                    // eslint-disable-next-line no-loop-func
                    vid.ondurationchange = function () {
                        console.log(vid.duration);

                        vid.duration <= 15
                            ? uploadRef.current.push({ link: url, type: 'video' })
                            : dispatch(setTrueErrorServer('Our length of the video must be less than 16 seconds!'));
                    };
                } else if (
                    file[i].type.includes('image/jpg') ||
                    file[i].type.includes('image/jpeg') ||
                    file[i].type.includes('image/png')
                ) {
                    try {
                        const compressedFile: any = await CommonUtils.compress(file[i]);
                        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                        console.log(`compressedFile size ${(compressedFile.size / 1024 / 1024).toFixed(1)} MB`); // smaller than maxSizeMB
                        const sizeImage = Number((compressedFile.size / 1024 / 1024).toFixed(1));
                        if (sizeImage <= 8) {
                            uploadRef.current.push({ link: URL.createObjectURL(compressedFile), type: 'image' });
                        } else {
                            dispatch(setTrueErrorServer(`${sizeImage}MB big than our limit is 8MB`));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    dispatch(setTrueErrorServer('This format is not support!'));
                }
            }
            const time = setInterval(() => {
                if (uploadRef.current.length > 0) {
                    setupload(uploadRef.current);
                }
                console.log('no');
            }, 1000);
            mRef.current = time;
        } else {
            dispatch(setTrueErrorServer(`You can only select ${fileAmount} file at most!`));
        }
    };

    const handleAbolish = () => {
        setupload([]);
        setInputValue('');
    };
    const handlePost = () => {
        setPreView(
            <PreviewPost
                user={user}
                setPreView={setPreView}
                fontFamily={fontFamily}
                colorText={colorText}
                colorBg={colorBg}
                file={upload}
                valueText={inputValue}
                dataText={dataTextPreView}
                token={token}
                userId={userId}
            />,
        );
    };

    const handleEmojiSelect = (e: any) => {
        setInputValue(inputValue + e.native);
    };
    const handleDisEmoji = useCallback(() => {
        setdisplayEmoji(!displayEmoji);
    }, [displayEmoji]);
    const handleGetValue = (e: { target: { value: any } }) => {
        if (e.target.value.length <= 2500) setInputValue(e.target.value);
    };

    const handleDuration = (e: { target: any }) => {
        console.log(e.target, 'here');
    };
    console.log(upload, 'upload');
    let imageL = 0;
    let videoL = 0;
    for (let i = 0; i < upload.length; i++) {
        upload[i].type === 'image' ? imageL++ : videoL++;
    }
    const cart: { type: ReactNode; amount: number }[] = [
        { type: <ImageI />, amount: imageL },
        { type: <VideoI />, amount: videoL },
    ];
    return (
        <>
            <DivForm top="12px">
                <Form encType="multipart/form-data">
                    <DivUpNews>
                        <DivOptions>
                            {displayEmoji && (
                                <Div
                                    id={colorBg === 1 ? 'pickerB' : ''}
                                    css={`
                                        position: fixed;
                                        bottom: 0px;
                                        z-index: 3;
                                        @media (min-width: 1240px) {
                                            bottom: 30px;
                                            left: -8px;
                                        }
                                    `}
                                >
                                    <DivPos
                                        width="30px"
                                        top="5px"
                                        right="-29px"
                                        size="22px"
                                        color={colorText}
                                        onClick={() => setdisplayEmoji(false)}
                                    >
                                        <CloseI />
                                    </DivPos>
                                    <Picker
                                        locale={form.emoji}
                                        set="facebook"
                                        emojiVersion={14}
                                        data={dataEmoji}
                                        theme={colorBg === 1 ? 'dark' : 'light'}
                                        onEmojiSelect={handleEmojiSelect}
                                    />
                                </Div>
                            )}
                            <Div
                                css={`
                                    width: 100%;
                                    height: 40px;
                                    flex-wrap: wrap;
                                    padding: 0 7px;
                                    margin-top: 5px;
                                    align-items: center;
                                    background-color: #43464c;
                                    border-radius: 10px;
                                    justify-content: space-evenly;
                                `}
                            >
                                <DivItems
                                    bg={displayEmoji ? '#4496dd' : ''}
                                    color={colorText}
                                    position="relative"
                                    onClick={handleDisEmoji}
                                >
                                    🙂
                                </DivItems>
                                <DivItems
                                    bg={displayFontText ? '#4496dd' : ''}
                                    color={colorText}
                                    onClick={() => setDisplayFontText(!displayFontText)}
                                >
                                    🖋️
                                </DivItems>
                                <DivItems>
                                    <input
                                        id="upload"
                                        type="file"
                                        name="file[]"
                                        onChange={handleImageUpload}
                                        multiple
                                        hidden
                                    />
                                    <Label htmlFor="upload" color={colorText}>
                                        🖼️
                                    </Label>
                                </DivItems>

                                <DivItems color={colorText} position="relative">
                                    <HoverTitle
                                        title="Preview"
                                        Tags={Div}
                                        right="none"
                                        left="90px"
                                        top="2px"
                                        color={colorText}
                                        colorBg={colorBg}
                                        children={<PreviewI />}
                                    ></HoverTitle>
                                </DivItems>
                            </Div>
                            {displayFontText && (
                                <FontFamilys
                                    colorBg={colorBg}
                                    colorText={colorText}
                                    fontFamily={fontFamily}
                                    setFontFamily={setFontFamily}
                                    displayEmoji={displayEmoji}
                                    setDisplayFontText={setDisplayFontText}
                                />
                            )}
                            {/* <DivSignature>
                                <SignatureI />
                                </DivSignature> */}
                        </DivOptions>

                        <DivDataFake>
                            <Div width="100%" css="position: relative;">
                                <DivPos
                                    right="12px"
                                    top="10px"
                                    size="20px"
                                    color={colorText}
                                    onClick={() => {
                                        document.querySelector('.textHome')?.setAttribute('style', 'height: 42px');
                                        setInputValue('');
                                    }}
                                >
                                    <CloseI />
                                </DivPos>
                                <Textarea
                                    className="textHome"
                                    color={colorText}
                                    bg={colorBg === 1 ? '#202124f5;' : ''}
                                    font={fontFamily.name + ' ' + fontFamily.type}
                                    value={inputValue}
                                    onKeyUp={handleOnKeyup}
                                    onChange={handleGetValue}
                                    placeholder={textarea}
                                ></Textarea>
                            </Div>
                            {upload.length > 0 && (
                                <>
                                    <Div
                                        width="100%"
                                        css={`
                                            font-size: 20px;
                                            color: ${colorText};
                                            align-items: center;
                                            justify-content: space-between;
                                            background-color: ${colorBg};
                                            padding: 6px 0;
                                            margin-bottom: 8px;
                                        `}
                                    >
                                        {cart.map((c, index) => (
                                            <Div
                                                key={index}
                                                width="49%"
                                                wrap="wrap"
                                                css={`
                                                    align-items: center;
                                                    justify-content: center;
                                                    &:hover {
                                                    }
                                                `}
                                            >
                                                <Div
                                                    width="100%"
                                                    css="justify-content: center; background-color: #43464c; padding: 4px; border-radius: 5px;"
                                                >
                                                    {c.type}
                                                </Div>
                                                <P>{c.amount}</P>
                                            </Div>
                                        ))}
                                    </Div>

                                    <Div
                                        id="videoOver"
                                        css={`
                                            width: 100%;
                                            height: 430px;
                                            justify-content: space-evenly;
                                            overflow-y: overlay;
                                            @media (min-width: 600px) {
                                                height: 550px;
                                            }
                                            @media (min-width: 1300px) {
                                                height: 500px;
                                            }
                                        `}
                                        wrap="wrap"
                                    >
                                        {upload.map((e, index) => {
                                            console.log(e);

                                            if (e.type === 'image') {
                                                return <Img key={index} src={e.link} alt={e.link} />;
                                            } else if (e.type === 'video') {
                                                return <Player key={e.link} src={e.link} />;
                                            }

                                            return <></>;
                                        })}
                                    </Div>
                                </>
                            )}
                        </DivDataFake>
                    </DivUpNews>
                </Form>
                {(inputValue || upload.length > 0) && (
                    <DivWrapButton>
                        <Button size="1.5rem" padding="5px 15px;" bg="#d94755" onClick={handleAbolish}>
                            {buttonOne}
                        </Button>
                        <Button size="1.5rem" padding="5px 14px" bg="#2e54c6" onClick={handlePost}>
                            {buttonTwo}
                        </Button>
                    </DivWrapButton>
                )}
            </DivForm>
            {preView}
        </>
    );
};
export default FormUpNews;
