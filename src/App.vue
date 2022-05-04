<template>
	<div id="app">
		<div class="flex flex-wrap xl:container xl:mx-auto">
			<div class="flex-shrink-0 w-full sm:w-2/12 mb-4 sm:mb-0">
				<Sidebar
					:sorting-data="sortingData"
					:selected-sort-types="selectedSortTypes"
					@set-sort-toggle="setSortToggle"
				/>
			</div>
			<div
				v-if="initialArr.length"
				class="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 px-4"
			>
				<Wrapper
					v-for="sortType in selectedSortTypes"
					:key="sortType"
					:initial-arr="initialArr"
					:sort-method="sortingData[sortType].method"
					:sort-title="sortingData[sortType].title"
					:val-heights="valHeights"
					class="mb-2"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Sidebar from '@/components/Sidebar.vue'
import { MAX_VALUE, DISPLAY_HEIGHT } from '@/utils/constants/sortingData'
import { SortingType } from '@/utils/enums'
import Wrapper from '@/components/Wrapper.vue'
import { shuffle } from '@/utils/methods/utility'
import {
	bubble, insertion, selection, quick,
} from '@/utils/methods/sort'
import { SortingData } from '@/utils/types'

@Component({
	components: {
		Wrapper,
		Sidebar,
	},
})
export default class App extends Vue {
	readonly sortingData: SortingData = {
		[SortingType.bubble]: {
			title: 'Bubble sort',
			method: bubble,
		},
		[SortingType.insertion]: {
			title: 'Insertion sort',
			method: insertion,
		},
		[SortingType.selection]: {
			title: 'Selection sort',
			method: selection,
		},
		[SortingType.quick]: {
			title: 'Quick sort',
			method: quick,
		},
	}

	get valHeights(): Record<number, string> {
		const divider = +(DISPLAY_HEIGHT / MAX_VALUE).toFixed(1)

		return this.initialArr.reduce((result, val) => {
			const resultLocal = result
			resultLocal[val] = `${((val * divider) / DISPLAY_HEIGHT) * 100}%`
			return resultLocal
		}, {} as Record<number, string>)
	}

	initialArr: Array<number> = []

	selectedSortTypes: Array<SortingType> = []

	@Watch('selectedSortTypes')
	onChangeSelectedSortTypes(): void {
		this.setInitialArr()
	}

	created(): void {
		this.setSelectedAllSortTypes()
	}

	setInitialArr(): void {
		const initialArr = Array.from(Array(MAX_VALUE).keys())
		shuffle(initialArr)
		this.initialArr = initialArr
	}

	setSelectedAllSortTypes(): void {
		this.selectedSortTypes = Object.keys(this.sortingData) as Array<SortingType>
	}

	setSortToggle(sortingTypeToggle: SortingType): void {
		if (!this.selectedSortTypes.includes(sortingTypeToggle)) {
			this.selectedSortTypes.push(sortingTypeToggle)
		} else if (this.selectedSortTypes.length > 1) {
			this.selectedSortTypes = this.selectedSortTypes.filter(sortingType => sortingType !== sortingTypeToggle)
		}
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>