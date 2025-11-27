<!-- components/SiteHero.vue -->
<template>
  <section class="hero-oklab">
    <UContainer class="grid gap-10 md:grid-cols-2 items-center">
      <!-- Text block -->
      <div>
        <h1 class="hero-oklab-title">
          OK Lab Karlsruhe
        </h1>

        <p class="hero-oklab-subtitle">
          Open Knowledge – Freies Wissen mit digitalen Werkzeugen für alle!
        </p>

        <p class="mt-6 text-lg text-neutral-700 max-w-xl">
          Wir nutzen offene Daten, entwickeln Anwendungen und stärken
          Partizipation in Karlsruhe und darüber hinaus.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <UButton
            color="primary"
            size="lg"
            class="font-semibold"
            to="/mitmachen"
          >
            Werde Stadtentwickler*in!
          </UButton>

          <UButton
            color="secondary"
            variant="ghost"
            size="lg"
            to="/projekte"
          >
            Zu den Projekten
          </UButton>
        </div>
      </div>

      <!-- Visual block -->
      <div class="relative">
        <!-- Image placeholder; swap for <NuxtImg> or static asset -->
        <div
          class="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-500 to-link-500/80 shadow-lg flex items-center justify-center"
        >
          <span class="text-white text-lg font-semibold text-center px-6">
            Civic Tech, offene Daten und digitale Werkzeuge
          </span>
        </div>
      </div>
    </UContainer>
  </section>
</template>
