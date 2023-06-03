import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper';
import './swiper.scss';
import { Player } from 'video-react';
import { Img } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { PlayI } from '~/assets/Icons/Icons';

const Coverflow: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
    colorText: string;
}> = ({ file, colorText }) => {
    return (
        <div id="swiperS">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 3,
                    slideShadows: true,
                }}
                pagination={{
                    type: 'progressbar',
                }}
                speed={1000}
                autoplay={{ delay: 1000 }}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {file.map((f) => (
                    <SwiperSlide key={f.link}>
                        {f.type === 'image' ? (
                            <Img src={f.link} id="baby" alt={f.link} radius="5px" />
                        ) : f.type === 'video' ? (
                            <Player src={f.link} />
                        ) : (
                            ''
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
export default Coverflow;
