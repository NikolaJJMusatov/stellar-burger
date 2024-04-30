beforeEach(() => {
  cy.intercept(
    'GET',
    'api/ingredients', 
    {fixture: '/mocks/ingredients.json'}
  );
  cy.intercept(
    'POST',
    'api/auth/login',
    {fixture: '/mocks/user.json'}
  );
  cy.intercept(
    'GET',
    'api/auth/user',
    {fixture: '/mocks/user.json'}
  );
  cy.intercept(
    'POST',
    'api/orders',
    {fixture: '/mocks/order.json'}
  );

  window.localStorage.setItem('refreshToken', 'someValueRefreshToken');
  cy.setCookie('accessToken', 'someValueAccessToken');

  cy.visit('/');

  cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('button').as('buttonAddBunInBurger');
  cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('button').as('buttonAddSauceInBurger');
  cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('button').as('buttonAddMainInBurger')
  cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('a').as('openDescriptionIngredient');

});

afterEach(() => {
  window.localStorage.clear();
  cy.clearAllCookies();
  cy.getAllLocalStorage().should('be.empty');
  cy.getAllCookies().should('be.empty');
});

const topBunInBurger = `[data-cy=${'section_constructor_element_top_bun'}]`;
const bottomBunInBurger = `[data-cy=${'section_constructor_element_bottom_bun'}]`;
const sauceInBurger = `[data-cy=${'section_constructor_element_sauce'}]`;
const mainInBurger = `[data-cy=${'section_constructor_element_main'}]`;
const bunInIngredients = `[data-cy=${'section_ingredients_bun'}]`;
const mainInIngredients = `[data-cy=${'section_ingredients_main'}]`;
const sauceInIngredients = `[data-cy=${'section_ingredients_sauce'}]`;
const modalContent = `[data-cy=${'modal_content'}]`;

describe('проверяем функциональность конструктора бургера', function() {

  it('добавление bun, sauce в конструктор бургера', function() {
    cy.get('@buttonAddBunInBurger').click();
    cy.get(topBunInBurger).should('exist');
    cy.get(topBunInBurger).find('.constructor-element__text').contains('Краторная булка N-200i (верх)');
    cy.get(bottomBunInBurger).should('exist');
    cy.get(bottomBunInBurger).find('.constructor-element__text').contains('Краторная булка N-200i (низ)');
    cy.get('@buttonAddSauceInBurger').click();
    cy.get(sauceInBurger).should('exist');
    cy.get(sauceInBurger).first().find('.constructor-element__text').contains('Соус фирменный Space Sauce');
  });

  it('проверка счетчика при добавлении bun, main, sauce в конструктор бургера', function() {
    cy.get(bunInIngredients).first().find('.counter').should('not.exist');
    cy.get('@buttonAddBunInBurger').click();
    cy.get(bunInIngredients).first().find('.counter').should('exist');
    cy.get(bunInIngredients).first().find('.counter__num').contains(2);
    cy.get(mainInIngredients).eq(1).find('.counter').should('not.exist');
    cy.get('@buttonAddMainInBurger').click();
    cy.get(mainInIngredients).eq(1).find('.counter').should('exist');
    cy.get(mainInIngredients).eq(1).find('.counter__num').contains(1);
    cy.get('@buttonAddMainInBurger').click();
    cy.get('@buttonAddMainInBurger').click();
    cy.get(mainInIngredients).eq(1).find('.counter__num').contains(3);
    cy.get(sauceInIngredients).last().find('.counter').should('not.exist');
    cy.get('@buttonAddSauceInBurger').click();
    cy.get(sauceInIngredients).last().find('.counter').should('exist');
    cy.get(sauceInIngredients).last().find('.counter__num').contains(1);
  });

  it('удаление main из конструктора бургера', function() {
    cy.get('@buttonAddBunInBurger').click();
    cy.get('@buttonAddMainInBurger').click();
    cy.get(mainInBurger).should('exist');
    cy.get(mainInBurger).find('.constructor-element__action').click();
    cy.get(mainInBurger).should('not.exist');
  });

  it('проверка счетчика при удалении sauce из конструктора бургера', function() {
    cy.get('@buttonAddBunInBurger').click();
    cy.get('@buttonAddSauceInBurger').click();
    cy.get('@buttonAddSauceInBurger').click();
    cy.get(sauceInBurger).last().find('.constructor-element__action').click();
    cy.get(sauceInIngredients).last().find('.counter__num').contains(1);
    cy.get(sauceInBurger).last().find('.constructor-element__action').click();
    cy.get(sauceInIngredients).last().find('.counter').should('not.exist');
  });

});

describe('проверяем функциональность модальных окон', function() {

  it('открытие модального окна', function() {
    cy.get(modalContent).should('not.exist');
    cy.get('@openDescriptionIngredient').click();
    cy.get(modalContent).should('exist');
    cy.get('#modals').find('h3').contains('Краторная булка N-200i');
  });

  it('закрытие модального окна', function() {
    cy.get('@openDescriptionIngredient').click();
    cy.get('#modals').find('button').click();
    cy.get(modalContent).should('not.exist');
  });

  it('закрытие модального окна по клику на оверлей', function() {
    cy.get('@openDescriptionIngredient').click();
    cy.get(`[data-cy=${'modal_overlay'}]`).click({force: true});
    cy.get(modalContent).should('not.exist');
  });

});

describe('проверяем функциональность оформления заказа', function() {

  it('оформить заказ', function() {
    cy.get('@buttonAddBunInBurger').click();
    cy.get('@buttonAddMainInBurger').click();
    cy.get('@buttonAddSauceInBurger').click();
    cy.get(modalContent).should('not.exist');
    cy.get(`[data-cy=${'on_order_button'}]`).click();
    cy.get(modalContent).should('exist');
    cy.get('#modals').find('h2').contains(87787);
    cy.get('#modals').find('button').click();
    cy.get(modalContent).should('not.exist');
    cy.get(topBunInBurger).should('not.exist');
    cy.get(mainInBurger).should('not.exist');
    cy.get(`[data-cy=${'section_constructor_element_sauce'}]`).should('not.exist');
    cy.get(bottomBunInBurger).should('not.exist');
  });
  
});
