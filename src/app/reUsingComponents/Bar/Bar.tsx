import { memo } from 'react';
import { Div, P } from '../styleComponents/styleDefault';
interface bar {
    onClick?: () => void;
    css: string;
    rotate?: string;
    top?: string;
}
const Bar: React.FC<bar> = ({ onClick, css, top, rotate }) => {
    const props = {
        onClick,
    };
    const cssC = `
                position: absolute;
                width: 15px;
                height: 30px;
                top: ${top};
                display: flex;
                align-items: center;
                cursor: pointer;
                transform: rotate(${rotate ? rotate : 'none'})
                
    `;
    return (
        <Div css={css} {...props}>
            <Div css={cssC}>
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
