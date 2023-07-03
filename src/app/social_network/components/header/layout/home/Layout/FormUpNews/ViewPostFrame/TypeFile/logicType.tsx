import { useState } from 'react';
import { ScreenI, TitleI, UndoI } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';

const LogicType = (step: number, setStep: React.Dispatch<React.SetStateAction<number>>, colorText: string) => {
    const [moreFile, setMoreFile] = useState<number>(6);
    const [update, setUpdate] = useState<number>(-1);
    const [cc, setCC] = useState<string>('');
    const [showTitle, setShowTitle] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<number[]>([]);
    const handleStep = (e: any, link: string) => {
        if (e.target.getAttribute('class')) {
            if (
                !e.target.getAttribute('class').includes('video-react-play-control') &&
                !e.target.getAttribute('class').includes('video-react-volume-menu-button') &&
                !e.target.getAttribute('class').includes('video-react-play-progress') &&
                !e.target.getAttribute('class').includes('video-react-icon-stepscreen') &&
                e.target.getAttribute('id') !== 'more'
            ) {
                setCC(link);
                if (step === 0) {
                    setStep(3);
                } else if (step === 1) {
                    setStep(2);
                } else if (step === 2 && e.target.getAttribute('class').includes('aaa')) {
                    setStep(1);
                }
            }
        }
    };

    const ToolDefault = (st: number) => {
        if (st === 0)
            return (
                <DivPos
                    size="20px"
                    top="-25px"
                    right="11.5px"
                    color={colorText}
                    onClick={() => {
                        setStep(0);
                        setShowTitle(false);
                    }}
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
            );

        if (st === 2)
            return (
                <DivPos
                    size="20px"
                    top="50px"
                    right="11.5px"
                    onClick={() => setStep(1)}
                    css="position: fixed;  color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px; background-color: #a1a1a18a; transition: all 0.5s linear; "
                >
                    <UndoI />
                </DivPos>
            );
        if (st === 1)
            return (
                <DivPos
                    size="20px"
                    top="50px"
                    right="11.5px"
                    onClick={() => setShowTitle(!showTitle)}
                    css="position: fixed;  color: #e2d2d2; font-size: 22px; z-index: 888; width: 35px; height: 35px; background-color: #0304048a; transition: all 0.5s linear; "
                >
                    <TitleI />
                </DivPos>
            );
    };

    return {
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
    };
};
export default LogicType;
