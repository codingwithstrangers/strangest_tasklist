/** @type {Animation} */
let primaryAnimation;
/** @type {Animation} */
let secondaryAnimation;
let isScrolling = false;

const gapSize = getComputedStyle(document.documentElement)
	.getPropertyValue("--card-gap-between")
	.slice(0, -2);

/**
 * Animates the scroll of the task list
 * @returns {void}
 */
export function animateScroll() {
	const wrapper = document.querySelector(".task-wrapper");
	const wrapperHeight = wrapper.clientHeight;

	const containerPrimary = document.querySelector(".task-container.primary");
	const containerHeight = containerPrimary.scrollHeight;

	/** @type {HTMLElement} */
	const containerSecondary = document.querySelector(
		".task-container.secondary"
	);

	if (containerHeight > wrapperHeight && !isScrolling) {
		containerSecondary.style.display = "block";
		const scrollSpeed = _settings.scrollSpeed.toString();
		let parsedSpeed = parseInt(scrollSpeed, 10);
		let adjustedHight = containerHeight + (parseInt(gapSize, 10) * 2);
		let duration = (adjustedHight / parsedSpeed) * 1000;
		let animationOptions = {
			duration: duration,
			iterations: 1,
			easing: "linear",
		};

		let primaryKeyFrames = [
			{ transform: "translateY(0)" },
			{ transform: `translateY(-${adjustedHight}px)` },
		];
		let secondaryKeyFrames = [
			{ transform: "translateY(0)" },
			{ transform: `translateY(-${adjustedHight}px)` },
		];
		// store and apply animations
		primaryAnimation = containerPrimary.animate(
			primaryKeyFrames,
			animationOptions
		);
		secondaryAnimation = containerSecondary.animate(
			secondaryKeyFrames,
			animationOptions
		);

		isScrolling = true;
		addAnimationListeners();
	} else if (containerHeight <= wrapperHeight) {
		containerSecondary.style.display = "none";
		cancelAnimation();
	}
}

function cancelAnimation() {
	if (primaryAnimation) {
		primaryAnimation.cancel();
	}
	if (secondaryAnimation) {
		secondaryAnimation.cancel();
	}
	isScrolling = false;
}

function addAnimationListeners() {
	if (primaryAnimation) {
		primaryAnimation.addEventListener("finish", animationFinished);
		primaryAnimation.addEventListener("cancel", animationFinished);
	}
}

function animationFinished() {
	isScrolling = false;
	animateScroll();
}
