 function dateYMD (date) {
    let year = date.getFullYear();
    let mon = date.getMonth()+1;
    let day = date.getDate();
    if (mon < 10) {
      mon = "0" + mon;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return year + "-" + mon + "-" + day;
};

export default {
    dateYMD
}
  