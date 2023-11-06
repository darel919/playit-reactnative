import {useDispatch} from 'react-redux'
import {useProgress} from 'react-native-track-player';
import { playingDuration } from '../../redux/store';
function TimeFormatter(progress) {
    var sec_num = parseInt(progress, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = '0'+hours;}
    if (minutes < 10) {minutes = '0'+minutes;}
    if (seconds < 10) {seconds = '0'+seconds;}

    return hours+':'+minutes+':'+seconds;
}
export default function elapsed() {
    const dispatch = useDispatch();
    const timeFormatted = TimeFormatter(useProgress(1000).position)
    dispatch(playingDuration(timeFormatted))
    return null;
}