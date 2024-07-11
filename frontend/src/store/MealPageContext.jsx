import { createContext, useState } from 'react';
const MealPageContext = createContext({
  progress: '',
  meal:undefined,
  editMeal:()=>{},
  edit: () => {},
  create: () => {},
  hide: () => {},
});

// eslint-disable-next-line react/prop-types
export function MealPageContextProvider({ children }) {
  const [mealPage, setMealPage] = useState('');
  const [meal, setMeal] = useState('');

  const edit = () => {
    setMealPage('edit');
  };

  const create = () => {
    setMealPage('create');
  };

  const hide = () => {
    setMealPage('');
  };

  const editMeal=(meal)=>{
    setMeal(meal);
  }

  const mealPageCtx = {
    progress: mealPage,
    meal:meal,
    editMeal: editMeal,
    edit: edit,
    create: create,
    hide: hide,
  };

  return (
    <MealPageContext.Provider value={mealPageCtx}>
      {children}
    </MealPageContext.Provider>
  );
}

export default MealPageContext;