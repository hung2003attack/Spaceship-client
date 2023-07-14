import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Pagination } from 'swiper';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import Player from '~/reUsingComponents/Videos/Player';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { ScreenI } from '~/assets/Icons/Icons';

const Centered: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    handleImageUpload: (e: any, addMore: boolean) => Promise<void>;

    dataCenteredPre: {
        id: number;
        data: {
            link: string;
            type: string;
        }[];
    }[];
}> = ({ file, colorText, step, setStep, handleImageUpload, dataCenteredPre }) => {
    const [qt, setQt] = useState<number>(4);
    console.log(dataCenteredPre);

    return (
        <Div width="100%" wrap="wrap" css="height: fit-content; .swiper{ width: 100%;}">
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
            {dataCenteredPre.length > 0 ? (
                dataCenteredPre.map((dt) => (
                    <Swiper
                        key={dt.id}
                        slidesPerView={qt}
                        spaceBetween={10}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
                        }}
                        className="mySwiper"
                    >
                        {dt.data.map((f) => {
                            return (
                                <SwiperSlide key={f.link}>
                                    {f.type === 'image' ? (
                                        <Img src={f.link} alt={f.link} radius="5px" />
                                    ) : f.type === 'video' ? (
                                        <Player src={f.link} step={step} height="100%" />
                                    ) : (
                                        ''
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ))
            ) : (
                <Swiper
                    slidesPerView={qt}
                    spaceBetween={10}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    {file.map((f) => {
                        return (
                            <SwiperSlide key={f.link}>
                                {f.type === 'image' ? (
                                    <Img src={f.link} alt={f.link} radius="5px" />
                                ) : f.type === 'video' ? (
                                    <Player src={f.link} step={step} height="100%" />
                                ) : (
                                    ''
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
            {/* <Swiper
                slidesPerView={qt}
                spaceBetween={10}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {file.map((f) => {
                    return (
                        <SwiperSlide key={f.link}>
                            {f.type === 'image' ? (
                                <Img src={f.link} alt={f.link} radius="5px" />
                            ) : f.type === 'video' ? (
                                <Player src={f.link} step={step} height="100%" />
                            ) : (
                                ''
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <Swiper
                slidesPerView={qt}
                spaceBetween={10}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {file.map((f) => {
                    return (
                        <SwiperSlide key={f.link}>
                            {f.type === 'image' ? (
                                <Img src={f.link} alt={f.link} radius="5px" />
                            ) : f.type === 'video' ? (
                                <Player src={f.link} step={step} height="100%" />
                            ) : (
                                ''
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper> */}
        </Div>
    );
};
export default Centered;
