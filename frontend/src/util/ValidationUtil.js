const maskedInvalid = (val) => !val || val.indexOf('_') !== -1;
const trimmedEmpty = (val) => !val || val.trim().length === 0;

export {
  maskedInvalid,
  trimmedEmpty
}