document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
  
    // Пример простой карты
    const fields = [
      "Старт", "Поле 1", "Поле 2", "Поле 3", "Налог",
      "Поле 4", "Тюрьма", "Поле 5", "Свобода", "Поле 6"
    ];
  
    fields.forEach((field, index) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = `${index}: ${field}`;
      board.appendChild(cell);
    });
  
    // Получаем данные из бота (если переданы через WebApp initData)
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
  
      tg.onEvent("mainButtonClicked", function () {
        tg.sendData("web_roll");
      });
    }
  });