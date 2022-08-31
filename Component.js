export class Component {
	constructor(selector) {
		this.component = document.querySelector(selector)
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
		this.component.style.width = `${parseFloat(size)}px`
		this.component.style.height = `${parseFloat(size)}px`
	}

	// progress hidden
	show() {
		this.component.style.visibility = 'visible'
		this.component.style.opacity = '1'
	}

	hide() {
		this.component.style.visibility = 'hidden'
		this.component.style.opacity = '0'
	}
}
