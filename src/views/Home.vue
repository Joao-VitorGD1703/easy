<script setup>
import DowloadComponant from '@/components/DowloadComponant.vue'
import Headers from '@/components/Headers.vue'
import { ref } from 'vue'

const dados = ref([])

const onFileImported = (fileData) => {
  dados.value = fileData
  console.log('Arquivo recebido do filho:', fileData)
}
</script>

<template>
  <Headers />
  <div class="container-main">
    <DowloadComponant @fileImported="onFileImported" />
    <table border="1">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Idade</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>João</td>
      <td>30</td>
      <td>joao@email.com</td>
    </tr>
    <tr>
      <td>Maria</td>
      <td>25</td>
      <td>maria@email.com</td>
    </tr>
  </tbody>
</table>
  </div>
 

</template>


<style scoped lang="scss">
.container-main{
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding: 1em 0em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>