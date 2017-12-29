// ==UserScript==
// @name        Wikipedia kana romanizer
// @namespace   https://github.com/dahlia/wikipedia-kana-romanizer
// @description Romanize hiragana/katakana in Wikipedia
// @match       https://*.wikipedia.org/*
// @version     3
// @grant       none
// ==/UserScript==

(function () {
  // The following map data are copied from <https://github.com/markni/romaji.js>
  // which is distributed under MIT license.
  const MAP = {
    // 平仮名
    // Digraphs
    'きゃ': 'kya',
    'しゃ': 'sha',
    'ちゃ': 'cha',
    'にゃ': 'nya',
    'ひゃ': 'hya',
    'みゃ': 'mya',
    'りゃ': 'rya',
    'ぎゃ': 'gya',
    'ふゅ': 'fyu',

    'びゃ': 'bya',
    'ぴゃ': 'pya',

    'きゅ': 'kyu',
    'しゅ': 'shu',
    'ちゅ': 'chu',
    'にゅ': 'nyu',
    'ひゅ': 'hyu',
    'みゅ': 'myu',
    'りゅ': 'ryu',
    'ぎゅ': 'gyu',

    'びゅ': 'byu',
    'ぴゅ': 'pyu',

    'きょ': 'kyo',
    'しょ': 'sho',
    'ちょ': 'cho',
    'にょ': 'nyo',
    'ひょ': 'hyo',
    'みょ': 'myo',
    'りょ': 'ryo',
    'ぎょ': 'gyo',

    'びょ': 'byo',
    'ぴょ': 'pyo',


    'つぁ': 'tsa',
    'つぃ': 'tsi',
    'つぇ': 'tse',
    'つぉ': 'tso',

    'ちぇ': 'che',
    'しぇ': 'she',


    'じゃ': 'ja',
    'じゅ': 'ju',
    'じょ': 'jo',

    'ふぁ': 'fa',
    'ふぃ': 'fi',
    'ふぇ': 'fe',
    'ふぉ': 'fo',


    'うぃ': 'wi',


    // Obsoleted kana
    'ゑ': 'we',

    'うぇ': 'we',

    'うぉ': 'wo',

    'ゔぁ': 'va',
    'ゔぃ': 'vi',
    'ゔぇ': 've',
    'ゔぉ': 'vo',

    'じぇ': 'je',
    'てぃ': 'ti',
    'でぃ': 'di',
    'でゅ': 'du',
    'とぅ': 'tu',

    // Monographs
    'し': 'shi',
    'ち': 'chi',
    'つ': 'tsu',


    'か': 'ka',
    'さ': 'sa',
    'た': 'ta',
    'な': 'na',
    'は': 'ha',
    'ま': 'ma',
    'ら': 'ra',

    'き': 'ki',

    'に': 'ni',
    'ひ': 'hi',
    'み': 'mi',
    'り': 'ri',

    'く': 'ku',

    'す': 'su',

    'ぬ': 'nu',
    'ふ': 'fu',
    'む': 'mu',
    'る': 'ru',

    'け': 'ke',
    'せ': 'se',
    'て': 'te',
    'ね': 'ne',
    'へ': 'he',
    'め': 'me',
    'れ': 're',

    'こ': 'ko',
    'そ': 'so',
    'と': 'to',
    'の': 'no',
    'ほ': 'ho',
    'も': 'mo',
    'ろ': 'ro',

    'わ': 'wa',
    'を': 'wo',


    'が': 'ga',
    'ざ': 'za',
    'だ': 'da',
    'ば': 'ba',
    'ぱ': 'pa',

    'ぎ': 'gi',

    'ぢ': 'ji',
    // じ is more common to use, so it goes secondly
    // when we build toHiraganaMap, this will get overwriiten by second one

    'じ': 'ji',


    'び': 'bi',
    'ぴ': 'pi',

    'ぐ': 'gu',
    'ず': 'zu',
    'づ': 'zu',
    'ぶ': 'bu',
    'ぷ': 'pu',

    'げ': 'ge',
    'ぜ': 'ze',
    'で': 'de',
    'べ': 'be',
    'ぺ': 'pe',

    'ご': 'go',
    'ぞ': 'zo',
    'ど': 'do',
    'ぼ': 'bo',
    'ぽ': 'po',

    'や': 'ya',
    'ゆ': 'yu',
    'よ': 'yo',


    'あ': 'a',
    'い': 'i',
    'う': 'u',
    'え': 'e',
    'お': 'o',
    'ん': 'n',

    // 片仮名
    'キャ': 'kya',
    'シャ': 'sha',
    'チャ': 'cha',
    'ニャ': 'nya',
    'ヒャ': 'hya',
    'ミャ': 'mya',
    'リャ': 'rya',
    'ギャ': 'gya',

    'ビャ': 'bya',
    'ピャ': 'pya',

    'キュ': 'kyu',
    'シュ': 'shu',
    'チュ': 'chu',
    'ニュ': 'nyu',
    'ヒュ': 'hyu',
    'ミュ': 'myu',
    'リュ': 'ryu',
    'ギュ': 'gyu',

    'ビュ': 'byu',
    'ピュ': 'pyu',

    'キョ': 'kyo',
    'ショ': 'sho',
    'チョ': 'cho',
    'ニョ': 'nyo',
    'ヒョ': 'hyo',
    'ミョ': 'myo',
    'リョ': 'ryo',
    'ギョ': 'gyo',

    'ビョ': 'byo',
    'ピョ': 'pyo',

    'フュ': 'fyu',

    'ツァ': 'tsa',
    'ツィ': 'tsi',
    'ツェ': 'tse',
    'ツォ': 'tso',

    'チェ': 'che',
    'シェ': 'she',

    'シ': 'shi',
    'チ': 'chi',
    'ツ': 'tsu',

    'ジョ': 'jo',
    'ジャ': 'ja',
    'ジュ': 'ju',

    'ファ': 'fa',
    'フィ': 'fi',
    'フェ': 'fe',
    'フォ': 'fo',


    'ウィ': 'wi',
    'ウェ': 'we',
    'ウォ': 'wo',


    'ヴァ': 'va',
    'ヴィ': 'vi',
    'ヴェ': 've',
    'ヴォ': 'vo',


    'ジェ': 'je',
    'ティ': 'ti',
    'ディ': 'di',
    'デュ': 'du',
    'トゥ': 'tu',

    // basic
    'カ': 'ka',
    'サ': 'sa',
    'タ': 'ta',
    'ナ': 'na',
    'ハ': 'ha',
    'マ': 'ma',
    'ラ': 'ra',


    'キ': 'ki',

    'ニ': 'ni',
    'ヒ': 'hi',
    'ミ': 'mi',
    'リ': 'ri',


    'ク': 'ku',
    'ス': 'su',

    'ヌ': 'nu',
    'フ': 'fu',
    'ム': 'mu',
    'ル': 'ru',


    'ケ': 'ke',
    'セ': 'se',
    'テ': 'te',
    'ネ': 'ne',
    'ヘ': 'he',
    'メ': 'me',
    'レ': 're',


    'コ': 'ko',
    'ソ': 'so',
    'ト': 'to',
    'ノ': 'no',
    'ホ': 'ho',
    'モ': 'mo',
    'ロ': 'ro',

    'ワ': 'wa',
    'ヲ': 'wo',


    'ガ': 'ga',
    'ザ': 'za',
    'ダ': 'da',
    'バ': 'ba',
    'パ': 'pa',

    'ギ': 'gi',
    'ジ': 'ji',
    'ヂ': 'ji',
    'ビ': 'bi',
    'ピ': 'pi',

    'グ': 'gu',
    'ズ': 'zu',
    'ヅ': 'zu',
    'ブ': 'bu',
    'プ': 'pu',

    'ゲ': 'ge',
    'ぜ': 'ze',
    'デ': 'de',
    'ベ': 'be',
    'ペ': 'pe',

    'ゴ': 'go',
    'ゾ': 'zo',
    'ド': 'do',
    'ボ': 'bo',
    'ポ': 'po',

    'ャ': 'ya', 'ヤ': 'ya',
    'ュ': 'yu', 'ユ': 'yu',
    'ョ': 'yo', 'ヨ': 'yo',


    'ン': 'n',
    'ア': 'a',
    'イ': 'i',
    'ウ': 'u',
    'エ': 'e',
    'オ': 'o',

    // obsoleted kana
    'ヱ': 'we',
    'ヹ': 've'
  };
  const LONG_VOWELS_MAP = { // 長音
    'a': 'ā',
    'e': 'ē',
    'i': 'ī',
    'o': 'ō',
    'u': 'ū'
  };
  const containsKana = function (text) {
    return !!text.match(/[\u3041-\u3096\u30a1-\u30f4]/);
  };
  const romanize = function (kana) {
    var pairs = [];
    for (let i = 0; i < kana.length; ++i) {
      let key, value;
      if (i + 1 < kana.length) {
        key = kana.substr(i, 2);
        value = MAP[key];
        if (value) {
          pairs.push([key, value]);
          ++i;
          continue;
        }
      }
      key = kana[i];
      value = MAP[key];
      if (value && i + 1 < kana.length &&
          LONG_VOWELS_MAP[value.substr(-1)] &&
          kana[i + 1] == 'ー') {
        // 長音
        key += 'ー';
        value = value.substr(0, value.length - 1) + LONG_VOWELS_MAP[value.substr(-1)];
        ++i;
      }
      pairs.push([key, value]);
    }
    return pairs;
  };
  const TAGS = [
    'A', 'ADDRESS', 'ARTICLE', 'ASIDE', 'B',  'BIG', 'BLINK',
    'BLOCKQUOTE', 'BODY', 'BUTTON', 'CAPTION', 'CENTER', 'CITE',
    'COL', 'COLGROUP', 'CONTENT', 'DATA', 'DD', 'DEL', 'DETAILS',
    'DFN', 'DIALOG', 'DIR', 'DIV', 'DL', 'DT', 'EM', 'FIELDSET',
    'FIGCAPTION', 'FIGURE', 'FONT', 'FOOTER', 'FORM', 'H1', 'H2',
    'H3', 'H4', 'H5', 'H6', 'HEADER', 'HGROUP', 'I', 'INS',
    'LABEL', 'LEGEND', 'LI', 'MAIN', 'MARK', 'MARQUEE', 'NAV',
    'OL', 'OUTPUT', 'P', 'PLAINTEXT', 'PRE', 'Q', 'S', 'SAMPLE',
    'SECTION', 'SHADOW', 'SMALL', 'SPAN', 'STRIKE', 'STRONG',
    'SUB', 'SUMMARY', 'SUP', 'TABLE', 'TBODY', 'TD', 'TFOOT',
    'TH', 'THEAD', 'TIME', 'TR', 'TT', 'U', 'UL', 'XMP',
  ];
  const transformNode = function (node) {
    if (node.nodeType == 3) {
    }
    if (node.nodeType == 3 && containsKana(node.nodeValue)) { // textNode
      let rubyNodes = document.createElement('span'),
          rubyPairs = romanize(node.nodeValue),
          parentNode = node.parentNode;
      rubyNodes.innerHTML = rubyPairs.map(function (pair) {
        if (pair[1]) {
          return ('<ruby class="w-k-r"><rb>' + pair[0] +
                  '</rb><rt>' + pair[1] + '</rt></ruby>');
        }
        return pair[0].replace(/&/g, '&amp;').replace(/</g, '&lt;');
      }).join('').replace('</ruby><ruby class="w-k-r">', '');
      while (rubyNodes.childNodes.length > 0) {
        parentNode.insertBefore(rubyNodes.firstChild, node);
      }
      parentNode.removeChild(node);
      return;
    }
    if (TAGS.indexOf(node.nodeName) >= 0) {
      for (let i = 0; i < node.childNodes.length; ++i) {
        transformNode(node.childNodes[i]);
      }
    }
  };
  var initialized = false;
  const initialize = function () {
    if (initialized || document.readyState == 'loading') {
      return;
    }
    initialized = true;
    document.body.innerHTML += (
      '<style>' +
      '.w-k-r > rt { display: none; text-transform: uppercase; opacity: 0.5; }' +
      '.w-k-r:hover > rt { opacity: 1; }' +
      '*:hover > .w-k-r > rt { display: ruby-text; }' +
      '</style>'
    );
    transformNode(document.body);
  };
  document.addEventListener('DOMContentLoaded', initialize);
  document.addEventListener('readystatechange', initialize);
  initialize();
})();
