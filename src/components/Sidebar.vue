<template functional>
	<div class="px-4">
		<div class="text-xl font-bold mb-2">Choose sort type</div>
		<div
			v-for="(sort, sortType) in data.attrs['sorting-data']"
			:key="sortType"
			class="border border-solid border-gray-600 rounded-md cursor-pointer mb-2 py-2"
			:class="{ 'bg-gray-600 text-white': data.attrs['selected-sort-types'].includes(sortType) }"
			@click="data.on['set-sort-toggle'](sortType)"
		>
			{{ sort.title }}
		</div>
	</div>
</template>