/**Google calendar has a limit for event notifications of 28 days. 
 * Users can't set up reminder email to be sent earlier in GUI.
 * This script uses a simple trigger word in the event title. 
 * Should be run with a timer trigger of 1 day with failure notifications*/
function checkEventsAndNotify() {
  const calendar = CalendarApp.getDefaultCalendar(); // this is your personal calendar
  //const calendar = CalendarApp.getCalendarById('calendarid-1234@group.calendar.google.com');  // access a group calendar
  const now = new Date();
  const daysNumber = 30; // 
  const daysFromNow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysNumber);
  const events = calendar.getEventsForDay(daysFromNow); //Retrieve all events for one day
  events.forEach((event) => {
   if (isEventNotifiable(event)) {
     console.log('notifiable, sending notification next');
     sendNotification(event,daysNumber);
   }
 });
}

/** Checks if event should trigger a notification */
function isEventNotifiable(event) {
  const triggerTitle = "notifyme"; // this string is the trigger for sending notifications
  return event.getTitle().toLowerCase().includes(triggerTitle);
}

function sendNotification(event,daysNumber) {
  const userEmail = Session.getActiveUser().getEmail();
  const recipient = userEmail; // recipient emails separated by commas
  const eventTitle = event.getTitle();
  console.log('sending notification for ${eventTitle}');
  const subject = 'Notification: ' + eventTitle;
  const eventStart = event.getStartTime();
  const dateString = eventStart.toLocaleDateString(); // Shows only the date
  const description = event.getDescription();
  const messageBody = `Notification: \n "${event.getTitle()}" \n Event is scheduled ${daysNumber} days away on ${dateString} \n ${description}`;
  console.log(messageBody);
  // sendEmail(recipient, subject, body, options)
  try {
    MailApp.sendEmail(recipient, subject, messageBody, {name: 'NotifyMe',},);
    Logger.log('Email sent: ' + subject);
  } catch (error) {
    Logger.log('Error sending email ' + error);
    throw error;
  }
}
