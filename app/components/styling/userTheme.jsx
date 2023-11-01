import {useColorScheme} from 'react-native'
import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { changeColorScheme } from '../../redux/store'

export default function UserPreference() {
    const dispatch = useDispatch()
    const userThemeStore = useColorScheme()
    useEffect(() => {
        if(userThemeStore === 'dark') {
            dispatch(changeColorScheme('dark'))
        } else if(userThemeStore === 'light') {
            dispatch(changeColorScheme('light'))
        }
    }, [userThemeStore]) 
    return null;
}   