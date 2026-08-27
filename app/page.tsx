import type { Metadata } from "next";
import ApplicationForm from "./ApplicationForm";
import {
  Apple,
  ArrowRight,
  BadgeJapaneseYen,
  CardSim,
  Check,
  ChevronDown,
  CircleCheck,
  CircleDollarSign,
  CreditCard,
  Download,
  Infinity as InfinityIcon,
  MessageSquareText,
  Phone,
  RadioTower,
  Settings2,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Wifi,
  WifiOff,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DUALMO（デュアルモ）｜ドコモ回線のデータ専用SIM・サブ回線",
  description:
    "今の電話番号と携帯キャリアはそのまま。ドコモ回線の9:00〜18:00データ通信無制限を月額2,490円（税抜）で追加できる、初月無料のデータ専用eSIM・サブ回線です。",
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DUALMO（デュアルモ）",
  alternateName: "デュアルモ",
  description:
    "現在の電話番号と音声SIMを維持したまま追加できる、ドコモ回線のデータ通信専用eSIM。9:00〜18:00はデータ通信無制限。初期費用0円、初月無料。",
  brand: { "@type": "Brand", name: "DUALMO" },
  category: "データ通信専用eSIM・サブ回線",
  areaServed: { "@type": "Country", name: "日本" },
  additionalProperty: [
    { "@type": "PropertyValue", name: "日中データ通信", value: "9:00〜18:00は無制限。その他の時間帯は最大10GB" },
    { "@type": "PropertyValue", name: "回線", value: "ドコモ回線" },
    { "@type": "PropertyValue", name: "電話番号", value: "現在の番号を維持" },
    { "@type": "PropertyValue", name: "初期費用", value: "0円" },
    { "@type": "PropertyValue", name: "初月料金", value: "無料" },
    { "@type": "PropertyValue", name: "月額料金", value: "2,490円（税抜）／2,739円（税込）" },
    { "@type": "PropertyValue", name: "契約期間", value: "24か月" },
  ],
  offers: {
    "@type": "Offer",
    price: "2739",
    priceCurrency: "JPY",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "2739",
      priceCurrency: "JPY",
      unitText: "月",
      valueAddedTaxIncluded: true,
    },
  },
};

