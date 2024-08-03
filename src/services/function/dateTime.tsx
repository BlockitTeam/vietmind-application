export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  console.log(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Format hours and minutes with leading zeros if necessary
  const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
