import { AxiosError } from "axios";
import { getCostFx, refreshTokenFX } from "../api/costsClient";
import { setCosts } from "../context";
import { IHandleAxiosErrorPayload } from "../types";
import { getAuthDataFromLS, handleAlertMessage, removeUser } from "./Auth";

export const handleAxiosError = async (
  error: unknown,
  payload: IHandleAxiosErrorPayload | null = null
) => {
  const errorMessage =
    ((error as AxiosError).response?.data as { message: string }).message ||
    ((error as AxiosError).response?.data as { error: string }).error;
  if (errorMessage) {
    if (errorMessage === 'jwt expired') {
      const payloadData = payload as IHandleAxiosErrorPayload;
      const authData = getAuthDataFromLS();

      refreshTokenFX({
        url: '/auth/refresh',
        token: authData.refresh_token,
        username: authData.username
      });

      if (payload !== null) {
        switch (payload.type) {
          case 'get':
            const costs = await getCostFx({
              url: '/cost',
              token: authData.access_token
            });
            setCosts(costs);
            break;

          default:
            break;
        }
      }
    } else {
      handleAlertMessage({ alertText: errorMessage, alertStatus: 'warning' });
      removeUser()
    }
  } else {
    handleAlertMessage({ alertText: errorMessage, alertStatus: 'warning' });
  }

}