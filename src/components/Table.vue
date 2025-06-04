<template>
    <div class="table-container">
      <table class="custom-table roboto-fraco ">
        <thead>
          <tr>
            <th>Data</th>
            <th>Lançamento</th>
            <th>Detalhes</th>
            <th>Nº Documento</th>
            <th>Valor</th>
            <th>Tipo de Lançamento</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.NumeroDocumento">
            <td>{{ item.Data }}</td>
            <td>{{ item.Lancamento }}</td>
            <td>{{ item.Detalhes }}</td>
            <td>{{ item.NumeroDocumento }}</td>
            <td>{{ item.Valor }}</td>
            <td :style="item.TipoLancamento == 'Entrada' ? 'color:green' : 'color:red'">{{ item.TipoLancamento }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>


  defineProps({
  data: Object
})
</script>
  
  <style lang="scss" scoped>
  $table-bg: #f9f9f9;
  $header-bg: #eaeaea;
  $border-color: #dddddd;
  $text-color: #333;
  

  .custom-table {
    width: 90vw;
    border-collapse: collapse;
    font-family: 'Segoe UI', sans-serif;
    color: $text-color;
    background-color: $table-bg;
  
    th, td {

      padding: 0.75rem 1.2rem;
      text-align: left;
      border-bottom: 1px solid $border-color;
    }
  
    thead {
      background-color: $header-bg;
  
      th {
        font-weight: 600;
        font-size: 0.95rem;
        color: #555;
      }
    }
  
    tbody {
    
      tr {
        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }
</style>
  