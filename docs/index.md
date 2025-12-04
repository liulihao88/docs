---
layout: home

title: docs
titleTemplate: Library

hero:
  name: docs
  text: ""
  tagline: andy凌雲-前端笔记文档
  image:
    src: /img/logo.svg
    alt: docs
  actions:
    - theme: brand
      text: 开始
      link: /technology/handwriting
    - theme: alt
      text: 在GitHub查看
      link: https://github.com/liulihao88/docs
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from './.vitepress/utils/fetchVersion'

onMounted(() => {
  fetchVersion()
})
</script>
