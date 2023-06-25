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

const Conversation: React.FC<{
    colorText: string;
    colorBg: number;
    data: {
        id_room: string;
        user: { id: string; avatar: any; fullName: string; gender: number };
    };
    dataFirst: PropsUser;
}> = ({ colorText, colorBg, dataFirst, data }) => {
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
        ERef,
    } = LogicConversation(id_room, user.id, dataFirst.id);

    console.log(value);
    const [base64File, setBase64File] = useState<any>();
    console.log(conversation, 'conversation22');
    const [dataImage, setDataImage] = useState<any>();
    const relative =
        conversation[0]?.status === 'isFriend'
            ? `You and ${CallName(user.gender)} are each other of friend`
            : conversation[0]?.status === 'isNotFriend'
            ? `You and ${CallName(user.gender)} are not friend`
            : '';

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
                        if (rc._id === user.id) {
                            return (
                                <Div
                                    key={rc.text.t + index}
                                    width="100%"
                                    css="padding-right: 35%; justify-content: left; margin-bottom: 8px; align-items: center;"
                                >
                                    <Avatar
                                        src={user.avatar}
                                        alt={user.fullName}
                                        gender={user.gender}
                                        radius="50%"
                                        css="min-width: 17px; width: 17px; height: 17px; margin-right: 4px; margin-top: 3px;"
                                    />
                                    <P
                                        z="1.4rem"
                                        css="width: auto; padding: 2px 12px 2px; border-radius: 12px; background-color: #353636; border: 1px solid #4e4d4b;"
                                    >
                                        {rc.text.t}
                                    </P>
                                </Div>
                            );
                        } else {
                            return (
                                <div key={rc.text.t + index}>
                                    <Div
                                        width="100%"
                                        css="padding-left: 35%; justify-content: right; align-items:center; margin-bottom: 8px; "
                                    >
                                        <P
                                            z="1.4rem"
                                            css="width: auto; padding: 2px 12px 2px; border-radius: 12px; background-color: #353636; border: 1px solid #454442e0;     background-color: #00000061;"
                                        >
                                            {rc.text.t}
                                        </P>
                                    </Div>
                                    <Div css="padding-left: 23%;">
                                        <Div
                                            width="100%"
                                            wrap="wrap"
                                            css={`
                                                justify-content: end;
                                                ${rc.imageOrVideos.length > 2 && 'background-color: #ca64b8;'}
                                            `}
                                        >
                                            {rc.imageOrVideos.map((fl, index) => (
                                                <FileConversation key={fl.v} token={token} v={fl.v} icon={fl.icon} />
                                            ))}
                                        </Div>
                                    </Div>
                                </div>
                            );
                        }
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
                                            ${upload.length - 1 === index && 'flex-grow: 1;'}
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
