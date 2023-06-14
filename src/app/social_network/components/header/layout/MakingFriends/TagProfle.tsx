import { memo } from 'react';
import Avatar from '../../../../../reUsingComponents/Avatars/Avatar';
import { DivContainer, DivImg, Hname } from '../../../../../reUsingComponents/styleComponents/styleComponents';
import { Button, Buttons, Div, P } from '../../../../../reUsingComponents/styleComponents/styleDefault';
import { setIdUser } from '~/redux/hideShow';
import { useDispatch } from 'react-redux';
import CommonUtils from '~/utils/CommonUtils';
interface PropsTagP {
    data: {
        id: string;
        fullName: string;
        nickName: string | undefined;
        avatar: string | undefined;
        gender: number;
    };
    onClick?: (id: string) => void;
    button?: { css: string; text: string; onClick?: (args: any) => void }[];
    margin?: string;
    bg?: string;
    profile?: boolean;
    cssImage?: string;
    colorText?: string;
}
const TagProfle: React.FC<PropsTagP> = ({
    data,
    onClick,
    button,
    margin,
    bg,
    colorText,
    cssImage,
    profile = false,
}) => {
    const dispatch = useDispatch();
    const handlePlPage = (id: string) => {
        if (profile) {
            dispatch(setIdUser([id]));
        }
    };

    return (
        <Div width="100%" wrap="wrap" css=" align-items: center;">
            <Div
                width="100%"
                css={`
                    align-items: center;
                    padding: 5px;
                    @media (min-width: 769px) {
                        padding: 0;
                        width: 100%;
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                `}
            >
                <Avatar
                    profile={profile}
                    css={cssImage}
                    src={data.avatar}
                    alt={data.fullName}
                    gender={data.gender}
                    onClick={() => handlePlPage(data.id)}
                />
                <Div
                    width="100%"
                    wrap="wrap"
                    css={`
                        height: 45px;
                        color: ${colorText || '#cbcbcb'};
                        @media (min-width: 769px) {
                            margin-top: 7px;
                            justify-content: center;
                            text-align: center;
                            cursor: var(--pointer);
                        }
                    `}
                    onClick={() => handlePlPage(data.id)}
                >
                    <Hname>{data.fullName}</Hname>
                    <P css="font-size: 1.2rem; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; height: 20px;">
                        {data.nickName}
                    </P>
                </Div>
            </Div>
            {button && (
                <Div
                    width="100%"
                    css={`
                        justify-content: space-evenly;
                        padding: 8px 0;
                        background-color: #414141;
                        @media (min-width: 769px) {
                            flex-wrap: wrap;
                            padding: 0;
                            background-color: transparent;
                            margin-top: 8px;
                        }
                    `}
                >
                    <Buttons text={button} />
                </Div>
            )}
        </Div>
    );
};
export default memo(TagProfle);
