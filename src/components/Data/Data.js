import { useState, useEffect } from 'react';

import ApiService from '../../Api.service';

import Form from '../Form/Form';
import List from '../List/List';
import classes from './Data.module.scss';

const Data = () => {
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDataHandler = async () => {
    try {
      setLoading(true);

      const expenses = await ApiService.httpGet();

      setItemsData(expenses);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  const addHandler = async (data) => {
    try {
      await ApiService.httpPost(data);
      getDataHandler();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className={classes.data__container}>
        <Form onAdd={addHandler} />
        <List
          data={itemsData}
          onError={error}
          onLoading={loading}
          onRemove={getDataHandler}
        />
      </section>
    </>
  );
};

export default Data;
