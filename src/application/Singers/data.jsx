import React, { createContext, useReducer } from "react";
import { fromJS } from "immutable";
// context
export const CategoryDataContext = createContext({});

// actionTypes
export const CHANGE_CATEGORY = "singers/CHANGE_CATEGORY";
export const CHANGE_ALPHA = "singers/CHANGE_ALPHA";

// reducer
const reducer = (state, action) => {
  const data = action.data;
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.merge({
        'category': data,
        listOffset: 0,
        enterLoading: true
      });;
    case CHANGE_ALPHA:
      return state.merge({
        'alpha': data,
        listOffset: 0,
        enterLoading: true
      });
    default:
      return state;
  }
};

export const changeCategory = (data) => ({
  type: CHANGE_CATEGORY,
  data
});

export const changeAlpha = (data) => ({
  type: CHANGE_ALPHA,
  data
});

export function Data(props) {
  const defaultState = fromJS({
    category: "",
    alpha: ""
  });
  //useReducer 的第二个参数中传入初始值
  const [data, dispatch] = useReducer(reducer, defaultState);
  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  );
}
