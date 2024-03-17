const generateCode = () => {
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();

  return code;
};

export default generateCode;