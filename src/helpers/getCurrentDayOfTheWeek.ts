export const getCurrentDayOfTheWeek = () => {
  const now = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the current day index (0-6)
  const dayIndex = now.getDay();

  // Return the name of the current day
  return daysOfWeek[dayIndex];
};
