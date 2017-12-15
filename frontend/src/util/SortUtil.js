const sortByField = (el1, el2, field) => {
  var field1 = el1[field].toUpperCase();
  var field2 = el2[field].toUpperCase();
  if (field1 < field2) {
    return -1;
  }
  if (field1 > field2) {
    return 1;
  } else {
    return 0;
  }

};

export {
  sortByField
}