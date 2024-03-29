import { memo, useEffect, useRef } from 'react';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/css/effect-coverflow';

import clsx from 'clsx';
import { CloseI, SendI, MoveI, UndoI, BeforeI, ProfileI, ProfileCircelI } from '~/assets/Icons/Icons';
import Hovertitle from '~/reUsingComponents/HandleHover/HoverTitle';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import useDebounce from '~/reUsingComponents/hook/useDebounce';
import { DivIconMs } from '../styleMessage';
import { DivResults, DivSend } from './styleSed';
import { Div, Input, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivPost } from '~/social_network/components/Header/layout/Home/styleHome';
import { DivPos, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import ListAccounts from './SendReults';
import MoreOption from './MoreOption';
import Conversation from './Conversation';
import sendChatAPi from '~/restAPI/requestServers/accountRequest/sendChatAPi';
import { useCookies } from 'react-cookie';
import CommonUtils from '~/utils/CommonUtils';
import { socket } from 'src/mainPage/nextWeb';

export interface PropsRoomChat {
    _id: any;
    id_us: string[];
    user: {
        id: string;
        avatar: any;
        fullName: string;
        gender: number;
    }[];
    imageOrVideos: string[];
    room: {
        _id: string;
        text: { icon: string; t: string };
        imageOrVideos: string[];
        seenBy: string[];
        createdAt: string;
        // user: { avatar: any; fullName: string; gender: number; id: string };
    };
}

const Send: React.FC<{
    colorText: string;
    colorBg: number;
    dataUser: { id: string; avatar: any; fullName: string; nickName: string; gender: number };
    userOline: string[];
}> = ({ colorBg, colorText, dataUser, userOline }) => {
    const [send, setSend] = useState(false);
    const [cookies, setCookies] = useCookies(['k_user', 'tks']);
    const userId = cookies.k_user;
    const token = cookies.tks;
    const [searchUser, setSearchUser] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<any>([]);
    const [rooms, setRooms] = useState<PropsRoomChat[]>([]);
    const limit = 10;
    const offset = useRef<number>(0);

    const [moreBar, setMoreBar] = useState<boolean>(false);
    const handleShowHide = () => {
        setSend(!send);
    };
    useEffect(() => {
        async function fetchRoom() {
            const res: PropsRoomChat[] = await sendChatAPi.getRoom(token, limit, offset.current);
            res.map((sc) => {
                sc.user.map((us) => {
                    if (us?.avatar) us.avatar = CommonUtils.convertBase64(us.avatar);
                });
                // if (sc.room.user?.avatar) sc.room.user.avatar = CommonUtils.convertBase64(sc.room.user.avatar);
            });
            setRooms(res);
            console.log(res, 'get Room');
        }
        fetchRoom();
        socket.on(`${userId}roomChat`, (data: string) => {
            fetchRoom();
        });
    }, []);

    const handleUndo = () => {};
    // const debounce = useDebounce(searchUser, 500);
    // useEffect(() => {
    //     if (!searchUser) {
    //         setResultSearch([]);
    //         return;
    //     }
    //     const fechApi = async () => {
    //         // const results = await userService.search(searchUser);
    //         // setResultSearch(results);
    //     };

    //     fechApi();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debounce]);
    const handleSearch = (e: { target: { value: string } }) => {
        setSearchUser(e.target.value);
    };
    console.log(searchUser);
    const dataMore = {
        avatar: 'https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg',
        fullName: 'Nguyen Trong Hung',
        gender: 1,
        options: [{ name: 'View Profile', icon: <ProfileCircelI />, id: 1 }],
    };

    return (
        <>
            {!send && (
                <Hovertitle Tags={DivIconMs} title="Send" size="23px" color={colorText} onClick={handleShowHide}>
                    <SendI />
                    <p className={clsx('miss')}>+</p>
                </Hovertitle>
            )}
            {send && (
                <DivSend onTouchMove={(e) => e.stopPropagation()}>
                    <Div
                        width="100%"
                        css={`
                            height: 40px;
                            align-items: center;
                            justify-content: space-evenly;
                            position: relative;
                            color: ${colorText};
                        `}
                    >
                        <Div
                            css="width: 40px; height: 100%; align-items: center; justify-content: center; font-size: 22px; "
                            onClick={handleShowHide}
                        >
                            <UndoI />
                        </Div>
                        <Input
                            type="text"
                            value={searchUser}
                            placeholder="Search"
                            onChange={handleSearch}
                            color={colorText}
                            border="0"
                            width="auto"
                            margin="0"
                        />
                        <DivPos width="35px" right="50px" onClick={() => setSearchUser('')}>
                            <CloseI />
                        </DivPos>
                        <Avatar
                            src={dataUser.avatar}
                            alt={dataUser.fullName}
                            gender={dataUser.gender}
                            radius="50%"
                            css="width: 35px; height: 35px;"
                        />
                    </Div>
                    <DivResults>
                        <Div css=".swiper{padding: 14px 2px;} .swiper-slide, swiper-slide{user-select: none;} .swiper-pagination{top: 70px !important; height: 1px !important;} padding: 5px 2px;">
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={10}
                                pagination={{
                                    type: 'progressbar',
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                        <Hname>Nguyen Trong Hung</Hname>
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://hips.hearstapps.com/hmg-prod/images/cutest-dog-breeds-64358b34b2905.jpeg?crop=0.891xw:0.357xh;0,0.137xh&resize=1200:*"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                        <Hname>Nguyen Hung</Hname>
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://www.brightstarbuddies.com.au/blog/wp-content/uploads/sites/8/bonniechessiegirl4-2.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                        <Hname>Ngoc Linh</Hname>
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                        <Hname>MNgoc Phuong</Hname>
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                        <Hname>Hiseper</Hname>
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                        <Hname>Hiseper</Hname>
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                    </Div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Div>
                                        <Avatar
                                            src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                                            gender={0}
                                            radius="50%"
                                            css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
                                        />
                                    </Div>
                                </SwiperSlide>
                            </Swiper>
                        </Div>
                        {rooms.map((r) => (
                            <ListAccounts
                                key={r._id}
                                data={r}
                                userId={userId}
                                colorText={colorText}
                                colorBg={colorBg}
                                setMoreBar={setMoreBar}
                            />
                        ))}
                        {moreBar && <MoreOption dataMore={dataMore} colorText={colorText} setMoreBar={setMoreBar} />}
                    </DivResults>
                </DivSend>
            )}
        </>
    );
};

export default memo(Send);
