import { deleteDataApi, getDataApi, putDataApi } from "../api";

const notificationURL = '/notification';

export const getAllNotifications = async () => {
    try {
        return await getDataApi(`${notificationURL}/all`);
    } catch (err) {
        return err;
    }
}
export const getNotifications = async () => {
    try {
        return await getDataApi(notificationURL);
    } catch (err) {
        return err;
    }
}
export const markSend = async (id: number) => {
    try {
        return await putDataApi(`${notificationURL}/${id}`, {});
    } catch (err) {
        return err;
    }
}
export const markAllSend = async () => {
    try {
        return await putDataApi(`${notificationURL}/all`, {});
    } catch (err) {
        return err;
    }
}
export const clearNotification = async () => {
    try {
        return await deleteDataApi(`${notificationURL}`);
    } catch (err) {
        return err;
    }
}