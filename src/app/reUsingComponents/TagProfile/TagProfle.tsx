import { memo } from 'react';
import Avatar from '../Avatars/Avatar';
import { DivContainer, DivImg, Hname } from '../styleComponents/styleComponents';
import { Button, Buttons, Div, P } from '../styleComponents/styleDefault';
import { setIdUser } from '~/redux/hideShow';
import { useDispatch } from 'react-redux';
interface PropsTagP {
    data: {
        id: string;
        fullName: string;
        nickName: string | undefined;
        avatar: string | undefined;
        gender: number;
    };
    onClick?: (id: string) => void;
    button?: { css: string; text: string }[];
    margin?: string;
    bg?: string;
    profile?: boolean;
    cssImage?: string;
}
const TagProfle: React.FC<PropsTagP> = ({ data, onClick, button = false, margin, bg, cssImage, profile = false }) => {
    const dispatch = useDispatch();
    const handlePlPage = () => {
        if (profile) {
            dispatch(setIdUser(['']));
        }
    };
    console.log('1');
    return (
        <Div width="100%" wrap="wrap">
            <Div
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
                <Avatar profile={profile} css={cssImage} src={data.avatar} alt={data.fullName} gender={data.gender} />
                <Div
                    width="100%"
                    wrap="wrap"
                    css={`
                        @media (min-width: 769px) {
                            margin-top: 7px;
                            justify-content: center;
                            text-align: center;
                        }
                    `}
                    onClick={handlePlPage}
                >
                    <Hname>{data.fullName}</Hname>
                    <P css="font-size: 1.2rem;">{data.nickName}</P>
                </Div>
            </Div>
            {button && (
                <Div
                    width="100%"
                    css="justify-content: space-evenly; padding: 8px 0; background-color: #414141;
                                    @media (min-width: 769px) {
                                        padding:0;
                                        background-color: transparent;
                                        margin-top: 8px;
                                    }"
                >
                    <Buttons
                        text={button}
                        onClick={() => {
                            if (onClick) onClick(data.id);
                        }}
                    />
                </Div>
            )}
        </Div>
    );
};
export default memo(TagProfle);
