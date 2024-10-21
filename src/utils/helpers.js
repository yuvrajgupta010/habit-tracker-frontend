export const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours(); // Get current hour (0-23)

  if (hours >= 5 && hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    return "Good Afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

export const filterByCurrentDate = (arr = []) => {
  const currentDate = new Date();

  // Get current date components (year, month, date)
  const today = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  };

  return arr.filter((item) => {
    const createdAt = new Date(item.createdAt); // Convert the createdAt field to Date object
    return (
      createdAt.getFullYear() === today.year &&
      createdAt.getMonth() === today.month &&
      createdAt.getDate() === today.day
    );
  });
};

export const arrangeRecordsByWeek = (records) => {
  // Initialize an array for the days of the week (Sunday to Saturday)
  const week = new Array(7).fill(null).map(() => ({ record: 0 }));

  // Iterate over the records
  records.forEach((record) => {
    const recordDate = new Date(record.createdAt);
    const dayOfWeek = recordDate.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)

    // Place the record in the correct position based on the day of the week
    week[dayOfWeek] = record;
  });

  return week;
};

// Example usage
// const records = [
//   { record: 3, _id: "xyz1", createdAt: "2024-10-26T18:29:59.999Z" }, // Saturday
//   { record: 5, _id: "xyz2", createdAt: "2024-10-22T18:29:59.999Z" }, // Tuesday
//   { record: 4, _id: "xyz3", createdAt: "2024-10-20T18:29:59.999Z" }  // Sunday
// ];

// const arrangedWeek = arrangeRecordsByWeek(records);

// console.log(arrangedWeek);
