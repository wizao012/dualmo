(function () {
  function setupPostalAutofill() {
    var postalInput = document.querySelector('input[name="postalCode"]');
    var prefectureSelect = document.querySelector('select[name="prefecture"]');
    var addressInput = document.querySelector('input[name="address"]');
    var status = document.getElementById('postal-status');

    if (!postalInput || !prefectureSelect || !addressInput || !status) return;

    var requestId = 0;

    postalInput.addEventListener('input', async function () {
      var postalCode = postalInput.value.replace(/\D/g, '').slice(0, 7);
      var currentRequest = ++requestId;

      postalInput.setAttribute('aria-invalid', 'false');
      status.className = 'postal-status';

      if (postalCode.length < 7) {
        status.textContent = '';
        return;
      }

      status.classList.add('is-loading');
      status.textContent = '住所を検索しています…';

      try {
        var response = await fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + postalCode);
        if (!response.ok) throw new Error('postal lookup failed');

        var data = await response.json();
        if (currentRequest !== requestId) return;

        if (!data.results || !data.results.length) {
          postalInput.setAttribute('aria-invalid', 'true');
          status.className = 'postal-status is-error';
          status.textContent = '住所が見つかりません。郵便番号をご確認ください。';
          return;
        }

        var result = data.results[0];
        prefectureSelect.value = result.address1;
        addressInput.value = result.address2 + result.address3;
        prefectureSelect.dispatchEvent(new Event('change', { bubbles: true }));
        addressInput.dispatchEvent(new Event('input', { bubbles: true }));

        status.className = 'postal-status is-success';
        status.textContent = '都道府県と市区町村を自動入力しました。';
      } catch (error) {
        if (currentRequest !== requestId) return;
        status.className = 'postal-status is-error';
        status.textContent = '自動検索できませんでした。住所を直接入力してください。';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPostalAutofill, { once: true });
  } else {
    setupPostalAutofill();
  }
})();
