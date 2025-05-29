  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  async function checkLoginCode() {
    const code = getQueryParam("code");

    if (!code) {
      window.location.href = "index.html";
      return;
    }

    const snapshot = await firebase.database().ref("/login_codes/" + code).once("value");
    const data = snapshot.val();

    if (!data) {
      // Code existiert nicht
      window.location.href = "index.html";
      return;
    }

    const createdAt = data.createdAt;
    const now = Date.now();

    if (now - createdAt > 5 * 60 * 1000) {
      // Abgelaufen: Löschen & weiterleiten
      firebase.database().ref("/login_codes/" + code).remove();
      window.location.href = "index.html";
      return;
    }

    //  Code ist gültig → nichts tun
    console.log("Login Code korrekt!");
  }


  // Direkt beim Laden prüfen
  checkLoginCode();