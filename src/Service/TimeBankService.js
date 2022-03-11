// import {useAuth0} from '@auth0/auth0-react';

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
export const useApiRequest = (url, options) => {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    /**
     * function to fetch data.
     */
    const getData = async () => {
      try {
        const response = await fetch(url, options);
        const json = await json(response);
        setData(json);
        setIsLoaded(true);
      } catch (error) {
        setError(console.error());
      }
    };
    getData();
  }, [url]);

  return {error, isLoaded, data};
};

/**
 * A function to POST data
 * @param {String} url The API url with endpoint
 * @param {Object} body The data you want to post
 * @return {Object} The data that is posted
 */
export const postData = async (url, body) => {
  try {
    const response = fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
