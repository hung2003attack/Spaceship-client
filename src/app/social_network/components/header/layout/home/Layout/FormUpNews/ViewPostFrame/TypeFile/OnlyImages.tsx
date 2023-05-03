import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';

const OnlyImages: React.FC<{ images: string[] }> = ({ images }) => {
    return (
        <Div width="100%" css="margin: 4px 0;">
            <Div css="height: 100%;display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; border-radius: 5px; padding: 4px 9px;">
                {images.map((f) => {
                    return (
                        <Div
                            key={f}
                            width="100%"
                            css={`
                                height: 100%;
                                margin: 0 1.5px;
                                border-radius: 5px;
                            `}
                        >
                            <Img src={f} alt={f} radius="5px" />
                        </Div>
                    );
                })}
            </Div>
        </Div>
    );
};
export default OnlyImages;
