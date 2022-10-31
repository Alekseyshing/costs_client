import { createEffect } from "effector";
import { IBaseEffectArgs, ICreateCost, IDeleteCost, IRefreshToken } from "../types";
import { removeUser } from "../utils/Auth";
import { handleAxiosError } from "../utils/errors";
import api from './axiosClient';

export const createCostFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await api.post(url, { ...cost }, { headers: { 'Authorization': `Barer ${token}` } })
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getCostFx = createEffect(async ({ url, token }: IBaseEffectArgs) => {
  try {
    const { data } = await api.get(url, { headers: { 'Authorization': `Barer ${token}` } })
    return data;
  } catch (error) {
    handleAxiosError(error, { type: 'get' })
  }
})

export const deleteCostFx = createEffect(async ({ url, token, id }: IDeleteCost) => {
  try {
    await api.delete(`${url}/${id}`, { headers: { 'Authorization': `Barer ${token}` } })
  } catch (error) {
    handleAxiosError(error, { type: 'delete', deleteCost: { id } })
  }
})


export const refreshTokenFX = createEffect(async ({ url, token, username }: IRefreshToken) => {
  try {
    const result = await api.post(url, { refresh_token: token, username });
    if (result.status === 200) {
      localStorage.setItem('auth', JSON.stringify({
        ...result.data,
        username
      }));

      return result.data.access_token
    } else {
      removeUser()
    }
  } catch (error) {

  }
})