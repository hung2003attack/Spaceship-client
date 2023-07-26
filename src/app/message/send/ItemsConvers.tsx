import moment from 'moment';
import { PropsChat } from './LogicConver';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';
import FileConversation from './File';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { useEffect } from 'react';

const ItemsRoom: React.FC<{
    rc: {
        _id: string;
        text: {
            t: string;
            icon: string;
        };
        imageOrVideos: {
            v: string;
            type?: string | undefined;
            icon: string;
            _id: string;
        }[];
        sending?: boolean | undefined;
        seenBy: string[];
        createdAt: string;
    };
    index: number;
    listDateTime: string | undefined;
    startOfDay: string;
    Diff: React.MutableRefObject<number>;
    lg: string;
    userId: string;
    token: string;
    handleWatchMore: (e: any) => void;
    ERef: React.MutableRefObject<any>;
    handleTime: (dateTime: string, type: string) => string;
    user: {
        id: string;
        avatar: any;
        fullName: string;
        gender: number;
    };
}> = ({ rc, index, listDateTime, startOfDay, Diff, lg, userId, token, handleWatchMore, ERef, handleTime, user }) => {
    
    return (
        <>
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
                                        ${rc.imageOrVideos.length > 2 && 'background-color: #ca64b8;'}
                                    `}
                                >
                                    {rc.imageOrVideos.map((fl, index) => (
                                        <FileConversation
                                            key={fl._id}
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
                        {rc?.sending ? (
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
                                        {handleTime(rc.createdAt, 'hour')}, {handleTime(rc.createdAt, 'date')}
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
                                            ${rc.imageOrVideos.length > 2 && 'background-color: #ca64b8;'}
                                        `}
                                    >
                                        {rc.imageOrVideos.map((fl, index) => (
                                            <FileConversation
                                                key={fl.v + index}
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
                                    {handleTime(rc.createdAt, 'hour')}, {handleTime(rc.createdAt, 'date')}
                                </P>
                            ) : (
                                <>
                                    <P
                                        className="dateTime"
                                        css="display: none; font-size: 1rem; margin-left: 5px; position: absolute; right: -105px; top: 5px;"
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
        </>
    );
};
export default ItemsRoom;
