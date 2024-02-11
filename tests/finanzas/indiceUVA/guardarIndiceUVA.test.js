import { describe, expect, it } from 'vitest'
import { leerRuta } from '@/utils/rutas.esjs'
import { extraerIndiceUVA } from '@/finanzas/extraccion/extraerIndiceUVA.esjs'
import { guardarIndiceUVA } from '@/finanzas/guardado/guardarIndiceUVA.esjs'
import { format, subDays, addDays } from "date-fns";

describe('guardarIndiceUVA', () => {
  it('guarda los indices UVA', async () => {
    const items = await extraerIndiceUVA(
      format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      format(addDays(new Date(), 1), 'yyyy-MM-dd')
    )

    expect(items.length).toBeGreaterThan(0)

    const esperado = await guardarIndiceUVA(items)

    expect(esperado).toBeDefined()

    const guardado = await leerRuta('/finanzas/indices/uva')

    for (const item of items) {
      expect(guardado).toContainEqual(item)
    }
  })
})
