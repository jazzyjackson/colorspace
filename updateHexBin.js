let primeTimeout = null
let primeDebounce = 250 // how long to wait before recalculating nearest primes ?

function updateHexBin(hexcolor){
	if(hexcolor.includes('#')) hexcolor = hexcolor.slice(1)
	// if no target value, whats happening ? thats the undefined behavoir, you forgot to define...
	if(lastColor == hexcolor) return null // exit without further calculation
	else lastColor = hexcolor

	var red   = parseInt(hexcolor.slice(0, 2), 16) // extract leading bits 
	var green = parseInt(hexcolor.slice(2, 4), 16) // extract middle bits
	var blue  = parseInt(hexcolor.slice(4),    16) // extract last hex bytes

	// update the value in the textinput
	colorform.value = hexcolor
	// in hexadecimal we'll get an array of 6 characters 0-f
	// two characters per color
	;[red, green, blue].map(color => 
		 Array.from(color.toString(16).padStart(2, 0))
	).reduce((a, b) => 
		a.concat(b), []
	).forEach((hexbyte, byteindex) => {
		showhex.childNodes[byteindex].textContent = hexbyte
	})
	// in binary, an array of 24 characters, either 1 or 0
	;[red, green, blue].map(color => 
		Array.from(color.toString(2).padStart(8, 0))
	).reduce((a, b) =>
		a.concat(b), []
	).forEach((binbyte, byteindex) => {
		// Numbers 1 : 0 aren't value class names, booleanize '1' or '0'
		showbin.childNodes[byteindex].className = parseInt(binbyte) ? 'one' : 'zero'
		showbin.childNodes[byteindex].textContent = binbyte
	})

	clearTimeout(primeTimeout)
	sharedprime.classList.add('waiting')
	primeTimeout = setTimeout(() => {
		primeNeighbors(parseInt(hexcolor, 16), 16).forEach((primeColor, index) => {
			let primebutton = sharedprimebuttons[index]
			primebutton.value = primeColor
			primebutton.textContent = primeColor.toString(16)
			primebutton.style = `border-color: #${primeColor.toString(16)}`
		})
		sharedprime.classList.remove('waiting')
	}, primeDebounce)

}