export const getLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const setLocalStorage = (name, data) => {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem(name, stringifyData);
};
