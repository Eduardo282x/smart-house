import { deleteDataApi, getDataApi, postDataApi, putDataApi } from "../api";
import { SensorBody } from "./sensor.interface";

const sensorURL = '/sensor';

export const getSensors = async () => {
    try {
        return await getDataApi(sensorURL);
    } catch (err) {
        return err;
    }
}

export const createSensor = async (data: SensorBody) => {
    try {
        return await postDataApi(sensorURL, data);
    } catch (err) {
        return err;
    }
}
export const updateSensor = async (id: number, data: SensorBody) => {
    try {
        return await putDataApi(`${sensorURL}/${id}`, data);
    } catch (err) {
        return err;
    }
}
export const deleteSensor = async (id: number) => {
    try {
        return await deleteDataApi(`${sensorURL}/${id}`);
    } catch (err) {
        return err;
    }
}