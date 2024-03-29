import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import PreviewPost from './PreView';
import { ImageI, VideoI } from '~/assets/Icons/Icons';
import { setTrueErrorServer } from '~/redux/hideShow';
import { useDispatch } from 'react-redux';
import { PropsFormHome } from './FormUpNews';
import { PropsUserHome } from '../../Home';
import CommonUtils from '~/utils/CommonUtils';
import { useCookies } from 'react-cookie';
import CookiesF from '~/reUsingComponents/cookies';

export default function LogicForm(form: PropsFormHome, colorText: string, colorBg: number, user?: PropsUserHome) {
    const dispatch = useDispatch();
    const { userId, token } = CookiesF();

    const [displayEmoji, setdisplayEmoji] = useState<boolean>(false);
    const [displayFontText, setDisplayFontText] = useState<boolean>(false);

    const [uploadPre, setuploadPre] = useState<{ link: string; type: string }[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const uploadPreRef = useRef<{ link: string; type: string }[]>([]);
    // upload submit
    const uploadRef = useRef<{ file: Blob; title: string }[]>([]);
    // add data when select type centered of swiper for submit
    const [dataCentered, setDataCentered] = useState<
        { id: number; columns: number; data: { file: Blob; title: string }[] }[]
    >([]);
    const CenteredRef = useRef<{ id: number; columns: number; data: { file: Blob; title: string }[] }[]>([]);
    // preView
    const [dataCenteredPre, setDataCenteredPre] = useState<
        { id: number; columns: number; data: { link: string; type: string }[] }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fontFamily, setFontFamily] = useState<{ name: string; type: string }>({
        name: 'Noto Sans',
        type: 'Straight',
    });
    const handleClear = () => {
        setInputValue('');
        setuploadPre([]);
        setDataCentered([]);
        const inpuFile: any = document.getElementById('upload');
        console.log(inpuFile, 'inpuFile');

        if (inpuFile) inpuFile.value = '';
    };

    const { textarea, buttonOne, buttonTwo, preView: dataTextPreView } = form;

    const handleOnKeyup = (e: any) => {
        e.target.setAttribute('style', 'height: auto');
        e.target.setAttribute('style', `height: ${e.target.scrollHeight}px`);
    };

    console.log(form);
    let fileAmount = 25;
    const handleImageUpload = async (e: any, addMore?: boolean) => {
        e.stopPropagation();
        console.log(addMore, 'addMore');
        setLoading(true);
        uploadPreRef.current = [];
        uploadRef.current = [];
        const file = e.target.files;
        const options = {
            maxSizeMB: 10,
        };

        if (file.length < fileAmount) {
            for (let i = 0; i < file.length; i++) {
                const newDa: any = await new Promise(async (resolve, reject) => {
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
                                ? resolve([
                                      { link: url, type: 'video' },
                                      { file: file[i], title: '' },
                                  ])
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
                                uploadPreRef.current.push({ link: URL.createObjectURL(file), type: 'image' });
                            } else {
                                const compressedFile: any = await CommonUtils.compress(file[i]);
                                const sizeImage = Number((compressedFile.size / 1024 / 1024).toFixed(1));
                                if (sizeImage <= 8) {
                                    resolve([
                                        {
                                            link: URL.createObjectURL(compressedFile),
                                            type: 'image',
                                        },
                                        { file: compressedFile, title: '' },
                                    ]);
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
                });
                // console.log(newDa, 'newDa');

                uploadPreRef.current.push(newDa[0]);
                uploadRef.current.push(newDa[1]);
            }
            if (!addMore) {
                setuploadPre(uploadPreRef.current);
            } else {
                setDataCentered([
                    ...dataCentered,
                    { id: dataCentered.length + 1, columns: 4, data: uploadRef.current },
                ]);
                setDataCenteredPre([
                    ...dataCenteredPre,
                    {
                        id: dataCenteredPre.length + 1,
                        columns: 4,
                        data: uploadPreRef.current,
                    },
                ]);
            }

            console.log('no');
        } else {
            dispatch(setTrueErrorServer(`You can only select ${fileAmount} file at most!`));
        }
        setLoading(false);
    };

    const handleAbolish = () => {
        setuploadPre([]);
        setInputValue('');
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
    console.log(uploadPre, 'uploadPre', inputValue);
    let imageL = 0;
    let videoL = 0;
    for (let i = 0; i < uploadPre.length; i++) {
        uploadPre[i].type === 'image' ? imageL++ : videoL++;
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
    };
}
