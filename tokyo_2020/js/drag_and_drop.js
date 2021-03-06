var minusWidth = 0;
var minusHeight = 0;

function getQueryString() {

  var result = {};
  if( 1 < window.location.search.length ) {
    // 最初の1文字 (?記号) を除いた文字列を取得する
    var query = window.location.search.substring( 1 );
    // クエリの区切り記号 (&) で文字列を配列に分割する
    var parameters = query.split('&');
    for( var i = 0; i < parameters.length; i++ ) {
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

function f_dragstart(event) {

  event.dataTransfer.setData("text", event.target.id);
}

function f_dragover(event){

  event.preventDefault();
}

function f_drop(event) {

  var id_name = event.dataTransfer.getData("text");
  var drag_elm = document.getElementById(id_name);
  event.currentTarget.style.backgroundColor = drag_elm.style.backgroundColor;
  event.currentTarget.title = drag_elm.title;
  event.preventDefault();
}

function f_drop_emblem(event) {

  var id_name = event.dataTransfer.getData("text");
  var drag_elm = document.getElementById(id_name);
  document.getElementById("id_emblem").style.backgroundColor = drag_elm.style.backgroundColor;
  event.preventDefault();
}

function f_drop_word_mark(event) {

  var id_name = event.dataTransfer.getData("text");
  var drag_elm = document.getElementById(id_name);
  document.getElementById("id_word_mark_text_TOKYO").style.color = drag_elm.style.backgroundColor;
  document.getElementById("id_word_mark_text_2020").style.color = drag_elm.style.backgroundColor;
  event.preventDefault();
}

var bsp = [-1, -1, 3, 0]; //Box Shadow Parameter

function f_drop_body(event) {

  var id_name = event.dataTransfer.getData("text");
  var drag_elm = document.getElementById(id_name);
  document.body.style.backgroundColor = drag_elm.style.backgroundColor;
  document.getElementById('id_canvas').style.borderColor =drag_elm.style.backgroundColor;
  if(document.getElementById('id_grid').selectedIndex == 1) {
    for(var row = 0; row < 16; row++) {
      for(var col = 0; col < 16; col++) {
        document.getElementById('id_row_' + row + '_col_' + col).style.borderColor =drag_elm.style.backgroundColor;
      }
    }
  }
  else if(document.getElementById('id_grid').selectedIndex == 2) {
    for(var row = 0; row < 16; row++) {
      for(var col = 0; col < 16; col++) {
        document.getElementById('id_row_' + row + '_col_' + col).style.boxShadow = bsp[0] + "px " + bsp[1] + "px " + bsp[2] + "px " + bsp[3] + "px " + drag_elm.style.backgroundColor + " inset";
      }
    }
  }
  event.preventDefault();
}

var iro = new Array();

var iro_0 = [
iro["toumei"] = ["transparent", "Transparent 透明", "-"],
iro["wakakusa"] = ["#A9B735", "Wakakusairo 若草色", "3GY 7/10"],
iro["byakuroku"] = ["#CADBCF", "Byakuroku 白緑（びゃくろく）", "2.5G 8.5/2.5"],
iro["murasaki"] = ["#A260BF", "Murasaki 紫", "7.5P 5/12"],
iro["beni"] = ["#BD1E48", "Beni (Kurenai) iro 紅色", "3R 4/14"],
iro["toki"] = ["#F9A1D0", "Tokiiro とき色", "7RP 7.5/8"],
iro["sakura"] = ["#FFDBED", "Sakurairo 桜色", "10RP 9/2.5"],
iro["shiro"] = ["#F1F1F1", "Shiro 白", "N9.5"],
iro["rikyunezumi"] = ["#787C7A", "Rikyuunezumi 利休鼠", "2.5G 5/1"],
iro["kuro"] = ["#262626", "Kuro 黒", "N1.5"],
iro["sora"] = ["#95C0EC", "Sorairo 空色", "9B 7.5/5.55"],
iro["edomurasaki"] = ["#5F4C86", "Edomurasaki 江戸紫", "3P 3.5/7"],
iro["shu"] = ["#ED514E", "Shuiro 朱色", "6R 5.5/14"],
iro["akane"] = ["#A0283A", "Akaneiro 茜（あかね）色", "4R 3.5/11"],
iro["kinaka"] = ["#ED542A", "Kinaka 金赤", "9R 5.5/14"],
iro["kincha"] = ["#C47600", "Kincha 金茶", "9YR 5.5/10"],
iro["kin"] = ["rgb(242,199,79)", "Kiniro金色", "-"],
iro["makka"] = ["#FF0000", "Red 真赤", "-"],
iro["masshiro"] = ["#FFFFFF", "White 真白", "-"],
iro["nouhai"] = ["#404040", "Dark grey 濃灰", "-"],
iro["makkuro"] = ["#000000", "Black 真黒", "-"],
];

//var bgc = iro["kin"][0];// intial body background color
var bgc = iro["nouhai"][0];

var cell_w = 24;
var cell_h = 24;
var border_width = 0;
var cell_size_8 = "";
var cell_size_16 = "";
var cell_size_24 = "selected";
var cell_size_32 = "";
var cell_size_40 = "";
var cell_size_48 = "";
var cell_size_56 = "";
var cell_size_64 = "";

var queryString = getQueryString();
var cell_size_flag = true;
var cell_size_control = true;
if(queryString['cell_size'] != null) {
  cell_w = queryString['cell_size'];
  cell_h = queryString['cell_size'];
  cell_size_control = false;
  if(cell_w == 8) {
    cell_size_8 = "selected";
    cell_size_24 = "";
    cell_size_control = true;
  }
  else if(cell_w == 16) {
    cell_size_16 = "selected";
    cell_size_24 = "";
    cell_size_control = true;
  }
  else if(cell_w == 24) {
    cell_size_control = true;
  }
  else if(cell_w == 32) {
    cell_size_32 = "selected";
    cell_size_24 = "";
    cell_size_control = true;
  }
  else if(cell_w == 40) {
    cell_size_40 = "selected";
    cell_size_24 = "";
    cell_size_control = true;
  }
  else if(cell_w == 48) {
    cell_size_48 = "selected";
    cell_size_24 = "";
    cell_size_control = true;
  }
  else if(cell_w == 56) {
    cell_size_56 = "selected";
    cell_size_24 = "";
    cell_size_control = true;
  }
  else if(cell_w == 64) {
    cell_size_64 = "selected";
    cell_size_24 = "";
    cell_size_control = true;
  }
}
if(queryString['cell_size_control'] != null) {
  if(queryString['cell_size_control'] == "none") {
    cell_size_control = false;
  }
}

function create_palette() {

  document.writeln('<div ondragover="f_dragover(event)" ondrop="f_drop_body(event)" style="text-align:center;padding-top:16px;padding-bottom:16px;">');
  document.writeln('  <table id="id_palette" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color:' + iro["toumei"][0] + ';">');
  document.writeln('    <tr>');
  document.writeln('      <td id="id_iro_0_0" title="' + iro_0[0][1] + '" style="background-color:' + iro_0[0][0] + ';background-image:url(./image/transparent.png);background-size:' + (cell_w / 2) + 'px ' + (cell_h / 2) + 'px;width:' + cell_w + 'px;height:' + cell_h + 'px;" draggable="true" ondragstart="f_dragstart(event)">');
  document.writeln('      </td>');
  for(var col = 1; col < iro_0.length; col++) {
    document.writeln('      <td id="id_iro_0_' + col + '" title="' + iro_0[col][1] + '" style="background-color:' + iro_0[col][0] + ';background-image:url(./image/palette.png);background-size:' + (cell_w / 1) + 'px ' + (cell_h / 1) + 'px;width:' + cell_w + 'px;height:' + cell_h + 'px;" draggable="true" ondragstart="f_dragstart(event)">');
    document.writeln('      </td>');
  }
  document.writeln('    </tr>');
  document.writeln('  </table>');
  document.writeln('</div>');
}

function create_canvas() {

  document.writeln('      <table id="id_canvas" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color:' + iro["toumei"][0] + ';border-style:solid;border-top-width:0px;border-bottom-width:' + border_width + 'px;border-left-width:0px;border-right-width:' + border_width + 'px;border-color:' + bgc + ';">');
  for(var row = 0; row < 16; row++) {
    document.writeln('        <tr>');
    for(var col = 0; col < 16; col++) {
      document.writeln('          <td id="id_row_' + row + '_col_' + col + '" style="background-color:' + iro["toumei"][0] + ';width:' + cell_w + 'px;height:' + cell_h + 'px;-khtml-user-drag:element;border-style:solid;border-top-width:' + border_width + 'px;border-bottom-width:0px;border-left-width:' + border_width + 'px;border-right-width:0px;border-color:rgb(242,199,79);" draggable="true" ondragstart="f_dragstart(event)" ondragover="f_dragover(event)" ondrop="f_drop(event)"');
      document.writeln('          </td>');
    }
    document.writeln('        </tr>');
  }
  document.writeln('      </table>');
} 

function create_emblem() {

  document.writeln('<table id="id_emblem" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color:' + iro["masshiro"][0] + ';">');
  document.writeln('  <tr>');
  document.writeln('    <td id="id_emblem_0" colspan="3" ondragover="f_dragover(event)" ondrop="f_drop_emblem(event)" style="height:' + (cell_h * 2) + 'px;">');
  document.writeln('    </td>');
  document.writeln('  </tr>');
  document.writeln('  <tr>');
  document.writeln('    <td id="id_emblem_1" rowspan="5" ondragover="f_dragover(event)" ondrop="f_drop_emblem(event)" style="width:' + Math.round(cell_w * 8.0 / 3.0) + 'px;">');
  document.writeln('    </td>');
  document.writeln('    <td style="text-align:center;">');
  //document.writeln('      <script>');
  //document.writeln('        create_canvas();');
  //document.writeln('      </script>');
  document.writeln('      <table id="id_canvas" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color:' + iro["toumei"][0] + ';border-style:solid;border-top-width:0px;border-bottom-width:' + border_width + 'px;border-left-width:0px;border-right-width:' + border_width + 'px;border-color:' + bgc + ';">');
  for(var row = 0; row < 16; row++) {
    document.writeln('        <tr>');
    for(var col = 0; col < 16; col++) {
      document.writeln('          <td id="id_row_' + row + '_col_' + col + '" style="background-color:' + iro["toumei"][0] + ';width:' + cell_w + 'px;height:' + cell_h + 'px;-khtml-user-drag:element;border-style:solid;border-top-width:' + border_width + 'px;border-bottom-width:0px;border-left-width:' + border_width + 'px;border-right-width:0px;border-color:' + bgc + ';" draggable="true" ondragstart="f_dragstart(event)" ondragover="f_dragover(event)" ondrop="f_drop(event)"');
      document.writeln('          </td>');
    }
    document.writeln('        </tr>');
  }
  document.writeln('      </table>');
  document.writeln('    </td>');
  document.writeln('    <td id="id_emblem_2" rowspan="5" ondragover="f_dragover(event)" ondrop="f_drop_emblem(event)" style="width:' + Math.round(cell_w * 8.0 / 3.0) + 'px;">');
  document.writeln('    </td>');
  document.writeln('  </tr>');
/*
  document.writeln('  <tr>');
  document.writeln('    <td id="id_word_mark" ondragover="f_dragover(event)" ondrop="f_drop_emblem(event)" style="text-align:center;padding-top:' + cell_h + 'px;">');
  document.writeln('      <img id="id_word_mark_img" src="./image/word_mark_1_color_path.svg" style="text-align:center;height:' + Math.round(208.0 * cell_w / 64.0) + 'px;" />');
  document.writeln('    </td>');
  document.writeln('  </tr>');
*/
//
  document.writeln('  <tr>');
  document.writeln('    <td id="id_word_mark" title="Word Mark" ondragover="f_dragover(event)" ondrop="f_drop_word_mark(event)" style="text-align:center;padding-top:' + cell_h + 'px;">');
  document.writeln('      <span id="id_word_mark_text_TOKYO" style="padding-left:' + Math.round(208.0 * cell_w / 64.0 / 16.0) + 'px;color:rgb(64,64,64);font-family:\'font1\';font-size:' + Math.round(208.0 * cell_w / 64.0) + 'px;line-height:' + Math.round(208.0 * cell_w / 64.0) + 'px;">TOKYO</span><span id="id_word_mark_text_2020" style="padding-left:' + Math.round(208.0 * cell_w * 3.0 / 64.0 / 16.0) + 'px;color:rgb(64,64,64);font-family:\'font1\';font-size:' + Math.round(208.0 * cell_w / 64.0) + 'px;line-height:' + Math.round(208.0 * cell_w / 64.0) + 'px;">2020</span>');
  document.writeln('    </td>');
  document.writeln('  </tr>');
//
  document.writeln('  <tr>');
  document.writeln('    <td id="id_paralympic_word_mark" title="Paralympic Word Mark" ondragover="f_dragover(event)" ondrop="f_drop_emblem(event)" style="text-align:center;padding-top:' + Math.round(cell_h / 2.0) + 'px;padding-bottom:0px;">');
  document.writeln('      <img id="id_paralympic_word_mark_img" src="./image/paralympic_word_mark_1_1_color_path.svg" style="text-align:center;height:' + cell_h + 'px;" />');
  document.writeln('    </td>');
  document.writeln('  </tr>');
  document.writeln('  <tr>');
  document.writeln('    <td id="id_olympic_symbol" title="Olympic Symbol" ondragover="f_dragover(event)" ondrop="f_drop_emblem(event)" style="text-align:center;padding-bottom:' + Math.round(cell_h / 2.0) + 'px;">');
  document.writeln('      <img id="id_olympic_symbol_img" src="./image/olympic_symbol_color_0.svg" style="text-align:center;height:' + Math.round(554.0 * cell_w / 64.0) + 'px;" />');
  document.writeln('    </td>');
  document.writeln('  </tr>');
  document.writeln('  <tr>');
  document.writeln('    <td id="id_paralympic_symbol" title="Paralympic Symbol" ondragover="f_dragover(event)" ondrop="f_drop_emblem(event)" style="text-align:center;padding-bottom:' + Math.round(cell_h / 2.0) + 'px;">');
  document.writeln('      <img id="id_paralympic_symbol_img" src="./image/paralympic_symbol_color_0.svg" style="text-align:center;height:' + Math.round(572.0 * cell_w / 64.0) + 'px;" />');
  document.writeln('    </td>');
  document.writeln('  </tr>');
  document.writeln('</table>');
} 

function create_header() {

  document.writeln('<div class="header" style="text-align:center;padding-top:10px;padding-bottom:8px;">');
  document.writeln('  <a href="https://tokyo2020.jp/jp/emblem-selection/" target="_blank">TOKYO 2020</a> <span style="font-size:75%">olympic & paralympic top emblem design proposal</span>');
  document.writeln('</div>');
} 

function create_footer() {

  document.writeln('<div class="copyright" style="text-align:center;padding-top:8px;padding-bottom:8px;">');
  document.writeln('  &copy; 2016 <a href="mailto:shighe@shighe.com">Shigheo Hayashida</a>');
  document.writeln('  &nbsp;');
  document.writeln('  [ <a href="#" onclick="help()">Help</a> ]');
  document.writeln('  [ <a href="../">shighe.com</a> ]');
  document.writeln('</div>');
} 

function create_control() {

  document.writeln('<div ondragover="f_dragover(event)" ondrop="f_drop_body(event)" style="text-align:center;padding-top:16px;padding-bottom:16px;">');
  if(cell_size_control) {
    document.writeln('  <select id="id_cell_size">');
    document.writeln('    <option value="8"' + cell_size_8 + '>Cell Size:8px</option>');
    document.writeln('    <option value="16"' + cell_size_16 + '>Cell Size:16px</option>');
    document.writeln('    <option value="24"' + cell_size_24 + '>Cell Size:24px</option>');
    document.writeln('    <option value="32"' + cell_size_32 + '>Cell Size:32px</option>');
    document.writeln('    <option value="40"' + cell_size_40 + '>Cell Size:40px</option>');
    document.writeln('    <option value="48"' + cell_size_48 + '>Cell Size:48px</option>');
    document.writeln('    <option value="56"' + cell_size_56 + '>Cell Size:56px</option>');
    document.writeln('    <option value="64"' + cell_size_64 + '>Cell Size:64px</option>');
    document.writeln('  </select>');
  }
  document.writeln('  <select id="id_grid">');
  document.writeln('    <option value="0" selected>Grid/Shadow:OFF</option>');
  document.writeln('    <option value="1">Grid:ON</option>');
  document.writeln('    <option value="2">Shadow:ON</option>');
  document.writeln('  </select>');
  document.writeln('  <select id="id_lympic">');
  document.writeln('    <option value="0" selected>Olympic</option>');
  document.writeln('    <option value="1">Olympic (Black)</option>');
  document.writeln('    <option value="2">Olympic (White)</option>');
  document.writeln('    <option value="3">Paralympic</option>');
  document.writeln('    <option value="4">Paralympic (Black)</option>');
  document.writeln('    <option value="5">Paralympic (White)</option>');
  document.writeln('  </select>');
  document.writeln('  <button onclick="clear_canvas()">Clear</button>');
  document.writeln('</div>');
} 

function clear_canvas() {

  for(var row = 0; row < 16; row++) {
    for(var col = 0; col < 16; col++) {
      var elm = document.getElementById("id_row_" + row + "_col_" + col);
      elm.style.backgroundColor = iro_0[0][0];
      elm.title = iro_0[0][1];
    }
  }
}

var pattern_olympic = [
 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
 0, 0, 0, 2, 1, 1, 4, 1, 4, 4, 1, 1, 2, 0, 0, 0,
 0, 0, 2, 1, 4, 4, 4, 1, 4, 4, 4, 4, 1, 2, 0, 0,
 0, 2, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 2, 0,
 0, 1, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 1, 0,
 2, 1, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 2,
 1, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1,
 1, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 0,
 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5,
 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0,
 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0,
 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0,
 0, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 0,
 0, 0, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 0, 0,
 0, 0, 0, 6, 5, 5, 4, 4, 4, 4, 5, 5, 5, 0, 0, 0,
 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0
];

var pattern_olympic_black = [
  0,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0,
  0,  0,  0, 20, 20, 20,  0, 20,  0,  0, 20, 20, 20,  0,  0,  0,
  0,  0, 20, 20,  0,  0,  0, 20,  0,  0,  0,  0, 20, 20,  0,  0,
  0, 20, 20,  0,  0,  0,  0, 20,  0,  0,  0,  0,  0, 20, 20,  0,
  0, 20,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0,  0, 20,  0,
 20, 20,  0,  0,  0,  0,  0,  0, 20,  0,  0,  0,  0,  0, 20, 20,
 20,  0,  0,  0,  0,  0,  0,  0, 20,  0,  0,  0,  0,  0,  0, 20,
 20,  0,  0,  0,  0,  0,  0,  0, 20,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,
 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,
 20, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,
  0, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,
  0, 20, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,  0,
  0,  0, 20, 20,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,
  0,  0,  0, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20,  0,  0,  0,
  0,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0
];

var pattern_olympic_white = [
  0,  0,  0,  0,  0, 18, 18, 18, 18, 18, 18,  0,  0,  0,  0,  0,
  0,  0,  0, 18, 18, 18,  0, 18,  0,  0, 18, 18, 18,  0,  0,  0,
  0,  0, 18, 18,  0,  0,  0, 18,  0,  0,  0,  0, 18, 18,  0,  0,
  0, 18, 18,  0,  0,  0,  0, 18,  0,  0,  0,  0,  0, 18, 18,  0,
  0, 18,  0,  0,  0,  0,  0, 18, 18,  0,  0,  0,  0,  0, 18,  0,
 18, 18,  0,  0,  0,  0,  0,  0, 18,  0,  0,  0,  0,  0, 18, 18,
 18,  0,  0,  0,  0,  0,  0,  0, 18,  0,  0,  0,  0,  0,  0, 18,
 18,  0,  0,  0,  0,  0,  0,  0, 18,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18, 18,
 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18,  0,
 18, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18,  0,
  0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18,  0,
  0, 18, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18, 18,  0,
  0,  0, 18, 18,  0,  0,  0,  0,  0,  0,  0,  0, 18, 18,  0,  0,
  0,  0,  0, 18, 18, 18,  0,  0,  0,  0, 18, 18, 18,  0,  0,  0,
  0,  0,  0,  0,  0, 18, 18, 18, 18, 18, 18,  0,  0,  0,  0,  0
];

var pattern_paralympic = [
 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
 0, 0, 0, 2, 1, 1, 4, 1, 1, 4, 1, 1, 2, 0, 0, 0,
 0, 0, 2, 1, 4, 4, 4, 1, 1, 4, 4, 4, 1, 2, 0, 0,
 0, 2, 1, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 1, 2, 0,
 0, 1, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 1, 0,
 2, 1, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 1, 2,
 1, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4, 1,
 1, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 0,
 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5,
 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0,
 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0,
 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0,
 0, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 0,
 0, 0, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 0, 0,
 0, 0, 0, 6, 5, 5, 4, 4, 4, 4, 5, 5, 5, 0, 0, 0,
 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0
];

var pattern_paralympic_black = [
  0,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0,
  0,  0,  0, 20, 20, 20,  0, 20, 20,  0, 20, 20, 20,  0,  0,  0,
  0,  0, 20, 20,  0,  0,  0, 20, 20,  0,  0,  0, 20, 20,  0,  0,
  0, 20, 20,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0, 20, 20,  0,
  0, 20,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0,  0, 20,  0,
 20, 20,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0,  0, 20, 20,
 20,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0,  0,  0, 20,
 20,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,
 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,
 20, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,
  0, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20,  0,
  0, 20, 20,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,  0,
  0,  0, 20, 20,  0,  0,  0,  0,  0,  0,  0,  0, 20, 20,  0,  0,
  0,  0,  0, 20, 20, 20,  0,  0,  0,  0, 20, 20, 20,  0,  0,  0,
  0,  0,  0,  0,  0, 20, 20, 20, 20, 20, 20,  0,  0,  0,  0,  0
];

var pattern_paralympic_white = [
  0,  0,  0,  0,  0, 18, 18, 18, 18, 18, 18,  0,  0,  0,  0,  0,
  0,  0,  0, 18, 18, 18,  0, 18, 18,  0, 18, 18, 18,  0,  0,  0,
  0,  0, 18, 18,  0,  0,  0, 18, 18,  0,  0,  0, 18, 18,  0,  0,
  0, 18, 18,  0,  0,  0,  0, 18, 18,  0,  0,  0,  0, 18, 18,  0,
  0, 18,  0,  0,  0,  0,  0, 18, 18,  0,  0,  0,  0,  0, 18,  0,
 18, 18,  0,  0,  0,  0,  0, 18, 18,  0,  0,  0,  0,  0, 18, 18,
 18,  0,  0,  0,  0,  0,  0, 18, 18,  0,  0,  0,  0,  0,  0, 18,
 18,  0,  0,  0,  0,  0,  0, 18, 18,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18, 18,
 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18,  0,
 18, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18,  0,
  0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18,  0,
  0, 18, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 18, 18,  0,
  0,  0, 18, 18,  0,  0,  0,  0,  0,  0,  0,  0, 18, 18,  0,  0,
  0,  0,  0, 18, 18, 18,  0,  0,  0,  0, 18, 18, 18,  0,  0,  0,
  0,  0,  0,  0,  0, 18, 18, 18, 18, 18, 18,  0,  0,  0,  0,  0
];


function set_canvas_olympic() {

  document.getElementById("id_emblem").style.backgroundColor = iro["masshiro"][0];
  set_canvas(pattern_olympic);
  document.getElementById("id_word_mark_text_TOKYO").style.color = iro["nouhai"][0];
  document.getElementById("id_word_mark_text_2020").style.color = iro["nouhai"][0];
  document.getElementById("id_olympic_symbol").style.display = "block";
  document.getElementById("id_olympic_symbol_img").src = "./image/olympic_symbol_color_0.svg";
  document.getElementById("id_paralympic_word_mark").style.display = "none";
  document.getElementById("id_paralympic_symbol").style.display = "none";
}

function set_canvas_olympic_black() {

  document.getElementById("id_emblem").style.backgroundColor = iro["masshiro"][0];
  set_canvas(pattern_olympic_black);
  document.getElementById("id_word_mark_text_TOKYO").style.color = iro["makkuro"][0];
  document.getElementById("id_word_mark_text_2020").style.color = iro["makkuro"][0];
  document.getElementById("id_olympic_symbol").style.display = "block";
  document.getElementById("id_olympic_symbol_img").src = "./image/olympic_symbol_black_0.svg";
  document.getElementById("id_paralympic_word_mark").style.display = "none";
  document.getElementById("id_paralympic_symbol").style.display = "none";
}

function set_canvas_olympic_white() {

  document.getElementById("id_emblem").style.backgroundColor = iro["makkuro"][0];
  set_canvas(pattern_olympic_white);
  document.getElementById("id_word_mark_text_TOKYO").style.color = iro["masshiro"][0];
  document.getElementById("id_word_mark_text_2020").style.color = iro["masshiro"][0];
  document.getElementById("id_olympic_symbol").style.display = "block";
  document.getElementById("id_olympic_symbol_img").src = "./image/olympic_symbol_white_0.svg";
  document.getElementById("id_paralympic_word_mark").style.display = "none";
  document.getElementById("id_paralympic_symbol").style.display = "none";
}

function set_canvas_paralympic() {

  document.getElementById("id_emblem").style.backgroundColor = iro["masshiro"][0];
  set_canvas(pattern_paralympic);
  document.getElementById("id_word_mark_text_TOKYO").style.color = iro["nouhai"][0];
  document.getElementById("id_word_mark_text_2020").style.color = iro["nouhai"][0];
  document.getElementById("id_olympic_symbol").style.display = "none";
  document.getElementById("id_paralympic_word_mark").style.display = "block";
  document.getElementById("id_paralympic_word_mark_img").src = "./image/paralympic_word_mark_1_1_color_path.svg";
  document.getElementById("id_paralympic_symbol").style.display = "block";
  document.getElementById("id_paralympic_symbol_img").src = "./image/paralympic_symbol_color_0.svg";
}

function set_canvas_paralympic_black() {

  document.getElementById("id_emblem").style.backgroundColor = iro["masshiro"][0];
  set_canvas(pattern_paralympic_black);
  document.getElementById("id_word_mark_text_TOKYO").style.color = iro["makkuro"][0];
  document.getElementById("id_word_mark_text_2020").style.color = iro["makkuro"][0];
  document.getElementById("id_olympic_symbol").style.display = "none";
  document.getElementById("id_paralympic_word_mark").style.display = "block";
  document.getElementById("id_paralympic_word_mark_img").src = "./image/paralympic_word_mark_1_1_black_path.svg";
  document.getElementById("id_paralympic_symbol").style.display = "block";
  document.getElementById("id_paralympic_symbol_img").src = "./image/paralympic_symbol_black_0.svg";
}

function set_canvas_paralympic_white() {

  document.getElementById("id_emblem").style.backgroundColor = iro["makkuro"][0];
  set_canvas(pattern_paralympic_white);
  document.getElementById("id_word_mark_text_TOKYO").style.color = iro["masshiro"][0];
  document.getElementById("id_word_mark_text_2020").style.color = iro["masshiro"][0];
  document.getElementById("id_olympic_symbol").style.display = "none";
  document.getElementById("id_paralympic_word_mark").style.display = "block";
  document.getElementById("id_paralympic_word_mark_img").src = "./image/paralympic_word_mark_1_1_white_path.svg";
  document.getElementById("id_paralympic_symbol").style.display = "block";
  document.getElementById("id_paralympic_symbol_img").src = "./image/paralympic_symbol_white_0.svg";
}

function set_canvas(pattern) {

  for(var row = 0; row < 16; row++) {
    for(var col = 0; col < 16; col++) {
      var elm = document.getElementById("id_row_" + row + "_col_" + col);
      elm.style.backgroundColor = iro_0[pattern[row * 16 + col]][0];
      elm.title = iro_0[pattern[row * 16 + col]][1];
    }
  }
}

onload = function() {

  document.body.style.backgroundColor = bgc;

  document.getElementById("id_grid").addEventListener("change", function() {

    border_width = document.getElementById('id_grid').options[document.getElementById('id_grid').selectedIndex].value;
    if(border_width != 2) {
      document.getElementById('id_canvas').style.borderColor = document.body.style.backgroundColor;
      document.getElementById('id_canvas').style.borderRightWidth = border_width + "px";
      document.getElementById('id_canvas').style.borderBottomWidth = border_width + "px";
      var cell_w_ = cell_w - border_width;
      var cell_h_ = cell_h - border_width;
      for(var row = 0; row < 16; row++) {
        for(var col = 0; col < 16; col++) {
          document.getElementById('id_row_' + row + '_col_' + col).style.boxShadow = "0px 0px 0px 0px " + document.body.style.backgroundColor;
          document.getElementById('id_row_' + row + '_col_' + col).style.borderColor = document.body.style.backgroundColor;
          document.getElementById('id_row_' + row + '_col_' + col).style.borderTopWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderLeftWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderBottomWidth = "0px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderRightWidth = "0px";
          document.getElementById('id_row_' + row + '_col_' + col).style.width = cell_w_ + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.height = cell_h_ + "px";
        }
      }
    } else {
/*
      border_width = 1;
      var cell_w_ = cell_w - border_width * 2;
      var cell_h_ = cell_h - border_width * 2;
      document.getElementById('id_canvas').style.borderRightWidth = "0px";
      document.getElementById('id_canvas').style.borderBottomWidth = "0px";
      var sbc = "rgb(224,224,224)";// Shadow Bright Color
      var sdc = "rgb(64,64,64)";// Shadow Dark Color
      for(var row = 0; row < 16; row++) {
        for(var col = 0; col < 16; col++) {
          document.getElementById('id_row_' + row + '_col_' + col).style.borderTopColor = sbc;
          document.getElementById('id_row_' + row + '_col_' + col).style.borderTopWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderLeftColor = sbc;
          document.getElementById('id_row_' + row + '_col_' + col).style.borderLeftWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderBottomColor = sdc;
          document.getElementById('id_row_' + row + '_col_' + col).style.borderBottomWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderRightColor = sdc;
          document.getElementById('id_row_' + row + '_col_' + col).style.borderRightWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.width = cell_w_ + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.height = cell_h_ + "px";
        }
      }
*/
//
      border_width = 0;
      document.getElementById('id_canvas').style.borderRightWidth = "0px";
      document.getElementById('id_canvas').style.borderBottomWidth = "0px";
      for(var row = 0; row < 16; row++) {
        for(var col = 0; col < 16; col++) {
          document.getElementById('id_row_' + row + '_col_' + col).style.boxShadow = bsp[0] + "px " + bsp[1] + "px " + bsp[2] + "px " + bsp[3] + "px " + document.body.style.backgroundColor + " inset";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderTopWidth = "0px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderLeftWidth = "0px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderBottomWidth = "0px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderRightWidth = "0px";
          document.getElementById('id_row_' + row + '_col_' + col).style.width = cell_w + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.height = cell_h + "px";
        }
      }
//
    }

  }, false);

  document.getElementById("id_lympic").addEventListener("change", function() {

    var si = document.getElementById('id_lympic').selectedIndex;
    if(si == 0) {
      set_canvas_olympic();
    }
    else if(si == 1) {
      set_canvas_olympic_black();
    }
    else if(si == 2) {
      set_canvas_olympic_white();
    }
    else if(si == 3) {
      set_canvas_paralympic();
    }
    else if(si == 4) {
      set_canvas_paralympic_black();
    }
    else if(si == 5) {
      set_canvas_paralympic_white();
    }

  }, false);

  if(cell_size_control) {
    document.getElementById("id_cell_size").addEventListener("change", function() {

      cell_w = document.getElementById('id_cell_size').options[document.getElementById('id_cell_size').selectedIndex].value;
      cell_h = cell_w;
      for(var col = 0; col < iro_0.length; col++) {
        document.getElementById('id_iro_0_' + col).style.width = cell_w + "px";
        document.getElementById('id_iro_0_' + col).style.height = cell_h + "px";
        document.getElementById('id_iro_0_' + col).style.backgroundSize = (cell_w / 2) + "px " + (cell_h / 2) + "px";
      }
      document.getElementById('id_emblem_0').style.height = (cell_h * 2) + "px";
      document.getElementById('id_emblem_1').style.width = Math.round(cell_w * 8.0 / 3.0) + "px";
      document.getElementById('id_emblem_2').style.width = Math.round(cell_w * 8.0 / 3.0) + "px";
      var cell_w_ = cell_w - border_width;
      var cell_h_ = cell_h - border_width;
      for(var row = 0; row < 16; row++) {
        for(var col = 0; col < 16; col++) {
          document.getElementById('id_row_' + row + '_col_' + col).style.borderTopWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.borderLeftWidth = border_width + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.width = cell_w_ + "px";
          document.getElementById('id_row_' + row + '_col_' + col).style.height = cell_h_ + "px";
        }
      }
      document.getElementById('id_word_mark').style.paddingTop = cell_h + "px";
/*
      document.getElementById('id_word_mark_img').style.height = Math.round(208.0 * cell_w / 64.0) + "px";

*/
//
      document.getElementById('id_word_mark_text_TOKYO').style.paddingLeft = Math.round(208.0 * cell_w / 64.0 / 16.0) + "px";
      document.getElementById('id_word_mark_text_TOKYO').style.fontSize = Math.round(208.0 * cell_w / 64.0) + "px";
      document.getElementById('id_word_mark_text_TOKYO').style.lineHeight = Math.round(208.0 * cell_w / 64.0) + "px";
      document.getElementById('id_word_mark_text_2020').style.paddingLeft = Math.round(208.0 * cell_w * 3.0 / 64.0 / 16.0) + "px";
      document.getElementById('id_word_mark_text_2020').style.fontSize = Math.round(208.0 * cell_w / 64.0) + "px";
      document.getElementById('id_word_mark_text_2020').style.lineHeight = Math.round(208.0 * cell_w / 64.0) + "px";
//
      document.getElementById('id_paralympic_word_mark').style.paddingTop = Math.round(cell_h / 2.0) + "px";
      document.getElementById('id_paralympic_word_mark_img').style.height = cell_h + "px";
      document.getElementById('id_olympic_symbol').style.paddingBottom = Math.round(cell_h / 2.0) + "px";
      document.getElementById('id_olympic_symbol_img').style.height = Math.round(554.0 * cell_w / 64.0) + "px";
      document.getElementById('id_paralympic_symbol').style.paddingBottom = Math.round(cell_h / 2.0) + "px";
      document.getElementById('id_paralympic_symbol_img').style.height = Math.round(572.0 * cell_w / 64.0) + "px";

    }, false);
  }

  set_canvas_olympic();

};

function help() {

  //キーボード操作などにより、オーバーレイが多重起動するのを防止する
  $(this).blur() ;  //ボタンからフォーカスを外す
  if($("#modal-overlay" )[0]) return false;//新しくモーダルウィンドウを起動しない (防止策1)
  //if($("#modal-overlay")[0]) $("#modal-overlay").remove();    //現在のモーダルウィンドウを削除して新しく起動する (防止策2)

  //オーバーレイを出現させる
  $("body").append('<div id="modal-overlay"></div>');
  $("#modal-overlay").fadeIn("slow") ;

  //コンテンツをセンタリングする
  centeringModalSyncer();

  //コンテンツをフェードインする
  $("#modal-content").fadeIn("slow");

  //[#modal-overlay]、または[#modal-close]をクリックしたら…
  $("#modal-overlay, #modal-close").unbind().click(function() {

    //[#modal-content]と[#modal-overlay]をフェードアウトした後に…
    $("#modal-content, #modal-overlay").fadeOut("slow", function() {

      //[#modal-overlay]を削除する
      $('#modal-overlay').remove();

    });

  });
}

//リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
//$(window).resize(centeringModalSyncer) ;

  //センタリングを実行する関数
  function centeringModalSyncer() {

    //画面(ウィンドウ)の幅、高さを取得
    //var w = $(window).width();
    //var h = $(window).height();
    var w = window.innerWidth - minusWidth;
    var h = window.innerHeight - minusHeight;

    //コンテンツ(#modal-content)の幅、高さを取得
    var cw = $("#modal-content").outerWidth({margin:true});
    var ch = $("#modal-content").outerHeight({margin:true});

    //センタリングを実行する
    //$("#modal-content").css({"left": ((w - cw) / 2) + "px", "top": ((h - ch) / 2) + "px"});
    //$("#modal-content").css({"left": (w * 0.025) + "px", "top": (w * 0.025) + "px"});
    $("#modal-content").css({"width": (w * 0.5) + "px", "left": (w * 0.25) + "px", "top": (w * 0.025) + "px"});
  }

//} ) ;
