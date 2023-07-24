import dataEmoji from '@emoji-mart/data/sets/14/facebook.json';
import Picker from '@emoji-mart/react';
import 'video-react/dist/video-react.css';
import './formUpNews.scss';

import { CameraI, CloseI, LoadingI, PreviewI } from '~/assets/Icons/Icons';

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
import { DivLoading, DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import HoverTitle from '~/reUsingComponents/HandleHover/HoverTitle';
import FontFamilys from '~/reUsingComponents/Font/FontFamilys';
import PreviewPost, { PropsPreViewFormHome } from './PreView';
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
    user: PropsUserHome;
    form: PropsFormHome;
    include: boolean;
    setInclude: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormUpNews: React.FC<PropsFormUpNews> = ({ form, colorText, colorBg, user, include, setInclude }) => {
    const {
        displayEmoji,
        setdisplayEmoji,
        handleEmojiSelect,
        handleDisEmoji,
        displayFontText,
        handleImageUpload,
        fontFamily,
        inputValue,
        setInputValue,
        handleOnKeyup,
        handleGetValue,
        textarea,
        setFontFamily,
        setDisplayFontText,
        uploadPre,
        loading,
        uploadRef,
        dataTextPreView,
        token,
        userId,
        dataCentered,
        setDataCentered,
        dataCenteredPre,
        setDataCenteredPre,
        handleClear,
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
                                    height: 30px;
                                    flex-wrap: wrap;
                                    padding: 0 7px;
                                    margin-top: 5px;
                                    align-items: center;
                                    background-color: #43464c;
                                    border-radius: 10px;
                                    justify-content: space-evenly;
                                    border: 1px solid #6a6a6a;
                                    @media (min-width: 500px) {
                                        height: 35px;
                                    }
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
                                        onChange={(e) => handleImageUpload(e)}
                                        multiple
                                        hidden
                                    />
                                    <Label htmlFor="upload" color={colorText}>
                                        <CameraI />
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
                                    BoBg="transparent"
                                ></Textarea>
                            </Div>
                            {loading && (
                                <DivLoading>
                                    <LoadingI />
                                </DivLoading>
                            )}
                            {(inputValue || uploadPre.length > 0) && (
                                <PreviewPost
                                    upload={uploadRef.current}
                                    user={user}
                                    fontFamily={fontFamily}
                                    colorText={colorText}
                                    colorBg={colorBg}
                                    file={uploadPre}
                                    valueText={inputValue}
                                    dataText={dataTextPreView}
                                    token={token}
                                    userId={userId}
                                    handleImageUpload={handleImageUpload}
                                    dataCentered={dataCentered}
                                    setDataCentered={setDataCentered}
                                    dataCenteredPre={dataCenteredPre}
                                    setDataCenteredPre={setDataCenteredPre}
                                    handleClear={handleClear}
                                    include={include}
                                    setInclude={setInclude}
                                />
                            )}
                        </DivDataFake>
                    </DivUpNews>
                </Form>
                {/* {(inputValue || upload.length > 0) && (
                    <DivWrapButton>
                        <Button size="1.5rem" padding="5px 15px;" bg="#d94755" onClick={handleAbolish}>
                            {buttonOne}
                        </Button>
                        <Button size="1.5rem" padding="5px 14px" bg="#2e54c6" onClick={handlePost}>
                            {buttonTwo}
                        </Button>
                    </DivWrapButton>
                )} */}
            </DivForm>
            {/* {preView} */}
        </>
    );
};
export default FormUpNews;
