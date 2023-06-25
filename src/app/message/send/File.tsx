import { useEffect, useLayoutEffect, useState } from 'react';
import { Div, Img } from '~/reUsingComponents/styleComponents/styleDefault';
import sendChatAPi from '~/restAPI/requestServers/accountRequest/sendChatAPi';
import CommonUtils from '~/utils/CommonUtils';

const FileConversation: React.FC<{ token: string; v: string; icon: string }> = ({ token, v, icon }) => {
    const [data, setData] = useState<any>('');
    async function fechFile(f: string) {
        const buffer = await sendChatAPi.getFile(token, f);
        const base64 = CommonUtils.convertBase64Gridfs(buffer.file);
        setData(`data:${buffer.type};base64,${base64}`);
    }

    useEffect(() => {
        fechFile(v);
    }, []);
    return (
        <Div
            // key={fl.v}
            css={`
                min-width: 79px;
                width: 79px;
                border-radius: 5px;
                border: 2px solid #202124;
                flex-grow: 1;
            `}
        >
            <Img src={data} radius="5px" />
        </Div>
    );
};
export default FileConversation;
