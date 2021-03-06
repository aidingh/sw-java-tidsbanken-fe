
/**
 * 
 * @param {String} url The API url with endpoint
 * @param {String} bearer The bearer token
 * @return {Object} The fetched data
 */
export const useFetch = async (url, bearer, successCallback) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      }
    });

    const data = await response.json();

    successCallback?.();
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
 * @param {Object} successCallback callback used when request was successfull.
 * @return {Object} The data that is posted
 */
export const postData = async (url, bearer, body, successCallback) => {
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
      successCallback?.();
      return data;
    }

    console.error(await (await response).text());
  } catch (error) {
    console.error(error);
  }
};

/**
 * A function to Patch data
 * @param {String} url The API url with endpoint
 * @param {String} bearer The bearer token
 * @param {Object} body The data you want to post
 * @param {Object} successCallback callback used when request was successfull.
 * @return {Object} The data that is posted
 */
export const patchData = async (url, bearer, body, successCallback) => {
  try {
    const response = fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': bearer
      },
      body: JSON.stringify(body),
    });

    if ((await response).status === 200) {
      const data = (await response).json();
      successCallback?.();
      return data;
    }
    else{
      return (await response).status;
    }

  } catch (error) {
    console.error(error);
  }
};


export const deleteData = async (url, bearer) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      }
    });

  } catch (error) {
    console.error(error);
  }
};



