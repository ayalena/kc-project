function sortOnDate(sessionsArray) {
    sessionsArray.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
    })
    sortOnDate(sessionsArray);
}

export default sortOnDate;