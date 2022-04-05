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

    const expenses = [];
    for (const key in data) {
      expenses.push({
        category: data[key].category,
        price: data[key].price,
        date: data[key].date,
        id: key,
      });
    }
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
