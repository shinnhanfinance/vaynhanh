/**
 * Offline site: modal "Gửi yêu cầu" → pages/step1.html
 * Nếu chọn "Vay theo sao kê thẻ tín dụng" → preset luồng sao kê.
 */
(function () {
    'use strict';

    if (typeof loanModalApp === 'undefined') {
        return;
    }

    var CARD_LOAN_ID = 'cardsaoke';

    loanModalApp.loanRequest = function () {
        this.errors = {};
        this.validateForm();

        if (!this.loanReqData.isCheckedAgree) {
            return;
        }

        if (Object.keys(this.errors).length !== 0) {
            return;
        }

        if (this.selectedLoanId === CARD_LOAN_ID && typeof startCardStatementLoan === 'function') {
            startCardStatementLoan();
            return;
        }

        window.location.href = 'pages/step1.html';
    };
})();
