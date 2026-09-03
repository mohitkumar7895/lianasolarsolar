export function validatePhone(phone: string): boolean {
  // Accepts standard Indian mobile numbers (10 digits, optional +91 or 0 prefix)
  const regex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
  return regex.test(phone.replace(/\s+/g, ''));
}

export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
