<template>
    <div class="layout" :class="{ dark: isDark }">
        <!-- Navigation -->
        <header class="p-4 flex justify-between items-center bg-light dark:bg-dark">
            <nav>
                <NuxtLink :to="`/${$i18n.locale !== 'de' ? $i18n.locale + '/' : ''}`" class="mx-2">{{ $t("home") }}
                </NuxtLink>
                <NuxtLink :to="`/${$i18n.locale !== 'de' ? $i18n.locale + '/' : ''}projects`" class="mx-2">{{
                    $t("projects") }}</NuxtLink>
                <NuxtLink :to="`/${$i18n.locale !== 'de' ? $i18n.locale + '/' : ''}contact`" class="mx-2">{{
                    $t("contact") }}</NuxtLink>
            </nav>

            <!-- Language Switcher -->
            <select v-model="$i18n.locale" class="bg-transparent border p-1 rounded">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
            </select>

            <!-- Dark Mode Toggle -->
            <button @click="toggleDarkMode" class="ml-4">
                {{ !isDark ? "🌙 Dark Mode" : "☀️ Light Mode" }}
            </button>
        </header>

        <!-- Page Content -->
        <main class="p-6">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="p-4 text-center">
            &copy; {{ new Date().getFullYear() }} My Website
            <img src="~/assets/img/okl.svg" alt="Logo" class="h-6 inline-block  footer-logo" />
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";


const isDark = ref(false);

const router = useRouter();
const { locale, loadLocaleMessages } = useI18n();

const colorMode = useColorMode()
console.log(colorMode.preference)

watch(locale, async (newLocale, oldLocale) => {
    // when locale changes, load new locale messages here
    // otherwise new messages will be requested from router push but are not yet loaded
    // race condition, see nuxt docs for more info
    // https://i18n.nuxtjs.org/docs/api/vue-i18n#loadlocalemessages
    await loadLocaleMessages(newLocale); // ✅ Update i18n locale
    let currentRoute = router.currentRoute.value.path;

    if (oldLocale !== 'de' && currentRoute.startsWith(`/${oldLocale}`)) {
        currentRoute = currentRoute.replace(`/${oldLocale}`, '');
    }
    router.push(newLocale !== 'de' ? `${newLocale}${currentRoute}` : currentRoute);
});

const toggleDarkMode = () => {
    console.log(colorMode.preference)
    if (colorMode.preference === 'dark') {
        setMode("light");
        isDark.value = false;
    } else {
        setMode("dark");
        isDark.value = true;
    }
    console.log("Dark mode is now", colorMode.preference == "dark" ? "enabled" : "disabled");
};
const setMode = (mode) => {
    console.log("Setting mode:",mode)
    if (mode === 'light') {
        colorMode.preference = 'light'
        document.documentElement.setAttribute("data-theme", "light");
        document.body.classList.toggle("dark", false);
    } else {
        colorMode.preference = 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.classList.toggle("dark", true);
    }
    console.log("Dark mode is now", mode == "dark" ? "enabled" : "disabled");
};


onMounted(() => {
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const colorMode = useColorMode()
    setMode(colorMode.preference)
});
</script>

<style scoped lang="scss">
/* Light and Dark Mode Using CSS Variables */

.layout {
    background-color: var(--primary);
    color: var(--secondary);
    min-height: 100vh;
}

header {
    background-color: var(--header-bg);
    padding: 1rem;
}

a {
    text-decoration: none;
    font-weight: bold;
    color: inherit;
}

a:hover {
    text-decoration: underline;
}
</style>