function getQueryString() {
  var result = {};
  if(1 < window.location.search.length) {
    // 最初の1文字 (?記号) を除いた文字列を取得する
    var query = window.location.search.substring( 1 );
    // クエリの区切り記号 (&) で文字列を配列に分割する
    var parameters = query.split('&');
    for(var i = 0; i < parameters.length; i++) {
      // パラメータ名とパラメータ値に分割する
      var element = parameters[i].split('=');
      var paramName = decodeURIComponent(element[0]);
      var paramValue = decodeURIComponent(element[1]);
      // パラメータ名をキーとして連想配列に追加する
      result[paramName] = paramValue;
    }
  }
  return result;
}

var canvasWidth = 480;
var canvasHeight = 854;
var cat = Array(7);
var flag = true;
var image_url = [
"./image/mike.png",
"./image/muku.png",
"./image/hime.png",
"./image/sakura.png",
"./image/torajirou.png",
"./image/ai.png",
"./image/ic_launcher_button.png",
];

//var image = [null, null, null, null, null, null, null];
var image = Array(7);
for(var i = 0; i < image_url.length; i++) {
  image[i] = new Image();
  image[i].src = image_url[i];
}

var click_x = 0;
var click_y = 0;

function onClick(e) {
  //console.log("click");
  var x = e.clientX - canvas.offsetLeft;
  var y = e.clientY - canvas.offsetTop;
  //console.log("x:", x, "y:", y);

  //drawRect(x, y, 10, 10);
  //caluculate();
  //drawCanvas();
  //thread();
  if(cat[0].inArea(x,y)) {
    document.getElementById('sound-file_0').play();
  }
  else if(cat[1].inArea(x,y)) {
    document.getElementById('sound-file_1').play();
  }
  else if(cat[2].inArea(x,y)) {
    document.getElementById('sound-file_5').play();
  }
  else if(cat[3].inArea(x,y)) {
    document.getElementById('sound-file_3').play();
  }
  else if(cat[4].inArea(x,y)) {
    document.getElementById('sound-file_4').play();
  }
  else if(cat[5].inArea(x,y)) {
    document.getElementById('sound-file_2').play();
  }
  else if(cat[6].inArea(x,y)) {
    document.getElementById('sound-file_6').play();
    popupmenu();
  } else {
    document.getElementById('sound-file_7').play();
  }
  drawCanvas();
  //thread();
  //setTimeout(drawCanvas(), 1000);
  //click_x = x;
  //click_y = y;
}

function onOut() {
  //console.log("mouseout");
  drawCanvas();
}

function drawRect(x, y, width, height) {
  //var context = canvas.getContext('2d');
  context.fillRect(x, y, width, height);
}

function drawCanvas() {
  context.fillStyle = "rgb(128, 64, 64)";
  context.fillRect(0, 0,canvasWidth, canvasHeight);
  var font_size = Math.round(Math.min(canvasWidth, canvasHeight) / 3.5);
  context.font = font_size + "px mono";
  context.fillStyle = "rgb(64, 32, 32)";
  context.fillText("aCATm", 8, canvasHeight);
  context.font = font_size + "px mono";
  context.fillStyle = "rgb(128, 64, 64)";
  context.fillText("aCATm", 0, canvasHeight - 8);

  for(var i = cat.length - 1; i >= 0 ; i--) {// ボールの描画
    if((i != cat.length - 1) && (cat[i].inAreaFlag)) {
      context.beginPath();
      cat[i].inAreaFlag = false;
      context.fillStyle = "rgb(255, 240, 240)";
      //context.strokeStyle = "rgb(255, 240, 240)";
      context.arc(cat[i].x + cat[i].d / 2, cat[i].y + cat[i].d / 2, cat[i].d * 6 / 10, 0, (Math.PI / 180) * 360, true);
      context.fill();
      //context.stroke();
    }
    context.beginPath();
    context.fillStyle = "rgb(255, 128, 128)";
    context.arc(cat[i].x + cat[i].d / 2, cat[i].y + cat[i].d / 2, cat[i].d / 2, 0, (Math.PI / 180) * 360, true);
    context.fill();
    //context.drawImage(image[i], cat[i].x, cat[i].y, cat[i].d, cat[i].d);
    context.drawImage(image[i], cat[i].x + cat[i].d / 20, cat[i].y + cat[i].d / 20, cat[i].d - cat[i].d / 10, cat[i].d - cat[i].d / 10);
    //console.log("x " + i + ":", cat[i].x, "y " + i + ":", cat[i].y);
  }
  //context.beginPath();
  //context.fillStyle = "rgb(255, 128, 128)";
  //context.arc(cat[cat.length - 1].x + cat[cat.length - 1].d / 2, cat[cat.length - 1].y + cat[cat.length - 1].d / 2, cat[cat.length - 1].d / 2 + 2, 0, (Math.PI / 180) * 360, true);
  //context.fill();
  //context.drawImage(image[cat.length - 1], cat[cat.length - 1].x, cat[cat.length - 1].y, cat[cat.length - 1].d, cat[cat.length - 1].d);
}

