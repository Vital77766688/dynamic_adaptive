const daElements = document.querySelectorAll('[data-da]')
const elements = []


daElements.forEach(element => {
	const data = element.dataset.da.split(',')
	elements.push(
		{'element': element,
	     'where': document.querySelector(`.${data[0]}`),
	     'new_index': data[1],
	 	 'breakpoint': data[2],
	 	 'current': element.parentNode,
	 	 'current_index': Array.from(element.parentNode.children).indexOf(element)}
	)
})

dynamicAdapt(elements)


function dynamicAdapt(elements) {
	elements.forEach(element => {
		const listener = e => {
			let index = 0
			if (element.new_index === 'first') {
				index = 0
			} else if(element.new_index === 'last') {
				index = element.where.children.length
			} else {
				index = element.new_index
			}
			element.where.insertBefore(element.element, element.where.children[index])
			swapElementPosition(element)			
		}
		const matchMedia = window.matchMedia(`(min-width: ${element.breakpoint}px)`)
		matchMedia.addListener(listener)
		if (matchMedia.matches) {
			listener()
		}
	})
	return false
}

function swapElementPosition(element) {
	const buffWhere = element.current
	const buffNewIndex = element.current_index
	element.current = element.where
	element.current_index = element.new_index
	element.where = buffWhere
	element.new_index = buffNewIndex
}