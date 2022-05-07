import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'

const useOutsideClick = (ref: RefObject<any>, onClickOutside: Dispatch<SetStateAction<boolean>>) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, onClickOutside])
}

export default useOutsideClick