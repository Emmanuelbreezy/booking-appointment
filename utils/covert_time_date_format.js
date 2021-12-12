export const displayTimeFormat = (time)=>{
    var hours, minutes, meridian;
    hours = time.split(':')[0];
    minutes = time.split(':')[1];
    if(hours > 12){
        meridian = 'pm';
        hours -= 12;
    }else if(hours < 12){
        meridian = 'am';
        if(hours == 0){
            hours = 12;
        }
    }else {
        meridian = 'pm';
    }

    var fulltime = hours + ':' + minutes+ ' ' + meridian;

    return fulltime;
}

export const displayDateFormat = (date)=>{
    const mydate = new Date(date);
    return mydate.toDateString();
}
