import { NewI } from "~/assets/Icons/Icons"
import { DivPage, Ptitle } from "./styleListWeb"

const ItemsWeb: React.FC<{
    icon: React.ReactNode
    name: string
}> = ({ icon, name }) => {
    return <>
        <DivPage >
            {icon}
        </DivPage>
        <Ptitle >{name}</Ptitle>
    </>
}
export default ItemsWeb