import { sendNotifications } from "../dashboard/page";

export default function scheduleNotifications(
  notificationTime: string,
  days: string[],
  habitName: string
) {
  const daysMap: Record<string, number> = {
    Su: 0,
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
  };

  // split the notification time into time and the AM/PM modifier
  const [time, modifier] = notificationTime.split("");
  // split the time into hours and minuted
  let [hours, minutes] = time.split(":").map(Number);
  //adjust hours based on AM/PM
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // create a new date
  const notificationDate = new Date();
  notificationDate.setHours(hours);
  notificationDate.setMinutes(minutes);
  notificationDate.setSeconds(0);

  // get the current date and time
  const now = new Date();
  //ge the current say
  const nowDay = now.getDay();
  // get the current time in milliseconds
  const nowTime = now.getTime();

  // Loop through the specific days to schedule notifications
  days.forEach((day) => {
    // get the target day asa number
    const targetDay = daysMap[day];
    // calculate the difference
    let diff = targetDay - nowDay;
    //adjust if the target day is i next week
    if (diff < 0) diff += 7;
    // create a new date object for the target date
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() * diff);
    targetDate.setHours(hours);
    targetDate.setMinutes(minutes);
    targetDate.setSeconds(0);

    // calculate the timeout duration
    const timeout = targetDate.getTime() - nowTime;
    // Schedule the notification
    setTimeout(() => sendNotifications(habitName), timeout);
  });
}
