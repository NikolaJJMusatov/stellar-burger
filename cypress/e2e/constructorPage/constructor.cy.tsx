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

  cy.visit('http://localhost:4000/');

});

afterEach(() => {
  window.localStorage.clear();
  cy.clearAllCookies();
  cy.getAllLocalStorage().should('be.empty');
  cy.getAllCookies().should('be.empty');
});

describe('проверяем функциональность конструктора бургера', function() {

  it('добавление bun, sauce в конструктор бургера', function() {
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('button').click();
    cy.get(`[data-cy=${'section_constructor_element_top_bun'}]`).should('exist');
    cy.get(`[data-cy=${'section_constructor_element_top_bun'}]`).find('.constructor-element__text').contains('Краторная булка N-200i (верх)');
    cy.get(`[data-cy=${'section_constructor_element_bottom_bun'}]`).should('exist');
    cy.get(`[data-cy=${'section_constructor_element_bottom_bun'}]`).find('.constructor-element__text').contains('Краторная булка N-200i (низ)');
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('button').click();
    cy.get(`[data-cy=${'section_constructor_element_sauce'}]`).should('exist');
    cy.get(`[data-cy=${'section_constructor_element_sauce'}]`).first().find('.constructor-element__text').contains('Соус фирменный Space Sauce');
  });

  it('проверка счетчика при добавлении bun, main, sauce в конструктор бургера', function() {
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('.counter').should('not.exist');
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('button').click();
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('.counter').should('exist');
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('.counter__num').contains(2);
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('.counter').should('not.exist');
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('button').click();
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('.counter').should('exist');
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('.counter__num').contains(1);
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('button').click();
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('button').click();
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('.counter__num').contains(3);
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('.counter').should('not.exist');
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('button').click();
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('.counter').should('exist');
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('.counter__num').contains(1);
  });

  it('удаление main из конструктора бургера', function() {
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('button').click();
    cy.get(`[data-cy=${'section_ingredients_main'}]`).eq(1).find('button').click();
    cy.get(`[data-cy=${'section_constructor_element_main'}]`).should('exist');
    cy.get(`[data-cy=${'section_constructor_element_main'}]`).find('.constructor-element__action').click();
    cy.get(`[data-cy=${'section_constructor_element_main'}]`).should('not.exist');
  });

  it('проверка счетчика при удалении sauce из конструктора бургера', function() {
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('button').click();
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('button').click();
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('button').click();
    cy.get(`[data-cy=${'section_constructor_element_sauce'}]`).last().find('.constructor-element__action').click();
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('.counter__num').contains(1);
    cy.get(`[data-cy=${'section_constructor_element_sauce'}]`).last().find('.constructor-element__action').click();
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).last().find('.counter').should('not.exist');
  });

});

describe('проверяем функциональность модальных окон', function() {

  it('открытие модального окна', function() {
    cy.get(`[data-cy=${'modal_content'}]`).should('not.exist');
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('a').click();
    cy.get(`[data-cy=${'modal_content'}]`).should('exist');
    cy.get('#modals').find('h3').contains('Краторная булка N-200i');
  });

  it('закрытие модального окна', function() {
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('a').click();
    cy.get('#modals').find('button').click();
    cy.get(`[data-cy=${'modal_content'}]`).should('not.exist');
  });

  it('закрытие модального окна по клику на оверлей', function() {
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('a').click();
    cy.get(`[data-cy=${'modal_overlay'}]`).click({force: true});
    cy.get(`[data-cy=${'modal_content'}]`).should('not.exist');
  });

});

describe('проверяем функциональность оформления заказа', function() {

  it('оформить заказ', function() {
    cy.get(`[data-cy=${'section_ingredients_bun'}]`).first().find('button').click();
    cy.get(`[data-cy=${'section_ingredients_main'}]`).first().find('button').click();
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`).first().find('button').click();
    cy.get(`[data-cy=${'modal_content'}]`).should('not.exist');
    cy.get(`[data-cy=${'on_order_button'}]`).click();
    cy.get(`[data-cy=${'modal_content'}]`).should('exist');
    cy.get('#modals').find('h2').contains(87787);
    cy.get('#modals').find('button').click();
    cy.get(`[data-cy=${'modal_content'}]`).should('not.exist');
    cy.get(`[data-cy=${'section_constructor_element_top_bun'}]`).should('not.exist');
    cy.get(`[data-cy=${'section_constructor_element_main'}]`).should('not.exist');
    cy.get(`[data-cy=${'section_constructor_element_main'}]`).should('not.exist');
    cy.get(`[data-cy=${'section_constructor_element_bottom_bun'}]`).should('not.exist');
  });
  
});
