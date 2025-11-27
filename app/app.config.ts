export default defineAppConfig({
    ui: {
        // ---- gpt recommendations --------------------
        colors: {
            // main CTAs, brand coloring
            primary: 'brand',

            // secondary buttons or highlighted elements
            secondary: 'accent',

            // link-like info (can use the blue link palette)
            info: 'link',

            // success / positive actions – keep Tailwind’s green
            success: 'green',

            // warnings: also use the yellow accent palette
            warning: 'accent',

            // errors: keep Tailwind’s red
            error: 'red',

            // base text / background / borders
            neutral: 'neutral'
        },
        // ------------------------
        strategy: 'override',
        button: {
            color: {
                white: {
                    solid: 'bg-white dark:bg-gray-900'
                }
            }
        },
        slideover: {
            width: "max-w-60 md:max-w-sm"
        }
    }
})
