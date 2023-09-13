const copyButton = document.createElement('button');
copyButton.innerText = "数値をコピーする";
copyButton.style.position = 'fixed';
copyButton.style.top = '10px';
copyButton.style.right = '10px';
copyButton.style.zIndex = '9999';
copyButton.addEventListener('click', function() {
  const data = getAnalyticsData();
  navigator.clipboard.writeText(data)
    .then(() => {
      console.log('Data copied to clipboard successfully!');
      alert('数値をコピーしました');
    })
    .catch(err => {
      console.error('Could not copy data to clipboard:', err);
    });
});

/**
 * ボタンを表示するかどうかを判定して表示する
 */
function checkAndDisplayButton() {
  if (window.location.href.includes("https://twitter.com/i/account_analytics")) {
    if (!document.body.contains(copyButton)) {
      document.body.appendChild(copyButton);
    }
  } else {
    if (document.body.contains(copyButton)) {
      document.body.removeChild(copyButton);
    }
  }
}

// URLの変更を検出するためのMutationObserver
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      checkAndDisplayButton();
    }
  });
});

// ページのbodyタグの子要素が変更された場合に監視を開始
observer.observe(document.body, { childList: true, subtree: true });

// 初回のチェック
checkAndDisplayButton();


/**
 * XPathで
 * 定した要素のテキストを取得する
 * @param {string} xpath XPath
 * @param {HTMLElement} context XPathの検索範囲
 * @returns {string} テキスト
 */
function getXPathResult(xpath, context = document) {
  const node = document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (node) {
    return node.textContent;
  } else {
    console.log(`No element found for XPath: ${xpath}`);
    return "";  // or some default value
  }
}

/**
 * アナリティクスの数値を取得する
 * @returns {string} タブ区切りの数値
 */
function getAnalyticsData() {
  let impressions = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[1]/div[2]/div[1]/span/div/span');
  let profileVisits = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[3]/div[2]/div[1]/span/div/span');
    let newFollowers = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[5]/div[2]/div[1]/span/div/span');
    let likes = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[7]/div[2]/div[1]/span/div/span');
    let engagementRate = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[2]/div[2]/div[1]/span/div/span');
    let linkClicks = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[4]/div[2]/div[1]/span/div/span');
    let replies = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[6]/div[2]/div[1]/span/div/span');
    let reposts = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[8]/div[2]/div[1]/span/div/span');
    let mediaViews = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[10]/div[2]/div[1]/span/div/span');
    let videoViews = getXPathResult('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/section/div[2]/div[1]/div[9]/div[2]/div/span/div/span');

    let tabDelimitedData = `${impressions}\t${profileVisits}\t${newFollowers}\t${likes}\t${engagementRate}\t${linkClicks}\t${replies}\t${reposts}\t${mediaViews}\t${videoViews}`;

    return tabDelimitedData;
}
