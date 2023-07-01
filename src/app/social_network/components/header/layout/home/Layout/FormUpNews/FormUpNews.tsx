import dataEmoji from '@emoji-mart/data/sets/14/facebook.json';
import Picker from '@emoji-mart/react';
import 'video-react/dist/video-react.css';
import './formUpNews.scss';

import { CloseI, PreviewI } from '~/assets/Icons/Icons';

import { Player } from 'video-react';
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
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import HoverTitle from '~/reUsingComponents/HandleHover/HoverTitle';
import FontFamilys from '~/reUsingComponents/Font/FontFamilys';
import { PropsPreViewFormHome } from './PreView';
import LogicForm from './LogicForm';
import { PropsUserHome } from '../../Home';
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
}
const FormUpNews: React.FC<PropsFormUpNews> = ({ form, colorText, colorBg, user }) => {
    const {
        displayEmoji,
        setdisplayEmoji,
        handleEmojiSelect,
        handleDisEmoji,
        displayFontText,
        handleImageUpload,
        fontFamily,
        inputValue,
        handleOnKeyup,
        handleGetValue,
        textarea,
        setFontFamily,
        setDisplayFontText,
        setInputValue,
        upload,
        cart,
        handleAbolish,
        buttonOne,
        buttonTwo,
        handlePost,
        preView,
    } = LogicForm(form, colorText, colorBg, user);
    return (
        <>
            <DivForm top="12px">
                <Form method="post" encType="multipart/form-data">
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
