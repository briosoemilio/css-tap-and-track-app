export const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();

  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always be two digits
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Construct the formatted time
  const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;

  return formattedTime;
};
