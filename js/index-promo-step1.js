/**
 * Trang chủ: ảnh khuyến mãi + nút "Tìm hiểu ngay" → đăng ký vay step1
 */
(function () {
    'use strict';

    var STEP1_URL = 'pages/step1.html';

    function goToStep1(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        window.location.href = STEP1_URL;
    }

    function bindPromoCards() {
        document.querySelectorAll('.home-partner .btn-more').forEach(function (btn) {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', goToStep1);
        });

        document.querySelectorAll(
            '.home-partner .position-relative > a.image-inner, .home-partner .brand-title a.image-inner'
        ).forEach(function (link) {
            link.setAttribute('href', STEP1_URL);
            link.addEventListener('click', goToStep1);
        });

        document.querySelectorAll('.home-partner .image-brand').forEach(function (img) {
            var card = img.closest('.position-relative');
            if (!card || card.dataset.step1Bound === '1') {
                return;
            }
            card.dataset.step1Bound = '1';
            card.style.cursor = 'pointer';
            card.addEventListener('click', function (event) {
                if (event.target.closest('.btn-more')) {
                    return;
                }
                goToStep1(event);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindPromoCards);
    } else {
        bindPromoCards();
    }
})();
