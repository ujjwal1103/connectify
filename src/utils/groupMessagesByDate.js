export function groupMessagesByDate(messages) {
    const groupedMessages = {};
    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const isToday = (
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear()
      );
  
      const isYesterday = (
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()
      );
  
      const isThisWeek = (
        messageDate >= yesterday && messageDate <= today
      );
  
      if (isToday) {
        const key = "Today";
        if (!groupedMessages[key]) {
          groupedMessages[key] = [];
        }
        groupedMessages[key].push(message);
      } else if (isYesterday) {
        const key = "Yesterday";
        if (!groupedMessages[key]) {
          groupedMessages[key] = [];
        }
        groupedMessages[key].push(message);
      } else if (isThisWeek) {
        const dayName = dayNames[messageDate.getDay()];
        const key = dayName;
        if (!groupedMessages[key]) {
          groupedMessages[key] = [];
        }
        groupedMessages[key].push(message);
      } else {
        const dateFormat = `${dayNames[messageDate.getDay()]} ${messageDate.getDate()} ${messageDate.toLocaleString('en-us', { month: 'short' })}`;
        const key = dateFormat;
        if (!groupedMessages[key]) {
          groupedMessages[key] = [];
        }
        groupedMessages[key].push(message);
      }
    });
    return groupedMessages;
  }
  


export function getReadableTime(adate) {
    // if (!(date instanceof Date)) {
    //   return "Invalid Date";
    // }
    const date = new Date(adate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
  
    // Convert 24-hour time to 12-hour time
    const formattedHours = hours % 12 || 12;
  
    // Add leading zeros to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
}
