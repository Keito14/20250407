let squares = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('blue');

  // 建立選單按鈕
  const menuButton = createButton('顯示選單');
  menuButton.position(10, 10);
  menuButton.mousePressed(showMenu);

  // 初始化 40 個正方形
  for (let i = 0; i < 40; i++) {
    squares.push(new MovingSquare(random(width), random(height), random(20, 50)));
  }
}

function draw() {
  background('blue');

  // 更新並顯示所有正方形
  squares.forEach(square => {
    square.move();
    square.display();
  });
}

// 顯示選單的函式
function showMenu() {
  // 清除舊的選單（如果有）
  const existingMenu = select('#menu');
  if (existingMenu) {
    existingMenu.remove();
  }

  // 建立選單容器
  const menu = createDiv();
  menu.id('menu');
  menu.position(10, 40);

  // 選單項目與對應的網站
  const items = [
    { name: '自我介紹', url: 'https://example.com/about' },
    { name: '作品集', url: 'https://keito14.github.io/4137303090317/' },
    { name: '測驗卷', url: 'https://keito14.github.io/test/' },
    { name: '教學影片', url: 'https://example.com/tutorials' }
  ];

  items.forEach(item => {
    const menuItem = createButton(item.name);
    menuItem.parent(menu);
    menuItem.style('display', 'block');
    menuItem.mousePressed(() => window.open(item.url, '_blank'));
  });
}

// 定義移動的正方形類別
class MovingSquare {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255));
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // 碰到邊界反彈
    if (this.x < 0 || this.x + this.size > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y + this.size > height) {
      this.ySpeed *= -1;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
}