import { Pagination } from 'swiper';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import Player from '~/reUsingComponents/Videos/Player';
import { DivSwiper } from './styleSwipers';

// import required modules

const Dynamic: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, step, setStep }) => {
    return (
        <>
            <Div width="100%" css="img{object-fit: contain;}">
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {file.map((f) => (
                        <SwiperSlide key={f.link}>
                            {f.type === 'image' ? (
                                <Img src={f.link} id="baby" alt={f.link} radius="5px" />
                            ) : f.type === 'video' ? (
                                <Player src={f.link} step={step} />
                            ) : (
                                ''
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Div>
        </>
    );
};
export default Dynamic;
