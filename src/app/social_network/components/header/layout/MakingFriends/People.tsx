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
    menu: { name: string; id: string }[];
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
    const [type, setType] = useState<string>(() => window.location.href.split('#')[1] || 'strangers');
    const lRef = useRef<any>();

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

    console.log(type, 'people');

    return (
        <DivOptions bg={colorBg === 1 ? '#353535' : ''} color={colorText}>
            <Div width="100%" css="height: 30px;"></Div>
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
                        overflow: hidden;
                        @media (min-width: 800px) {
                            width: 81%;
                        }
                    `}
                >
                    <Strangers type={type} />
                    <Friends type={type} />
                    <Requested type={type} />
                    <Others type={type} />
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
