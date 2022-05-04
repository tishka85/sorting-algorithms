<template>
	<div>{{ preparedTime }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Timer extends Vue {
	@Prop({ required: true }) time!: number

	get preparedTime(): string {
		return this.time ? `${(this.time / 1000).toFixed(3)} sec.` : '-'
	}
}
</script>