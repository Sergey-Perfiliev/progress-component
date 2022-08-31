import { Component } from './Component.js'

const DEFAULT_SPEED = 8
const DEFAULT_PROGRESS_BAR_SELECTOR = '.progress-bar'
const DEFAULT_CONTROLLERS_SELECTORS = {
	value: '#progress-value',
	animated: '#progress-animated',
	hidden: '#progress-hidden'
}
const DEFAULT_PROGRESS_BAR_SIZE = 120

class Progress extends Component {
	constructor(options) {
		super(options.componentSelector || DEFAULT_PROGRESS_BAR_SELECTOR)

		// init
		this.setControllers(options.controllers || DEFAULT_CONTROLLERS_SELECTORS)
		this.setProgressValue(this.progress)
		this.initDOMListeners()

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
		this.cValue.oninput = () => this.setProgressValue()
		this.cAnimated.onclick = () => this.toggleAnimation()
		this.cHidden.onclick = () => this.toggleHidden()
	}

	// progress value
	get progress() {
		return this.cValue.value
	}

	set progress(value) {
		this.cValue.value = value || 0
	}

	setProgressValue() {
		// handle out of range progressValue
		this.progress = parseInt(this.cValue.value, 10)
		if (this.progress < 0) this.progress = 0
		else if (this.progress > 100) this.progress = 100

		this.component.style.transform = `rotate(360deg)`
		this.component.style.background = `conic-gradient(
			#005BFF ${this.progress * 3.6}deg,
			#EFF3F6 ${this.progress * 3.6}deg
		)`;
	}

	// progress animation
	startAnimation() {
		let progressAnimationValue = 0

		this._animationInterval = setInterval(() => {
			if (progressAnimationValue > 360) progressAnimationValue %= 360
			this.component.style.transform = `rotate(${progressAnimationValue}deg)`;
			++progressAnimationValue
		}, this.intervalSpeed);
	}

	stopAnimation() {
		clearInterval(this._animationInterval)
		this.setProgressValue()
	}

	toggleAnimation() {
		if (this.cAnimated.checked) this.startAnimation()
		else this.stopAnimation()
	}

	toggleHidden() {
		if (this.cHidden.checked) this.hide()
		else this.show()
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
