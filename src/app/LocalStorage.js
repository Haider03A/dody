import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"

import { localStorageManger } from '../features/item/itemSlice'

const dodyLocalStorage = localStorage.getItem('dody')

export const LocalStorageApp = () => {
    const dodyApp = useSelector(state => state.item)

    const dispatch = useDispatch()
    
    useEffect(() => {
        if (dodyLocalStorage) {
            dispatch(localStorageManger(JSON.parse(dodyLocalStorage)))
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('dody', JSON.stringify(dodyApp))

    }, [dodyApp])

}