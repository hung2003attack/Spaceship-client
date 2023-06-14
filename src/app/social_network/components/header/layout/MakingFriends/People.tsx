/* eslint-disable react-hooks/exhaustive-deps */

import { io } from 'socket.io-client';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Mousewheel } from 'swiper';

import { Div, H3, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItems, DivMenu, DivOptions, DivResults, DivSearch, Input } from './styleMakingFriends';
import TagProfle from '~/social_network/components/Header/layout/MakingFriends/TagProfle';
import { useState, useEffect, useLayoutEffect, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import peopleAPI from '~/restAPI/requestServers/socialNetwork/peopleAPI';
import { useCookies } from 'react-cookie';
import { DotI, LoadingI } from '~/assets/Icons/Icons';
import { text } from 'stream/consumers';
import { people } from '~/redux/reload';
import CommonUtils from '~/utils/CommonUtils';
import { DivLoading } from '~/reUsingComponents/styleComponents/styleComponents';
import Strangers from './Strangers';
import Friends from './Friends';
import Requested from './Requested';
import Others from './OthersRequest';

const socket = io('http://localhost:3001', { transports: ['websocket'] });

export interface PropsTextFriends {
    option: string[];
    menu: { name: string; id: string }[];
    main: string;
}
export interface PropsUserPeople {
    avatar?: string;
    fullName?: string;
    gender?: number;
}
interface PropsMakingFriends {
    friendsT: PropsTextFriends;
    colorText: string;
    colorBg: number;
    dataUser?: PropsUserPeople;
}

const MakingFriends: React.FC<PropsMakingFriends> = ({ friendsT, colorText, colorBg, dataUser }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string[]>([]);
    const [cookies, setCookies] = useCookies(['tks', 'k_user']);
    const [button, setButton] = useState(['']);
    const [sName, setSName] = useState<string>('');
    const [sAge, setSAge] = useState<string>('');
    const [sBirth, setSBirth] = useState<string>('');
    const [sAddress, setSAddress] = useState<string>('');
    const [type, setType] = useState<string>(() => window.location.href.split('#')[1] || 'strangers');
    const lRef = useRef<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const optionS = friendsT.option;
    const menu = friendsT.menu;

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    useEffect(() => {
        const as = document.querySelectorAll('.idHref');
        Array.from(as).forEach((item) => {
            console.log(item, 'item', item.getAttribute('href'));

            if (item.getAttribute('href') === '#' + window.location.href.split('#')[1]) {
                item.dispatchEvent(new MouseEvent('click'));
            }
        });
        console.log(window.location.href.split('#')[1], 'aa', as);
    }, []);
    const handleOption = (e: any, i: string) => {
        if (!['0', '1', '2', '3'].includes(e.target.getAttribute('id'))) {
            if (search.lastIndexOf(i) >= 0) {
                search.splice(search.indexOf(i), 1);
                setSearch([...search]);
            } else {
                setSearch([...search, i]);
            }
        }
    };
    console.log(type, 'people');

    const handleSearch = (e: { target: { getAttribute: (arg0: string) => any; value: any } }) => {
        const type = e.target.getAttribute('id');
        console.log(type, 'search', e.target.value);
        type === '0'
            ? setSName(e.target.value)
            : type === '1'
            ? setSBirth(e.target.value)
            : setSAddress(e.target.value);
    };

    return (
        <DivOptions bg={colorBg === 1 ? '#353535' : ''} color={colorText}>
            <DivSearch>
                {optionS?.map((i, index) => (
                    <DivItems
                        display="flex"
                        css={`
                            padding: 4px;
                            ${search.includes(i)
                                ? 'width: 100%; '
                                : search.length > 0
                                ? 'width: 0%; display: none; '
                                : 'width: 100%;'};
                            transition: all 0.2s linear;
                            ${search.includes(i)
                                ? ' input {display: block; width: 100%; transition: all 0.5s linear;} div {width: 25%; transition: all 0.5s linear;}'
                                : 'input {display: none; width: 0%;} div {width: 100%;}'};
                            @media (min-width: 600px) {
                                ${search.includes(i)
                                    ? 'width: 100%;'
                                    : search.length > 1
                                    ? 'width: 40%;  display: block;'
                                    : 'width: 20%; display: block; '};
                            }
                        `}
                        key={i}
                        onClick={(e) => handleOption(e, i)}
                    >
                        <Input id={`${index}`} type="text" placeholder={i} color={colorText} onChange={handleSearch} />
                        <DivItems>{i}</DivItems>
                    </DivItems>
                ))}
            </DivSearch>
            <Div css="height: 91%">
                <DivMenu>
                    {menu?.map((m) => {
                        return (
                            <a href={`#${m.id}`} key={m.name} className="idHref" ref={lRef}>
                                <DivItems
                                    css={`
                                        ${m.id === type ? 'background-color: #444444;' : ''}
                                    `}
                                    onClick={() => setType(m.id)}
                                >
                                    {m.name}
                                </DivItems>
                            </a>
                        );
                    })}
                </DivMenu>
                <Div
                    width="70%"
                    css={`
                        position: relative;
                        height: 100%;
                        @media (min-width: 800px) {
                            width: 81%;
                        }
                    `}
                >
                    <Swiper
                        pagination={pagination}
                        allowTouchMove={false}
                        breakpoints={{
                            992: {
                                allowTouchMove: true,
                            },
                        }}
                        slidesPerView={'auto'}
                        scrollbar={{ el: '.swiper-scrollbar', lockClass: '.swiper-scrollbar-lock' }}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Strangers type={type} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Friends type={type} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Requested type={type} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Others type={type} />
                        </SwiperSlide>
                    </Swiper>
                    {/* <Strangers type={type} />

                    <Friends type={type} />

                    <Requested type={type} />

                    <Others type={type} />
                    <DivResults id="family">
                        <H3 css="width: 100%; text-align: center; padding: 3px; background-color: #353535; font-size: 1.5rem; ">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </H3>
                        {loading && (
                            <DivLoading>
                                <LoadingI />
                            </DivLoading>
                        )}
                        Empty
                    </DivResults> */}
                </Div>
            </Div>
        </DivOptions>
    );
};
export default memo(MakingFriends);
