export function abrName(fullName) {
  const nameParts = fullName.trim().split(/\s+/);

  if (nameParts.length === 1) {
      return fullName; 
  }

  const lastName = nameParts.pop();
  const abbreviatedFirstNames = nameParts.map(name => name.charAt(0).toUpperCase() + ".");
  return abbreviatedFirstNames.join(" ") + " " + lastName;
}
