import { deleteDataApi, getDataApi, postDataApi, putDataApi } from "../api";
import { AlertBody } from "./alert.interface";

const alertURL = '/alert';

export const getAlerts = async () => {
    try {
        return await getDataApi(alertURL);
    } catch (err) {
        return err;
    }
}
export const getAllAlerts = async () => {
    try {
        return await getDataApi(`${alertURL}/all`);
    } catch (err) {
        return err;
    }
}

export const createAlert = async (data: AlertBody) => {
    try {
        return await postDataApi(alertURL, data);
    } catch (err) {
        return err;
    }
}
export const updateAlert = async (id: number, data: AlertBody) => {
    try {
        return await putDataApi(`${alertURL}/${id}`, data);
    } catch (err) {
        return err;
    }
}
export const deleteAlert = async (id: number) => {
    try {
        return await deleteDataApi(`${alertURL}/${id}`);
    } catch (err) {
        return err;
    }
}