import * as React from 'react';
import api from '../../server/index';
import './index.css';
import NumberFormat from 'react-number-format';

class CarsView extends React.Component {
    state = {
        response: [],
        duration: "1",
        distance: "50",
        filterDays: [],
        filterDistance:[]
    };

    componentDidMount() {
        this.callApi()
        .catch(err => console.log(err));

        for (let index = 1; index < 31; index++) {
                this.state.filterDays.push({index: index.toString()});
        }
        for (let index = 50; index < 3051; index += 50) {
            if(index < 3001) 
                this.state.filterDistance.push({index: index.toString()});
            else
                this.state.filterDistance.push({index: "up to 3000"});
        }
    }

    callApi = async () => {
        var query = "?duration=" + this.state.duration + '&distance=' + this.state.distance;

        const response = await fetch(`/cars.json${query}`,);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
            this.setState({ response: body });

        return body;
    };
  
    updateDurationValue = (evt) => {
        this.setState({
            duration: evt.target.value
        });

        this.callApi()
        .catch(err => console.log(err));
    };

    updateDistanceValue = (evt) => {
        this.setState({
            distance: evt.target.value
        });

        this.callApi()
        .catch(err => console.log(err));
    };

    calculatePriceDiscount(pricePerDay, pricePerKm){
        var price = (pricePerDay * parseInt(this.state.duration)) + (pricePerKm * parseInt(this.state.distance));
        
        if (parseInt(this.state.distance) >= 10){
            price = price - (price * 0.05);
        } 
        else if (parseInt(this.state.distance) >= 4) {
            price = price - (price * 0.03);
        } 
        else if (parseInt(this.state.distance) >= 1) {
            price = price - (price * 0.01);
        }
        
        return price;
    };
calculatePrice(pricePerDay, pricePerKm){
    var price = (pricePerDay * parseInt(this.state.duration)) + (pricePerKm * parseInt(this.state.distance));
    return price;
};

  render() {
    const {response} = this.state;
    return (
      <div className="cars-list">
       <div className="filters flex flex-wrap">
            <div className="field-filter">
                <legend><span className="number">1</span> Days</legend>
                <select className="select" id="job" name="Days" onChange={this.updateDurationValue} >
                { 
                    this.state.filterDays.map(day => (
                    <option value={day.index}>{day.index}</option>
                ))}
                </select>  
            </div>
            <div className="field-filter">
                <legend><span className="number">2</span> Distance (km)</legend>
                <select className="select" id="job" name="Distance" onChange={this.updateDistanceValue}>
                {this.state.filterDistance.map(distance => (
                    <option value={distance.index}>{distance.index}</option>
                ))}
                </select>  
            </div>
        </div>
        <section className="container flex flex-wrap">
            {response.map(car => (
                <article key={car.id} className="item">
                    <strong><img src={car.picturePath} className="img-cars" alt="logo" /></strong>
                    <p><strong>{car.brand}</strong> {car.model}</p>
                    <p className="priceOriginal">
                        <NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={this.calculatePrice(car.pricePerDay, car.pricePerKm)}/>
                    </p>
                    <p>
                        <NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value={this.calculatePriceDiscount(car.pricePerDay, car.pricePerKm)}/>
                    </p>
                </article>
            ))}
        </section>
      </div>
    );
  }
}

export default CarsView;