<template>
	<div class="px-4">
		<div class="text-xl font-bold mb-2">Choose sort type</div>
		<div
			v-for="(sort, sortType) in sortingData"
			:key="sortType"
			class="border border-solid border-gray-600 rounded-md cursor-pointer mb-2 py-2"
			:class="{ 'bg-gray-600 text-white': isSortTypeActive(sortType) }"
			@click="setSortToggle(sortType)"
		>
			{{ sort.title }}
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SortingData } from '@/utils/types'
import { SortingType } from '@/utils/enums'

@Component
export default class Sidebar extends Vue {
	@Prop({ required: true }) sortingData!: SortingData

	@Prop({ required: true }) selectedSortTypes!: Array<SortingType>

	created(): void {
		this.setSelectedAllSortTypes(Object.keys(this.sortingData) as Array<SortingType>)
	}

	setSortToggle(sortingTypeToggle: SortingType): void {
		if (this.selectedSortTypes.includes(sortingTypeToggle) && this.selectedSortTypes.length === 1) return

		const newSelectedSortTypes = this.selectedSortTypes.includes(sortingTypeToggle)
			? this.selectedSortTypes.filter(sortingType => sortingType !== sortingTypeToggle)
			: [...this.selectedSortTypes, sortingTypeToggle]

		this.setSelectedAllSortTypes(newSelectedSortTypes)
	}

	setSelectedAllSortTypes(newSelectedSortTypes: Array<SortingType>): void {
		this.$emit('update:selected-sort-types', newSelectedSortTypes)
	}

	isSortTypeActive(sortType: SortingType): boolean {
		return this.selectedSortTypes.includes(sortType)
	}
}
</script>