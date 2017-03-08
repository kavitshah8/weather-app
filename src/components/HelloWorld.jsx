import React, {Component} from 'react'

class HellowWorld extends Component {

    constructor(props) {
        super(props)

        let l = window.localStorage.getItem('location') || 'San Francisco, CA'
        this.state = {
            value: l,
            date: new Date(),
            showWeather: false
        }

        this.formSubmit = this.formSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    formSubmit(e) {
        e.preventDefault()
        let location = this.state.value

        window.localStorage.setItem('location', location)

        let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22
            ${location}
            %22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

        fetch(url).then( data => {
            return data.json()
        }).then( response => {
            let condition = response.query.results.channel.item.condition
            let units = response.query.results.channel.units
            this.setState({
                date: condition.date,
                temp: condition.temp,
                text: condition.text,
                units: {
                    temp: units.temperature
                },
                showWeather: true
            })
        }).catch( err => {
            console.error(err)
        })
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    renderWeather() {
        if (this.state.showWeather) {
            return(
                <div>
                    <p>{this.state.date}</p>
                    <p>{this.state.temp} {this.state.units.temp} {this.state.text}</p>
                </div>
            )
        }
    }

    render () {
        const value = this.state.value
        return (
            <div>
                <form onSubmit={this.formSubmit}>
                    <input type="text" value={value} onChange={this.onChange} />
                    <button>
                        Submit
                    </button>
                </form>
                {this.renderWeather()}
            </div>
        );
    }
}

export default HellowWorld;
