import { Div, Img, Input, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivConversation, DivResultsConversation } from './styleSed';
import { DotI, ImageBayI, ProfileCircelI, SendOPTI, UndoI } from '~/assets/Icons/Icons';
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

const Conversation: React.FC<{
    colorText: string;
    colorBg: number;
    data: {
        id_room: string;
        user: { id: string; avatar: any; fullName: string; gender: number };
    };
    dataFirst: PropsUser;
    currentPage: number;
}> = ({ colorText, colorBg, dataFirst, data, currentPage }) => {
    const language = useSelector((state: PropsLanguage) => state.persistedReducer.language);
    const lg = currentPage === 1 ? language.sn : currentPage === 2 ? language.l : language.w;
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
    } = LogicConversation(id_room, user.id, dataFirst.id);
    const ERef = useRef<any>();
    const Diff = useRef<number>(1);

    console.log(value);
    console.log(conversation, 'conversation22');
    const [dataImage, setDataImage] = useState<any>();
    const [watchMore, setWatchMore] = useState<boolean>(false);
    const relative =
        conversation[0]?.status === 'isFriend'
            ? `You and ${CallName(user.gender)} are each other of friend`
            : conversation[0]?.status === 'isNotFriend'
            ? `You and ${CallName(user.gender)} are not friend`
            : '';
    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            ERef.current.scrollTop = ERef.current.scrollHeight;
        });

        // Configure and start observing the element
        const observerConfig = {
            attributes: true,
            attributeFilter: ['style'],
            subtree: true,
            childList: true,
        };
        observer.observe(ERef.current, observerConfig);
        // Optional: Call the observer's callback function immediately to get the initial scroll height
    }, []);
    const handleTime = (dateTime: string, type: string) => {
        const convert = moment(dateTime).format('HH:mm:ss YYYY-MM-DD');

        // moment(convert, 'HH:mm:ss YYYY-MM-DD').locale(lg).fromNow();/
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
        console.log(e.target.getAttribute('class'));
    };

    const handleScroll = () => {};
    let startOfDay: string;
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
                    display="block"
                    css={`
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
                    <Div
                        width="100%"
                        wrap="wrap"
                        css="align-items: center; justify-content: center; margin-top: 80px; margin-bottom: 40px;"
                    >
                        <P z="1.3rem" align="center" css="width: 100%; margin: 8px 0; ">
                            {relative}
                        </P>
                        <Div css="align-items: center; justify-content: center; padding: 3px 8px; background-color: #333333; border-radius: 8px; border: 1px solid #52504d; cursor: var(--pointer)">
                            <ProfileCircelI /> <Hname css="margin: 0 5px; width: fit-content;">View profile</Hname>
                        </Div>
                    </Div>
                    {conversation[0]?.room.map((rc, index) => {
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
                            <div key={rc.text.t + index}>
                                {listDateTime && (
                                    <P z="1rem" css="text-align: center; margin: 10px 0;">
                                        -----{listDateTime}-----
                                    </P>
                                )}
                                {rc._id === userId ? (
                                    <Div
                                        width="100%"
                                        css={`
                                            padding-left: ${rc.imageOrVideos.length <= 1 ? '35%' : '20%'};
                                            margin-bottom: 8px;
                                            justify-content: right;
                                            .chatTime {
                                                .dateTime {
                                                    display: block;
                                                }
                                            }
                                        `}
                                    >
                                        <Div
                                            display="block"
                                            className="noTouch"
                                            css={`
                                                position: relative;
                                                justify-content: right;
                                                ${rc.imageOrVideos.length < 1 ? 'display: block;' : 'flex-grow: 1;'}
                                                ${rc.text.t &&
                                                `&::after {display: block; content: ''; width: 100%; height: ${
                                                    rc.imageOrVideos.length > 0 ? '10%' : '100%'
                                                }; position: absolute; top: 0;left: 0;}`}
                                            `}
                                            onClick={handleWatchMore}
                                        >
                                            {rc.text.t && (
                                                <Div css="justify-content: end;">
                                                    <P
                                                        z="1.4rem"
                                                        css="width: fit-content; margin: 0; padding: 2px 12px 4px; border-radius: 7px; border-top-left-radius: 13px; border-bottom-left-radius: 13px; background-color: #353636; border: 1px solid #4e4d4b;"
                                                    >
                                                        {rc.text.t}
                                                    </P>
                                                </Div>
                                            )}
                                            {rc.imageOrVideos.length > 0 && (
                                                <Div css=" align-items: end; flex-grow: 1;">
                                                    <Div
                                                        width="100%"
                                                        wrap="wrap"
                                                        css={`
                                                            position: relative;
                                                            justify-content: end;
                                                            .roomOfChat {
                                                                position: fixed;
                                                                width: 100%;
                                                                height: 100%;
                                                                top: 0;
                                                                left: 0;
                                                                background-color: #171718;
                                                                z-index: 1;
                                                                img {
                                                                    object-fit: contain;
                                                                }
                                                            }
                                                            ${rc.imageOrVideos.length > 2 &&
                                                            'background-color: #ca64b8;'}
                                                        `}
                                                    >
                                                        {rc.imageOrVideos.map((fl, index) => (
                                                            <FileConversation
                                                                key={fl.v}
                                                                token={token}
                                                                type={fl?.type}
                                                                v={fl.v}
                                                                icon={fl.icon}
                                                                ERef={ERef}
                                                            />
                                                        ))}
                                                    </Div>
                                                </Div>
                                            )}
                                            {rc.sending ? (
                                                <P>sending...</P>
                                            ) : (
                                                <>
                                                    {rc.imageOrVideos.length > 0 ? (
                                                        <P
                                                            css={`
                                                                display: ${!rc.text.t ? 'block' : 'none'};
                                                                width: 100%;
                                                                font-size: 1rem;
                                                                margin-right: 5px;
                                                                text-align: right;
                                                            `}
                                                            className="dateTime"
                                                        >
                                                            {handleTime(rc.createdAt, 'hour')},{' '}
                                                            {handleTime(rc.createdAt, 'date')}
                                                        </P>
                                                    ) : (
                                                        <>
                                                            <P
                                                                className="dateTime"
                                                                css="display: none; font-size: 1rem; margin-left: 5px; position: absolute; left: -105px; top: 5px;"
                                                            >
                                                                {handleTime(rc.createdAt, 'date')}
                                                            </P>
                                                            <P
                                                                className="dateTime"
                                                                css="display: none; width: 100%; font-size: 1rem; margin-right: 5px; text-align: right;"
                                                            >
                                                                {handleTime(rc.createdAt, 'hour')}
                                                            </P>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </Div>
                                    </Div>
                                ) : (
                                    <Div
                                        key={rc.text.t + index}
                                        wrap="wrap"
                                        css={`
                                            padding-right: ${rc.imageOrVideos.length <= 1 ? '35%' : '20%'};
                                            justify-content: left;
                                            align-items: center;
                                            margin-bottom: 8px;
                                        `}
                                    >
                                        <Div
                                            css={`
                                                ${rc.imageOrVideos.length < 1 ? 'display: flex;' : ''}
                                                position: relative;
                                                justify-content: left;
                                                ${rc.imageOrVideos.length > 0 ? 'flex-grow: 1;' : ''}
                                                .chatTime {
                                                    .dateTime {
                                                        display: block;
                                                    }
                                                }
                                            `}
                                        >
                                            <Avatar
                                                src={user.avatar}
                                                alt={user.fullName}
                                                gender={user.gender}
                                                radius="50%"
                                                css="min-width: 17px; width: 17px; height: 17px; margin-right: 4px; margin-top: 3px;"
                                            />
                                            <Div
                                                width="100%"
                                                display="block"
                                                className="noTouch"
                                                css={`
                                                    position: relative;
                                                    justify-content: start;
                                                    ${rc.text.t &&
                                                    `&::after {display: block; content: ''; width: 100%; height: ${
                                                        rc.imageOrVideos.length > 0 ? '10%' : '100%'
                                                    }; position: absolute; top: 0;left: 0;}`}
                                                `}
                                                onClick={handleWatchMore}
                                            >
                                                {rc.text.t && (
                                                    <P
                                                        z="1.4rem"
                                                        css="width: fit-content; padding: 2px 12px 4px; border-radius: 7px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; background-color: #353636; border: 1px solid #4e4d4b;"
                                                    >
                                                        {rc.text.t}
                                                    </P>
                                                )}
                                                {rc.imageOrVideos.length > 0 && (
                                                    <Div css=" align-items: start; ">
                                                        <Div
                                                            width="100%"
                                                            wrap="wrap"
                                                            css={`
                                                                justify-content: end;
                                                                .roomOfChat {
                                                                    position: fixed;
                                                                    width: 100%;
                                                                    height: 100%;
                                                                    top: 0;
                                                                    left: 0;
                                                                    background-color: #171718;
                                                                    z-index: 1;
                                                                    img {
                                                                        object-fit: contain;
                                                                    }
                                                                }
                                                                ${rc.imageOrVideos.length > 2 &&
                                                                'background-color: #ca64b8;'}
                                                            `}
                                                        >
                                                            {rc.imageOrVideos.map((fl, index) => (
                                                                <FileConversation
                                                                    key={fl.v}
                                                                    type={fl?.type}
                                                                    token={token}
                                                                    v={fl.v}
                                                                    icon={fl.icon}
                                                                    ERef={ERef}
                                                                />
                                                            ))}
                                                        </Div>
                                                    </Div>
                                                )}
                                                {rc.imageOrVideos.length > 0 ? (
                                                    <P
                                                        className="dateTime"
                                                        css={`
                                                            display: ${!rc.text.t ? 'block' : 'none'};
                                                            width: 100%;
                                                            font-size: 1rem;
                                                            margin-left: 5px;
                                                            text-align: left;
                                                        `}
                                                    >
                                                        {handleTime(rc.createdAt, 'hour')},{' '}
                                                        {handleTime(rc.createdAt, 'date')}
                                                    </P>
                                                ) : (
                                                    <>
                                                        <P
                                                            className="dateTime"
                                                            css="display: none; font-size: 1rem; margin-left: 5px; position: absolute; right: -83px; top: 5px;"
                                                        >
                                                            {handleTime(rc.createdAt, 'date')}
                                                        </P>
                                                        <P
                                                            className="dateTime"
                                                            css="display: none; width: 100%; font-size: 1rem; margin-left: 5px; text-align: left;"
                                                        >
                                                            {handleTime(rc.createdAt, 'hour')}
                                                        </P>
                                                    </>
                                                )}
                                            </Div>
                                        </Div>
                                    </Div>
                                )}
                            </div>
                        );
                    })}
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
                                        <ImageBayI />
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
