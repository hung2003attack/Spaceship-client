import { useEffect, useLayoutEffect, useState } from 'react';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import sendChatAPi from '~/restAPI/requestServers/accountRequest/sendChatAPi';
import CommonUtils from '~/utils/CommonUtils';

const FileConversation: React.FC<{ token: string; type?: string; v: string; icon: string; ERef: any }> = ({
    token,
    type = '',
    v,
    icon,
    ERef,
}) => {
    const [data, setData] = useState<any>('');
    console.log(type, 'type yes');

    async function fechFile(f: string) {
        if (!type) {
            const buffer = await sendChatAPi.getFile(token, f);
            const base64 = CommonUtils.convertBase64Gridfs(buffer.file);
            setData(`data:${buffer.type};base64,${base64}`);
        }
    }

    useEffect(() => {
        if (!type) {
            console.log(type, 'type');
            fechFile(v);
        } else {
            console.log(type, 'type ---');
            setData(v);
        }
    }, []);

    const handleRoom = (e: any) => {
        e.stopPropagation();
        if (e.target.getAttribute('class').includes('roomOfChat')) {
            e.target.classList.remove('roomOfChat');
        } else {
            e.target.classList.add('roomOfChat');
        }
    };
    return (
        <Div
            css={`
                min-width: 79px;
                width: 79px;
                border-radius: 5px;
                border: 2px solid #202124;
                flex-grow: 1;
                position: relative;
                &::after {
                    display: block;
                    content: '';
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            `}
            onClick={handleRoom}
        >
            {data && <Img id="roomImageChat" src={data} radius="5px" onClick={(e) => e.stopPropagation()} />}
        </Div>
    );
};
export default FileConversation;
