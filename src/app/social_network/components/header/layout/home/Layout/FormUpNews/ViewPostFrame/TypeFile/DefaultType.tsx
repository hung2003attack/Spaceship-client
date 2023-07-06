import { Button, Div, Img, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { useState, useEffect } from 'react';
import { BackI, ChangeI, DotI, FullScreenI, HeartMI, ScreenI, ShareI, TitleI } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import { UndoI } from '~/assets/Icons/Icons';
import LogicType from './logicType';
import { InputT } from './styleCoverflow';
import Player from '~/reUsingComponents/Videos/Player';

const DefaultType: React.FC<{
    file: { link: string; type: string }[];
    colorText: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    upload: any;
}> = ({ file, colorText, step, setStep, upload }) => {
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
    const [classify, setClassify] = useState<{ value: string; id: number }[]>([{ value: '', id: 0 }]);

    return (
        <Div
            width="100%"
            css={`
                height: fit-content;
                position: relative;
                display: grid;
                grid-template-columns: ${file.length === 1
                    ? '1fr'
                    : file.length === 4 || file.length === 2
                    ? '1fr 1fr'
                    : '1fr 1fr 1fr'};
                ${step === 1 &&
                `
                grid-template-columns: 1fr;
                @media (min-width: 400px) {
                    grid-template-columns: 1fr 1fr;
                }

                @media (min-width: 769px) {
                    grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2px;
                }
                @media (min-width: 1240px) {
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 3px;
                }`}
            `}
        >
            <>
                {step > 0 && ToolDefault(0)}
                {step === 2 && ToolDefault(2)}
                {step === 1 && ToolDefault(1)}
            </>
            {file.map((f, index, arr) => {
                if (step === 0 ? index < moreFile : true) {
                    return (
                        <>
                            <Div
                                key={f.link}
                                id="baby"
                                className="aaa"
                                wrap="wrap"
                                width="100%"
                                onClick={(e) => {
                                    handleStep(e, f.link);
                                }}
                                css={`
                                    height: 100%;
                                    margin: auto;
                                    position: relative;
                                    justify-content: center;
                                    align-items: center;
                                    ${showTitle && step === 1 && 'padding-bottom: 24px;'}
                                    color: ${colorText};
                                    ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                                    ${step > 1 && cc === f.link
                                        ? `position: fixed; height: 100%; top: 0; left:0; z-index: 103; background-color: #0e0e0d; img,div.video-react-controls-enabled{object-fit: contain; margin: auto;}`
                                        : ''}
                                `}
                            >
                                {showTitle && step === 1 && (
                                    <Div
                                        wrap="wrap"
                                        css={`
                                            position: relative;
                                            font-size: 1.5rem;
                                            width: 100%;
                                            padding: 5px 10px;
                                            justify-content: center;
                                            background-color: #424040;
                                        `}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <P css="height: 20px;">
                                            {classify[index]?.id === index && classify[index]?.value}
                                        </P>

                                        <DivPos size="20px" top="5px" right="3px" onClick={() => setUpdate(index)}>
                                            <ChangeI />
                                        </DivPos>
                                        {update === index && (
                                            <Div width="100%" wrap="wrap" css="justify-content: center;">
                                                <InputT
                                                    onFocus={(e: any) => {
                                                        // e.target.value = '';
                                                    }}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                        let ok = false;
                                                        classify.forEach((v) => {
                                                            if (v.id === index) ok = true;
                                                        });
                                                        if (!ok) {
                                                            setClassify([
                                                                ...classify,
                                                                { value: e.target.value, id: index },
                                                            ]);
                                                        } else {
                                                            setClassify(() =>
                                                                classify.map((v) => {
                                                                    if (v.id === index) {
                                                                        v.value = e.target.value;
                                                                        return v;
                                                                    }
                                                                    return v;
                                                                }),
                                                            );
                                                        }

                                                        upload[index].title = e.target.value;
                                                    }}
                                                />
                                                <Button color={colorText} onClick={() => setUpdate(-1)}>
                                                    Disappear
                                                </Button>
                                                {/* <Button color={colorText}>Change</Button>
                                                <Button color={colorText} onClick={() => setUpdate(-1)}>
                                                    Cancel
                                                </Button> */}
                                            </Div>
                                        )}
                                    </Div>
                                )}
                                <Div width="100%" css="height: 100%; position: relative; justify-content: center;">
                                    {f.type === 'image' ? (
                                        <Img src={f.link} id="baby" alt={f.link} />
                                    ) : f.type === 'video' ? (
                                        <Player src={f.link} step={step} />
                                    ) : (
                                        ''
                                    )}
                                    {step === 1 && (
                                        <>
                                            <Div
                                                css={`
                                                    height: 100px;
                                                    flex-direction: column;
                                                    align-items: center;
                                                    justify-content: space-evenly;
                                                    position: absolute;
                                                    right: 10px;
                                                    bottom: 12%;
                                                    font-size: 25px;
                                                    color: #d9d9d9;
                                                    background-color: #474747a8;
                                                    padding: 5px;
                                                    border-radius: 5px;
                                                    .M.coment {
                                                    }
                                                `}
                                            >
                                                <Div>
                                                    <HeartMI />
                                                </Div>
                                                <Div
                                                    width="fit-content"
                                                    css={`
                                                        margin-top: 2px;
                                                        height: fit-content;
                                                        border-radius: 50%;
                                                        border: 1px solid #dedede;
                                                        font-size: 20px;
                                                    `}
                                                    onClick={() => setShowComment([...showComment, index])}
                                                >
                                                    <DotI />
                                                </Div>
                                                <Div>
                                                    <ShareI />
                                                </Div>
                                            </Div>
                                            {showComment.includes(index) && (
                                                <Div
                                                    className="comment"
                                                    wrap="wrap"
                                                    css={`
                                                        width: 100%;
                                                        height: 100%;
                                                        position: absolute;
                                                        bottom: 0px;
                                                        background-color: aliceblue;
                                                    `}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Div
                                                        width="100%"
                                                        css="height: 30px; align-items: center; justify-content: center;  background-color: #9a9a9a; "
                                                    >
                                                        <DivPos
                                                            size="25px"
                                                            top="3px"
                                                            left="4px"
                                                            onClick={() =>
                                                                setShowComment(() =>
                                                                    showComment.filter((c) => c !== index),
                                                                )
                                                            }
                                                        >
                                                            <BackI />
                                                        </DivPos>
                                                        <P z="1.5rem" css="">
                                                            Comment
                                                        </P>
                                                    </Div>
                                                    <Div></Div>
                                                </Div>
                                            )}
                                        </>
                                    )}
                                </Div>
                                {step === 0 && index + 1 >= moreFile && arr.length > moreFile && (
                                    <Div
                                        id="more"
                                        css={`
                                            width: 100%;
                                            height: 100%;
                                            position: absolute;
                                            color: white;
                                            align-items: center;
                                            justify-content: center;
                                            background-color: #6d6f7273;
                                        `}
                                        onClick={() => setMoreFile((pre) => pre + 6)}
                                    >
                                        <P>More</P>
                                    </Div>
                                )}
                            </Div>
                            {step === 0 && index + 1 === file.length && file.length > 6 && (
                                <Div
                                    key={index + 1}
                                    css={`
                                        grid-column-end: 4;
                                        grid-column-start: 1;
                                        width: 100%;
                                        height: 100%;
                                        color: white;
                                        align-items: center;
                                        justify-content: center;
                                        background-color: #6d6f7273;
                                    `}
                                    onClick={() => setMoreFile(6)}
                                >
                                    <P>Less</P>
                                </Div>
                            )}
                        </>
                    );
                }
            })}
        </Div>
    );
};
export default DefaultType;
