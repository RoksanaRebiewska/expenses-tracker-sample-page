const config = {
  api: process.env.REACT_APP_API_KEY,
  options: {
    headers: {
      'content-type': 'application/json',
    },
  },
};

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw Error(response.json() | 'error');
  }
};

const httpGet = async () => {
  try {
    const response = await fetch(`${config.api}.json`, {
      ...config.options,
    });

    const data = await handleResponse(response);

    const expenses = Object.keys(data).map((item) => ({
      ...data[item],
      id: item,
    }));

    return expenses;
  } catch (error) {
    throw Error(error);
  }
};

const httpPost = async (data) => {
  try {
    const response = await fetch(`${config.api}.json`, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      ...config.options,
    });
    await response.json();
  } catch (error) {
    throw Error(error);
  }
};

const httpDelete = async (id) => {
  try {
    await fetch(`${config.api}/${id}.json`, {
      method: 'DELETE',
      ...config.options,
    });
  } catch (error) {
    throw Error(error);
  }
};

export default { httpGet, httpPost, httpDelete };
