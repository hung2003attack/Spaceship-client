import React from 'react';
import { DivDateTime, Pdate, Ptime, SpanTitle } from './styleDateTime';

const Time = () => {
    const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

    React.useEffect(() => {
        const timer = setInterval(() => {
            // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDate hook.
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        };
    }, [today]);

    // const day = today.toLocaleDateString(locale, { weekday: 'long' });
    // const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

    // const hour = today.getHours();
    // const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

    // const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    const day = today.getUTCDate() > 9 ? today.getUTCDate() : '0' + today.getUTCDate();
    const month = today.getUTCMonth() + 1 > 9 ? today.getUTCMonth() + 1 : '0' + today.getUTCMonth();
    const year = today.getUTCFullYear();
    const hours = today.getHours() > 9 ? today.getHours() : '0' + today.getHours();
    const minutes = today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
    const seconds = today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();
    const title = hours < 12 ? 'Morning' : hours < 17 ? 'Afternoon' : 'Evening';

    return (
        <DivDateTime>
            <Pdate>{day + ' / ' + month + ' / ' + year}</Pdate>
            <Ptime>
                {hours + ' : ' + minutes + ' : ' + seconds} <SpanTitle>{title}</SpanTitle>
            </Ptime>
        </DivDateTime>
    );
};
export default Time;
