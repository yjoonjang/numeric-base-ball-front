module.exports = {
    important: true,
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                88: '21rem',
                108: '27rem',
                120: '30rem',
                132: '33rem',
                144: '36rem',
                156: '39rem',
            },
        },
        boxShadow: {
            inner: 'inset -6px -6px 10px #aaa',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
