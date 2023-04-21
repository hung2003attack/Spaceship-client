import { useRef, useState } from 'react';
import dataEmoji from '@emoji-mart/data/sets/14/facebook.json';
import Picker from '@emoji-mart/react';
import imageCompression from 'browser-image-compression';
import parse from 'html-react-parser';
import 'video-react/dist/video-react.css';
import './formUpNews.scss';

import { CloseI, IconI, ImageI, PreviewI, TextI } from '~/assets/Icons/Icons';

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
import { DivClose } from '~/reUsingComponents/styleComponents/styleComponents';
import HoverTitle from '~/reUsingComponents/HandleHover/HoverTitle';
import FontFamilys from '~/reUsingComponents/Font/FontFamilys';
import { Player } from 'video-react';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { PropsUserHome } from '../../Home';
interface PropsFormUpNews {
    colorText: string;
    colorBg: string;
    dataUser?: PropsUserHome;
}
const FormUpNews: React.FC<PropsFormUpNews> = ({ colorText, colorBg, dataUser }) => {
    const [displayEmoji, setdisplayEmoji] = useState<boolean>(false);
    const [displayFontText, setDisplayFontText] = useState<boolean>(false);
    const [upload, setupload] = useState<{ link: string; type: string }[]>([]);
    const [error, setError] = useState<{ error: boolean; content: string }>({ error: false, content: '' });
    const [inputValue, setInputValue] = useState<any>('');
    const uploadRef = useRef<{ link: string; type: string }[]>([]);
    const [fontFamily, setFontFamily] = useState<{ name: string; type: string }>({
        name: 'Noto Sans',
        type: 'Straight',
    });
    const handleOnKeyup = (e: any) => {
        e.target.setAttribute('style', 'height: auto');
        e.target.setAttribute('style', `height: ${70 + e.target.scrollHeight}px`);
    };
    const handleImageUpload = async (e: any) => {
        uploadRef.current = [];
        const file = e.target.files;
        const options = {
            maxSizeMB: 10,
        };
        if (file.length > 0 && file.length < 5) {
            for (let i = 0; i < file.length; i++) {
                console.log(file[i]);

                if (file[i].type.includes('video/mp4') || file[i].type.includes('video/mov')) {
                    uploadRef.current.push({ link: URL.createObjectURL(file[i]), type: 'video' });
                } else if (
                    file[i].type.includes('image/jpg') ||
                    file[i].type.includes('image/jpeg') ||
                    file[i].type.includes('image/png')
                ) {
                    try {
                        const compressedFile = await imageCompression(file[i], options);
                        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                        console.log(`compressedFile size ${(compressedFile.size / 1024 / 1024).toFixed(1)} MB`); // smaller than maxSizeMB
                        const sizeImage = Number((compressedFile.size / 1024 / 1024).toFixed(1));
                        if (sizeImage <= 8) {
                            uploadRef.current.push({ link: URL.createObjectURL(compressedFile), type: 'image' });
                        } else {
                            setError({ error: true, content: `${sizeImage}MB big than our limit is 8MB` });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    setError({ error: true, content: 'This format is not support!' });
                }
            }
            console.log('hello3', upload, uploadRef);
            setupload(uploadRef.current);
        } else {
            setError({ error: true, content: 'You can only select 4 pictures at most!' });
        }
    };

    const handleAbolish = () => {
        console.log('hello');
    };
    const handlePost = () => {
        console.log('hello2');
    };

    const handleEmojiSelect = (e: any) => {
        setInputValue(inputValue + e.native);
    };
    const handleDisEmoji = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setdisplayEmoji(!displayEmoji);
    };
    const handleGetValue = (e: { target: { value: any } }) => {
        if (e.target.value.length <= 2500) setInputValue(e.target.value);
    };

    return (
        <>
            <ErrorBoudaries check={error.error} setError={setError} message={error.content} />
            <DivForm top="12px">
                <Form encType="multipart/form-data">
                    <DivUpNews>
                        <DivOptions>
                            {displayEmoji && (
                                <Div
                                    id={colorBg === '#202124' ? 'pickerB' : ''}
                                    css="position: fixed; bottom: 0px; z-index: 3;"
                                >
                                    <Picker
                                        set="facebook"
                                        emojiVersion={14}
                                        data={dataEmoji}
                                        theme={colorBg === '#202124' ? 'dark' : 'light'}
                                        onEmojiSelect={handleEmojiSelect}
                                    />
                                </Div>
                            )}
                            {displayFontText && (
                                <FontFamilys
                                    colorBg={colorBg}
                                    colorText={colorText}
                                    fontFamily={fontFamily}
                                    setFontFamily={setFontFamily}
                                    displayEmoji={displayEmoji}
                                />
                            )}

                            <Div
                                css={`
                                    width: 277px;
                                    height: 40px;
                                    flex-wrap: wrap;
                                    padding: 0 7px;
                                    margin-top: 5px;
                                    align-items: center;
                                    background-color: #43464c;
                                    border-radius: 10px;
                                `}
                            >
                                <DivItems color={colorText} position="relative" onClick={handleDisEmoji}>
                                    🙂
                                </DivItems>
                                <DivItems color={colorText} onClick={() => setDisplayFontText(!displayFontText)}>
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
                            {/* <DivSignature>
                                <SignatureI />
                                </DivSignature> */}
                        </DivOptions>

                        <DivDataFake>
                            <DivClose
                                right="16px"
                                top="70px"
                                size="25px"
                                color={colorText}
                                onClick={() => setInputValue('')}
                            >
                                <CloseI />
                            </DivClose>
                            <Textarea
                                color={colorText}
                                bg={colorBg}
                                font={fontFamily.name + ' ' + fontFamily.type}
                                value={inputValue}
                                onKeyUp={handleOnKeyup}
                                onChange={handleGetValue}
                                placeholder="What's on your mind?"
                            ></Textarea>
                            {upload.length > 0 && (
                                <Div
                                    css={`
                                        width: 100%;
                                        height: ${upload.length > 1 ? '211px' : '222px'};
                                        justify-content: space-evenly;
                                        overflow-y: overlay;
                                        @media (min-width: 400) {
                                        }
                                    `}
                                    wrap="wrap"
                                >
                                    {upload.map((e, index) => {
                                        console.log(e);

                                        if (e.type === 'image') {
                                            return (
                                                <DivImage
                                                    key={index}
                                                    src={e.link}
                                                    border={
                                                        upload.length > 1 ? '4px solid #3a3b3e; margin: 0.5px' : 'none'
                                                    }
                                                ></DivImage>
                                            );
                                        } else if (e.type === 'video') {
                                            return (
                                                <Player key={e.link}>
                                                    <source src={e.link} />
                                                </Player>
                                            );
                                        }
                                        return <></>;
                                    })}
                                </Div>
                            )}
                        </DivDataFake>
                    </DivUpNews>
                </Form>
                <DivWrapButton>
                    <Button size="1.5rem" padding="5px 15px;" bg="#d94755" onClick={handleAbolish}>
                        Abolish
                    </Button>
                    <Button size="1.5rem" padding="5px 14px" bg="#2e54c6" onClick={handlePost}>
                        Continue
                    </Button>
                </DivWrapButton>
                <Bar
                    css="
                            width: 100%;
                            height: 21px;
                            position: relative;
                            display: flex;
                            justify-content: center;
                                "
                    top="calc(95% - 10px);"
                    rotate="90deg"
                />
            </DivForm>
        </>
    );
};
export default FormUpNews;
