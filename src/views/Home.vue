<script setup>
import DowloadComponant from '@/components/DowloadComponant.vue'
import Grafs from '@/components/Grafs.vue'
import Headers from '@/components/Headers.vue'
import Table from '@/components/Table.vue'
import { ref } from 'vue'

const dados = ref([])

const onFileImported = (fileData) => {
  dados.value = fileData
  
  console.log('Arquivo recebido do filho:', fileData)
}

const paginaAtual = ref('grafs') // valor inicial

</script>

<template>
  <Headers />
  <div class="container-main">
    <DowloadComponant @fileImported="onFileImported" class="dowload" />
    
    <div class="switchs">
      <div class="pages">
        <button @click="paginaAtual = 'grafs'">Grafs</button>
        <button @click="paginaAtual = 'tabela'">Table</button>
      </div>
    </div>

    <Grafs v-if="paginaAtual === 'grafs'" class="grafs" :dataGraf="dados" />
    <Table v-if="paginaAtual === 'tabela'" :data="dados" />
  </div>
</template>


<style scoped lang="scss">
.container-main{
  width: 90%;
  height: auto;
  margin: 0 auto;
  padding: 3em 0em;
  display: flex;
  flex-direction: column;
  align-items: center;
  

  .dowload{
  display: flex;
    margin-left: auto;
  }

  .switchs{
    width: 100%;
    height: 2.5em;
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #ccc;
   
    .pages{
      width: auto;
    height: 2em;
    display: flex;
    flex-direction: row;

    button{
      width: 7em;
      height: 3em;
      border-radius: 0.5em 0.5em 0em 0em;
      cursor: pointer;
    }
    }
  
  
  }
 

  
}
</style>