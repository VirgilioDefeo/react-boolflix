const getFlag = (langCode) => {
const flags = {
        en: 'GB',
    it: 'IT',
    fr: 'FR',
    de: 'DE',
    es: 'ES',
    ja: 'JP',
    zh: 'CN',
    ko: 'KR'
};

return flags[langCode] || "🏳️";

}