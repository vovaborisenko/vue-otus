export default function debounce(callback) {
  let timer = null;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, 600);
  };
}
