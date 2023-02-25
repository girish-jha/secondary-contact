import { Input } from "rsuite"

type SearchProps = {
    onSearch: (value: string) => void
}


export const Search = (props: SearchProps) => {
    const search = (value: string) => {
        props.onSearch(value);
    }
    return (
        <>
            <Input onChange={search} />
        </>
    )
}