---
aside: false
outline: false
title: Riesgo país
---

<script setup>
import { useRoute, useData } from 'vitepress'

const route = useRoute()

const { isDark } = useData()
</script>

<OAOperation operation-id="get-finanzas-indices-riesgo-pais">

<template #footer="footer">

<OAFooter />

<!--@include: ./parts/get-finanzas-indices-riesgo-pais-footer.md -->

</template>

</OAOperation>
