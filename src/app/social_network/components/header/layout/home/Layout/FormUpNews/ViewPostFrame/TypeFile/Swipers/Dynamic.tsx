import { Pagination } from 'swiper';
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import Player from '~/reUsingComponents/Videos/Player';
import { DivSwiper } from './styleSwipers';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { ScreenI } from '~/assets/Icons/Icons';

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
    const [heightV, setHeightV] = useState<{ id: number; value: string }[]>([]);
    const [heightI, setHeightI] = useState<string>('');
    useEffect(() => {
        file.forEach((f, index) => {
            if (f.type === 'video') {
                var video = document.createElement('video');
                video.src = f.link; // Thay đường dẫn bằng đường dẫn video thực tế
                video.addEventListener('loadedmetadata', function () {
                    var videoHeight = video.videoHeight;
                    var videoWidth = video.videoWidth;
                    console.log(videoHeight - videoWidth);
                    let check = false;
                    heightV.forEach((v) => {
                        if (v.id === index) {
                            check = true;
                        }
                    });
                    if (videoHeight - videoWidth > 400) {
                        if (!check) {
                            heightV.push({ id: index, value: '600px' });
                            setHeightV(heightV);
                        }
                    } else {
                        if (!check) {
                            heightV.push({ id: index, value: 'auto' });
                            setHeightV(heightV);
                        }
                    }
                });
            } else if (f.type === 'image') {
                if (!heightI) {
                    var img = new Image();
                    img.src = f.link; // Thay đường dẫn bằng đường dẫn hình ảnh thực tế
                    img.addEventListener('load', function () {
                        var imageHeight = img.naturalHeight;
                        var imageWidth = img.naturalWidth;
                        if (imageHeight - imageWidth > 300) {
                            setHeightI('600px');
                        }
                    });
                }
            }
        });
    }, [file]);

    console.log(heightV, 'v');
    return (
        <>
            <Div
                width="100%"
                css={`
                    img {
                        object-fit: contain;
                    }
                    .swiper-slide {
                        align-items: center;
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
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {file.map((f, index) => {
                        let h: string = '';
                        heightV.forEach((v) => {
                            if (v.id === index) {
                                h = v.value;
                            }
                        });

                        return (
                            <SwiperSlide key={f.link}>
                                {f.type === 'image' ? (
                                    <Div
                                        width="100%"
                                        css={`
                                            @media (min-width: 768px) {
                                                ${step === 0 ? `height: ${heightI};` : 'height: 100%;'}
                                            }
                                        `}
                                    >
                                        <Img src={f.link} id="baby" alt={f.link} radius="5px" />
                                    </Div>
                                ) : f.type === 'video' ? (
                                    <Player height={step === 0 ? h : ''} src={f.link} step={step} />
                                ) : (
                                    ''
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Div>
        </>
    );
};
export default Dynamic;
