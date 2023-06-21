import { Div, Input, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivConversation, DivResultsConversation } from './styleSed';
import { DotI, ImageBayI, ProfileCircelI, SendOPTI, UndoI } from '~/assets/Icons/Icons';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import dataEmoji from '@emoji-mart/data/sets/14/facebook.json';
import Picker from '@emoji-mart/react';
import { useEffect, useRef, useState } from 'react';

const Conversation: React.FC<{ colorText: string; colorBg: number }> = ({ colorText, colorBg }) => {
    const [value, setValue] = useState<string>('');
    const [emoji, setEmoji] = useState<boolean>(false);
    const ERef = useRef<any>();
    const handleEmojiSelect = (e: any) => {
        console.log(e);
        setValue(value + e.native);
    };

    console.log(value);
    useEffect(() => {
        ERef.current.scrollTop = ERef.current.scrollHeight;
    }, []);
    return (
        <DivConversation>
            <DivResultsConversation color={colorText}>
                <Div
                    width="100%"
                    css={`
                        align-items: center;
                        padding: 5px 10px;
                        font-size: 25px;
                        position: absolute;
                        top: 10px;
                        left: 0;
                    `}
                >
                    <Div
                        width="30px"
                        css="height: 30px; margin-right: 10px; align-items: center; justify-content: center;"
                    >
                        <UndoI />
                    </Div>
                    <Div width="85%" css="align-items: center;">
                        <Avatar
                            src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 30px; width: 30px; height: 30px; margin-right: 5px;"
                        />
                        <Hname>Nguyen Thi Han</Hname>
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
                        @media (max-width: 768px) {
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
                            You and her are each other of friends
                        </P>
                        <Div css="align-items: center; justify-content: center; padding: 3px 8px; background-color: #333333; border-radius: 8px; border: 1px solid #52504d; cursor: var(--pointer)">
                            <ProfileCircelI /> <Hname css="margin: 0 5px; width: fit-content;">View profile</Hname>
                        </Div>
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: left; margin-bottom: 8px; align-items: center;"
                    >
                        <Avatar
                            src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-right: 4px; margin-top: 3px;"
                        />
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Hello!
                        </P>
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center; margin-bottom: 8px; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Hi
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: left; margin-bottom: 8px; align-items: center;"
                    >
                        <Avatar
                            src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-right: 4px; margin-top: 3px;"
                        />
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            What's up?
                        </P>
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            I'm good
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center ;margin-bottom: 8px; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            How about you?
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: left;  align-items: center;"
                    >
                        <Avatar
                            src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-right: 4px; margin-top: 3px;"
                        />
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            I'm doing well
                        </P>
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: left; margin-bottom: 8px; align-items: center;"
                    >
                        <Avatar
                            src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-right: 4px; margin-top: 3px;"
                        />
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Is your work ok?
                        </P>
                    </Div>
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center ;"
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Year, Nothing change
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>{' '}
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center ; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Year, Nothing change
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>{' '}
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center ; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Year, Nothing change
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>{' '}
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center ; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Year, Nothing change
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>{' '}
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center ; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Year, Nothing change
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>{' '}
                    <Div
                        width="100%"
                        css="min-height: 33px; height: 33px; justify-content: right; align-items:center ;margin-bottom: 5px; "
                    >
                        <P
                            z="1.5rem"
                            css="width: auto; padding: 2px 12px; border-radius: 50px; background-color: #353636; border: 1px solid #4e4d4b;"
                        >
                            Year, Nothing change
                        </P>
                        <Avatar
                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                            alt="Avatar"
                            gender={0}
                            radius="50%"
                            css="min-width: 17px; width: 17px; height: 17px; margin-left: 4px; margin-top: 3px;"
                        />
                    </Div>
                </Div>
                <Div
                    width="100%"
                    wrap="wrap"
                    css=" height: auto; align-items: center; justify-content: center;   background-color: #212020; div:nth-child(2){width: 100%}"
                >
                    <Div width="100%" css="height: 40px; align-items: center ; justify-content: space-around;">
                        <Div css="font-size: 20px;" onClick={() => setEmoji(!emoji)}>
                            🙂
                        </Div>
                        <Div
                            width="34px !important"
                            css="font-size: 21px; color: #869ae7; height: 100%; align-items: center; justify-content: center;"
                        >
                            <ImageBayI />
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
                            css="font-size: 22px; color: #23c3ec; height: 100%; align-items: center; justify-content: center;"
                        >
                            <SendOPTI />
                        </Div>
                    </Div>
                    {emoji && (
                        <Picker
                            locale="en"
                            set="facebook"
                            emojiVersion={14}
                            data={dataEmoji}
                            theme={colorBg === 1 ? 'dark' : 'light'}
                            onEmojiSelect={handleEmojiSelect}
                        />
                    )}
                </Div>
            </DivResultsConversation>
        </DivConversation>
    );
};
export default Conversation;
