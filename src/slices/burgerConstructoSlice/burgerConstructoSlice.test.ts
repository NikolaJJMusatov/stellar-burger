import burgerConstructoSlice, {
  addIngredientsBurger,
  removeIngredientFromBurger,
  clearBurgerConstructor,
  moveUpIngredientInBurger,
  moveDownIngredientInBurger,
  initialState
} from "./burgerConstructoSlice";
import { store } from '../../services/store';

describe('проверяем редьюсер burgerConstructoSlice', () => {

  const testId = expect.any(String);
  const testBunIngredient = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0,
    "id": testId
    };
  const testMainIngredient1 = {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0,
    "id": testId
  };
  const testMainIngredient2 = {
    "_id": "643d69a5c3f7b9001cfa093f",
    "name": "Мясо бессмертных моллюсков Protostomia",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v": 0,
    "id": testId
  };
  const testMainIngredient3 = {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0,
    "id": "testId2"
  };

  test('обработка экшена добавления ингредиента', () => {

    const actionAddBun = addIngredientsBurger(testBunIngredient);
    const actionAddMain = addIngredientsBurger(testMainIngredient1);

    const stateWithBun = burgerConstructoSlice(initialState, actionAddBun).constructorItems.bun;
    const stateWithMain = burgerConstructoSlice(initialState, actionAddMain).constructorItems.ingredients[0];

    expect(stateWithBun).toEqual(testBunIngredient);
    expect(stateWithMain).toEqual(testMainIngredient1);
  });

  test('обработка экшена удаления ингредиента', () => {

    const initialState = {
      constructorItems: {
        bun: testBunIngredient,
        ingredients: [
          testMainIngredient2,
          testMainIngredient3
        ]
      }
    };

    const expectInitialState = {
      constructorItems: {
        bun: testBunIngredient,
        ingredients: [
          testMainIngredient2
        ]
      }
    };

    const actionRemoveMain3 = removeIngredientFromBurger(testMainIngredient3);
    const stateWithoutMain3 = burgerConstructoSlice(initialState, actionRemoveMain3);
    expect(expectInitialState).toEqual(stateWithoutMain3);

  });
  
  test('обработка экшена перемещения вверх ингредиента в начинке', () => {

    const expectInitialState = {
      constructorItems: {
        bun: testBunIngredient,
        ingredients: [
          testMainIngredient1,
          testMainIngredient2
        ]
      }
    };

    const actionMoveUpIngredient = moveUpIngredientInBurger(1);
    const actionAddBun = addIngredientsBurger(testBunIngredient);
    const actionAddMain2 = addIngredientsBurger(testMainIngredient2);
    const actionAddMain1 = addIngredientsBurger(testMainIngredient1);

    store.dispatch(actionAddBun);
    store.dispatch(actionAddMain2);
    store.dispatch(actionAddMain1);
    store.dispatch(actionMoveUpIngredient);

    const actualWithMoveUpIngredient = store.getState().burgerConstructor.constructorItems.ingredients;
    expect(expectInitialState.constructorItems.ingredients).toEqual(actualWithMoveUpIngredient);
    store.dispatch(clearBurgerConstructor());
  });

  test('обработка экшена перемещения вниз ингредиента в начинке', () => {
    const expectInitialState = {
      constructorItems: {
        bun: testBunIngredient,
        ingredients: [
          testMainIngredient2,
          testMainIngredient1
        ]
      }
    };

    const actionMoveDownIngredient = moveDownIngredientInBurger(0);
    const actionAddBun = addIngredientsBurger(testBunIngredient);
    const actionAddMain1 = addIngredientsBurger(testMainIngredient1);
    const actionAddMain2 = addIngredientsBurger(testMainIngredient2);

    store.dispatch(actionAddBun);
    store.dispatch(actionAddMain1);
    store.dispatch(actionAddMain2);
    store.dispatch(actionMoveDownIngredient);

    const actualWithmoveDownIngredient = store.getState().burgerConstructor.constructorItems.ingredients;
    expect(expectInitialState.constructorItems.ingredients).toEqual(actualWithmoveDownIngredient);
    store.dispatch(clearBurgerConstructor());
  });

  test('обработка экшена очиcтки конструктора', () => {
    const expectInitialState = {
      constructorItems: {
        bun: null,
        ingredients: [
        ]
      }
    };

    const actionClearBurger = clearBurgerConstructor();
    const actionAddBun = addIngredientsBurger(testBunIngredient);
    const actionAddMain1 = addIngredientsBurger(testMainIngredient1);

    store.dispatch(actionAddBun);
    store.dispatch(actionAddMain1);
    store.dispatch(actionClearBurger);

    const actualClearBurger = store.getState().burgerConstructor;
    expect(expectInitialState).toEqual(actualClearBurger);
  });

})
