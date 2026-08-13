# DUALMO LP

DUALMO（デュアルモ）の公式ランディングページです。

## ローカル確認

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## Cloudflare Workersへの自動公開

Cloudflare Workers BuildsでこのGitHubリポジトリを接続します。

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npm run deploy:cloudflare`
- Root directory: `/`

`main`ブランチが更新されると、自動的にビルド・公開されます。独自ドメインを使用しない場合は、Cloudflare標準の`workers.dev` URLで公開されます。

Cloudflare上の既存Worker名が`dualmo`と異なる場合は、`wrangler.jsonc`の`name`を既存Worker名へ合わせてください。
