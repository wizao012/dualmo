import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeJapaneseYen,
  CardSim,
  Check,
  ChevronDown,
  CircleCheck,
  CreditCard,
  Download,
  Gauge,
  Globe2,
  Infinity as InfinityIcon,
  MessageSquareText,
  MonitorSmartphone,
  Phone,
  Play,
  RadioTower,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sun,
  Wifi,
  WifiOff,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DUALMO（デュアルモ）｜ドコモ回線のデータ専用SIM・サブ回線",
  description:
    "今の電話番号と携帯キャリアはそのまま。ドコモ回線の日中データ通信無制限を月額2,490円（税込）で追加できるデータ専用eSIM・サブ回線です。",
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DUALMO（デュアルモ）",
  alternateName: "デュアルモ",
  description:
    "現在の電話番号と音声SIMを維持したまま追加できる、ドコモ回線のデータ通信専用eSIM。8:00〜18:00頃はデータ通信無制限。",
  brand: { "@type": "Brand", name: "DUALMO" },
  category: "データ通信専用eSIM・サブ回線",
  areaServed: { "@type": "Country", name: "日本" },
  additionalProperty: [
    { "@type": "PropertyValue", name: "日中データ通信", value: "8:00〜18:00頃は無制限" },
    { "@type": "PropertyValue", name: "回線", value: "ドコモ回線" },
    { "@type": "PropertyValue", name: "電話番号", value: "現在の番号を維持" },
    { "@type": "PropertyValue", name: "初期費用", value: "1,000円（税込）" },
    { "@type": "PropertyValue", name: "契約期間", value: "24か月" },
  ],
  offers: {
    "@type": "Offer",
    price: "2490",
    priceCurrency: "JPY",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "2490",
      priceCurrency: "JPY",
      unitText: "月",
    },
  },
};

const faqItems = [
  ["今の電話番号は変わりませんか？", "変わりません。今お使いの音声SIMはそのまま残し、データ通信用としてDUALMOを追加します。"],
  ["今の携帯キャリアを解約する必要はありますか？", "ありません。現在のキャリア契約を継続したままご利用いただけます。"],
  ["どのスマホでも使えますか？", "eSIMとデュアルSIMに対応した端末が必要です。お申し込み前に端末の対応状況をご確認ください。"],
  ["日中データ無制限の時間帯は？", "8:00〜18:00頃が目安です。通信は全国のドコモ回線対応エリアでご利用いただけます。"],
  ["支払い方法と契約期間を教えてください。", "お支払いはクレジットカード、契約期間は24か月です。解約金は月額料金1か月分です。"],
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "DUALMOの申し込み・利用開始方法",
  step: [
    { "@type": "HowToStep", position: 1, name: "Webで申し込む", text: "申し込みフォームへ必要事項を入力します。" },
    { "@type": "HowToStep", position: 2, name: "クレジットカードを登録", text: "月額料金の支払いに使用するクレジットカードを登録します。" },
    { "@type": "HowToStep", position: 3, name: "eSIMをダウンロード", text: "案内されたURLまたはQRコードからeSIMをスマートフォンへ追加します。" },
    { "@type": "HowToStep", position: 4, name: "データ回線を選択", text: "モバイルデータ通信にDUALMOを選択して利用を開始します。" },
  ],
};

function Logo() {
  return (
    <span className="logo" aria-label="DUALMO デュアルモ">
      <img src="/brand/dualmo-logo-horizontal-approved-b-hq.webp" width="1218" height="351" alt="DUALMO デュアルモ" />
    </span>
  );
}

function CtaButton({ label = "DUALMOに申し込む", light = false }: { label?: string; light?: boolean }) {
  return (
    <a className={`cta-button${light ? " light" : ""}`} href="#application-form">
      <span><small>WEBでかんたん</small>{label}</span>
      <i><ArrowRight aria-hidden="true" /></i>
    </a>
  );
}

