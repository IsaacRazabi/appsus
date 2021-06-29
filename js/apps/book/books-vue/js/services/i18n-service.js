export const i18nService = {
    getCurrency
}

function getCurrency({ listPrice }) {
    return listPrice.amount.toLocaleString('en-US', { style: 'currency', currency: listPrice.currencyCode })
}