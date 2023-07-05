import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import PreviewPost from './PreView';
import { ImageI, VideoI } from '~/assets/Icons/Icons';
import { setTrueErrorServer } from '~/redux/hideShow';
import { useDispatch } from 'react-redux';
import { PropsFormHome } from './FormUpNews';
import { PropsUserHome } from '../../Home';
import CommonUtils from '~/utils/CommonUtils';
import { useCookies } from 'react-cookie';

export default function LogicForm(form: PropsFormHome, colorText: string, colorBg: number, user?: PropsUserHome) {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['tks', 'k_user']);
    const token = cookies.tks;
    const userId = cookies.k_user;

    const [displayEmoji, setdisplayEmoji] = useState<boolean>(false);
    const [displayFontText, setDisplayFontText] = useState<boolean>(false);
    const mRef = useRef<any>(0);

    const [preView, setPreView] = useState<ReactNode>();
    const [upload, setupload] = useState<{ link: string; type: string }[]>([]);
    const [inputValue, setInputValue] = useState<any>('');
    const uploadPre = useRef<{ link: string; type: string }[]>([]);
    const uploadRef = useRef<{ file: Blob; title: string }[]>([]);
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
    let fileAmount = 25;
    const handleImageUpload = async (e: any) => {
        uploadPre.current = [];
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

                        vid.duration <= 150
                            ? uploadPre.current.push({ link: url, type: 'video' })
                            : dispatch(setTrueErrorServer('Our length of the video must be less than 16 seconds!'));
                    };
                } else if (
                    file[i].type.includes('image/jpg') ||
                    file[i].type.includes('image/jpeg') ||
                    file[i].type.includes('image/png')
                ) {
                    try {
                        if (Number((file.size / 1024 / 1024).toFixed(1)) <= 8) {
                            uploadRef.current.push({ file: file[i], title: '' });
                            uploadPre.current.push({ link: URL.createObjectURL(file), type: 'image' });
                        } else {
                            const compressedFile: any = await CommonUtils.compress(file[i]);
                            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                            console.log(`compressedFile size ${(compressedFile.size / 1024 / 1024).toFixed(1)} MB`); // smaller than maxSizeMB
                            const sizeImage = Number((compressedFile.size / 1024 / 1024).toFixed(1));
                            if (sizeImage <= 8) {
                                uploadRef.current.push({ file: compressedFile, title: '' });
                                uploadPre.current.push({ link: URL.createObjectURL(compressedFile), type: 'image' });
                            } else {
                                dispatch(setTrueErrorServer(`${sizeImage}MB big than our limit is 8MB`));
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    dispatch(setTrueErrorServer('This format is not support!'));
                }
            }
            const time = setInterval(() => {
                if (uploadPre.current.length > 0) {
                    setupload(uploadPre.current);
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
                upload={uploadRef.current}
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
    return {
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
    };
}
