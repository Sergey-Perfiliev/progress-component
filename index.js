const DEFAULT_SPEED = 8
const DEFAULT_CONTROLLERS = {
	value: '#progress-value',
	animated: '#progress-animated',
	hidden: '#progress-hidden'
}

class Progress {
	constructor(options) {
		this.progressBar = document.querySelector(options.progressBar)

		this.setControllers(options.controllers || DEFAULT_CONTROLLERS)
		this.setProgressValue(this.progress)
		this.initDOMListeners()

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

		this.progressBar.style.transform = `rotate(360deg)`
		this.progressBar.style.background = `conic-gradient(
			#005BFF ${this.progress * 3.6}deg,
			#EFF3F6 ${this.progress * 3.6}deg
		)`;
	}

	// progress animation
	startAnimation() {
		let progressAnimationValue = 0

		this._animationInterval = setInterval(() => {
			if (progressAnimationValue > 360) progressAnimationValue %= 360
			this.progressBar.style.transform = `rotate(${progressAnimationValue}deg)`;
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

	// progress hidden
	show() {
		this.progressBar.style.visibility = 'visible'
		this.progressBar.style.opacity = '1'
	}

	hide() {
		this.progressBar.style.visibility = 'hidden'
		this.progressBar.style.opacity = '0'
	}

	toggleHidden() {
		if (this.cHidden.checked) this.hide()
		else this.show()
	}
}

const ProgressBar = new Progress({
	progressBar: '.progress-bar',
	controllers: {
		value: '#progress-value',
		animated: '#progress-animated',
		hidden: '#progress-hidden'
	},
})
