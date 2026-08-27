"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import type { ApplicationPayload } from "./application-types";

const steps = [
  { no: 1, short: "ご利用内容" },
  { no: 2, short: "ご契約者情報" },
  { no: 3, short: "住所・連絡先" },
  { no: 4, short: "ご確認" },
] as const;

const prefectures = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県",
];

type FormView = "input" | "confirm" | "complete";

function valueOf(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function payloadFrom(form: HTMLFormElement): ApplicationPayload {
  const formData = new FormData(form);
  return {
    carrier: valueOf(formData, "carrier"),
    device: valueOf(formData, "device"),
    familyName: valueOf(formData, "familyName"),
    givenName: valueOf(formData, "givenName"),
    familyNameKana: valueOf(formData, "familyNameKana"),
    givenNameKana: valueOf(formData, "givenNameKana"),
    birthDate: valueOf(formData, "birthDate"),
    postalCode: valueOf(formData, "postalCode"),
    prefecture: valueOf(formData, "prefecture"),
    address: valueOf(formData, "address"),
    address2: valueOf(formData, "address2"),
    tel: valueOf(formData, "tel"),
    email: valueOf(formData, "email"),
    website: valueOf(formData, "website"),
  };
}

function ReviewRow({ label, children }: { label: string; children: string }) {
  return <div className="confirmation-row"><dt>{label}</dt><dd>{children || "—"}</dd></div>;
}

export default function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [view, setView] = useState<FormView>("input");
  const [payload, setPayload] = useState<ApplicationPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  const scrollToForm = () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const showConfirmation = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    setPayload(payloadFrom(form));
    setSubmitError("");
    setView("confirm");
    requestAnimationFrame(scrollToForm);
  };

  const editApplication = () => {
    setSubmitError("");
    setView("input");
    requestAnimationFrame(scrollToForm);
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!payload || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { ok?: boolean; submissionId?: string; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "送信できませんでした。");
      setSubmissionId(result.submissionId || "");
      setView("complete");
      requestAnimationFrame(scrollToForm);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "送信できませんでした。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="application-form section" id="application-form" aria-labelledby="application-title">
      <div className="section-intro centered">
        <span className="section-kicker">お申し込みはこちらから</span>
        <h2 id="application-title"><span className="line">DUALMO</span><span className="line accent">お申し込みフォーム</span></h2>
        <p>簡単3分で申し込み完了。現在の電話番号・携帯キャリアはそのままで利用いただけます。</p>
      </div>

      <div className={`application-shell${view !== "input" ? " is-reviewing" : ""}`}>
        <div className="application-summary" aria-label="お申し込みプラン">
          <span>お申し込みプラン</span>
          <strong>DUALMO</strong>
          <p>初月無料・日中データ無制限 <b>月額2,490円（税抜）</b><small>※2,739円（税込）</small></p>
        </div>

        {view === "input" && <>
          <input className="step-toggle" type="radio" name="application-step" id="application-step-1" defaultChecked />
          <input className="step-toggle" type="radio" name="application-step" id="application-step-2" />
          <input className="step-toggle" type="radio" name="application-step" id="application-step-3" />
          <input className="step-toggle" type="radio" name="application-step" id="application-step-4" />

          <nav className="form-progress" aria-label="入力の進捗状況">
            {steps.map(({ no, short }) => (
              <label key={no} htmlFor={`application-step-${no}`} aria-label={`STEP ${no} ${short}を表示`}>
                <span>STEP {no}</span><b>{short}</b>
              </label>
            ))}
          </nav>

          <form ref={formRef} className="application-fields step-form">
            <input className="form-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
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
                  <input name="device" type="text" maxLength={80} placeholder="例：iPhone 16 / Google Pixel 9" required />
                </label>
              </div>
              <label className="form-next" htmlFor="application-step-2"><span><small>入力内容を確認して</small>STEP 2へ進む</span><ArrowRight aria-hidden="true" /></label>
            </fieldset>

            <fieldset id="form-step-2">
              <p className="step-form-guide"><span>STEP 2 / 4</span><b>ご契約者さま情報を入力してください</b></p>
              <legend><span>02</span>ご契約者さま情報</legend>
              <div className="form-grid two-columns">
                <label>姓<span>必須</span><input name="familyName" autoComplete="family-name" type="text" maxLength={40} placeholder="山田" required /></label>
                <label>名<span>必須</span><input name="givenName" autoComplete="given-name" type="text" maxLength={40} placeholder="太郎" required /></label>
                <label>セイ（カナ）<span>必須</span><input name="familyNameKana" type="text" maxLength={40} placeholder="ヤマダ" required /></label>
                <label>メイ（カナ）<span>必須</span><input name="givenNameKana" type="text" maxLength={40} placeholder="タロウ" required /></label>
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
                <label className="full-width">市区町村・番地<span>必須</span><input name="address" autoComplete="address-line1" type="text" maxLength={120} placeholder="渋谷区〇〇 1-2-3" required /></label>
                <label className="full-width">建物名・部屋番号<span className="optional">任意</span><input name="address2" autoComplete="address-line2" type="text" maxLength={120} placeholder="DUALMOビル 101号室" /></label>
                <label>電話番号<span>必須</span><input name="tel" autoComplete="tel" inputMode="tel" type="tel" maxLength={14} placeholder="090-1234-5678" required /></label>
                <label>メールアドレス<span>必須</span><input name="email" autoComplete="email" inputMode="email" type="email" maxLength={160} placeholder="dualmo@example.jp" required /></label>
              </div>
              <label className="form-next" htmlFor="application-step-4"><span><small>入力内容を確認して</small>STEP 4へ進む</span><ArrowRight aria-hidden="true" /></label>
            </fieldset>

            <fieldset className="agreement-fieldset" id="form-step-4">
              <p className="step-form-guide"><span>STEP 4 / 4</span><b>お申し込み内容をご確認ください</b></p>
              <legend><span>04</span>ご確認</legend>
              <label className="agreement-check"><input name="contractConfirmed" type="checkbox" required /><span><strong className="agreement-price">初期費用 0円／初月無料／月額 2,490円（税抜）<small>※2,739円（税込）</small></strong>契約期間24か月、課金開始は発送ベース、解約金は月額料金1か月分であることを確認しました。</span></label>
              <label className="agreement-check"><input name="policyAgreed" type="checkbox" required /><span><a href="https://terms.012grp.co.jp/terms_pdf/dokoyorimo/dualmo_tac/" target="_blank" rel="noopener noreferrer">利用規約</a>・<a href="https://terms.012grp.co.jp/privacy/dokoyorimo_p/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>に同意します。</span></label>
              <button className="form-submit" type="button" onClick={showConfirmation}><span><small>入力内容を確認して</small>確認画面へ進む</span><ArrowRight aria-hidden="true" /></button>
            </fieldset>
          </form>
        </>}

        {view === "confirm" && payload && (
          <form className="application-confirmation" onSubmit={submitApplication}>
            <header className="confirmation-head">
              <span>CONFIRMATION</span>
              <h3>お申し込み内容の確認</h3>
              <p>入力内容をご確認のうえ、「送信する」を押してください。</p>
            </header>
            <div className="confirmation-groups">
              <section><h4><span>01</span>ご利用内容</h4><dl>
                <ReviewRow label="現在の携帯キャリア">{payload.carrier}</ReviewRow>
                <ReviewRow label="ご利用予定のスマートフォン">{payload.device}</ReviewRow>
              </dl></section>
              <section><h4><span>02</span>ご契約者さま情報</h4><dl>
                <ReviewRow label="お名前">{`${payload.familyName} ${payload.givenName}`}</ReviewRow>
                <ReviewRow label="フリガナ">{`${payload.familyNameKana} ${payload.givenNameKana}`}</ReviewRow>
                <ReviewRow label="生年月日">{payload.birthDate}</ReviewRow>
              </dl></section>
              <section><h4><span>03</span>ご住所・ご連絡先</h4><dl>
                <ReviewRow label="郵便番号">{payload.postalCode}</ReviewRow>
                <ReviewRow label="住所">{`${payload.prefecture}${payload.address}${payload.address2 ? ` ${payload.address2}` : ""}`}</ReviewRow>
                <ReviewRow label="電話番号">{payload.tel}</ReviewRow>
                <ReviewRow label="メールアドレス">{payload.email}</ReviewRow>
              </dl></section>
            </div>
            {submitError && <p className="form-submit-error" role="alert">{submitError}</p>}
            <div className="confirmation-actions">
              <button className="confirmation-edit" type="button" onClick={editApplication}><ArrowLeft aria-hidden="true" />入力内容を修正する</button>
              <button className="form-submit confirmation-submit" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "送信中…" : "送信する"}</span><Send aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {view === "complete" && (
          <div className="application-complete" role="status">
            <CheckCircle2 aria-hidden="true" />
            <span>APPLICATION COMPLETE</span>
            <h3>お申し込みを受け付けました。</h3>
            <p>入力いただいたメールアドレスへ、株式会社どこよりもから確認メールをお送りしました。</p>
            {submissionId && <small>受付番号：{submissionId}</small>}
          </div>
        )}
      </div>
      <script src="/postal-autofill.js" defer />
    </section>
  );
}
