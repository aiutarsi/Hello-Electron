/* イベントリスナー メインプロセスからレンダラーのDOMはアクセス不可, なのでレンダラープロセスの前に実行されるpreload.jsを使用 */
window.addEventListener('DOMContentLoaded', () => {
  /* index.htmlのバージョンを埋める */
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})