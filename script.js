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

  fetch("https://script.google.com/macros/s/AKfycby7340ML9zMNUTyiUxLENhB1wQ-qhrE1OYehf4hTGQ_CgYwiRymsZk3XbVtb5_N5xIs/exec", {
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
