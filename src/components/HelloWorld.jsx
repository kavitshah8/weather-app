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
            let channel = response.query.results.channel
            let condition = channel.item.condition
            let forecast = channel.item.forecast
            let units = channel.units
            console.log(channel.item.forecast)

            this.setState({
                date: condition.date,
                temp: condition.temp,
                text: condition.text,
                units: {
                    temp: units.temperature
                },
                forecast: forecast,
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

    renderForecast() {
        let {temp} = this.state.units
        return this.state.forecast.map( (el, index) => {
            if (index == 0) return
            return(
                <div key={index} className="card">
                    <div className="card-block">
                        <p>
                            {el.day}
                            <span>, </span>
                            {el.date}
                        </p>
                        <p> High : {el.high} {temp} </p>
                        <p> Low : {el.low} {temp} </p>
                        <p> Weather : {el.text} </p>
                    </div>
                </div>
            )
        })

    }

    renderWeather() {
        if (this.state.showWeather) {
            return(
                <div>
                <div className="card">
                    <div className="card-block">
                        <p>{this.state.date}</p>
                        <p>
                            {this.state.temp}
                            <span> </span>
                            {this.state.units.temp}
                            <br/>
                            Weather: {this.state.text}
                        </p>
                    </div>
                </div>
                    {this.renderForecast()}
                </div>
            )
        }
    }

    render () {
        const value = this.state.value
        return (
            <div className="container-fluid">
                <form className="form-inline" onSubmit={this.formSubmit}>
                    <input className="form-control" type="text" value={value} onChange={this.onChange} />
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
