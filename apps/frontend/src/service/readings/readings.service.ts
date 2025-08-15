import { getDataApi, getDataFileApi } from "../api";

const readingUrl = '/reading';

export const getReadings = async () => {
    try {
        return await getDataApi(readingUrl);
    } catch (err) {
        return err;
    }
}
export const getReadingSinceTime = async (time: string) => {
    try {
        return await getDataApi(`${readingUrl}/since/${time}`);
    } catch (err) {
        return err;
    }
}
export const getLastReadings = async () => {
    try {
        return await getDataApi(`${readingUrl}/last`);
    } catch (err) {
        return err;
    }
}
export const getLastReadingsNew = async () => {
    try {
        return await getDataApi(`${readingUrl}/last/new`);
    } catch (err) {
        return err;
    }
}
export const getLastedReadings = async () => {
    try {
        return await getDataApi(`${readingUrl}/lasted`);
    } catch (err) {
        return err;
    }
}

export const generateReadingsExcel = async () => {
    try {
        return await getDataFileApi(`${readingUrl}/export`);
    } catch (err) {
        return err;
    }
}