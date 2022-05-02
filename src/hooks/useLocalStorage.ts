import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)

        if (jsonValue !== null) return JSON.parse(jsonValue)
        return (typeof defaultValue === 'function') ? defaultValue() : defaultValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [value: T, setValue: Dispatch<SetStateAction<T>>]
}

export default useLocalStorage