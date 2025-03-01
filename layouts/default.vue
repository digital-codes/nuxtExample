<template>
    <div class="layout" :class="{ dark: isDark }">
        <!-- Navigation -->
        <header class="p-4 flex justify-between items-center bg-light dark:bg-dark">
            <nav>
                <NuxtLink :to="`/${$i18n.locale !== 'de' ? $i18n.locale + '/' : ''}`" class="mx-2">
                    {{ $t("home") }}
                </NuxtLink>
                <NuxtLink :to="`/${$i18n.locale !== 'de' ? $i18n.locale + '/' : ''}projectList`" class="mx-2">
                    {{
                        $t("projectList") }}</NuxtLink>
                <NuxtLink :to="`/${$i18n.locale !== 'de' ? $i18n.locale + '/' : ''}contact`" class="mx-2">
                    {{
                        $t("contact") }}</NuxtLink>
            </nav>

            <div>

                <p>new lang switch</p>

                <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
                    Switch to {{ locale.name }}
                </NuxtLink>
            </div>

            <UVerticalNavigation :links="links" />

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

const items = [
    { title: "Home", icon: "home", active: true },
    { title: "Projects", icon: "projects", active: false },
    { title: "Contact", icon: "contact", active: false },
];

const links = [{
    label: 'Profile',
    avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
}, {
    label: 'Home',
    icon: 'i-material-symbols-home',
    to: '/'
}, {
    label: 'Projects',
    icon: 'i-heroicons-chart-bar',
    to: '/projectList'
}, {
    label: 'Contact',
    icon: 'i-openmoji-bullseye',
    to: '/contact'
}]

const mounted = ref(false);

const minimized = ref(false);

const isDark = ref(false);

const router = useRouter();
const route = useRoute();

const { locale, locales, loadLocaleMessages } = useI18n();
const switchLocalePath = useSwitchLocalePath()

console.log("Current locale:", locale.value);
console.log("Available locales:", locales.value);

const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
})

const colorMode = useColorMode()
console.log(colorMode.preference)

watch(locale, async (newLocale, oldLocale) => {

    const currentRoute = router.currentRoute.value.path;
    console.log("Current route:", currentRoute, newLocale);
    const newPath = newLocale !== 'de' ? `/${newLocale}${currentRoute}` : currentRoute == "" ? "/" : currentRoute;
    console.log("New path:", newPath);
    await navigateTo({ path: newPath })
    //router.push(newPath);
});

/*
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
    console.log("Current route:", currentRoute, newLocale);
    const newPath = newLocale !== 'de' ? `/${newLocale}${currentRoute}` : currentRoute == "" ? "/" : currentRoute;
    console.log("New path:", newPath);
    await navigateTo({ path: newPath })
    //router.push(newPath);
});
*/
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
    console.log("Setting mode:", mode)
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

// Enable reload ONLY in SSG (static mode)
/* 
if (!import.meta.dev && !import.meta.server) {
    watch(
        () => route.fullPath,
        (newPath, oldPath) => {
            if (import.meta.client && newPath !== oldPath) {
                window.location.reload(); // Only reload when navigating in SSG mode
            }
        }
    );
}
*/


onMounted(() => {
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const colorMode = useColorMode()
    isDark.value = savedTheme === "dark";
    setMode(colorMode.preference)
    mounted.value = true;
    console.log("Mounted", savedTheme);
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