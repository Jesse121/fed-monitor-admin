<template>
  <a :href="to" rel="noopener" target="_blank" v-if="isExternal(to)">
    <slot />
  </a>
  <router-link :to="to" v-else>
    <slot />
  </router-link>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { isExternal } from "@/utils/validate";

  @Component({
    name: "SidebarItemLink"
  })
  export default class extends Vue {
    @Prop({ required: true }) private to!: string;

    private isExternal = isExternal;
  }
</script>
