import { createEffect } from "effector";
import { ICreateCost, IGetCost } from "../types";
import api from './axiosClient';

export const createCostFx = createEffect(async ({ url, cost, token }: ICreateCost) => {
  try {
    const { data } = await api.post(url, { ...cost }, { headers: { 'Authorization': `Barer ${token}` } })
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getCostFx = createEffect(async ({ url, token }: IGetCost) => {
  try {
    const { data } = await api.get(url, { headers: { 'Authorization': `Barer ${token}` } })
    return data;
  } catch (error) {
    console.log(error);
  }
})