import type { Metadata } from "next";
import styles from "./commercial-law.module.css";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記｜DUALMO（デュアルモ）",
  description: "DUALMO（デュアルモ）のサービス提供元、料金、契約期間、お支払い方法、送料および商品の引き渡し時期をご案内します。",
};

const legalDetails = [
  ["サービス提供元", "株式会社どこよりも"],
  ["所在地", "〒170-0013\n東京都豊島区東池袋1-18-1 HarezaTower12F"],
  ["代表取締役", "若尾 大地"],
  ["メールアドレス", "dualmo_dcsupport@dokoyorimo.net"],
  ["初期費用", "0円"],
  ["月額料金", "2,739円（税込）"],
  ["契約期間", "0ヶ月／24ヶ月"],
  ["違約金（非課税）", "2,739円（非課税）"],
] as const;

const commercialLawSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "特定商取引法に基づく表記",
  about: {
    "@type": "Organization",
    name: "株式会社どこよりも",
    email: "dualmo_dcsupport@dokoyorimo.net",
    address: {
      "@type": "PostalAddress",
      postalCode: "170-0013",
      addressRegion: "東京都",
      addressLocality: "豊島区",
      streetAddress: "東池袋1-18-1 HarezaTower12F",
      addressCountry: "JP",
    },
  },
};

export default function CommercialLawPage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialLawSchema) }}
      />

      <header className={styles.header}>
        <a className={styles.logo} href="/" aria-label="DUALMO トップページへ">
          <img src="/brand/dualmo-logo-color-hq.png" width="1920" height="530" alt="DUALMO デュアルモ" />
        </a>
        <a className={styles.backLink} href="/">
          <span aria-hidden="true">←</span> TOPへ
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.signal} aria-hidden="true"><i /><i /><i /></div>
        <p className={styles.eyebrow}>LEGAL INFORMATION</p>
        <h1>特定商取引法に<br className={styles.mobileBreak} />基づく表記</h1>
        <p>DUALMOのサービス・料金・契約条件についてご案内します。</p>
      </section>

      <section className={styles.content} aria-label="特定商取引法に基づく表記の詳細">
        <div className={styles.table}>
          {legalDetails.map(([label, value]) => (
            <div className={styles.row} key={label}>
              <h2>{label}</h2>
              {label === "メールアドレス" ? (
                <p><a href={`mailto:${value}`}>{value}</a></p>
              ) : (
                <p>{value.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
              )}
            </div>
          ))}

          <div className={`${styles.row} ${styles.paymentRow}`}>
            <h2>お支払い方法</h2>
            <div>
              <div className={styles.paymentVisual}>
                <img
                  src="/commercial-law/payment-brands.png"
                  width="4076"
                  height="441"
                  alt="利用可能なクレジットカード：Visa、American Express、Mastercard、JCB、Discover、Diners Club"
                />
              </div>
              <p className={styles.note}>※実際のお引き落し日はご利用カード会社様により異なります。</p>
            </div>
          </div>

          <div className={styles.row}>
            <h2>送料について</h2>
            <p>送料は当社で負担いたします。</p>
          </div>
          <div className={styles.row}>
            <h2>引き渡し時期</h2>
            <p>お申込み確定後、最短翌日に発送いたします。</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerSignal} aria-hidden="true"><i /><i /><i /></span>
        <a className={styles.footerLogo} href="/" aria-label="DUALMO トップページへ">
          <img src="/brand/dualmo-logo-white-hq.png" width="1920" height="587" alt="DUALMO デュアルモ" />
        </a>
        <nav className={styles.footerLinks} aria-label="運営会社・規約情報">
          <a href="https://dokoyorimo.net/company/">会社概要</a>
          <a href="/commercial-law" aria-current="page">特定商取引法</a>
          <a href="https://dokoyorimo.net/clause/">重説・約款</a>
          <a href="https://dokoyorimo.net/immunity/">免責事項</a>
          <a href="https://terms.012grp.co.jp/privacy/dokoyorimo_p/">プライバシーポリシー</a>
          <a href="https://dokoyorimo.net/copyright/">著作権</a>
        </nav>
        <small>Copyright © Dokoyorimo Co.,LTD. , All rights reserved.</small>
      </footer>
    </main>
  );
}
