import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Player } from 'video-react';
import { Img } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { FullScreenI, PlayI, ScreenI } from '~/assets/Icons/Icons';
import { DivSwiper } from './styleCoverflow';

const Coverflow: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, step, setStep }) => {
    return (
        <DivSwiper
            css={`
                ${step === 1
                    ? 'position: fixed; top: 0; left: 0; background-color: #090808; height: 100%; z-index: 12;'
                    : ''}
            `}
        >
            {step !== 0 && (
                <DivPos
                    size="20px"
                    top="-25px"
                    right="11.5px"
                    color={colorText}
                    onClick={() => setStep(0)}
                    css={`
                        ${step > 0
                            ? `${
                                  step > 1 ? 'background-color: #a1a1a18a;' : 'background-color: #0304048a;'
                              };position: fixed; top: 8px; right: 11.5px; color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px;  transition: all 0.5s linear; `
                            : ''}
                    `}
                >
                    <ScreenI />
                </DivPos>
            )}
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
        </DivSwiper>
    );
};
export default Coverflow;
