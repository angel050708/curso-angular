/**
 * Test E2E 3: Directiva de tracking y contadores en pantalla
 * Verifica que al hacer click en elementos con appTrackingClick,
 * los contadores de tracking tags se actualizan reactivamente en pantalla.
 */
describe('Tracking de clicks con Redux', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('debe tener elementos con la directiva appTrackingClick', () => {
    cy.get('[appTrackingClick]').should('have.length.at.least', 1);
  });

  it('debe tener atributos data-tracking-tag en los elementos trackeados', () => {
    cy.get('[data-tracking-tag]').should('have.length.at.least', 1);
    cy.get('[data-tracking-tag]').first().should('have.attr', 'data-tracking-tag');
  });

  it('debe mostrar contadores de tracking tras hacer click en elementos trackeados', () => {
    // Hacer click en el enlace de navegación trackeado
    cy.get('[data-tracking-tag="nav-home"]').click();

    // Verificar que aparece la sección de tracking tags con contadores
    cy.contains('Tracking Tags').should('exist');
    cy.get('.badge').should('have.length.at.least', 1);
    cy.get('.badge').first().should('contain', '1');
  });

  it('debe incrementar el contador al hacer múltiples clics', () => {
    // Hacer click múltiples veces en el mismo elemento
    cy.get('[data-tracking-tag="nav-home"]').click();
    cy.get('[data-tracking-tag="nav-home"]').click();
    cy.get('[data-tracking-tag="nav-home"]').click();

    // Verificar que el contador muestra 3
    cy.contains('nav-home').parent().should('contain', '3');
  });
});