var threadCount = 0;

function caluculate() {
  //flag = false;
  var dt, dtx, dty, dtt;// ボール間の距離の計算用
  var di, dj, t;// 衝突したボール
  for(var i = 0; i < cat.length - 1; i++) {
    dt = cat[i].d;
    for(var j = i + 1; j < cat.length; j++) {
      dtx = cat[i].x - cat[j].x;
      dty = cat[i].y - cat[j].y;
      dtt = dtx * dtx + dty * dty;
      if(dtt < dt * dt) {
        if(cat[i].x < cat[j].x) {
          di = i; dj = j;
        } else {
          di = j; dj = i;
        }
        if((cat[di].cdx > 0 && (cat[dj].cdx < 0 || cat[dj].cx > cat[di].cx)) || (cat[di].cdx < 0 && cat[dj].cdx < 0 && cat[dj].cx < cat[di].cx)) {
          t = cat[di].cdx;
          cat[di].cdx = cat[dj].cdx;
          cat[dj].cdx = t;
          t = cat[di].cx;
          cat[di].cx = cat[dj].cx;
          cat[dj].cx = t;
          cat[di].cnx = 1;
          cat[dj].cnx = 1;
        }
        if(cat[i].y < cat[j].y) {
          di = i; dj = j;
        } else {
          di = j; dj = i;
        }
        if((cat[di].cdy > 0 && (cat[dj].cdy < 0 || cat[dj].cy > cat[di].cy)) || (cat[di].cdy < 0 && cat[dj].cdy < 0 && cat[dj].cy < cat[di].cy)) {
          t = cat[di].cdy;
          cat[di].cdy = cat[dj].cdy;
          cat[dj].cdy = t;
          t = cat[di].cy;
          cat[di].cy = cat[dj].cy;
          cat[dj].cy = t;
          cat[di].cny = 1;
          cat[dj].cny = 1;
        }
      }
    }
  }
  for(var i = 0; i < cat.length; i++) {// ボールの描画
    cat[i].move(0,canvasWidth, 0, canvasHeight);
    //move(cat[i], 0,canvasWidth, 0, canvasHeight);
  }
  cat[cat.length - 1].x =canvasWidth - cat[cat.length - 1].d;
  cat[cat.length - 1].y = 0;
  //cat[cat.length - 1].cnx = 0;
  //cat[cat.length - 1].cny = 0;

  //setTimeout(thread(), 1000);
  //thread();
  //drawCanvas();
  threadCount++;
  //console.log("threadCount:", threadCount);
  if(threadCount > 50) {
    threadCount = 0;
    drawCanvas();
  }
  setTimeout(function() {caluculate();}, 0);
  //flag = true;
}

class Cat {
  //constructor(x, y, d, cnx, cny, cdx, cdy, cx, cy) {
  constructor(x, y, d, cnx, cny) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.cnx = cnx;
    this.cny = cny;
    if(cnx > 0) {
      this.cnx = cnx;
      this.cdx = 1;
    }
    else {
      this.cnx = -cnx;
      this.cdx = -1;
    }
    if(cny > 0) {
      this.cny = cny;
      this.cdy = 1;
    }
    else {
      this.cny = -cny;
      this.cdy = -1;
    }
    this.cx = 0;
    this.cy = 0;
    this.inAreaFlag = false;
  }
/*
  set x(x) {
    this.x = x;
  }
  get x() {
    return this.x;
  }
  set y(y) {
    this.y = y;
  }
  get y() {
    return this.y;
  }
  set d(d) {
    this.d = d;
  }
  get d() {
    return this.d;
  }
  set cnx(cnx) {
    this.cnx = cnx;
  }
  get cnx() {
    return this.cnx;
  }
  set cny(cny) {
    this.cny = cny;
  }
  get cny() {
    return this.cny;
  }
  set cdx(cdx) {
    this.cdx = cdx;
  }
  get cdx() {
    return this.cdx;
  }
  set cdy(cdy) {
    this.cdy = cdy;
  }
  get cdy() {
    return this.cdy;
  }
  set cx(cx) {
    this.cx = cx;
  }
  get cx() {
    return this.cx;
  }
  set cy(cy) {
    this.cy = cy;
  }
  get cy() {
    return this.cy;
  }
*/
  move(w1, w2, h1, h2) {
    if(--this.cx < 0) {// x 方向に移動する時間になった
      this.cx = this.cnx;
      this.x += this.cdx;
    }
    if(--this.cy < 0) {// y 方向に移動する時間になった
      this.cy = this.cny;
      this.y += this.cdy;
    }
    if(this.cdx > 0 && this.x + this.d > w2) this.cdx = -this.cdx;// 右の縁にぶつかった
    if(this.cdx < 0 && this.x   < w1) this.cdx = -this.cdx;// 左
    if(this.cdy > 0 && this.y + this.d > h2) this.cdy = -this.cdy;// 下の縁にぶつかった
    if(this.cdy < 0 && this.y   < h1) this.cdy = -this.cdy;// 上
  }
  inArea(xx, yy) {
    if(Math.pow((Math.pow(this.x + this.d / 2 - xx, 2) + Math.pow(this.y + this.d / 2 - yy, 2)), 0.5) < this.d / 2) {
      this.inAreaFlag = true;
      return true;
    }
    return false;
  }
}

