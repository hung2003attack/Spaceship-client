import { useState } from 'react';
import { useSelector } from 'react-redux';
interface PropsLanguage {
    persistedReducer: {
        language: {
            sn: string;
            l: string;
            w: string;
        };
    };
}
const Languages = () => {
    const [currentPage, setCurrentPage] = useState<number>(() => {
        return JSON.parse(localStorage.getItem('currentPage') || '{}').currentWeb;
    });
    const language = useSelector((state: PropsLanguage) => state.persistedReducer.language);
    const lg = currentPage === 1 ? language.sn : currentPage === 2 ? language.l : language.w;

    return { lg };
};
export default Languages;
