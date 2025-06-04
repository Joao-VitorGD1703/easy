<template>
    <canvas ref="canvas"></canvas>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from 'vue'
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables)
  
  const canvas = ref(null)
  const chartInstance = ref(null)
  
  const props = defineProps({
    dataObject: {
      type: Object,
      required: true
    }
  })

  
  // Cria o gráfico somente quando os dados estiverem disponíveis
  watch(
    () => props.dataObject,
    (newVal) => {
      if (newVal?.Lancamento && newVal?.Valor && canvas.value) {
        if (chartInstance.value) {
          chartInstance.value.destroy()
        }
  
        chartInstance.value = new Chart(canvas.value, {
          type: 'doughnut',
          data: {
            labels: newVal.Lancamento,
            datasets: [{
              data: newVal.Valor,
              backgroundColor: ['#4b6cb7', '#ff9f40', '#4caf50', '#e74c3c']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false }
            }
          }
        })
      }
    },
    { immediate: true, deep: true }
  )
  </script>
  