function move(cat, w1, w2, h1, h2) {
  if(--(cat.cx) < 0) {// x 方向に移動する時間になった
      cat.cx = cat.cnx;
      cat.x += cat.cdx;
  }
  if(--(cat.cy) < 0) {// y 方向に移動する時間になった
      cat.cy = cat.cny;
      cat.y += cat.cdy;
  }
  if((cat.cdx > 0) && (cat.x + cat.d > w2)) {cat.cdx = -(cat.cdx);}// 右の縁にぶつかった
  if((cat.cdx < 0) && (cat.x   < w1)) {cat.cdx = -(cat.cdx);}// 左
  if((cat.cdy > 0) && (cat.y + cat.d > h2)) {cat.cdy = -(cat.cdy);}// 下の縁にぶつかった
  if((cat.cdy < 0) && (cat.y   < h1)) {cat.cdy = -(cat.cdy);}// 上
}

function createCat() {
  var d = Math.round(Math.min(canvasWidth, canvasHeight) / 3);//* 2 / 7;// ボールの直径
  //var d = Math.round(Math.min(canvasWidth, canvasHeight) / (cat.length - 1)  * 1.75);// / 4;//* 2 / 7;// ボールの直径
/*
  for(var i = 0; i < cat.length - 1; i++) {// ボールの生成
    var random_0 = Math.round(Math.random() * 10000 % 3 * 2);
    var random_1 = Math.round(Math.random() * 10000 % 3 * 2);
    cat[i] = new Cat(canvasWidth / 2 - d / 2, canvasHeight / 2 - d / 2, d, random_0, random_1);
    //console.log("cnx " + i + ":", random_0, "cny " + i + ":", random_1);
  }
*/
  if(canvasWidth <= canvasHeight) {
    var hm = Math.round((canvasWidth - d * (cat.length - 1) / 2) / 4);
    var vm = Math.round(hm / 2);
    for(var i = 0; i < 2; i++) {// ボールの生成
      for(var j = 0; j < 3; j++) {
        var random_0 = Math.round(Math.random() * 10000 % 3 * 2);
        var random_1 = Math.round(Math.random() * 10000 % 3 * 2);
        cat[j + 3 * i] = new Cat(hm + (hm + d) * j, canvasHeight / 2 - (vm + d) + (vm * 2 + d) * i, d, random_0, random_1);
      }
    }
  } else {
    var hm = Math.round((Math.min(canvasWidth, canvasHeight) - d * (cat.length - 1) / 2) / 4);
    var vm = hm;
    for(var i = 0; i < 3; i++) {// ボールの生成
      for(var j = 0; j < 2; j++) {
        var random_0 = Math.round(Math.random() * 10000 % 3 * 2);
        var random_1 = Math.round(Math.random() * 10000 % 3 * 2);
        cat[j + 2 * i] = new Cat(canvasWidth / 2 - (hm + d) + (hm * 2 + d) * j, canvasHeight / 2 - (vm + d + d / 2) + (vm + d) * i, d, random_0, random_1);
      }
    }
  }
  cat[cat.length - 1] = new Cat(canvasWidth - d, 0, d, 0, 0);
}

onload = function() {
  createCat();
  drawCanvas();
  caluculate();

  //setTimeout(drawCanvas(), 1000);
  //setInterval(caluculate(), 1000);
  //thread();
  //setTimeout(function() {caluculate();}, 0);
}

function thread() {
  for(var i = 0; i < 10; i++) {
    caluculate();
  }
  drawCanvas();
  //while(true) {
  //  if(flag) {
  //    //caluculate();
  //    setTimeout(function() {caluculate();}, 0);
  //  }
  //}
  //threadCount++;
  //console.log("threadCount:", threadCount);
  //if(threadCount > 100) {
  //  threadCount = 0;
  //  drawCanvas();
  //}
}

popupmenuFlag = false;
function popupmenu() {
  var popupmenu = document.getElementById("popupmenu");
  //popupmenu.style.right = event.x;
  //popupmenu.style.top  = event.y;
  popupmenu.style.left = 0;
  popupmenu.style.top  = 0;
  popupmenu.style.fontSize = cat[0].d / 7 + "px";
  if(popupmenuFlag) {
    popupmenu.style.visibility = "hidden";
  } else {
    popupmenu.style.visibility = "visible";
  }
  popupmenuFlag = !popupmenuFlag;
}
function popupmenuHidden() {
  var popupmenu = document.getElementById("popupmenu");
  popupmenu.style.visibility = "hidden";
  popupmenuFlag = !popupmenuFlag;
}
//document.onclick = popupmenu;
