# GitHub Pagesでの公開手順

GitHubアカウントをお持ちとのことですので、GitHub Pagesを使えば無料で簡単にアプリを公開できます。

## 手順 1: GitHubでリポジトリを作成する

1. ブラウザで [GitHub](https://github.com) にログインします。
2. 右上の「+」アイコンをクリックし、「**New repository**」を選択します。
3. **Repository name** に好きな名前（例: `lucky-draw-app`）を入力します。
4. **Public**（公開）が選択されていることを確認します。
5. 「**Create repository**」ボタンをクリックします。

## 手順 2: PCからファイルをアップロードする

このPC上で、以下のコマンドを実行してファイルをGitHubに送ります。
（私がすでにローカルでの準備（コミット）までは完了させておきます）

1. GitHubの画面に表示されている「**…or push an existing repository from the command line**」という欄を探します。
2. そこにある以下のコマンドをコピーします（URL部分はあなたのものに変わります）。
   ```bash
   git remote add origin https://github.com/あなたのユーザー名/lucky-draw-app.git
   git branch -M main
   git push -u origin main
   ```
3. このPCのターミナル（PowerShellなど）で、`c:\Users\yuyai\YouTube動画\lucky_draw_app` に移動し、コピーしたコマンドを貼り付けて実行します。

## 手順 3: GitHub Pagesを有効にする

1. GitHubのリポジトリページに戻ります。
2. 上部のタブから「**Settings**」をクリックします。
3. 左側のメニューから「**Pages**」をクリックします。
4. **Build and deployment** > **Source** が「Deploy from a branch」になっていることを確認します。
5. **Branch** のところを「**main**」にし、フォルダは「**/(root)**」のまま「**Save**」をクリックします。

## 完了！

数分待つと、ページの上部に「**Your site is live at...**」とURLが表示されます。
そのURLにアクセスすれば、誰でもアプリを使えるようになります！
