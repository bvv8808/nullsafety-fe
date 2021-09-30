import axios from "axios";

import { IFetchParamsForContents, IFetchParamsToWrite } from "./interfaces";
import { TContentPreview, TDashData, TMainData } from "./types";
import { setToken, getToken } from "./cookie";

const baseUrl = "http://146.56.187.12:5000";

export const getCategoryNames = async () => {
  try {
    const fetched = await axios.get(baseUrl + "/categories");
    const res: string[] = fetched.data;
    return res;
  } catch (e) {
    console.warn('Error in "getCategoryNames":: ', e);
    return [];
  }
};

export const getContentsByCategory = async (
  params: IFetchParamsForContents
) => {
  try {
    const fetched = await axios.get(baseUrl + `/contents`, { params });
    const res: TContentPreview[] = fetched.data;
    return res;
  } catch (e) {
    console.warn('Error in "getContentsByCategory":: ', e);
    return [];
  }
};

export const notifyVisit = async () => {
  try {
    axios.post(baseUrl + "/visit");
  } catch (e) {
    console.warn('Error in "notifyVisit":: ', e);
  }
};

export const getMainData = async () => {
  try {
    const fetched = await axios.get(baseUrl + "/main");
    const res: TMainData = fetched.data;
    return res;
  } catch (e) {
    console.warn('Error in "notifyVisit":: ', e);
    return null;
  }
};

export const admSignIn = async (k: string) => {
  try {
    const fetched = await axios.post(baseUrl + "/adm/auth", { k });
    if (fetched.data.token) {
      setToken(fetched.data.token);
      return true;
    }
    return false;
  } catch (e) {
    console.warn('Error in "admSignIn":: ', e);
    return false;
  }
};

export const getDashData = async () => {
  try {
    const token = getToken();

    if (!token) return null;

    const fetched = await axios.get(baseUrl + "/adm/dash", {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const res: TDashData = fetched.data;
    return res;
  } catch (e) {
    // console.warn('Error in "admSignIn":: ', e);
    // return false;
  }
};

export const writeContent = async (body: IFetchParamsToWrite) => {
  try {
    const token = getToken();

    if (!token) return null;

    const fetched = await axios.post(baseUrl + "/adm/content", body, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const res: TDashData = fetched.data;
    return res;
  } catch (e) {
    console.warn('Error in "writeContent":: ', e);
    return null;
  }
};
