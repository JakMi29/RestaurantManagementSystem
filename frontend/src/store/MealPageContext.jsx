import { createContext, useState } from 'react';
const MealPageContext = createContext({
  progress: '',
  meal:undefined,
  setMeal:()=>{},
  edit: () => {},
  create: () => {},
  hide: () => {},
});

// eslint-disable-next-line react/prop-types
export function MealPageContextProvider({ children }) {
  const [mealPage, setMealPage] = useState('');

  function edit() {
    setMealPage('edit');
  }

  function create() {
    setMealPage('create');
  }

  function hide() {
    setMealPage('');
  }

  function setMeal(meal) {
    setMeal(meal);
  }

  

  const mealPageCtx = {
    progress: mealPage,
    setMeal,
    edit,
    create,
    hide,
  };

  return (
    <MealPageContext.Provider value={mealPageCtx}>
      {children}
    </MealPageContext.Provider>
  );
}

export default MealPageContext;