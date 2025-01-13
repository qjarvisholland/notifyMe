## NotifyMe
Google calendar has a limit for event notifications of 28 days. Users can't set up reminder email to be sent earlier in GUI.
This script uses a simple trigger word in the event title. 
Should be run with a timer trigger of 1 day with failure notifications turned on.

###To Deploy:
1. go to script.google.com, create a new project called notifyme
2. delete the template code and paste contents of Code.gs file
3. click save, run the checkEventsAndNotify() (head) function, confirm success is logged
4. set up a trigger for the script to execute the head, time based, once a day

###Required permissions:
- Gmail and calendar API access permissions
- Authorize script to access and modify user's mail and calendar
