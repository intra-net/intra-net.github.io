// CODE ERSTELLEN
const db = firebase.database();

  // ✅ Zufälligen 17-stelligen Code generieren
  function generateCode(length = 17) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // ✅ Code generieren & speichern
  function createAndRedirect(redirectURL) {
    const code = generateCode();
    const timestamp = Date.now();

    firebase.database().ref("/login_codes/" + code).set({
      createdAt: timestamp
    });

    // Nach 5 Minuten automatisch löschen
    setTimeout(() => {
      firebase.database().ref("/login_codes/" + code).remove();
    }, 5 * 60 * 1000); // 5 Minuten

    // Weiterleitung mit Code
    window.location.href = `${redirectURL}?code=${code}`;
  }
// CODE ÜBERPRÜFEN
