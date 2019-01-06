const normalizePageName = function(nameString) {
  if (nameString === 'index') {
    return 'Home';
  }

  return nameString.replace('-', ' ')
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export default normalizePageName