const faqItems = [
  ["今の電話番号は変わりませんか？", "変わりません。今お使いの音声SIMはそのまま残し、データ通信用としてDUALMOを追加します。"],
  ["今の携帯キャリアを解約する必要はありますか？", "ありません。現在のキャリア契約を継続したままご利用いただけます。"],
  ["どのスマホでも使えますか？", "eSIMとデュアルSIMに対応した端末が必要です。お申し込み前に端末の対応状況をご確認ください。"],
  ["日中データ無制限の時間帯は？", "9:00〜18:00が対象です。それ以外の時間帯は最大10GBまで利用でき、超過した場合は翌日9:00まで通信速度が制限されます。"],
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

function Logo({ reversed = false }: { reversed?: boolean }) {
  return (
    <span className="logo" aria-label="DUALMO デュアルモ">
      <img
        src={reversed ? "/brand/dualmo-logo-white-hq.png" : "/brand/dualmo-logo-color-hq.png"}
        width="1920"
        height={reversed ? "587" : "530"}
        alt="DUALMO デュアルモ"
      />
    </span>
  );
}

function SignalRibbon({ side = "right", warm = false }: { side?: "left" | "right"; warm?: boolean }) {
  return (
    <div className={`section-signal ${side}${warm ? " warm" : ""}`} aria-hidden="true">
      <span /><span /><span />
    </div>
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
      <div className="cta-glass-flare" aria-hidden="true"><i /><i /></div>
      <div className="big-cta-copy">
        <span className="cta-kicker">START DUALMO</span>
        <p>今の電話番号は、そのまま。</p>
        <h2>
          <span>日中データ無制限</span>
          <strong><span className="cta-monthly">月額</span><b className="cta-price-number">2,490</b><small>円（税抜）</small></strong>
          <small className="cta-tax-note">※2,739円（税込）</small>
          <em className="cta-free-badge">初月無料</em>
        </h2>
      </div>
      <CtaButton label="今すぐ申し込む" light={variant !== "orange"} />
      <span className="cta-number" aria-hidden="true">{number}</span>
    </section>
  );
}

const problems = [
  { icon: TriangleAlert, visual: "data", title: "ギガが足りない", text: "動画やSNSで、月末前に速度制限。", status: "残りデータ 0GB" },
  { icon: CircleDollarSign, visual: "price", title: "無制限は高い", text: "大容量プランにすると料金が上がる。", status: "毎月の請求が負担" },
  { icon: WifiOff, visual: "signal", title: "通信が不安定", text: "外出先でも安定した回線を使いたい。", status: "遅くてイライラ" },
];

const features = [
  { no: "01", icon: BadgeJapaneseYen, label: "LOW PRICE", title: "安い", prefix: "月額", accent: "2,490", unit: "円（税抜）", text: "初期費用0円・初月無料。※月額2,739円（税込）", tone: "price-feature" },
  { no: "02", icon: ShieldCheck, label: "RELIABLE", title: "安心", prefix: "全国対応", accent: "docomo", unit: "回線", text: "全国のドコモ回線対応エリアで、高速・安定通信。", tone: "network-feature" },
  { no: "03", icon: InfinityIcon, label: "UNLIMITED", title: "大容量", prefix: "データ通信", accent: "無制限", unit: "", text: "※データ無制限は9:00〜18:00の時間が対象となります。それ以外の時間帯は最大10GBまでご利用可能です。（超過した場合、翌日9:00まで通信速度制限となります。）", tone: "data-feature" },
];

const applySteps = [
  { icon: Smartphone, title: "Webで申し込む", text: "フォームへ必要事項を入力" },
  { icon: CreditCard, title: "カードを登録", text: "クレジットカードでお支払い" },
  { icon: Download, title: "eSIMを追加", text: "案内URLからダウンロード" },
  { icon: CircleCheck, title: "利用スタート", text: "データ回線を選べば完了" },
];

const highlights = [
  {
    icon: InfinityIcon,
    eyebrow: "DAYTIME UNLIMITED",
    title: <>データ通信<strong>無制限。</strong></>,
    text: "動画もテザリングも、データ容量を気にせず楽しめます。",
    tone: "unlimited",
    visual: <><span className="highlight-visual-icon"><InfinityIcon /></span><b>UNLIMITED</b></>,
  },
  {
    icon: RadioTower,
    eyebrow: "DOCOMO NETWORK",
    title: <>つながる、<strong>安心。</strong></>,
    text: "全国のドコモ回線対応エリアで、高速・安定したデータ通信を利用できます。",
    tone: "network",
    visual: <><span className="highlight-visual-icon"><span className="highlight-signal-bars"><i /><i /><i /><i /></span></span><b>docomo</b></>,
  },
  {
    icon: BadgeJapaneseYen,
    eyebrow: "SIMPLE PRICE",
    title: <>大容量を、<strong>シンプルに。</strong></>,
    text: "迷わないワンプラン。今の契約を活かしながら通信費を見直せます。",
    tone: "price",
    visual: <><span className="highlight-free-badge">初月無料</span><span className="highlight-visual-icon simple-yen">¥</span><b>2,490<small>円（税抜）</small></b><em>※2,739円（税込）</em></>,
  },
] as const;

function HighlightsSection() {
  return (
    <section className="highlights section" aria-labelledby="highlights-title">
      <div className="section-intro highlights-intro">
        <span className="section-kicker light">ABOUT DUALMO</span>
        <h2 id="highlights-title">DUALMOとは？</h2>
        <p>難しいSIMの話を、3つのポイントだけで。</p>
      </div>
      <div className="highlights-track highlights-grid" role="list" aria-label="DUALMOの3つの特徴">
        {highlights.map(({ icon: Icon, eyebrow, title, text, tone, visual }) => (
          <article className={`highlight-card ${tone}`} key={eyebrow} role="listitem">
            <div className="highlight-card-copy">
              <span className="highlight-eyebrow"><i><Icon /></i>{eyebrow}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <div className="highlight-card-visual" aria-hidden="true">{visual}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="liquid-site" data-pricing-version="2026-08-27">
      <div className="ambient-liquid" aria-hidden="true"><i /><i /><i /></div>
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
        <div className="hero-mobile-fill" aria-hidden="true"><img src="/fv-mobile-cgi-v3.jpg" alt="" /></div>
        <picture>
          <source media="(max-width: 700px)" srcSet="/fv-mobile-cgi-v3.jpg" />
          <img src="/fv-desktop-cgi-v3.jpg" width="1672" height="941" alt="青い音声SIMとオレンジ色のDUALMO eSIMを1台で利用するスマートフォン" fetchPriority="high" />
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
            <span className="hero-free-badge">初月無料</span>
            <p className="hero-price"><span>月額</span><strong>2,490</strong><small>円（税抜）<em>※2,739円（税込）</em></small></p>
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

      <HighlightsSection />

      <section className="problems section" id="about">
        <SignalRibbon side="right" />
        <div className="section-intro centered">
          <span className="section-kicker">PROBLEMS</span>
          <h2 className="problem-heading"><span className="line problem-heading-prefix">スマホの通信、</span><span className="line accent problem-heading-question"><span>こんなお悩み</span><span>ありませんか？</span></span></h2>
          <p>料金は抑えたい。でも、ギガも通信品質も妥協したくない。</p>
        </div>
        <div className="problem-grid">
          {problems.map(({ icon: StatusIcon, visual, title, text, status }, index) => (
            <article key={title}>
              <span className="problem-no">0{index + 1}</span>
              <div className={`problem-icon-panel ${visual}`} aria-hidden="true">
                <span className="problem-icon-ripple" />
                <i><StatusIcon /></i>
              </div>
              <span className="problem-status">{status}</span>
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
          <input className="visual-toggle-input" type="checkbox" id="dual-sim-demo" data-scroll-sim-toggle />
          <label className="visual-toggle" htmlFor="dual-sim-demo"><span>音声</span><span>データ</span></label>
          <div className="signal-ring ring-a" /><div className="signal-ring ring-b" />
          <div className="phone-shell">
            <span className="phone-camera" />
            <div className="phone-screen">
              <span className="screen-label">DUAL SIM</span>
              <div><i className="blue"><Phone /></i><span><small>いまの音声SIM</small><b>電話・SMS</b></span></div>
              <em className="dualmo-plus">＋</em>
              <div className="dualmo-line"><i className="data-sim"><CardSim aria-hidden="true" /></i><span><small>DUALMO</small><b>データ通信</b></span></div>
            </div>
          </div>
          <span className="float-chip chip-a"><Phone /><span>番号そのまま</span></span>
          <span className="float-chip chip-b"><Wifi /><span>日中無制限</span></span>
        </div>
      </section>

      <section className="visual-story mechanism-story" aria-labelledby="mechanism-story-title">
        <div className="visual-story-inner">
          <div className="visual-story-copy">
            <span className="visual-story-kicker">DUAL SIM ARCHITECTURE</span>
            <h2 id="mechanism-story-title"><span>2つの回線を、</span><strong>1台に。</strong></h2>
            <p>通話は今の音声SIM。データ通信はDUALMO eSIM。</p>
          </div>
          <picture className="visual-story-media">
            <source media="(max-width: 700px)" srcSet="/visuals/dualmo-esim-cg-mobile-v2.jpg" />
            <img src="/visuals/dualmo-esim-cg-v2.jpg" width="1672" height="941" loading="lazy" alt="青い音声SIMとオレンジ色に発光するDUALMO eSIMが1台のスマートフォンにつながるイメージ" />
          </picture>
        </div>
      </section>

      <section className="features section" id="features">
        <SignalRibbon side="left" warm />
        <div className="section-intro">
          <span className="section-kicker">WHY DUALMO?</span>
          <h2 className="two-line-heading"><span className="line">DUALMO</span><span className="line accent">選ばれる理由</span></h2>
        </div>
        <div className="feature-grid">
          {features.map(({ no, icon: Icon, label, title, prefix, accent, unit, text, tone }) => (
            <article className={tone} key={no}>
              <div className="feature-top"><span>{no} / {label}</span><i><Icon /></i></div>
              <h3>{title}</h3>
              <div className="feature-value"><span className="feature-prefix">{prefix}</span><strong>{accent}</strong>{unit && <b>{unit}</b>}</div>
              <p>{text}</p>
              <div className="feature-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="how section" id="how">
        <SignalRibbon side="right" />
        <div className="section-intro centered">
          <span className="section-kicker">HOW TO USE</span>
          <h2 className="two-line-heading"><span className="line">スマホの設定は、</span><span className="line accent">超シンプル</span></h2>
          <p>難しいSIMの差し替えは不要。iPhoneもAndroidも、データ回線にDUALMOを選びます。</p>
        </div>
        <div className="os-grid">
          <article className="ios-card">
            <div className="os-head"><span className="os-symbol apple" aria-hidden="true"><Apple /></span><div><small>FOR iPHONE</small><h3>iPhoneの設定</h3></div></div>
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
        <SignalRibbon side="left" warm />
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
        <SignalRibbon side="right" />
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

      <ApplicationForm />

      <footer>
        <span className="footer-signal" aria-hidden="true"><i /><i /><i /></span>
        <a className="footer-logo-link" href="#top" aria-label="DUALMO トップへ"><Logo reversed /></a>
        <nav className="footer-links" aria-label="運営会社・規約情報">
          <a href="https://dokoyorimo.net/company/" target="_blank" rel="noopener noreferrer">会社概要</a>
          <a href="https://dokoyorimo.net/tokutei/" target="_blank" rel="noopener noreferrer">特定商取引法</a>
          <a href="https://dokoyorimo.net/clause/" target="_blank" rel="noopener noreferrer">重説・約款</a>
          <a href="https://dokoyorimo.net/immunity/" target="_blank" rel="noopener noreferrer">免責事項</a>
          <a href="https://terms.012grp.co.jp/privacy/dokoyorimo_p/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
          <a href="https://dokoyorimo.net/copyright/" target="_blank" rel="noopener noreferrer">著作権</a>
        </nav>
        <small>© 株式会社どこよりも. All Rights Reserved.</small>
      </footer>

      <div className="mobile-cta">
        <span><small>初月無料・日中データ無制限</small><b>月額 2,490円<em>（税抜）</em></b></span>
        <a href="#application-form">申し込む<ArrowRight /></a>
      </div>
      <script src="/dualmo-experience.js" defer />
    </main>
  );
}
