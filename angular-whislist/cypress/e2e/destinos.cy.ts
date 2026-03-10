/**
 * Test E2E 2: Formulario de destinos y lista
 * Verifica que se pueden agregar destinos y que aparecen en la lista.
 */
describe('Gestión de destinos', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('debe mostrar el formulario de agregar destinos', () => {
    cy.get('app-form-destino-viaje').should('exist');
  });

  it('debe poder escribir en el campo de nombre del destino', () => {
    cy.get('app-form-destino-viaje input[type="text"]').first()
      .type('Cancún')
      .should('have.value', 'Cancún');
  });

  it('debe agregar un destino y mostrarlo en la lista', () => {
    // Escribir nombre del destino en el formulario
    cy.get('app-form-destino-viaje input[type="text"]').first()
      .clear()
      .type('Mar del Plata');

    // Enviar el formulario (buscar botón de submit)
    cy.get('app-form-destino-viaje').find('button[type="submit"], button').first().click();

    // Verificar que aparece el destino en la lista
    cy.get('app-destino-viaje').should('have.length.at.least', 1);
  });
});
