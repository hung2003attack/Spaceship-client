import { useEffect, useRef, useState } from 'react';
import { Div, P } from '../styleComponents/styleDefault';
import { DivControls, Input, Progress, Video } from './styleVideos';
import { FullScreenI, PauseI, PlayI, VolumeOffI, VolumeOnI } from '~/assets/Icons/Icons';

const Player: React.FC<{ src: string; step: number; height?: string }> = ({ src, step, height }) => {
    const video = useRef<any>();
    const progress = useRef<any>();
    const [showTime, setShowTime] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const playRef = useRef<boolean>(false);
    const [play, setPlay] = useState<boolean>(false);
    const [volume, setVolume] = useState<boolean>(true);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [showControls, setShowControls] = useState<boolean>(false);
    useEffect(() => {
        video.current.volume = 1;
        progress.current.value = 0;
        progress.current.style.backgroundSize = 0;
        video.current.addEventListener('timeupdate', function () {
            const currentTime = video.current.currentTime;
            const duration = video.current.duration;
            setCurrentTime(Math.round(currentTime));
            if (!showTime) setShowTime(Math.round(duration));
            const prog = (currentTime / duration) * 100;
            if (progress.current) {
                progress.current.value = prog;
                const min = progress.current.min;
                const max = progress.current.max;
                const val = progress.current.value;
                progress.current.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
            }
            if (prog === 100) setPlay(false);
        });
    }, []);

    useEffect(() => {
        if (step === 0 || step === 1) {
            if (play) {
                video.current.pause();
                playRef.current = false;
                setPlay(false);
            }
        }
    }, [step]);
    const handlePlay = () => {
        const videoALl = document.querySelectorAll('video');
        Array.from(videoALl).forEach((video) => {
            video.pause();
        });
        setShowControls(true);
        if (play) {
            video.current.pause();
            playRef.current = false;
            setPlay(false);
        } else {
            video.current.play();
            playRef.current = true;
            setPlay(true);
        }
    };
    const handleProgressChange = (e: any) => {
        const min = e.target.min;
        const max = e.target.max;
        const val = e.target.value;
        if (video.current) {
            const duration = video.current.duration;
            const currentTime = (val / 100) * duration;
            video.current.currentTime = currentTime;
        }
        e.target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
    };
    const handleMouseDown = () => {
        if (play) {
            video.current.pause();
            setPlay(false);
        }
    };
    const handleMouseUp = () => {
        if (!play && playRef.current) {
            video.current.play();
            setPlay(true);
        }
    };
    const handleVolume = () => {
        if (video.current) {
            if (volume) {
                video.current.volume = 0;
                setVolume(false);
            } else {
                video.current.volume = 0.5;
                setVolume(true);
            }
        }
    };
    const handleProgressVolume = (e: any) => {
        const min = e.target.min;
        const max = e.target.max;
        const val = e.target.value;
        if (val > 0) {
            setVolume(true);
        } else {
            setVolume(false);
        }
        if (video.current) {
            const newVol = val / 100;
            video.current.volume = newVol;
            e.target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
        }
    };
    return (
        <Div
            width="100%"
            css={`
                height: ${height};
                justify-content: center;
                position: relative;
                overflow: hidden;
                &:hover {
                    .controls {
                        bottom: 0;
                    }
                }
                /* ${fullScreen && 'position: fixed; top: 0; left: 0; z-index: 999; height: 100%;'} */
            `}
        >
            <Video src={src} ref={video} onClick={handlePlay} />
            <DivControls className="controls" onClick={(e) => e.stopPropagation()}>
                <Div
                    display="none"
                    width="58px"
                    css={`
                        justify-content: space-evenly;
                        @media (min-width: 768px) {
                            display: flex;
                        }
                    `}
                >
                    <Div
                        width="30px"
                        css="font-size: 20px; height: 100%; justify-content: center; align-items: center; cursor: var(--pointer);"
                        onClick={handlePlay}
                    >
                        {play ? <PauseI /> : <PlayI />}
                    </Div>
                    <Div css="align-items: center; position: relative; font-size: 25px; &:hover{input{width: 100px}}">
                        <Div onClick={handleVolume}> {volume ? <VolumeOnI /> : <VolumeOffI />}</Div>
                        <Div
                            width="0px"
                            css="margin-left: 5px; align-items: center; cursor: var(--pointer); position: absolute; transform: rotateZ(270deg); top: -4px; left: 6px; "
                        >
                            <Input
                                ref={progress}
                                bgImage="linear-gradient(rgb(44 45 45),rgb(49 49 49))"
                                type="range"
                                min="0"
                                max="100"
                                css="height: 10px"
                                onChange={handleProgressVolume}
                            />
                        </Div>
                    </Div>
                </Div>
                <Div
                    width="100%"
                    css="align-items: center; cursor: var(--pointer); @media(min-width: 768px){width: 70%;}"
                >
                    <Input
                        ref={progress}
                        type="range"
                        min="0"
                        max="100"
                        bo
                        bgImage="linear-gradient(rgb(45, 108, 209), rgb(45, 108, 209))"
                        onChange={handleProgressChange}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}
                    />
                    {/* <Progress ref={progress} value="0" max="100"></Progress> */}
                </Div>
                <Div
                    display="none"
                    width="90px"
                    css="justify-content: space-around; align-items: center; @media(min-width: 768px) {display: flex;}"
                >
                    <P z="1.4rem">{currentTime + ' / ' + showTime}s</P>
                    {/* <Div css="font-size: 20px;">
                            <FullScreenI />
                        </Div> */}
                </Div>
            </DivControls>
        </Div>
    );
};
export default Player;
