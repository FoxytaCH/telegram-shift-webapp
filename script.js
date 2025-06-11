function handleSubmit(event) {
  event.preventDefault();

  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;
  if (!user || !user.id) {
    alert("WebApp запущен вне Telegram.");
    return;
  }

  const form = event.target;
  const status = form.status.value;
  const breakTime = form.breakTime.value;

  const payload = {
    telegramId: user.id,
    status: status,
    breakTime: breakTime,
  };

  fetch("https://script.google.com/macros/s/AKfycbzUKjqHPDI5vCkoV03qMxgZMikjIqD61EiQXlBO-0nD_qmQD_NJdp3adn6_yhtWvY6c9w/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