function BigCta({ variant = "blue", number }: { variant?: "blue" | "orange" | "dark"; number: string }) {
  return (
    <section className={`big-cta ${variant}`} aria-label="お申し込み案内">
      <div className="cta-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="big-cta-copy">
        <span className="cta-kicker">START DUALMO</span>
        <p>今の電話番号は、そのまま。</p>
        <h2><span>日中データ無制限</span><strong>月額 2,490<small>円（税込）</small></strong></h2>
      </div>
      <CtaButton label="今すぐ申し込む" light={variant !== "orange"} />
      <span className="cta-number" aria-hidden="true">{number}</span>
    </section>
  );
}

const problems = [
  { icon: Gauge, title: "ギガが足りない", text: "動画やSNSで、月末前に速度制限。" },
  { icon: BadgeJapaneseYen, title: "無制限は高い", text: "大容量プランにすると料金が上がる。" },
  { icon: WifiOff, title: "通信が不安定", text: "外出先でも安定した回線を使いたい。" },
];

const features = [
  { no: "01", icon: BadgeJapaneseYen, label: "LOW PRICE", title: "安い", accent: "2,490", unit: "円（税込）/月", text: "わかりやすいワンプラン。初期費用は1,000円（税込）。", tone: "price-feature" },
  { no: "02", icon: ShieldCheck, label: "RELIABLE", title: "安心", accent: "ドコモ", unit: "回線", text: "全国のドコモ回線対応エリアで、高速・安定通信。", tone: "network-feature" },
  { no: "03", icon: InfinityIcon, label: "UNLIMITED", title: "大容量", accent: "日中", unit: "データ無制限", text: "8:00〜18:00頃。動画もテザリングも容量を気にせず。", tone: "data-feature" },
];

