import { useState } from 'react';

import ApiService from '../../Api.service';

import classes from './List.module.scss';
import Item from '../Item/Item';
import FilterForm from '../FilterForm/FilterForm';

const List = ({ onRemove, data, onError, onLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const selectedCategoryHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  const removeHandler = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation) {
      await ApiService.httpDelete(id);
      onRemove();
    } else {
      return;
    }
  };

  const filteredData =
    selectedCategory === 'All'
      ? data
      : data.filter((item) => item.category === selectedCategory);

  const finalData = filteredData.map((item) => (
    <Item
      category={item.category}
      price={item.price}
      date={item.date}
      key={item.id}
      remove={() => removeHandler(item.id)}
    />
  ));

  let content = <p>No expenses yet</p>;

  if (onError) {
    content = <p>{onError}</p>;
  }

  if (onLoading) {
    content = <p>Loading...</p>;
  }

  if (!onError && !onLoading && data.length > 0) {
    content = (
      <>
        <FilterForm
          onSelectedFilter={selectedCategory}
          onChangingFilter={selectedCategoryHandler}
        />
        <ul>{filteredData.length > 0 ? finalData : <p>No expenses yet</p>}</ul>
        <p className={classes.sum}>
          Sum:&nbsp;
          {filteredData.length > 1
            ? filteredData
                .map((price) => price.price)
                .reduce((prevVal, curVal) => {
                  return +prevVal + +curVal;
                })
                .toFixed(2)
            : filteredData.length === 1
            ? filteredData[0].price
            : '0'}
          &nbsp;&#8364;
        </p>
      </>
    );
  }

  return (
    <div className={classes.expenses__container}>
      <h2>List of expenses</h2>
      {content}
    </div>
  );
};

export default List;
