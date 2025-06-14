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

  const payload = new URLSearchParams();
  payload.append("telegramId", user.id);
  payload.append("status", status);
  payload.append("breakTime", breakTime);

  fetch("https://script.google.com/macros/s/AKfycbx68IARoYD35pifJzrGQo3NQE8vOpM-2Y0b35xsL8KXzjGa3piICzygrhqBYWb1VRgZ7Q/exec", {
    method: "POST",
    body: payload,
  })
    .then((res) => res.text())
    .then((msg) => {
      alert(msg);
      tg.close();
    })
    .catch((err) => {
      alert("Ошибка при отправке данных: " + err.message);
      console.error("Ошибка при fetch:", err);
    });
}
