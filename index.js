class Progress {
	constructor(options) {
		this.progressBar = document.querySelector(options.progressBar)
		this.setControllers(options.controllers)
		this.setProgress(this.progress)
	}

	setControllers(controllers) {
		// initialize controllers
		this.cValue = document.querySelector(controllers.value)
		this.cAnimated = document.querySelector(controllers.animated)
		this.cHidden = document.querySelector(controllers.hidden)
	}

	// progress value
	get progress() {
		return this.cValue.value
	}

	set progress(value) {
		this.cValue.value = value || 0
	}

	setProgress() {
		// handle out of range progressValue
		this.progress = parseInt(this.cValue.value)
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
		let speed = 8

		this._animationInterval = setInterval(() => {
			if (progressAnimationValue > 360) progressAnimationValue %= 360
			this.progressBar.style.transform = `rotate(${progressAnimationValue}deg)`;
			++progressAnimationValue
		}, speed);
	}

	stopAnimation() {
		clearInterval(this._animationInterval)
		this.setProgress()
	}

	toggleAnimation() {
		if (this.cAnimated.checked) this.startAnimation()
		else this.stopAnimation()
	}

	// progress hidden
	show() { this.progressBar.style.visibility = 'visible' }

	hide() { this.progressBar.style.visibility = 'hidden' }

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
	}
})

ProgressBar.cValue.oninput = () => ProgressBar.setProgress()
ProgressBar.cAnimated.onclick = () => ProgressBar.toggleAnimation()
ProgressBar.cHidden.onclick = () => ProgressBar.toggleHidden()
