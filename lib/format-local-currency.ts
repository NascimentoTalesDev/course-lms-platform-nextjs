export default function formatLocalCurrency(value: number , locale = 'pt-BR') {
    if (!value) {
        return null;
    }
    return new Intl.NumberFormat(locale, { style: 'decimal' , minimumFractionDigits: 2, maximumFractionDigits: 2}  ).format(value);
}