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
                {{ isDark ? "🌙 Dark Mode" : "☀️ Light Mode" }}
            </button>
        </header>

        <!-- Page Content -->
        <main class="p-6">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="p-4 text-center">
            &copy; {{ new Date().getFullYear() }} My Website
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";


const isDark = ref(false);

const router = useRouter();
const { locale, loadLocaleMessages } = useI18n();


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
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", isDark.value ? "dark" : "light");

    // ✅ Add/remove "dark" class to <html>
    document.body.classList.toggle("dark", isDark.value);

    console.log("Dark mode is now", isDark.value ? "enabled" : "disabled");
};

onMounted(() => {
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    isDark.value = savedTheme === "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.body.classList.toggle("dark", isDark.value);
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