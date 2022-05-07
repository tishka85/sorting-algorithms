<template>
	<div class="flex items-end" :style="`height: ${displayHeight}px`">
		<div
			v-for="val in initialArr"
			:key="val"
			:style="`height: ${valHeights[val]}; width: ${valueWidth}`"
			class="bg-gray-600 border border-solid border-white"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CNT_ITEMS, DISPLAY_HEIGHT } from '@/utils/constants/sortingData'

const valueWidth = `${100 / CNT_ITEMS}%`

@Component
export default class Display extends Vue {
	@Prop({ required: true }) initialArr!: Array<number>

	@Prop({ required: true }) valHeights!: Record<number, string>

	valueWidth = valueWidth

	displayHeight = DISPLAY_HEIGHT
}
</script>