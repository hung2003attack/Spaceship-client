import { Div, Img, Input, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivComment, Label } from './styleFormUpNews';
import { CameraI, ResetI, SendI, SendOPTI, UndoIRegister } from '~/assets/Icons/Icons';
import { DivPos } from '~/reUsingComponents/styleComponents/styleComponents';
import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { useState } from 'react';

const Comment: React.FC<{
    anony: {
        id: number;
        name: string;
    }[];
    setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
    colorText: string;
}> = ({ anony, setShowComment, colorText }) => {
    const [anonymous, setAnonymous] = useState<boolean>(false);
    const [activate, setActivate] = useState<number>(1);
    const handleComment = () => {
        setAnonymous(!anonymous);
    };
    console.log(activate);

    return (
        <DivComment onClick={(e) => e.stopPropagation()}>
            <Div
                width="100%"
                css={`
                    height: 30%;
                    background-color: #202023;
                    opacity: 0.5;
                `}
                onClick={() => setShowComment(false)}
            ></Div>
            <Div
                width="100%"
                wrap="wrap"
                css={`
                    height: 70%;
                    background-color: #2d2f31;
                    position: relative;
                `}
            >
                <Div
                    width="100%"
                    css={`
                        height: 30px;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        border: 1px solid #4a4a4a;
                    `}
                >
                    <DivPos size="20px" top="3px" left="6px" onClick={() => setShowComment(false)}>
                        <UndoIRegister />
                    </DivPos>
                    <P z="1.4rem">Comment</P>
                    <DivPos size="20px" top="3px" right="6px">
                        <ResetI />
                    </DivPos>
                </Div>

                <Div
                    width="100%"
                    css={`
                        height: 40px;
                        align-items: center;
                        justify-content: space-around;
                        padding: 5px;
                        margin: 5px 0;
                        input {
                            padding: 8px 14px;
                        }
                        @media (max-width: 550px) {
                            input {
                                padding: 8px;
                            }
                            position: absolute;
                            bottom: 2px;
                            left: 0;
                            background-color: transparent;
                        }
                    `}
                >
                    <Avatar
                        src={activate < 5 ? 'https://bookkol.com/wp-content/uploads/2022/12/son-tung-mtp.jpg' : ''}
                        alt="son-tung"
                        gender={activate}
                        radius="50%"
                        css={`
                            width: 35px;
                            height: 35px;
                        `}
                        onClick={handleComment}
                    >
                        {anonymous && anony.some((a) => a.id === 5) ? (
                            <Div
                                css={`
                                    position: absolute;
                                    top: -50px;
                                    width: 115px;
                                    padding: 4px;
                                    background-color: #1c5689;
                                    border-radius: 5px;
                                `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (activate === 0) {
                                        setActivate(11);
                                    } else if (activate === 1) {
                                        setActivate(12);
                                    } else if (activate === 11) {
                                        setActivate(0);
                                    } else if (activate === 12) {
                                        setActivate(1);
                                    }
                                }}
                            >
                                <Avatar
                                    src={
                                        activate > 5
                                            ? 'https://bookkol.com/wp-content/uploads/2022/12/son-tung-mtp.jpg'
                                            : ''
                                    }
                                    radius="50%"
                                    gender={activate === 0 ? 11 : activate === 1 ? 12 : activate === 11 ? 0 : 1}
                                />
                                <P>Anonymous</P>
                            </Div>
                        ) : (
                            <></>
                        )}
                    </Avatar>
                    <Div css="font-size: 20px">
                        <input
                            id="uploadC"
                            type="file"
                            name="file[]"
                            // onChange={handleImageUpload}
                            multiple
                            hidden
                        />
                        <Label htmlFor="uploadC">
                            <CameraI />
                        </Label>
                    </Div>
                    <Input
                        placeholder="Comment"
                        width="70%"
                        border="0"
                        radius="50px"
                        color={colorText}
                        background="#454545;"
                    />
                    <Div css="font-size: 20px">
                        <SendOPTI />
                    </Div>
                </Div>
                <Div width="100%">Results</Div>
            </Div>
        </DivComment>
    );
};
export default Comment;
