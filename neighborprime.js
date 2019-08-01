
	function sumRGB(hexcolor, addRed, addGreen, addBlue){
		hexcolor += addRed << 16
		hexcolor += addGreen << 8
		hexcolor += addBlue
		return hexcolor
	}

	/**
	@param [Number] hexcolor
	@param [Number] numberOfNeighbors
	@return [Array[Number]]
	**/
	function primeNeighbors(hexcolor, numberOfNeighbors, max = 0xffffff){
		let neighbors = new Array
		let d = 0 // distance
		while(neighbors.length < numberOfNeighbors){
			[
				sumRGB(hexcolor, d,  0, 0),
				sumRGB(hexcolor, -d, 0, 0),
				sumRGB(hexcolor, 0, d,  0),
				sumRGB(hexcolor, 0, -d, 0),
				sumRGB(hexcolor, 0, 0, d ),
				sumRGB(hexcolor, 0, 0, -d)
			].filter(sumcolor =>
				sumcolor > 0 && sumcolor < max
			).forEach(sumcolor => {
				if(isPrime(sumcolor)){
					neighbors.push(sumcolor)
				}
			})
			d++
		}
		return neighbors.slice(0, numberOfNeighbors).map(hexcolor =>
			hexcolor.toString(16).padStart(6, 0)
		)
	}