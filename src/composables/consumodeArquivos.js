import * as XLSX from 'xlsx'

/*export const handleFile = async (e) => {
  try {
    const file = e.target.files[0]
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result)
          const workbook = XLSX.read(data, { type: 'array' })

          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

          // Mapeamento de campos
          const jsonTransformado = rawJson.map(item => ({
            Data: item["Data"] || '',
            Lancamento: item["Lançamento"] || '',
            Detalhes: item["Detalhes"] || '',
            NumeroDocumento: item["N° documento"] || '',
            Valor: item["Valor"] || '',
            TipoLancamento: item["Tipo Lançamento"] || '',
          }))

          resolve(jsonTransformado)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  } catch (error) {
    console.error('Erro ao ler arquivo:', error)
    return []
  }
}*/


export const handleFile = async (e) => {
  try {
    const file = e.target.files[0]
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onload = (evt) => {
        try {
          const extension = file.name.split('.').pop().toLowerCase()
          let workbook

          if (extension === 'csv') {
            // Lê o conteúdo como texto para CSV
            const csv = evt.target.result
            workbook = XLSX.read(csv, { type: 'string' })
          } else {
            // Lê o conteúdo como array buffer para XLSX
            const data = new Uint8Array(evt.target.result)
            workbook = XLSX.read(data, { type: 'array' })
          }

          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

          // Mapeamento de campos
          const jsonTransformado = rawJson.map(item => ({
            Data: item["Data"] || '',
            Lancamento: item["Lançamento"] || '',
            Detalhes: item["Detalhes"] || '',
            NumeroDocumento: item["N° documento"] || '',
            Valor: item["Valor"] || '',
            TipoLancamento: item["Tipo Lançamento"] || '',
          }))

          resolve(jsonTransformado)
        } catch (err) {
          reject(err)
        }
      }

      reader.onerror = reject

      // Usa o tipo de leitura apropriado com base na extensão
      const extension = file.name.split('.').pop().toLowerCase()
      if (extension === 'csv') {
        reader.readAsText(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
    })
  } catch (error) {
    console.error('Erro ao ler arquivo:', error)
    return []
  }
}
