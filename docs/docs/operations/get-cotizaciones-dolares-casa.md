---
aside: false
outline: false
title: Dólares por casa
---

<script setup>
import { useRoute, useData } from 'vitepress'

const route = useRoute()

const { isDark } = useData()
</script>

<OAOperation operation-id="get-cotizaciones-dolares-casa">

<template #footer="footer">

<!--@include: ./parts/get-cotizaciones-dolares-casa-footer.md -->

</template>

</OAOperation>
