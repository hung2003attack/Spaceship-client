import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setTrueErrorServer } from '~/redux/hideShow';
import sendChatAPi from '~/restAPI/requestServers/accountRequest/sendChatAPi';
import sendChatAPI from '~/restAPI/requestServers/accountRequest/sendChatAPi';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';
import CommonUtils from '~/utils/CommonUtils';

export default function LogicConversation(id_room: string, id_others: string, id_you: string) {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(['k_user', 'tks']);

    const userId = cookies.k_user;
    const token = cookies.tks;
    const mRef = useRef<any>(0);
    const [conversation, setConversation] = useState<
        {
            id_us: string[];
            status: string;
            background: string;
            room: [
                {
                    _id: string;
                    text: {
                        t: string;
                        icon: string;
                    };
                    imageOrVideos: { v: string; icon: string }[];
                    createdAt: string;
                },
            ];
            createdAt: string;
        }[]
    >([]);

    const [value, setValue] = useState<string>('');
    const [emoji, setEmoji] = useState<boolean>(false);
    const [upload, setupload] = useState<{ link: any; type: string }[]>([]);
    const [option, setOption] = useState<boolean>(false);
    const [fileUpload, setFileUpload] = useState<any>([]);
    const fileRef = useRef<any>([]);

    const uploadRef = useRef<{ link: string; type: string }[]>([]);

    const offset = useRef<number>(0);
    const limit = 50;

    useEffect(() => {
        async function fetchChat() {
            const res: {
                id_us: string[];
                status: string;
                background: string;
                room: [
                    {
                        _id: string;
                        text: {
                            t: string;
                            icon: string;
                        };
                        imageOrVideos: { v: string; icon: string }[];
                        createdAt: string;
                    },
                ];
                createdAt: string;
            }[] = await sendChatAPi.getChat(token, id_room, id_others, limit, offset.current);

            // console.log(newData, 'newData');

            setConversation(res);
            // console.log(res, 'chat');
        }
        fetchChat();
    }, []);
    useEffect(() => {
        return clearInterval(mRef.current);
    }, [mRef.current]);

    const handleEmojiSelect = (e: any) => {
        console.log(e);
        setValue(value + e.native);
    };
    let time: string | number | NodeJS.Timeout | undefined;
    const handleTouchStart = () => {
        time = setTimeout(() => {
            setOption(true);
        }, 500);
    };
    const handleTouchMove = () => {
        clearTimeout(time);
    };
    const handleTouchEnd = () => {
        clearTimeout(time);
        console.log('no');
    };
    const handleSend = async (e: any) => {
        if (value || upload.length > 0) {
            console.log(value, upload, 'value', fileUpload.length);
            const d: any = document.getElementById('formss');
            const formData = new FormData();
            formData.append('value', value);
            formData.append('id_room', id_room);
            formData.append('id_others', id_others);
            for (let i = 0; i < fileUpload.length; i++) {
                formData.append('files', fileUpload[i]);
            }
            const res: {
                id_us: string[];
                status: string;
                background: string;
                room: [
                    {
                        _id: string;
                        text: {
                            t: string;
                            icon: string;
                        };
                        imageOrVideos: { v: string; icon: string }[];
                        createdAt: string;
                    },
                ];
                createdAt: string;
            } = await sendChatAPI.send(token, formData);
            const imageOrVideos: any = [];
            for (let up of upload) {
                imageOrVideos.push({ v: up, icon: '' });
            }
            res.room[0].imageOrVideos = imageOrVideos;
            setConversation([...conversation, res]);
            console.log(res, 'send here');
        }
    };
    console.log(conversation, 'conversation');

    const handleImageUpload = async (e: any) => {
        uploadRef.current = [];
        const files = e.target.files;
        const options = {
            maxSizeMB: 10,
        };
        let fileAmount = 15;

        if (files.length > 0 && files.length < fileAmount) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (
                    file.type.includes('video/mp4') ||
                    file.type.includes('video/mov') ||
                    file.type.includes('video/x-matroska')
                ) {
                    const url = URL.createObjectURL(file);
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
                    file.type.includes('image/jpg') ||
                    file.type.includes('image/jpeg') ||
                    file.type.includes('image/png')
                ) {
                    try {
                        console.log((file.size / 1024 / 1024).toFixed(1), 'not compress');
                        if (Number((file.size / 1024 / 1024).toFixed(1)) <= 8) {
                            // const base64: any = await CommonUtils.getBase64(file);
                            fileRef.current.push(file);

                            uploadRef.current.push({ link: URL.createObjectURL(file), type: 'image' });
                        } else {
                            const compressedFile: any = await CommonUtils.compress(file);
                            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                            console.log(`compressedFile size ${(compressedFile.size / 1024 / 1024).toFixed(1)} MB`); // smaller than maxSizeMB
                            const sizeImage = Number((compressedFile.size / 1024 / 1024).toFixed(1));
                            if (sizeImage <= 8) {
                                uploadRef.current.push({ link: URL.createObjectURL(compressedFile), type: 'image' });
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
                if (uploadRef.current.length > 0) {
                    setFileUpload(fileRef.current);
                    setupload(uploadRef.current);
                }
                console.log('no');
            }, 1000);
            mRef.current = time;
        } else {
            dispatch(setTrueErrorServer(`You can only select ${fileAmount} file at most!`));
        }
    };
    return {
        handleImageUpload,
        upload,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        option,
        handleSend,
        value,
        setValue,
        emoji,
        setEmoji,
        handleEmojiSelect,
        dispatch,
        conversation,
        token,
        userId,
    };
}
