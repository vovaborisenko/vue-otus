// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function capitalize() {
  const [first, ...rest] = this;

  return first ? `${first.toUpperCase()}${rest.join('')}` : this.toString();
};
