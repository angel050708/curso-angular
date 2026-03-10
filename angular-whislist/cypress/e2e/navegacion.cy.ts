/**
 * Test E2E 1: Navegación principal de la aplicación
 * Verifica que la app carga correctamente y los links de navegación funcionan.
 */
describe('Navegación principal', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('debe cargar la página de inicio correctamente', () => {
    cy.url().should('include', '/home');
    cy.get('h1').should('exist');
  });

  it('debe navegar a la lista de destinos desde el nav', () => {
    cy.get('a[routerLink="/destino"]').click();
    cy.url().should('include', '/destino');
  });

  it('debe navegar de vuelta a home', () => {
    cy.get('a[routerLink="/destino"]').click();
    cy.url().should('include', '/destino');
    cy.get('a[routerLink="/home"]').click();
    cy.url().should('include', '/home');
  });

  it('el selector de idioma debe existir y tener opciones', () => {
    cy.get('#langSelect').should('exist');
    cy.get('#langSelect option').should('have.length.at.least', 2);
  });
});
