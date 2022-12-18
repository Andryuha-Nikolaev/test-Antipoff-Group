// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX =
  "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$";
const USER_NAME_REGEX = '^[A-Za-zА-Яа-яЁё /s -]+$';

export { EMAIL_REGEX, USER_NAME_REGEX };
