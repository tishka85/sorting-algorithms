import { SortingType } from '@/utils/enums'

export type SortingMethod = (arr: Array<number>) => void
export type SortingData = Readonly<Record<SortingType, { title: string, method: SortingMethod }>>