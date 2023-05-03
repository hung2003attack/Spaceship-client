import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper';
import './swiper.scss';
import { Img } from 'src/backbround/styleBackground';
import { Player } from 'video-react';

const Coverflow: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
}> = ({ file }) => {
    return (
        <div id="swiperS">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{
                    type: 'progressbar',
                }}
                autoplay={{ delay: 2000 }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {file.map((f) => (
                    <SwiperSlide key={f.link}>
                        {f.type === 'image' ? (
                            <Img src={f.link} id="baby" alt={f.link} />
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
