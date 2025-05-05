<script setup >
import Headers from '@/components/Headers.vue';
import { handleFile } from '@/composables/consumodeArquivos';
import { ref } from 'vue';
const dados = ref([])


const importFile = async (e) => {
  dados.value = await handleFile(e)
}


</script>

<template>
<Headers/>
<div>
    <input type="file" @change="importFile" accept=".xlsx, .xls" />
    <pre>{{ dados }}</pre>
</div>
</template>

<style lang="scss">

</style>