const applySteps = [
  { icon: Smartphone, title: "Webで申し込む", text: "フォームへ必要事項を入力" },
  { icon: CreditCard, title: "カードを登録", text: "クレジットカードでお支払い" },
  { icon: Download, title: "eSIMを追加", text: "案内URLからダウンロード" },
  { icon: CircleCheck, title: "利用スタート", text: "データ回線を選べば完了" },
];

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <header className="site-header">
        <a className="header-logo" href="#top" aria-label="DUALMO トップへ"><Logo /></a>
        <nav aria-label="メインナビゲーション">
          <a href="#about">DUALMOとは</a>
          <a href="#features">3つの特徴</a>
          <a href="#how">使い方</a>
          <a href="#flow">申込の流れ</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href="#application-form"><span>申し込む</span><ArrowRight aria-hidden="true" /></a>
        <details className="mobile-menu">
          <summary aria-label="メニューを開く"><span /><span /><span /></summary>
          <nav aria-label="モバイルメニュー">
            <a href="#about">DUALMOとは</a>
            <a href="#features">3つの特徴</a>
            <a href="#how">使い方</a>
            <a href="#flow">申込の流れ</a>
            <a href="#faq">FAQ</a>
            <a className="mobile-menu-apply" href="#application-form">お申し込みフォーム</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <picture>
          <source media="(max-width: 700px)" srcSet="/fv-mobile-textless.webp" />
          <img src="/fv-desktop-textless.webp" width="1671" height="941" alt="2つのSIMを1台のスマートフォンで利用するDUALMOのイメージ" fetchPriority="high" />
        </picture>
        <div className="hero-data-flow" aria-hidden="true">
          <span className="data-stream data-stream-blue"><i /><i /><i /></span>
          <span className="data-stream data-stream-orange"><i /><i /><i /></span>
          <span className="data-pulse data-pulse-blue" />
          <span className="data-pulse data-pulse-orange" />
        </div>
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-brand">
            <span className="sr-only">DUALMO（デュアルモ）</span>
            <span className="hero-brand-type" aria-hidden="true">
              <strong>DUALMO</strong>
              <small>デュアルモ</small>
            </span>
          </h1>
          <span className="hero-copy-line" aria-hidden="true" />
          <div className="hero-message">
            <p className="hero-lead">電話番号は、そのまま。</p>
            <p className="hero-unlimited"><em>日中</em>データ無制限</p>
            <p className="hero-price"><span>月額</span><strong>2,490</strong><small>円（税込）</small></p>
          </div>
        </div>
        <div className="hero-badges" aria-label="サービスの特徴">
          <span><Phone />電話番号そのまま</span>
          <span><RadioTower />ドコモ回線</span>
          <span><CardSim />eSIMを追加</span>
        </div>
        <a className="hero-scroll" href="#about" aria-label="次のセクションへ"><ChevronDown /></a>
      </section>

      <BigCta variant="blue" number="01" />

      <section className="problems section" id="about">
        <div className="section-intro centered">
          <span className="section-kicker">DO YOU HAVE THESE PROBLEMS?</span>
          <h2><span className="line">スマホの通信、</span><span className="line accent">こんなお悩みありませんか？</span></h2>
          <p>料金は抑えたい。でも、ギガも通信品質も妥協したくない。</p>
        </div>
        <div className="problem-grid">
          {problems.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <span className="problem-no">0{index + 1}</span>
              <i><Icon aria-hidden="true" /></i>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="solution section" aria-labelledby="solution-title">
        <div className="solution-copy">
          <span className="section-kicker light">THE SIMPLE SOLUTION</span>
          <h2 id="solution-title"><span className="line">そのお悩み、</span><span className="line orange">DUALMOが解決！</span></h2>
          <p>今の携帯キャリアはそのまま。データ通信専用のeSIMを1つ追加するだけです。</p>
          <ul>
            <li><Check />電話番号・通話・SMSは今までどおり</li>
            <li><Check />ネット通信だけDUALMOに任せる</li>
            <li><Check />SIMカードの抜き差しは不要</li>
          </ul>
        </div>
        <div className="solution-figure" aria-label="音声SIMとDUALMOを1台のスマートフォンで使う図">
          <div className="signal-ring ring-a" /><div className="signal-ring ring-b" />
          <div className="phone-shell">
            <span className="phone-camera" />
            <div className="phone-screen">
              <span className="screen-label">DUAL SIM</span>
              <div><i className="blue"><Phone /></i><span><small>いまの音声SIM</small><b>電話・SMS</b></span></div>
              <em>＋</em>
              <div><i className="data-sim"><CardSim aria-hidden="true" /></i><span><small>DUALMO</small><b>データ通信</b></span></div>
            </div>
          </div>
          <span className="float-chip chip-a"><Phone />番号そのまま</span>
          <span className="float-chip chip-b"><Wifi />日中無制限</span>
        </div>
      </section>

      <section className="features section" id="features">
        <div className="section-intro">
          <span className="section-kicker">WHY DUALMO?</span>
          <h2><span className="line">選ばれる理由は、</span><span className="line accent">3つだけ。</span></h2>
        </div>
        <div className="feature-grid">
          {features.map(({ no, icon: Icon, label, title, accent, unit, text, tone }) => (
            <article className={tone} key={no}>
              <div className="feature-top"><span>{no} / {label}</span><i><Icon /></i></div>
              <h3>{title}</h3>
              <div className="feature-value"><strong>{accent}</strong><b>{unit}</b></div>
              <p>{text}</p>
              <div className="feature-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </article>
          ))}
        </div>
        <div className="feature-scenes" aria-label="DUALMOの利用シーン">
          <figure><img src="/use-video.jpg" alt="移動中に動画を視聴する利用シーン" loading="lazy" /><figcaption><Play />動画視聴</figcaption></figure>
          <figure><img src="/use-work.jpg" alt="テザリングでパソコンを使う利用シーン" loading="lazy" /><figcaption><MonitorSmartphone />テザリング</figcaption></figure>
          <figure><img src="/use-travel.jpg" alt="外出先で安定通信を使う利用シーン" loading="lazy" /><figcaption><Globe2 />外出・旅行</figcaption></figure>
        </div>
      </section>

      <section className="how section" id="how">
        <div className="section-intro centered">
          <span className="section-kicker">HOW TO USE</span>
          <h2><span className="line">使い方は、</span><span className="line accent">スマホの設定だけ。</span></h2>
          <p>難しいSIMの差し替えは不要。iPhoneもAndroidも、データ回線にDUALMOを選びます。</p>
        </div>
        <div className="os-grid">
          <article className="ios-card">
            <div className="os-head"><span className="os-symbol apple" aria-hidden="true"><i className="apple-glyph"><span /></i></span><div><small>FOR iPHONE</small><h3>iPhoneの設定</h3></div></div>
            <ol>
              <li><span>01</span><i><Settings2 /></i><div><b>「設定」を開く</b><p>モバイル通信をタップ</p></div></li>
              <li><span>02</span><i><CardSim /></i><div><b>2つのSIMをオン</b><p>両方の回線を有効にする</p></div></li>
              <li><span>03</span><i><Wifi /></i><div><b>データ回線を選ぶ</b><p>DUALMOを選択して完了</p></div></li>
            </ol>
          </article>
          <article className="android-card">
            <div className="os-head"><span className="os-symbol android"><img src="/android-mark.svg" alt="" aria-hidden="true" /></span><div><small>FOR ANDROID</small><h3>Androidの設定</h3></div></div>
            <ol>
              <li><span>01</span><i><Settings2 /></i><div><b>「設定」を開く</b><p>ネットワークと接続へ</p></div></li>
              <li><span>02</span><i><CardSim /></i><div><b>2つのSIMを有効化</b><p>SIMマネージャーから設定</p></div></li>
              <li><span>03</span><i><Wifi /></i><div><b>優先回線を選ぶ</b><p>モバイルデータにDUALMO</p></div></li>
            </ol>
          </article>
        </div>
        <div className="how-note"><MessageSquareText /><p><b>機種によって項目名が異なります。</b><span>お使いのスマホに合わせて、画面の案内をご確認ください。</span></p></div>
      </section>

      <section className="flow section" id="flow">
        <div className="section-intro">
          <span className="section-kicker light">APPLICATION FLOW</span>
          <h2><span className="line">お申し込みから</span><span className="line orange">最短4ステップ。</span></h2>
        </div>
        <div className="flow-grid">
          {applySteps.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <span className="flow-no">STEP {index + 1}</span>
              <i><Icon /></i>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < applySteps.length - 1 && <ArrowRight className="flow-arrow" aria-hidden="true" />}
            </article>
          ))}
        </div>
      </section>

      <BigCta variant="orange" number="02" />

      <section className="faq section" id="faq">
        <div className="section-intro centered">
          <span className="section-kicker">FAQ</span>
          <h2><span className="line">よくあるご質問。</span></h2>
        </div>
        <div className="faq-list">
          {faqItems.map(([question, answer]) => (
            <details key={question}>
              <summary><span>Q</span><b>{question}</b><i>＋</i></summary>
              <div><span>A</span><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </section>

      <BigCta variant="dark" number="03" />

      <section className="application-form section" id="application-form" aria-labelledby="application-title">
        <div className="section-intro centered">
          <span className="section-kicker">APPLICATION FORM</span>
          <h2 id="application-title"><span className="line">DUALMO</span><span className="line accent">お申し込みフォーム</span></h2>
          <p>約5分で入力できます。現在の電話番号・携帯キャリアはそのままでお申し込みいただけます。</p>
        </div>

        <div className="application-shell">
          <div className="application-summary" aria-label="お申し込みプラン">
            <span>お申し込みプラン</span>
            <strong>DUALMO</strong>
            <p>日中データ無制限 <b>月額2,490円（税込）</b></p>
            <small>初期費用 1,000円（税込）／ドコモ回線</small>
          </div>

          <form className="application-fields">
            <fieldset>
              <legend><span>01</span>ご利用内容</legend>
              <div className="form-grid two-columns">
                <label>ご希望のSIMタイプ<span>必須</span>
                  <select name="simType" required defaultValue="esim">
                    <option value="esim">eSIM（おすすめ）</option>
                    <option value="physical">物理SIM</option>
                  </select>
                </label>
                <label>現在の携帯キャリア<span>必須</span>
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
            </fieldset>

            <fieldset>
              <legend><span>02</span>ご契約者さま情報</legend>
              <div className="form-grid two-columns">
                <label>姓<span>必須</span><input name="familyName" autoComplete="family-name" type="text" placeholder="山田" required /></label>
                <label>名<span>必須</span><input name="givenName" autoComplete="given-name" type="text" placeholder="太郎" required /></label>
                <label>セイ（カナ）<span>必須</span><input name="familyNameKana" type="text" placeholder="ヤマダ" required /></label>
                <label>メイ（カナ）<span>必須</span><input name="givenNameKana" type="text" placeholder="タロウ" required /></label>
                <label className="full-width">生年月日<span>必須</span><input name="birthDate" autoComplete="bday" type="date" required /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend><span>03</span>ご住所・ご連絡先</legend>
              <div className="form-grid two-columns">
                <label>郵便番号<span>必須</span><input name="postalCode" autoComplete="postal-code" inputMode="numeric" type="text" placeholder="123-4567" required /></label>
                <label>都道府県<span>必須</span>
                  <select name="prefecture" autoComplete="address-level1" required defaultValue="">
                    <option value="" disabled>選択してください</option>
                    {[
                      "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"
                    ].map((prefecture) => <option key={prefecture}>{prefecture}</option>)}
                  </select>
                </label>
                <label className="full-width">市区町村・番地<span>必須</span><input name="address" autoComplete="address-line1" type="text" placeholder="渋谷区〇〇 1-2-3" required /></label>
                <label className="full-width">建物名・部屋番号<span className="optional">任意</span><input name="address2" autoComplete="address-line2" type="text" placeholder="DUALMOビル 101号室" /></label>
                <label>電話番号<span>必須</span><input name="tel" autoComplete="tel" inputMode="tel" type="tel" placeholder="090-1234-5678" required /></label>
                <label>メールアドレス<span>必須</span><input name="email" autoComplete="email" inputMode="email" type="email" placeholder="dualmo@example.jp" required /></label>
              </div>
            </fieldset>

            <fieldset className="agreement-fieldset">
              <legend><span>04</span>ご確認</legend>
              <label className="agreement-check"><input type="checkbox" required /><span>契約期間24か月、課金開始は発送ベース、解約金は月額料金1か月分であることを確認しました。</span></label>
              <label className="agreement-check"><input type="checkbox" required /><span>利用規約・重要事項説明・プライバシーポリシーに同意します。</span></label>
            </fieldset>

            <button className="form-submit" type="button"><span><small>入力内容を確認して</small>確認画面へ進む</span><ArrowRight aria-hidden="true" /></button>
            <p className="form-provisional">※現在はフォーム項目・画面デザイン確認用の暫定版です。送信・決済機能は本番連携時に有効化します。</p>
          </form>
        </div>
      </section>

      <footer>
        <a className="footer-logo-link" href="#top" aria-label="DUALMO トップへ"><Logo /></a>
        <p>ドコモ回線のデータ専用SIM・サブ回線</p>
        <small>© 2026 DUALMO. All Rights Reserved.</small>
      </footer>

      <div className="mobile-cta">
        <span><small>日中データ無制限</small><b>月額 2,490円</b></span>
        <a href="#application-form">申し込む<ArrowRight /></a>
      </div>
    </main>
  );
}
