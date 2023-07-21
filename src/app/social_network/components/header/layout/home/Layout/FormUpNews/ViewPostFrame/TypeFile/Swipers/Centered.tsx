import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Pagination } from 'swiper';
import { Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import Player from '~/reUsingComponents/Videos/Player';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { CloseI, ScreenI } from '~/assets/Icons/Icons';

const Centered: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    handleImageUpload: (e: any, addMore: boolean) => Promise<void>;

    ColumnCentered: boolean;
    dataCentered: {
        id: number;
        columns: number;
        data: {
            file: Blob;
            title: string;
        }[];
    }[];
    setDataCentered: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                columns: number;
                data: {
                    file: Blob;
                    title: string;
                }[];
            }[]
        >
    >;
    dataCenteredPre: {
        id: number;
        columns: number;
        data: {
            link: string;
            type: string;
        }[];
    }[];
    setDataCenteredPre: React.Dispatch<
        React.SetStateAction<
            {
                id: number;
                columns: number;
                data: {
                    link: string;
                    type: string;
                }[];
            }[]
        >
    >;
    setColumnCen: React.Dispatch<React.SetStateAction<number>>;
}> = ({
    file,
    colorText,
    step,
    setStep,
    handleImageUpload,
    dataCentered,
    setDataCentered,
    dataCenteredPre,
    setDataCenteredPre,
    ColumnCentered,
    setColumnCen,
}) => {
    let cld: number[] = [];
    for (let i = 1; i <= file.length; i++) {
        if (i >= 4) cld.push(i);
    }
    return (
        <Div
            width="100%"
            wrap="wrap"
            css="height: 100%; .mySwiper{ width: 100%; margin: 5px; img{ user-select: none;}}"
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

            {dataCenteredPre.map((dt) => {
                let cls: number[] = [];
                for (let i = 1; i <= dt.data.length; i++) {
                    if (i >= 4) cls.push(i);
                }
                console.log(cls);

                return (
                    <Div key={dt.id} width="100%" wrap="wrap" css="height: fit-content;">
                        {ColumnCentered && (
                            <Div css="padding: 2px 4px;">
                                {cls.map((c) => (
                                    <P
                                        key={c}
                                        z="1.3rem"
                                        css={`
                                            padding: 1px 7px;
                                            border: 1px solid #5a5853;
                                            border-radius: 5px;
                                            margin: 0 2px;
                                            cursor: var(--pointer);
                                            ${dt.columns === c ? 'background-color: #505356;' : ''};
                                        `}
                                        onClick={() => {
                                            setColumnCen(c);
                                            setDataCentered(() =>
                                                dataCentered.map((dc) => {
                                                    if (dc.id === dt.id) {
                                                        dc.columns = c;
                                                    }
                                                    return dc;
                                                }),
                                            );
                                            setDataCenteredPre(() =>
                                                dataCenteredPre.map((dc) => {
                                                    if (dc.id === dt.id) {
                                                        dc.columns = c;
                                                    }
                                                    return dc;
                                                }),
                                            );
                                        }}
                                    >
                                        {c}
                                    </P>
                                ))}
                                <Div
                                    css="align-items: center; cursor: var(--pointer); font-size: 20px; padding: 1px 3px;"
                                    onClick={() => {
                                        setDataCentered(() => dataCentered.filter((d) => d.id !== dt.id));
                                        setDataCenteredPre(() => dataCenteredPre.filter((d) => d.id !== dt.id));
                                    }}
                                >
                                    <CloseI />
                                </Div>
                            </Div>
                        )}
                        <Swiper
                            slidesPerView={dt.columns}
                            spaceBetween={5}
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
                    </Div>
                );
            })}
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
