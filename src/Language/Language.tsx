import { ActionCreatorWithPayload, AnyAction } from "@reduxjs/toolkit"
import { LanguageI } from "~/assets/Icons/Icons"
import { MenuLanguage, OptionLanguage, StyleLanguage } from "./styleElements"
interface PropsChange {
    change: React.Dispatch<AnyAction>;
    language: boolean;
    changeLanguage: ActionCreatorWithPayload<any, string>
}
const Language: React.FC<PropsChange> = ({ change, language, changeLanguage }) => {
    const handleClick = (data: string) => {
        change(changeLanguage(data));
    }
    return <>
        <StyleLanguage><LanguageI /></StyleLanguage>
        {language && <MenuLanguage >
            <OptionLanguage onClick={() => handleClick('EN')} >English</OptionLanguage>
            <OptionLanguage onClick={() => handleClick('VN')}>VietNamese</OptionLanguage>
        </MenuLanguage>}
    </>
}
export default Language