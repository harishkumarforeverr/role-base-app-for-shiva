export const tokenKeyConstant = "accessToken";
export const login = () => {
  localStorage.setItem(tokenKeyConstant, "encryptedKey123");
};
export const logout = () => {
  localStorage.removeItem(tokenKeyConstant);
};

export const isLogin = () => {
  if (localStorage.getItem(tokenKeyConstant)) {
    return true;
  }

  return false;
};
