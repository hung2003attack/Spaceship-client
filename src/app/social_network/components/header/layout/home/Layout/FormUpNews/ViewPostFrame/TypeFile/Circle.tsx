import { HeartMI } from '~/assets/Icons/Icons';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import LogicType from './logicType';
import Player from '~/reUsingComponents/Videos/Player';

const Circle: React.FC<{
    file: { link: string; type: string }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ file, colorText, step, setStep }) => {
    const {
        moreFile,
        cc,
        handleStep,
        setMoreFile,
        ToolDefault,
        showTitle,
        update,
        setUpdate,
        showComment,
        setShowComment,
    } = LogicType(step, setStep, colorText);
    return (
        <Div
            width="100%"
            wrap="wrap"
            css={`
                justify-content: space-evenly;
                position: relative;
            `}
        >
            {step > 0 && ToolDefault(0)}
            {file.map((f, index) => {
                return (
                    <Div
                        key={f.link}
                        width="80px"
                        id="baby"
                        className="aaa"
                        wrap="wrap"
                        onClick={(e) => {
                            handleStep(e, f?.link);
                        }}
                        css={`
                            height: 80px;
                            margin-bottom: 10px;
                            img {
                                border-radius: 50%;
                            }
                            ${(index + 1) % 2 === 0 ? 'margin-top: 25px' : ''};

                            @media (min-width: 580px) {
                                width: 100px;
                                height: 100px;
                            }
                            ${step > 1 && cc === f?.link
                                ? `width: 100% !important; margin: 0; height: 100% !important; img {border-radius: 0} position: fixed;  top: 0; left:0; z-index: 103; background-color: #0e0e0d; img,div.video-react-controls-enabled{object-fit: contain; margin: auto;}`
                                : ''}
                        `}
                    >
                        {f.type === 'image' ? (
                            <Img src={f.link} alt={f.link} />
                        ) : f.type === 'video' ? (
                            <Player src={f.link} />
                        ) : (
                            ''
                        )}
                    </Div>
                );
            })}
        </Div>
    );
};
export default Circle;
