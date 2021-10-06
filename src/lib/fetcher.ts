import axios from "axios";

import { IFetchParamsForContents, IFetchParamsToWrite } from "./interfaces";
import {
  TCategoryDetail,
  TContent,
  TContentPreview,
  TDashData,
  TMainData,
  TResponseUpload,
} from "./types";
import { setToken, getToken } from "./cookie";
import { SERVER_URL } from "./constants";

const baseUrl = SERVER_URL;

export const getCategoryNames = async () => {
  try {
    const fetched = await axios.get(baseUrl + "/categories");
    const res: string[] = fetched.data.categories;
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
    const res: TContentPreview[] = fetched.data.contentPreviews;
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
      withCredentials: true,
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
      withCredentials: true,
    });

    const res: { code: number; msg: string } = fetched.data;
    return res;
  } catch (e) {
    console.warn('Error in "writeContent":: ', e);
    return null;
  }
};

export const api_addCategory = async (name: string) => {
  try {
    const token = getToken();

    const fetched = await axios.post(
      baseUrl + "/adm/add-category",
      { category: name },
      {
        withCredentials: true,
      }
    );

    if (!fetched.data.code) return true;
    console.log("Fail to add a new category::: ", fetched.data.msg);
    return false;
  } catch (e) {
    console.warn('Error in "addCategory":: ', e);
    return false;
  }
};

export const uploadImage = async (imgData: string) => {
  try {
    const fetched = await axios.post(
      baseUrl + "/adm/pic",
      { pic: imgData },
      {
        withCredentials: true,
      }
    );

    const result: TResponseUpload = fetched.data;
    console.log("Image upload result: ", result.code, "/", result.msg);

    return result.path;
  } catch (e) {
    console.warn('Error in "uploadImage":: ', e);
    return "";
  }
};

export const api_deleteContent = async (cid: number) => {
  try {
    await axios.post(
      baseUrl + "/adm/remove",
      { cid },
      { withCredentials: true }
    );
    return true;
  } catch (e) {
    console.warn('Error in "notifyVisit":: ', e);
    return false;
  }
};

export const api_getFullCategories = async () => {
  try {
    const fetched = await axios.get(baseUrl + "/adm/category", {
      withCredentials: true,
    });
    const res: TCategoryDetail[] = fetched.data?.categories || [];
    return res;
  } catch (e) {
    console.warn('Error in "getFullCategories":: ', e);
    return [];
  }
};

export const api_editCatgory = async (categories: TCategoryDetail[]) => {
  try {
    const fetched = await axios.post(
      baseUrl + "/adm/category",
      { categories },
      { withCredentials: true }
    );
    if (fetched.data.code === 0) return true;
    else return false;
  } catch (e) {
    console.warn('Error in "api_editCatgory":: ', e);
    return false;
  }
};

export const api_getFullContent = async (cid: number) => {
  try {
    const fetched = await axios.get(baseUrl + "/content", { params: { cid } });
    const res: TContent = fetched.data.contentData;
    return res;
  } catch (e) {
    console.warn('Error in "api_getFullContent":: ', e);
    return null;
  }
};
