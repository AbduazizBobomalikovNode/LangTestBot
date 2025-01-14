function timer(time) {
    let sek = time[3] + time[4];
    if (time[3] == 0) {
        sek = time[4];
    }
    let min = time[0] + time[1];
    if (time[0] == 0) {
        min = time[1];
    }
    if (sek == 0) {
        min = min - 1;
        if (min < 10) {
            min = '0' + min;
        }
        return min + ':' + '56';
    }
    sek = sek - 4;
    if (sek < 10) {
        sek = '0' + sek;
    }
    if (min < 10) {
        min = '0' + min;
    }
    return min + ':' + sek;
}
module.exports = {timer}; 