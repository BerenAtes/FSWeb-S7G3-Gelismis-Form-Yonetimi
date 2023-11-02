describe("Üye sayfasını test et", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("İnputa bir isim yazılmalı!", () => {
    cy.get('[ data-cy="first_name"]')
      .type("Beren")
      .should("have.value", "Beren");
  });

  it("İnputa bir soyisim yazılmalı!", () => {
    cy.get('[ data-cy="last_name"]').type("Ateş").should("have.value", "Ateş");
  });

  it(" İnputa bir email adresi girilmeli!", () => {
    cy.get('[ data-cy="email"]')
      .type("beren@gmail.com")
      .should("have.value", "beren@gmail.com");
  });

  it("Cinsiyet seçimi yapılmalı!", () => {
    cy.get('[data-cy="gender"]').should("not.be.checked");
  });
  it("Sözleşmenin kontrolü yapılmalı!", () => {
    cy.get("[data-cy=agreement]").should("not.be.checked");
  });
  it(" Kullanıcının form verilerini gönderip gönderemeyeceği", () => {
    cy.get("form").submit();
  });
});
