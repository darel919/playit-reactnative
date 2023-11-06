import { useEffect } from 'react';
import {API_ENDPOINT} from "@env"
import { fetchedRadioLibrary } from '../../redux/store';
import { useDispatch } from 'react-redux';

export default function PlaylistFetcher() {

const dispatch = useDispatch()

  useEffect(() => {

    fetch(API_ENDPOINT)
    .then((r) => r.json())
    .then((data) => {
      dispatch(fetchedRadioLibrary(data))
    }
    
    )}, [])
}
