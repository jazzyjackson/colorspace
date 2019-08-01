function getquery(){
	return location
				.search
				.slice(1)
				.split('&')
				.map(e => 
					e.split('=')
				)
				.map(([name, value]) => 
					({[decodeURIComponent(name)]: decodeURIComponent(value)})
				).reduce((a,b) => Object.assign(a,b), new Object)
}