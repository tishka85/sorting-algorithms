import { SortingMethod } from '@/utils/types'
import { sleep, swap } from '@/utils/methods/utility'

const bubble: SortingMethod = async arr => {
	const { length } = arr

	for (let j = length - 1; j > 0; j--) {
		for (let i = 0; i < j; i++) {
			if (arr[i] > arr[i + 1]) {
				swap(arr, i, i + 1)

				await sleep()
			}
		}
	}
}

const insertion: SortingMethod = async arr => {
	const { length } = arr

	for (let i = 1; i < length; i++) {
		let current = i

		while (arr[current - 1] !== undefined && arr[current] < arr[current - 1]) {
			swap(arr, current - 1, current)
			current -= 1

			await sleep()
		}
	}
}

const selection: SortingMethod = async arr => {
	const { length } = arr

	let minIndex
	for (let i = 0; i < length - 1; i++) {
		minIndex = i

		for (let j = i; j < length; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j
			}
		}

		if (i !== minIndex) {
			swap(arr, i, minIndex)
			await sleep()
		}
	}
}

const quickPartition = async (items: Array<number>, left: number, right: number): Promise<number> => {
	const pivot = items[Math.floor((right + left) / 2)]
	let i = left
	let j = right

	while (i <= j) {
		while (items[i] < pivot) {
			i += 1
		}

		while (items[j] > pivot) {
			j -= 1
		}
		if (i <= j) {
			swap(items, i, j)

			await sleep()
			i += 1
			j -= 1
		}
	}

	return i
}

const quickUtility = async (items: Array<number>, left = 0, right: number = items.length - 1): Promise<void> => {
	let index

	if (items.length > 1) {
		index = await quickPartition(items, left, right)
		if (left < index - 1) {
			quickUtility(items, left, index - 1)
		}
		if (index < right) {
			quickUtility(items, index, right)
		}
	}
}

const quick: SortingMethod = async arr => {
	await quickUtility(arr)
}

export {
	bubble,
	insertion,
	selection,
	quick,
}