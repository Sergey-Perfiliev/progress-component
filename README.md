# Progress block

Reusable Progress block for mobile devices

State:
- Normal - the base state in which, by setting the Value, one can control process arc size
- Animated - the state in which the block begins to rotate
- Hidden - the state to hide element from the page

## Preview

### Portrait preview<br>

![portrait-progressbar](https://user-images.githubusercontent.com/58782265/187674568-c9f684ab-5ed5-462d-bcf5-d88d0f2fe5dc.png) 

### Landscape preview 

![landscape-progressbar](https://user-images.githubusercontent.com/58782265/187674895-c58cd31c-0fbc-49aa-8ac9-ae10a6edc70b.png)

## Functionality

### Options

> `const ProgressBar = new Progress()`
> 
> **Constructor Options**
> - componentSelector (By default: `.progress-bar`)
>
> - controllers
> (By default: `value: '#progress-value', animated: '#progress-animated', hidden: '#progress-hidden'`)
>
> - size (By default: `120`)
>
> - intervalSpeed (By default: `8`) **CURRENTLY UNAVAILABLE**

### Size

> `const ProgressBar = new Progress( size: 120 )`
>
> `ProgressBar.size = 150`
>
> Can use `120px` format instead
>
> ADD ADDITIONAL SIZE 5vw BY DEFAULT

### Animation

> **To start and stop Animation**
>
> `ProgressBar.startAnimation()`
>
> `ProgressBar.stopAnimation()`
> 
> **Can use toggleAnimation instead**
>
> `ProgressBar.toggleAnimation()`

### Hidden

> **To hide and show block**
>
> `ProgressBar.hide()`
>
> `ProgressBar.show()`
>
> **Can use toggleHidden instead**
>
> `ProgressBar.toggleHidden()`
