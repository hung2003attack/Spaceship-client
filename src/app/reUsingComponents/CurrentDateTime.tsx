import moment from 'moment';

function DateTime() {
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    return dateTime;
}
export default DateTime;
