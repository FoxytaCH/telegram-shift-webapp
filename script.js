function handleSubmit(event) {
  event.preventDefault();

  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;

  if (!user || !user.id) {
    alert("WebApp запущен вне Telegram. Пожалуйста, откройте его из бота.");
    return;
  }

  const telegramId = user.id;
  const isOnline = document.getElementById("onlineCheck").checked;
  const isOffline = document.getElementById("offlineCheck").checked;

  if (!isOnline && !isOffline) {
    alert("Выберите действие: Онлайн или Оффлайн.");
    return;
  }

  if (isOnline && isOffline) {
    alert("Выберите только один вариант: Онлайн или Оффлайн.");
    return;
  }

  const status = isOnline ? "online" : "offline";

  fetch("https://script.google.com/macros/s/AKfycbzUKjqHPDI5vCkoV03qMxgZMikjIqD61EiQXlBO-0nD_qmQD_NJdp3adn6_yhtWvY6c9w/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      telegramId: telegramId,
      status: status
    }),
  })
    .then((res) => res.text())
    .then((msg) => {
      alert(msg);
      tg.close();
    })
    .catch((err) => {
      alert("Ошибка при отправке данных.");
      console.error(err);
    });
}
