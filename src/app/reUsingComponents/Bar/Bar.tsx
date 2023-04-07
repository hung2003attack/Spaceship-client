import { memo } from 'react';
import { Div, P } from '../styleComponents/styleDefault';
interface bar {
    onClick?: () => void;
    css: string;
}
const Bar: React.FC<bar> = ({ onClick, css }) => {
    const props = {
        onClick,
    };
    return (
        <Div css={css} {...props}>
            <Div
                css="   position: absolute;
                        width: 15px;
                        height: 30px;
                        top: calc(50% - 10px);
                        display: flex;
                        align-items: center;
                        cursor: pointer;"
            >
                <P
                    css="width: 2px;
                        height: 100%;
                        background-color: #acacac;
                        margin-left: 4px;"
                ></P>
                <P
                    css="width: 2px;
                        height: 70%;
                        background-color: #acacac;
                        margin-left: 2px;"
                ></P>
            </Div>
        </Div>
    );
};
export default memo(Bar);
