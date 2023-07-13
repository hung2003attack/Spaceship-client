import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Player } from 'video-react';
import { Buttons, Div, H3, Img, Input, P, Span } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivPos, Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { FullScreenI, PlayI, ScreenI, TitleI } from '~/assets/Icons/Icons';
import { DivSwiper } from './styleSwipers';
import { Textarea } from '../../../styleFormUpNews';

const Coverflow: React.FC<{
    file: {
        link: string;
        type: string;
    }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, step, setStep }) => {
    const [more, setMore] = useState<number[]>([]);
    const [showTitle, setShowTitle] = useState<number[]>([]);
    const [title, setTitle] = useState<{ id: number; title: string }[]>([]);
    const [content, setContent] = useState<{ id: number; title: string }[]>([]);
    const handleOnKeyup = (e: any) => {
        e.target.setAttribute('style', 'height: auto');
        e.target.setAttribute('style', `height: ${e.target.scrollHeight}px`);
    };

    const handleGetTitle = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        console.log(e.target.value, title);
        let check = false;
        title.forEach((t) => {
            if (t.id === index) {
                check = true;
            }
        });
        if (check) {
            setTitle(() =>
                title.map((t) => {
                    if (t.id === index) {
                        t.title = e.target.value;
                    }
                    return t;
                }),
            );
        } else {
            setTitle([...title, { id: index, title: e.target.value }]);
        }
    };
    const handleGetContent = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        console.log(e.target.value, content);

        let check = false;
        content.forEach((t) => {
            if (t.id === index) {
                check = true;
            }
        });
        if (check) {
            setContent(() =>
                content.map((t) => {
                    if (t.id === index) {
                        t.title = e.target.value;
                    }
                    return t;
                }),
            );
        } else {
            setContent([...content, { id: index, title: e.target.value }]);
        }
    };
    const TList: number[] = [];
    return (
        <DivSwiper
            css={`
                ${step === 1
                    ? 'position: fixed; top: 0; left: 0; background-color:#292a2d; height: 100%; z-index: 12;'
                    : ''}
            `}
        >
            <DivPos
                size="20px"
                top="50px"
                right="11.5px"
                onClick={() => {
                    if (showTitle.length > 0) {
                        setShowTitle([]);
                    } else {
                        setShowTitle(TList);
                    }
                }}
                css="position: fixed;  color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px; background-color: #0304048a; transition: all 0.5s linear; "
            >
                <TitleI />
            </DivPos>
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
                    depth: 120,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                speed={1000}
                autoplay={{ delay: 1000 }}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {file.map((f, index) => {
                    TList.push(index);
                    return (
                        <SwiperSlide key={f.link}>
                            {f.type === 'image' ? (
                                <Div
                                    width="100%"
                                    css={`
                                        img {
                                            z-index: 1;
                                        }
                                        div {
                                            display: none;
                                        }

                                        @media (min-width: 768px) {
                                            div {
                                                display: flex;
                                            }
                                            background-color: #292a2d;
                                        }
                                    `}
                                >
                                    {step === 1 && (
                                        <Div
                                            width="100%"
                                            css={`
                                                height: 100%;
                                                position: absolute;
                                                top: 0;
                                                left: 0;
                                                background-image: url(${f.link});
                                                background-size: contain;
                                                opacity: 0.2;
                                            `}
                                        ></Div>
                                    )}
                                    {showTitle.length > 0 && (
                                        <Div
                                            width="100%"
                                            css={`
                                                position: absolute;
                                                flex-wrap: wrap;
                                                overflow: hidden;
                                                bottom: 0;
                                                z-index: 2;
                                                background-color: #0000008c;
                                                padding: 10px;
                                            `}
                                        >
                                            {showTitle.length > 0 && !showTitle.includes(index) && (
                                                <Div onClick={() => setShowTitle([...showTitle, index])}>
                                                    <TitleI />
                                                </Div>
                                            )}

                                            {showTitle.includes(index) && step === 1 && (
                                                <>
                                                    <Input
                                                        placeholder="Title"
                                                        color={colorText}
                                                        onChange={(e) => handleGetTitle(e, index)}
                                                    />
                                                    <Textarea
                                                        color={colorText}
                                                        bg="transparent"
                                                        placeholder="Content"
                                                        onKeyUp={handleOnKeyup}
                                                        onChange={(e) => handleGetContent(e, index)}
                                                    />
                                                    <Buttons
                                                        text={[
                                                            {
                                                                text: 'Save',
                                                                css: 'color: #247f76;',
                                                            },
                                                            {
                                                                text: 'Cancel',
                                                                css: 'color: #ac5b5b;',
                                                                onClick: () => {
                                                                    let check = false;
                                                                    showTitle.forEach((s) => {
                                                                        if (s === index) {
                                                                            check = true;
                                                                        }
                                                                    });
                                                                    if (check) {
                                                                        setShowTitle(() =>
                                                                            showTitle.filter((s) => s !== index),
                                                                        );
                                                                    } else {
                                                                        setShowTitle([...showTitle, index]);
                                                                    }
                                                                },
                                                            },
                                                        ]}
                                                    />

                                                    {title.map((t) => {
                                                        return t.id === index ? (
                                                            <Hname
                                                                key={index}
                                                                css={`
                                                                    width: 100%;
                                                                    ${step === 1
                                                                        ? 'font-size: 1.6rem;'
                                                                        : 'font-size: 1.4rem;'}
                                                                `}
                                                            >
                                                                {t.title}
                                                            </Hname>
                                                        ) : (
                                                            ''
                                                        );
                                                    })}
                                                    {content.map((t) => {
                                                        return t.id === index ? (
                                                            <P
                                                                key={index}
                                                                css={`
                                                                    ${(!more.includes(index) || step !== 1) &&
                                                                    ' overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;'}
                                                                    ${step === 1
                                                                        ? 'font-size: 1.4rem'
                                                                        : 'font-size: 1rem;'}
                                                                `}
                                                            >
                                                                {t.title}
                                                            </P>
                                                        ) : (
                                                            ''
                                                        );
                                                    })}
                                                </>
                                            )}

                                            {/* <Span
                                            css={`
                                                padding: 4px 0;
                                                ${step === 1 ? 'font-size: 1.4rem' : 'font-size: 1.2rem;'}
                                            `}
                                            onClick={() => {
                                                let check = false;
                                                more.forEach((m) => {
                                                    if (m === index) check = true;
                                                });
                                                if (check) {
                                                    setMore(() => more.filter((m) => m !== index));
                                                } else {
                                                    setMore([...more, index]);
                                                }
                                                setStep(1);
                                            }}
                                        >
                                            {more.includes(index) ? 'Ẩn bớt' : 'Xem thêm'}
                                        </Span> */}
                                        </Div>
                                    )}

                                    <Img src={f.link} id="baby" alt={f.link} radius="5px" />
                                </Div>
                            ) : f.type === 'video' ? (
                                <Player src={f.link} />
                            ) : (
                                ''
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </DivSwiper>
    );
};
export default Coverflow;
