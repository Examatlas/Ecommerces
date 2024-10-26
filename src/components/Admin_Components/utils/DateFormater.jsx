export function formatTime(timeInput) {
    const [hourString, minute] = timeInput.split(':'); // Split into hour and minute
    let hour = parseInt(hourString, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour format
    hour = hour % 12 || 12; // Converts "0" hour to "12"

    // Return time in 12-hour format with AM/PM
    return `${hour}:${minute} ${ampm}`;
};


export function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Return in the format YYYY-MM-DD
    return `${year}-${month}-${day}`;
};