import { Player } from 'video-react';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';

const Grid: React.FC<{
    column: number;
    file: {
        link: string;
        type: string;
    }[];
}> = ({ column, file }) => {
    let columns = '';
    if (column) {
        for (let i = 0; i < column; i++) {
            columns += '1fr ';
        }
    }
    return (
        <Div width="100%" css="margin: 4px 0;">
            <Div
                width="100%"
                css={`
                    height: 100%;
                    display: grid;
                    gap: 2px;
                    border-radius: 5px;
                    padding: 4px 9px;
                    grid-template-columns: ${file.length === 1 ? '1fr' : columns};
                `}
            >
                {file.map((f) => {
                    return (
                        <Div
                            key={f.link}
                            width="100%"
                            css={`
                                height: 100%;
                                margin: 0 1.5px;
                                border-radius: 5px;
                                ${f.type === 'video' && file.length === 1 ? 'height: 580px;' : ''}
                            `}
                        >
                            {f.type === 'image' ? (
                                <Img src={f.link} alt={f.link} radius="5px" />
                            ) : f.type === 'video' ? (
                                <Player src={f.link} />
                            ) : (
                                ''
                            )}
                        </Div>
                    );
                })}
            </Div>
        </Div>
    );
};
export default Grid;
