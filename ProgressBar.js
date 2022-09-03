import { Component } from './Component.js'

const DEFAULT_SPEED = 8
const DEFAULT_PROGRESS_BAR_SELECTOR = '.progress-bar'
const DEFAULT_CONTROLLERS_SELECTORS = {
	value: '#progress-value',
	animated: '#progress-animated',
	hidden: '#progress-hidden'
}
const DEFAULT_PROGRESS_BAR_SIZE = 120
const ANIMATION_CLASS = 'progress-bar-animation'

class Progress extends Component {
	constructor(options) {
		super(options.componentSelector || DEFAULT_PROGRESS_BAR_SELECTOR)

		// init
		this.setControllers(options.controllers || DEFAULT_CONTROLLERS_SELECTORS)
		this.initDOMListeners()

		this._animated = false
		this._progress = this.cValue.value || 0
		this.setProgress(this._progress)

		this.size = options.size || DEFAULT_PROGRESS_BAR_SIZE
		this.intervalSpeed = options.intervalSpeed || DEFAULT_SPEED
	}

	setControllers(controllers) {
		// initialize controllers
		this.cValue = document.querySelector(controllers.value)
		this.cAnimated = document.querySelector(controllers.animated)
		this.cHidden = document.querySelector(controllers.hidden)
	}

	initDOMListeners() {
		this.cValue.addEventListener('input', () => {
			this.cValue.value = this._progress = this._validateProgress(this.cValue.value)
			this.setProgress()
		})
		this.cAnimated.addEventListener('click', () => this.toggleAnimation())
		this.cHidden.addEventListener('click', () => this.toggleHidden())
	}

	setProgress(value = this._progress) {
		this.cValue.value = this._progress = this._validateProgress(value)

		this.component.style.transform = `rotate(360deg)`
		this.component.style.background = `conic-gradient(
			#005BFF ${this._progress * 3.6}deg,
			#EFF3F6 ${this._progress * 3.6}deg
		)`;
	}

	// progress animation
	startAnimation() {
		this._animated = true
		this.component.classList.add(ANIMATION_CLASS)
	}

	stopAnimation() {
		this._animated = false
		this.component.classList.remove(ANIMATION_CLASS)
		this.setProgress()
	}

	toggleAnimation() {
		if (this._animated) this.stopAnimation()
		else this.startAnimation()
	}

	toggleHidden() {
		if (this._hidden) this.show()
		else this.hide()
	}

	_validateProgress(value) {
		let validValue = parseInt(value, 10) || 0
		if (validValue < 0) validValue = 0
		else if (validValue > 100) validValue = 100
		return validValue
	}
}

const ProgressBar = new Progress({
	componentSelector: '.progress-bar',
	controllers: {
		value: '#progress-value',
		animated: '#progress-animated',
		hidden: '#progress-hidden'
	},
})
