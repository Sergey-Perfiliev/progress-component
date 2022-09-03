export class Component {
	constructor(selector) {
		this.component = document.querySelector(selector)
		this.hidden = false
	}

	// size
	get size() {
		return {
			width: this.component.style.width,
			height: this.component.style.height,
		}
	}

	set size(size) {
		// size format: {number} || {number}px
		this.component.style.width = `calc(${parseFloat(size)}px + 5vw)`
		this.component.style.height = `calc(${parseFloat(size)}px + 5vw)`
	}

	// progress hidden
	show() {
		this.hidden = false
		this.component.style.visibility = 'visible'
		this.component.style.opacity = '1'
	}

	hide() {
		this.hidden = true
		this.component.style.visibility = 'hidden'
		this.component.style.opacity = '0'
	}
}
