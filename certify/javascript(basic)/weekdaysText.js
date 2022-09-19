function weekdaysText(weekdays) {
  return function getText(target) {
    if (target > weekdays.length || target < 0) {
      return new Error('Invalid day number');
    } else {
      return weekdays[target];
    }
  }
}