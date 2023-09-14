// import type { Config } from "tailwindcss";
export default {
    darkMode: 'class',
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue'
    ],
    theme: {
        extend: {
            backgroundColor: {
                'gradient-1':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.10) 100%)'
            },
            boxShadow: {
                sm: '0px 10px 10px -10px rgba(72, 84, 159, 0.10)',
                'spread-light': '0px 10px 20px 0px rgba(72, 84, 159, 0.25)',
                'spread-dark': '0px 10px 20px 0px rgba(0, 0, 0, 0.25)'
            },
            padding: {
                26: '6.4375rem', // 103px
                18: '4.5rem', // 72px
                4.5: '1.125rem', // 18px
                3.5: '0.9375rem' // 15px
            },
            margin: {
                4.5: '1.125rem' // 18px
            },

            fontSize: {
                xxs: '0.625rem', // 10px
                xs: '0.8125rem', // 13px
                sm: '0.9375rem', // 15px
                '2xl': '1.5rem', // 24px
                '4xl': '2.25rem' // 36px
            },
            lineHeight: {
                3: '0.9375rem', // 15px
                4: '1.125rem', // 18px
                4.5: '1.25rem', // 20px
                5: '1.375rem', // 22px
                8: '2.0625rem' // 33px
            },
            letterSpacing: {
                '-xs': '-0.1px',
                '-sm': '-0.25px',
                '-md': '-0.75px',
                '-lg': '-1px'
            },
            maxWidth: {
                'xl-container': '45.625rem' // 730px
            },
            minWidth: {
                '5/12': '41.666667%',
                '3/12': '25%',
                '2/12': '16.666667%',
                '1/12': '8.333333%'
            },
            height: {
                18: '4.5rem' // 72px
            },
            width: {
                26: '6.4375rem', // 103px
                98: '38.5rem', // 616px
                100: '44.9375rem' // 719px
            },
            borderRadius: {
                '2.5xl': '1.25rem' // 20px
            },
            inset: {
                18: '4.5rem' // 72px
            },
            colors: {
                white: {
                    0: '#FFF',
                    100: '#F8F8FB',
                    200: '#F9FAFE'
                },
                black: {
                    400: '#373B53',
                    500: '#252945',
                    600: '#1E2139',
                    700: '#141625',
                    800: '#0C0E16',
                    900: '#000000',
                    '900-half-transparent': 'rgba(0, 0, 0, 0.5)'
                },
                blue: {
                    100: '#DFE3FA',
                    200: '#888EB0',
                    300: '#7E88C3',
                    400: '#9277FF',
                    500: '#7C5DFA'
                },
                red: {
                    100: '#FF9797',
                    500: '#EC5757'
                },
                green: {
                    500: '#33D69F'
                },
                orange: {
                    500: '#FF8F00'
                }
            },
            fontFamily: {
                spartan: ['League Spartan', 'sans-serif']
            }
        }
    }
}
