<template>
	<div class="border border-solid border-gray-600 rounded-lg p-3">
		<div
			class="text-lg font-bold border rounded-lg bg-gray-600 text-white mb-4"
		>{{ sortTitle }}</div>
		<Display
			:initial-arr="arrLocal"
			:val-heights="valHeights"
			class="mb-4"
		/>
		<Timer :time="time"/>
	</div>
</template>

<script lang="ts">
import {
	Component, Vue, Prop, Watch,
} from 'vue-property-decorator'
import cloneDeep from 'lodash-es/cloneDeep'
import Display from '@/components/Display.vue'
import Timer from '@/components/Timer.vue'
import { SortingMethod } from '@/utils/types'

@Component({
	components: {
		Display,
		Timer,
	},
})
export default class Wrapper extends Vue {
	@Prop({ required: true }) initialArr!: Array<number>

	@Prop({ required: true }) sortTitle!: string

	@Prop({ required: true }) sortMethod!: SortingMethod

	@Prop({ required: true }) valHeights!: Record<number, string>

	arrLocal: Array<number> = []

	time = 0

	timerId = 0

	@Watch('initialArr', { immediate: true })
	async onChangeInitialArr(initialArr: Array<number>): Promise<void> {
		this.arrLocal = cloneDeep(initialArr)

		this.timerId = setInterval(() => {
			this.time += 10
		}, 10)

		await this.sortMethod(this.arrLocal)

		clearInterval(this.timerId)
	}

	destroyed(): void {
		clearInterval(this.timerId)
	}
}
</script>