---
layout: home

title: docs
titleTemplate: Library

hero:
  name: docs
  text: ""
  tagline: 前端笔记文档
  image:
    src: /logo-with-shadow.png
    alt: docs
  actions:
    - theme: brand
      text: Get Started
      link: /vue2/note-1
    - theme: alt
      text: View on GitHub
      link: https://github.com/liulihao88/docs
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchVersion } from './.vitepress/utils/fetchVersion'

onMounted(() => {
  fetchVersion()
})
</script>
