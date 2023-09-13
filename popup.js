document.getElementById('copyButton').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0];
    console.log('Copy button clicked!');
    chrome.scripting.executeScript({
      // このファイルと同じディレクトリにあるcontent.jsを読み込む
      files: ['content.js'],
      target: { tabId: activeTab.id },
    }, function(selection) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      if (selection && selection[0]) {
        let data = selection[0];

        // タブ区切りの形式に変換する処理をここで行っても良いが、content.jsで既に行っているのでそのまま使用
        let formattedData = data;
        console.log(formattedData);
        console.log(formattedData.result);

        // クリップボードにコピー
        navigator.clipboard.writeText(formattedData.result).then(function() {
          console.log('Data copied to clipboard successfully!');
        }).catch(function(err) {
          console.error('Could not copy data to clipboard:', err);
        });
      }
    });
  });
});
