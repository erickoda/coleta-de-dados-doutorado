function isEmailValid(email: string): boolean {
  return email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
    ? true
    : false;
}

export default isEmailValid;
