import { describe, expect, it } from 'vitest'
import { leerRuta } from '@/utils/rutas.esjs'
import { extraerInflacionesInteranual } from '@/finanzas/extraccion/extraerInflacionesInteranual.esjs'
import { guardarInflacionesInteranual } from '@/finanzas/guardado/guardarInflacionesInteranual.esjs'
import { subMonths, addMonths, format } from 'date-fns'

describe('guardarInflacionesInteranual', () => {
  it('guarda los inflaciones interanuales', async () => {
    const desde = subMonths(new Date(), 3)
    const hasta = addMonths(new Date(), 3)
    const inflaciones = await extraerInflacionesInteranual(
      format(desde, 'yyyy-MM-dd'),
      format(hasta, 'yyyy-MM-dd')
    )

    expect(inflaciones.length).toBeGreaterThan(0)

    const esperado = await guardarInflacionesInteranual(inflaciones)

    expect(esperado).toBeDefined()
    //
    const guardado = await leerRuta('/finanzas/indices/inflacionInteranual', inflaciones)

    for (const inflacion of inflaciones) {
      expect(guardado).toContainEqual(inflacion)
    }
  })
})
