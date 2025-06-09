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

  fetch("https://script.google.com/macros/s/AKfycbwHk76hT3sNrPWFGc9PRYMOvbiN9F71pX3MdFYSJFohCYdsh723Giup54k67-xXDya5/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fio: fio,
      telegramId: telegramId,
      isOnline: true
    })
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
