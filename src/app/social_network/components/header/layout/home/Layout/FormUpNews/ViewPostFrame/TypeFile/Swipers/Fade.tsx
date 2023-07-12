import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

// import required modules
import { EffectFade, Pagination } from 'swiper';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import Player from '~/reUsingComponents/Videos/Player';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { ScreenI } from '~/assets/Icons/Icons';

const Fade: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, step, setStep }) => {
    return (
        <Div
            width="100%"
            css={`
                .swiper-fade .swiper-slide {
                    background-color: #292a2d;
                    img {
                        object-fit: contain;
                    }
                }
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
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Pagination]}
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
    );
};
export default Fade;
