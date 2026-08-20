import { ArrowRight } from "lucide-react";

const steps = [
  { no: 1, short: "ご利用内容", title: "ご利用内容" },
  { no: 2, short: "ご契約者情報", title: "ご契約者さま情報" },
  { no: 3, short: "住所・連絡先", title: "ご住所・ご連絡先" },
  { no: 4, short: "ご確認", title: "ご確認" },
] as const;

const prefectures = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

export default function ApplicationForm() {
  return (
    <section className="application-form section" id="application-form" aria-labelledby="application-title">
      <div className="section-intro centered">
        <span className="section-kicker">お申し込みはこちらから</span>
        <h2 id="application-title"><span className="line">DUALMO</span><span className="line accent">お申し込みフォーム</span></h2>
        <p>簡単3分で申し込み完了。現在の電話番号・携帯キャリアはそのままで利用いただけます。</p>
      </div>

      <div className="application-shell">
        <div className="application-summary" aria-label="お申し込みプラン">
          <span>お申し込みプラン</span>
          <strong>DUALMO</strong>
          <p>日中データ無制限 <b>月額2,490円（税込）</b></p>
          <small>初期費用 1,000円（税込）／ドコモ回線</small>
        </div>

        <input className="step-toggle" type="radio" name="application-step" id="application-step-1" defaultChecked />
        <input className="step-toggle" type="radio" name="application-step" id="application-step-2" />
        <input className="step-toggle" type="radio" name="application-step" id="application-step-3" />
        <input className="step-toggle" type="radio" name="application-step" id="application-step-4" />

        <nav className="form-progress" aria-label="入力の進捗状況">
          {steps.map(({ no, short }) => (
            <label
              key={no}
              htmlFor={`application-step-${no}`}
              aria-label={`STEP ${no} ${short}を表示`}
            >
              <span>STEP {no}</span><b>{short}</b>
            </label>
          ))}
        </nav>

        <form className="application-fields step-form">
          <fieldset id="form-step-1">
            <p className="step-form-guide"><span>STEP 1 / 4</span><b>ご利用内容を入力してください</b></p>
            <legend><span>01</span>ご利用内容</legend>
            <div className="form-grid two-columns">
              <label className="full-width">現在の携帯キャリア<span>必須</span>
                <select name="carrier" required defaultValue="">
                  <option value="" disabled>選択してください</option>
                  <option>docomo</option><option>au</option><option>SoftBank</option>
                  <option>楽天モバイル</option><option>格安SIM・その他</option>
                </select>
              </label>
              <label className="full-width">ご利用予定のスマートフォン<span>必須</span>
                <input name="device" type="text" placeholder="例：iPhone 16 / Google Pixel 9" required />
              </label>
            </div>
            <label className="form-next" htmlFor="application-step-2"><span><small>入力内容を確認して</small>STEP 2へ進む</span><ArrowRight aria-hidden="true" /></label>
          </fieldset>

          <fieldset id="form-step-2">
            <p className="step-form-guide"><span>STEP 2 / 4</span><b>ご契約者さま情報を入力してください</b></p>
            <legend><span>02</span>ご契約者さま情報</legend>
            <div className="form-grid two-columns">
              <label>姓<span>必須</span><input name="familyName" autoComplete="family-name" type="text" placeholder="山田" required /></label>
              <label>名<span>必須</span><input name="givenName" autoComplete="given-name" type="text" placeholder="太郎" required /></label>
              <label>セイ（カナ）<span>必須</span><input name="familyNameKana" type="text" placeholder="ヤマダ" required /></label>
              <label>メイ（カナ）<span>必須</span><input name="givenNameKana" type="text" placeholder="タロウ" required /></label>
              <label className="full-width">生年月日<span>必須</span><input name="birthDate" autoComplete="bday" type="date" required /></label>
            </div>
            <label className="form-next" htmlFor="application-step-3"><span><small>入力内容を確認して</small>STEP 3へ進む</span><ArrowRight aria-hidden="true" /></label>
          </fieldset>

          <fieldset id="form-step-3">
            <p className="step-form-guide"><span>STEP 3 / 4</span><b>ご住所・ご連絡先を入力してください</b></p>
            <legend><span>03</span>ご住所・ご連絡先</legend>
            <div className="form-grid two-columns">
              <label>郵便番号<span>必須</span>
                <input name="postalCode" autoComplete="postal-code" inputMode="numeric" type="text" placeholder="123-4567" maxLength={8} aria-describedby="postal-help postal-status" required />
                <small className="postal-help" id="postal-help">ハイフンあり・なし、どちらでも自動検索します</small>
                <small className="postal-status" id="postal-status" aria-live="polite" />
              </label>
              <label>都道府県<span>必須</span>
                <select name="prefecture" autoComplete="address-level1" required defaultValue="">
                  <option value="" disabled>選択してください</option>
                  {prefectures.map((prefecture) => <option key={prefecture}>{prefecture}</option>)}
                </select>
              </label>
              <label className="full-width">市区町村・番地<span>必須</span><input name="address" autoComplete="address-line1" type="text" placeholder="渋谷区〇〇 1-2-3" required /></label>
              <label className="full-width">建物名・部屋番号<span className="optional">任意</span><input name="address2" autoComplete="address-line2" type="text" placeholder="DUALMOビル 101号室" /></label>
              <label>電話番号<span>必須</span><input name="tel" autoComplete="tel" inputMode="tel" type="tel" placeholder="090-1234-5678" required /></label>
              <label>メールアドレス<span>必須</span><input name="email" autoComplete="email" inputMode="email" type="email" placeholder="dualmo@example.jp" required /></label>
            </div>
            <label className="form-next" htmlFor="application-step-4"><span><small>入力内容を確認して</small>STEP 4へ進む</span><ArrowRight aria-hidden="true" /></label>
          </fieldset>

          <fieldset className="agreement-fieldset" id="form-step-4">
            <p className="step-form-guide"><span>STEP 4 / 4</span><b>お申し込み内容をご確認ください</b></p>
            <legend><span>04</span>ご確認</legend>
            <label className="agreement-check"><input type="checkbox" required /><span>契約期間24か月、課金開始は発送ベース、解約金は月額料金1か月分であることを確認しました。</span></label>
            <label className="agreement-check"><input type="checkbox" required /><span>利用規約・重要事項説明・プライバシーポリシーに同意します。</span></label>
            <button className="form-submit" type="button"><span><small>入力内容を確認して</small>確認画面へ進む</span><ArrowRight aria-hidden="true" /></button>
          </fieldset>
          <p className="form-provisional">※現在はフォーム項目・画面デザイン確認用の暫定版です。送信・決済機能は本番連携時に有効化します。</p>
        </form>
      </div>
      <script src="/postal-autofill.js" defer />
    </section>
  );
}
