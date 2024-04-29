import { addIngredientsBurger,
  removeIngredientFromBurger,
  clearBurgerConstructor,
  moveUpIngredientInBurger,
  moveDownIngredientInBurger
} from "./burgerConstructoSlice";
import { rootReducer } from "../../services/store";
import { configureStore } from '@reduxjs/toolkit';

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
    "id": "testId1"
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

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: [
            testMainIngredient2,
            testMainIngredient3
          ]
        }
      }
    }
  });

  test('обработка экшена добавления ингредиента', () => {
    const actionAddBun = addIngredientsBurger(testBunIngredient);
    const actionAddMain = addIngredientsBurger(testMainIngredient1);

    store.dispatch(actionAddBun);
    store.dispatch(actionAddMain);

    const actualWithBun = store.getState().burgerConstructor.constructorItems.bun;
    const actualWithMain = store.getState().burgerConstructor.constructorItems.ingredients[2];
    expect(actualWithBun).toEqual(testBunIngredient);
    expect(actualWithMain).toEqual(testMainIngredient1);
  });

  test('обработка экшена удаления ингредиента', () => {
    const expectInitialState = {
      constructorItems: {
        bun: testBunIngredient,
        ingredients: [
          testMainIngredient2,
          testMainIngredient1
        ]
      }
    };

    const actionRemoveMain = removeIngredientFromBurger(testMainIngredient3);

    store.dispatch(actionRemoveMain);

    const actualWithOutMain = store.getState().burgerConstructor;
    expect(expectInitialState).toEqual(actualWithOutMain);
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

    store.dispatch(actionMoveUpIngredient);

    const actualWithMoveUpIngredient = store.getState().burgerConstructor.constructorItems.ingredients;
    expect(expectInitialState.constructorItems.ingredients).toEqual(actualWithMoveUpIngredient);
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

    store.dispatch(actionMoveDownIngredient);

    const actualWithmoveDownIngredient = store.getState().burgerConstructor.constructorItems.ingredients;
    expect(expectInitialState.constructorItems.ingredients).toEqual(actualWithmoveDownIngredient);
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

    store.dispatch(actionClearBurger);

    const actualClearBurger = store.getState().burgerConstructor;
    expect(expectInitialState).toEqual(actualClearBurger);
  });
})
