/* eslint-disable no-console */
export function getTimeDifference(matchTime: string, matchDate: string): any {
  let timeDifference = 0;
  if(matchTime){
    const parts = matchTime.split(' ');
    const timePart = parts[0];
    const amPmPart = parts[1];

    // Parse the time
    const [hour, minute] = timePart.split(':');
    let formattedHour = parseInt(hour, 10);

    // Adjust the hour to 12-hour format
    if (formattedHour > 12) {
      formattedHour -= 12;
    }

    // Create the formatted time string
    const formattedTime = `${formattedHour.toString().padStart(2, '0')}:${minute} ${amPmPart} UTC`;

    const now = new Date();
    const isoString = new Date(matchDate).toISOString();
    const date = isoString.split('T')[0];

    const matchDateTime = new Date(date + ' ' + formattedTime);


    timeDifference = matchDateTime.getTime() - now.getTime();
    console.log('Time Difference:', timeDifference);
  }
  // else {
  //   timeDifference = new Date(matchDate).getTime() - now.getTime();
  // }
  
  return timeDifference;
  }