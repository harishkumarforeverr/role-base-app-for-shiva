import { CommonAxios } from "../config";
export const getUser = async (email) => {
  try {
    const result = await CommonAxios.get(`?email=${email}`);
    return result.data;
  } catch (err) {
    return [];
  }
};

export const getAllUser = async () => {
  try {
    const result = await CommonAxios.get(`?role=user`);
    return result.data;
  } catch (err) {
    return [];
  }
};

export const getUserById = async (id, role) => {
  try {
    const result = await CommonAxios.get(`?role=${role}&id=${id}`);
    return result.data;
  } catch (err) {
    return [];
  }
};

export const updateUserById = async (id, data) => {
  return await CommonAxios.put(`/${id}`, data);
};
export const addUser = async (user) => {
  return await CommonAxios.post("/", user);
};

export const deleteUser = async (id) => {
  return await CommonAxios.delete(`/${id}`);
};
