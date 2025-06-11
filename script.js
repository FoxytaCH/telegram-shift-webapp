<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <title>Статус смены</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 20px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 400px;
    }

    .form label {
      font-size: 16px;
    }

    .form input[type="time"] {
      padding: 8px;
    }

    .form button {
      background-color: #4a3aff;
      color: white;
      padding: 12px;
      font-size: 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <form class="form" onsubmit="handleSubmit(event)">
    <label>
      <input type="radio" name="status" value="Онлайн" required />
      Стать Онлайн
    </label>
    <label>
      <input type="radio" name="status" value="Оффлайн" />
      Выйти в Оффлайн
    </label>
    <label>
      <input type="radio" name="status" value="Перерыв" />
      Выйти на перерыв
    </label>
    <input type="time" name="breakTime" />
    <button type="submit">Подтвердить</button>
  </form>
  <script src="script.js"></script>
</body>
</html>
