function handleSubmit(event) {
  event.preventDefault();

  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;

  if (!user || !user.id) {
    alert("WebApp запущен вне Telegram. Пожалуйста, откройте его из бота.");
    return;
  }

  const telegramId = user.id;
  const form = event.target;
  const fio = form.fio.value.trim();

  if (!fio) {
    alert("Введите ФИО");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzUKjqHPDI5vCkoV03qMxgZMikjIqD61EiQXlBO-0nD_qmQD_NJdp3adn6_yhtWvY6c9w/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      fio: fio,
      telegramId: telegramId,
      isOnline: true
    }),
  })
    .then((res) => res.text())
    .then((msg) => {
      if (msg === "OK") {
        alert("Вы отмечены как Онлайн!");
        tg.close();
      } else {
        alert("Ошибка: " + msg);
      }
    })
    .catch((err) => {
      alert("Ошибка при отправке данных.");
      console.error(err);
    });
}
