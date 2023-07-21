import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import LogicType from './logicType';

const MP3: React.FC<{
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
            `}
        >
            {file.map((f, index) => {
                return (
                    <Div
                        key={f.link}
                        css={`
                            margin-bottom: 10px;
                        `}
                        onClick={(e) => handleStep(e, f.link)}
                    >
                        <Img src={f.link} alt={f.link} />
                    </Div>
                );
            })}
        </Div>
    );
};
export default MP3;
