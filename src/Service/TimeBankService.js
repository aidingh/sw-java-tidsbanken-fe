import { useEffect, useState } from "react";

/**
 *
 * To use this custom fetch hook import and call
 * const { data, error, isLoaded } = useApiRequest(url);
 * @param {String} url The API url and endpoint
 * @param {Object} options Headers and so forth
 * @return {Array} The data you want to fetch
 * @return {Boolean} If the data has loaded or not
 * @return {String} Error message
 */

export const useFetch = async (url, bearer) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * A function to POST data
 * @param {String} url The API url with endpoint
 * @param {String} bearer The bearer token
 * @param {Object} body The data you want to post
 * @return {Object} The data that is posted
 */
export const postData = async (url, bearer, body) => {
  try {
    const response = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': bearer
      },
      body: JSON.stringify(body),
    });

    if ((await response).ok) {
      const data = (await response).json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
