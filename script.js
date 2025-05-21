const board = document.getElementById("board");
const playerInfo = document.getElementById("player-info");
const propertyList = document.getElementById("property-list");
const rollButton = document.getElementById("roll-button");
const diceResult = document.getElementById("dice-result");

// Пример данных от бота (в реальности будет приходить через initData)
let gameData = {
  player: {
    name: "Игрок 1",
    balance: 1500,
    properties: ["Поле 1", "Поле 3"],
    position: 2
  },
  fields: [
    { name: "Старт", price: null },
    { name: "Поле 1", price: 100 },
    { name: "Поле 2", price: 150 },
    { name: "Поле 3", price: 200 },
    { name: "Налог", price: -200 },
    { name: "Поле 4", price: 250 }
  ]
};

function updateUI() {
  // Очистка доски
  board.innerHTML = "";

  // Рендер полей
  gameData.fields.forEach((field, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = field.name;

    if (index === gameData.player.position) {
      cell.classList.add("player-here");
    }

    board.appendChild(cell);
  });

  // Информация об игроке
  playerInfo.innerHTML = `
    <strong>${gameData.player.name}</strong><br>
    Баланс: ${gameData.player.balance}$<br>
    Полей: ${gameData.player.properties.length}
  `;

  // Список недвижимости
  propertyList.innerHTML = "";
  gameData.player.properties.forEach(prop => {
    const li = document.createElement("li");
    li.textContent = prop;
    propertyList.appendChild(li);
  });
}

// Эмуляция хода
rollButton.addEventListener("click", () => {
  const steps = Math.floor(Math.random() * 6) + 1;
  gameData.player.position = (gameData.player.position + steps) % gameData.fields.length;
  diceResult.textContent = `Вы бросили: ${steps}`;
  updateUI();
});

// Инициализация
updateUI();

// Поддержка Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
  Telegram.WebApp.ready();
  console.log("Telegram WebApp готов!");
}
