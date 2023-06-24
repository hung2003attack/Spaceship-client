import { useState } from 'react';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivItems, DivResults, DivTools } from './stylesTools';
import { DotI, OfflineI, OnlineI } from '~/assets/Icons/Icons';
import { socket } from '../nextWeb';
import Cookies from 'universal-cookie';
import HttpRequestUser from '~/restAPI/requestServers/accountRequest/userAPI';
import { PropsUser } from 'src/App';
import { PropsReloadRD } from '~/redux/reload';
import { useSelector } from 'react-redux';

const cookies = new Cookies();

const Tools: React.FC<{
    colorText: string;
    colorBg: number;
    as: number;
    userId: string;
    dataUser: PropsUser;
    setDataUser: React.Dispatch<React.SetStateAction<PropsUser | undefined>>;
}> = ({ colorText, colorBg, as, userId, dataUser, setDataUser }) => {
    const [status, setStatus] = useState<React.ReactNode>(null);
    const [onOff, setOnOff] = useState<React.ReactElement>(() => (as === 1 ? <OnlineI /> : <OfflineI />));
    const handleChange = async (o: { name: string }) => {
        const res = await HttpRequestUser.setAs(cookies.get('tks'), o.name === 'online' ? 1 : 0);
        console.log(res, o, 'res here');
        if (res === 1) {
            if (o.name === 'online') {
                setDataUser({ ...dataUser, as: 1 });
                // setUserOnline([...userOnline, userId]);
                setOnOff(<OnlineI />);
            } else {
                setDataUser({ ...dataUser, as: 0 });
                // const newOnlone = userOnline.filter((ol) => ol !== userId);
                // setUserOnline(newOnlone);
                setOnOff(<OfflineI />);
            }
        }
        socket.emit(o.name, cookies.get('k_user'));
    };
    const handleStatus = (
        e: { target: { getAttribute: (arg0: string) => any } },
        res: { icon: React.ReactElement; name: string }[],
    ) => {
        if (e.target.getAttribute('id') === 't') {
            if (!status) {
                setStatus(
                    <Div css="width: 100%; background-color: #202023;padding: 7px; font-size: 25px">
                        {res.map((o, index) => (
                            <Div key={index} css="padding: 4px; cursor: var(--pointer)" onClick={() => handleChange(o)}>
                                {o.icon}
                            </Div>
                        ))}
                    </Div>,
                );
            } else {
                setStatus(null);
            }
        }
    };
    const handleStatuss = () => {};
    const dataText: {
        items: {
            title: string;
            icon: React.ReactNode;
            op: { icon: React.ReactElement; name: string }[];
            onClick: (e: any, res: { icon: React.ReactElement; name: string }[]) => void;
            children?: React.ReactNode;
        };
    }[] = [
        {
            items: {
                title: 'status',
                icon: onOff,
                op: [
                    { icon: <OnlineI />, name: 'online' },
                    { icon: <OfflineI />, name: 'offline' },
                ],
                onClick: handleStatus,
                children: status,
            },
        },
        {
            items: {
                title: '051555',
                icon: <OnlineI />,
                op: [
                    { icon: <OnlineI />, name: 'online' },
                    { icon: <OfflineI />, name: 'offline' },
                ],
                onClick: handleStatuss,
            },
        },
        {
            items: {
                title: 'waiting',
                icon: <OnlineI />,
                op: [
                    { icon: <OnlineI />, name: 'online' },
                    { icon: <OfflineI />, name: 'offline' },
                ],
                onClick: handleStatus,
            },
        },
    ];
    return (
        <DivTools>
            <DivResults color={colorText}>
                {dataText.map((res) => (
                    <Div
                        id="t"
                        key={res.items.title}
                        wrap="wrap"
                        css="padding: 7px; background-color: #2f2f30; margin-bottom: 7px; align-items: center; cursor: var(--pointer);"
                        onClick={(e) => res.items.onClick(e, res.items.op)}
                    >
                        <Div css="margin-right: 3px;">{res.items.title}</Div>
                        <Div css="align-items: center;">{res.items.icon}</Div>
                        {res.items.title === 'status' && status}
                    </Div>
                ))}
            </DivResults>
        </DivTools>
    );
};
export default Tools;
