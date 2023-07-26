import { Div, Img, Input, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivConversation, DivResultsConversation } from './styleSed';
import { DotI, CameraI, ProfileCircelI, SendOPTI, UndoI } from '~/assets/Icons/Icons';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { CallName, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import dataEmoji from '@emoji-mart/data/sets/14/facebook.json';
import Picker from '@emoji-mart/react';
import { useEffect, useRef, useState } from 'react';
import { Label } from '~/social_network/components/Header/layout/Home/Layout/FormUpNews/styleFormUpNews';
import LogicConversation from './LogicConver';
import { Player } from 'video-react';
import { PropsUser } from 'src/App';
import { offChat } from '~/redux/reload';
import sendChatAPi from '~/restAPI/requestServers/accountRequest/sendChatAPi';
import CommonUtils from '~/utils/CommonUtils';
import FileConversation from './File';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { PropsLanguage } from '~/reUsingComponents/ErrorBoudaries/Warning_browser';
import 'moment/locale/vi';
import Languages from '~/reUsingComponents/languages';
import { setIdUser } from '~/redux/hideShow';
import ItemsRoom from './ItemsConvers';

const Conversation: React.FC<{
    colorText: string;
    colorBg: number;
    data: {
        id_room: string | undefined;
        user: { id: string; avatar: any; fullName: string; gender: number };
    };
    dataFirst: PropsUser;
    currentPage: number;
}> = ({ colorText, colorBg, dataFirst, data, currentPage }) => {
    const { lg } = Languages();
    const id_room = data.id_room;
    const user = data.user;
    const {
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
        fetchChat,
        loading,
        cRef,
    } = LogicConversation(id_room, user.id, dataFirst.id);
    const ERef = useRef<any>();
    const Diff = useRef<number>(1);
    const check = useRef<number>(0);
    const [dataImage, setDataImage] = useState<any>();
    const [watchMore, setWatchMore] = useState<boolean>(false);
    const relative =
        conversation?.status === 'isFriend'
            ? `You and ${CallName(user.gender)} are each other of friend`
            : conversation?.status === 'isNotFriend'
            ? `You and ${CallName(user.gender)} are not friend`
            : '';
    useEffect(() => {
        console.log(check.current, 'check');
        ERef.current.scrollTop = -check.current;
    }, [conversation]);
    useEffect(() => {
        // ERef.current.scrollTop = check.current;
        console.log('ok', check.current);
        const observer = new MutationObserver((mutationsList) => {
            console.log(mutationsList, ERef.current.scrollTop, ERef.current.scrollHeight, '===', cRef.current);
            mutationsList.forEach((m, index, arr) => {
                if (arr.length === index + 1) {
                }
            });
        });

        // Configure and start observing the element
        const observerConfig = {
            attributes: true,
            attributeFilter: ['style'],
            subtree: true,
            childList: true,
        };
        observer.observe(ERef.current, observerConfig);
        ERef.current.addEventListener('scroll', handleScroll);

        return () => {
            ERef.current?.removeEventListener('scroll', handleScroll);
        };
        // Optional: Call the observer's callback function immediately to get the initial scroll height
    }, []);

    const handleTime = (dateTime: string, type: string) => {
        if (type === 'hour') {
            const newDateTime = moment(dateTime).locale(lg).format('LT');
            return newDateTime;
        } else {
            const newDateTime = moment(dateTime)
                .locale(lg)
                .format(lg === 'vi' ? 'LL' : 'MMMM Do YYYY');
            return newDateTime;
        }
    };
    const handleWatchMore = (e: any) => {
        e.stopPropagation();
        if (e.target.getAttribute('class').includes('chatTime')) {
            e.target.classList.remove('chatTime');
        } else {
            e.target.classList.add('chatTime');
        }
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = ERef.current;
        const scrollBottom = -scrollTop + clientHeight;
        console.log(scrollBottom, scrollTop, clientHeight, scrollHeight);
        if (scrollBottom >= scrollHeight - 250 && !loading) {
            check.current = -scrollTop;
            if (cRef.current !== 2) fetchChat(true);
        }
    };
    let startOfDay: string = '';
    const handleProfile = () => {
        const id_oth: string[] = [];
        conversation?.id_us.map((id) => {
            if (id !== userId) id_oth.push(id);
        });
        dispatch(setIdUser(id_oth));
    };
    console.log(conversation, 'cc');

    return (
        <DivConversation>
            <DivResultsConversation color="#e4e4e4">
                <Div
                    width="100%"
                    css={`
                        align-items: center;
                        padding: 5px 10px;
                        font-size: 25px;
                        position: absolute;
                        top: 10px;
                        left: 0;
                        background-color: #202124;
                    `}
                >
                    <Div
                        width="30px"
                        css="height: 30px; margin-right: 10px; align-items: center; justify-content: center; cursor: var(--pointer)"
                        onClick={() => dispatch(offChat(id_room))}
                    >
                        <UndoI />
                    </Div>
                    <Div width="85%" css="align-items: center;">
                        <Avatar
                            src={user.avatar}
                            alt={user.fullName}
                            gender={user.gender}
                            radius="50%"
                            css="min-width: 30px; width: 30px; height: 30px; margin-right: 5px;"
                        />
                        <Hname>{user.fullName}</Hname>
                        <Div>
                            <DotI />
                        </Div>
                    </Div>
                </Div>

                <Div
                    ref={ERef}
                    width="100%"
                    css={`
                        flex-direction: column-reverse;
                        padding-bottom: 10px;
                        ${emoji ? 'height: 150px;' : 'height: 95%;'}
                        overflow-y: overlay;
                        scroll-behavior: smooth;
                        padding-right: 5px;
                        @media (max-width: 768px) {
                            padding-right: 0px;
                            &::-webkit-scrollbar {
                                width: 0px;
                                transform: translateX(calc(100% - 100vw));
                            }
                        }
                    `}
                    onScroll={() => handleScroll}
                    onClick={() => setEmoji(false)}
                >
                    <Div display="block">
                        <Div
                            width="100%"
                            wrap="wrap"
                            css="align-items: center; justify-content: center; margin-top: 80px; margin-bottom: 40px;"
                        >
                            <P z="1.3rem" align="center" css="width: 100%; margin: 8px 0; ">
                                {relative}
                            </P>
                            <Div
                                css="align-items: center; justify-content: center; padding: 3px 8px; background-color: #333333; border-radius: 8px; border: 1px solid #52504d; cursor: var(--pointer)"
                                onClick={handleProfile}
                            >
                                <ProfileCircelI /> <Hname css="margin: 0 5px; width: fit-content;">View profile</Hname>
                            </Div>
                        </Div>
                        {conversation?.room.map((rc, index, arr) => {
                            let listDateTime;
                            if (startOfDay) {
                                const dayOld = moment(startOfDay, 'HH:mm:ss YYYY-MM-DD');
                                const dayNew = moment(rc.createdAt).format('HH:mm:ss YYYY-MM-DD');
                                const r = moment(dayNew, 'HH:mm:ss YYYY-MM-DD');
                                const diffInDays = r.diff(dayOld, 'days');
                                if (diffInDays > 0) {
                                    Diff.current = 1;
                                    listDateTime = moment(rc.createdAt).locale(lg).format('MMMM Do YYYY, h:mm:ss a');
                                } else {
                                    Diff.current = 0;
                                }
                            }
                            if (Diff.current === 1) startOfDay = moment(rc.createdAt).format('HH:mm:ss YYYY-MM-DD');
                            return (
                                <ItemsRoom
                                    key={rc.text.t + index}
                                    rc={rc}
                                    index={index}
                                    listDateTime={listDateTime}
                                    startOfDay={startOfDay}
                                    Diff={Diff}
                                    lg={lg}
                                    userId={userId}
                                    handleWatchMore={handleWatchMore}
                                    ERef={ERef}
                                    token={token}
                                    handleTime={handleTime}
                                    user={user}
                                />
                            );
                        })}
                    </Div>
                </Div>
                <Div
                    width="100%"
                    wrap="wrap"
                    css=" height: auto; align-items: center; justify-content: center; background-color:#202124;; div#emojiCon{width: 100%}"
                >
                    <Div width="100%" wrap="wrap" css="position: relative;">
                        {upload.length > 0 && (
                            <Div
                                width="100%"
                                wrap="wrap"
                                css={`
                                    margin-left: 21%;
                                    position: absolute;
                                    bottom: 44px;
                                    right: 0;
                                    border-radius: 5px;
                                    background-color: transparent;
                                    box-shadow: 0 0 5px #7d7c7c;
                                `}
                            >
                                {upload.map((item, index) => (
                                    <Div
                                        key={item.link}
                                        css={`
                                            min-width: 79px;
                                            width: 79px;
                                            border-radius: 5px;
                                            border: 1px solid #4e4e4e;
                                            flex-grow: 1;
                                        `}
                                        onTouchMove={handleTouchMove}
                                        onTouchStart={handleTouchStart}
                                        onTouchEnd={handleTouchEnd}
                                    >
                                        {item.type === 'image' ? (
                                            <Img src={item.link} radius="5px" />
                                        ) : (
                                            item.type === 'video' && <Player key={item.link} src={item.link} />
                                        )}
                                        <Div></Div>
                                    </Div>
                                ))}
                            </Div>
                        )}
                        <Div width="100%" css="height: 40px; align-items: center ; justify-content: space-around; ">
                            <Div css="font-size: 20px;" onClick={() => setEmoji(!emoji)}>
                                🙂
                            </Div>

                            <Div
                                width="34px !important"
                                css="font-size: 21px; color: #869ae7; height: 100%; align-items: center; justify-content: center;"
                            >
                                <form method="post" encType="multipart/form-data" id="formss">
                                    <input
                                        id="uploadCon"
                                        type="file"
                                        name="file[]"
                                        onChange={handleImageUpload}
                                        multiple
                                        hidden
                                    />
                                    <Label htmlFor="uploadCon" color={colorText}>
                                        <CameraI />
                                    </Label>
                                </form>
                            </Div>
                            <Input
                                width="180px; height: 30px"
                                padding="4px 29px 4px 8px;"
                                margin="0"
                                border="1px solid #484643 !important;"
                                radius="50px; font-size: 1.3rem"
                                background="rgb(255 255 255 / 6%)"
                                color={colorText}
                                placeholder="Send"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <Div
                                width="34px"
                                css="font-size: 22px; color: #23c3ec; height: 100%; align-items: center; justify-content: center; cursor: var(--pointer);"
                                onClick={handleSend}
                            >
                                <SendOPTI />
                            </Div>
                        </Div>
                    </Div>
                    {emoji && (
                        <div id="emojiCon">
                            <Picker
                                locale="en"
                                set="facebook"
                                emojiVersion={14}
                                data={dataEmoji}
                                theme={colorBg === 1 ? 'dark' : 'light'}
                                onEmojiSelect={handleEmojiSelect}
                            />
                        </div>
                    )}
                </Div>
            </DivResultsConversation>
        </DivConversation>
    );
};
export default Conversation;
