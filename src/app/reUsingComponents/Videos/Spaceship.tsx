import { useEffect, useRef, useState } from 'react';
import { Video } from '../styleComponents/styleComponents';
import { Div } from '../styleComponents/styleDefault';

const Player: React.FC<{ src: string }> = ({ src }) => {
    const video = useRef<any>();
    const [play, setPlay] = useState<boolean>(false);
    useEffect(() => {}, []);
    const handlePlay = () => {
        if (play) {
            video.current.pause();
            setPlay(false);
            console.log('pause');
        } else {
            video.current.play();
            setPlay(true);
        }
    };
    return (
        <Div css="justify-content: center;">
            <Video src={src} ref={video} onClick={handlePlay} />
        </Div>
    );
};
export default Player;
