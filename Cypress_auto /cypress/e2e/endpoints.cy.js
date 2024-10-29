describe('Test de ingreso a la página', () => {
  const baseUrl = 'https://efex.vercel.app';
  const currencyInputFrom = '[data-testid="currency-input-from"]';
  const currencyOutput = '[data-testid="currency-output"]';
  const exchangeRate = '[data-testid="exchange-rate"]';
  const dropdownIndicator = '.react-select__dropdown-indicator';
  const currencyStack = '.chakra-stack span';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Ingresar valor en el campo de divisas', () => {
    cy.get(currencyInputFrom).clear().type('100');
  });

  it('Verifica conversión de divisas', () => {
    cy.get(currencyInputFrom).clear().type('100');
    cy.get(currencyOutput).should('not.be.empty', 'La conversión no deberia estar vacia.');
  });

  it('Cambia divisas y verifica actualización', () => {
    cy.get(dropdownIndicator).eq(0).click(); // abre el menu
    cy.get(currencyStack).contains('USD').click(); // select USD

    cy.get(dropdownIndicator).eq(1).click(); // abre el menu
    cy.get(currencyStack).contains('EUR').click(); // select EUR
    cy.get(currencyOutput).should('not.be.empty', 'La conversion no deberia estar vacia.');
  });

  it('Verifica campo de entrada vacío', () => {
    cy.get(currencyInputFrom).clear(); // deja vacio
    cy.get('[data-testid="currency-input-to"]').should('be.empty', 'La conversion no deberia estar vacia.');
  });

  it('Prueba con valor extremo', () => {
    cy.get(currencyInputFrom).clear().type('999999999');
    cy.get(currencyOutput).should('not.be.empty', 'La conversion no deberia estar vacia.');
  });

  it('Verifica visualización de tasas de cambio', () => {
    cy.get(exchangeRate).should('be.visible').and('not.be.empty', 'La tasa de cambio deberia estar visible y no vacía.');
  });
});
