import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { GET_PHOTOS_RANDOM, SEARCH_PHOTOS, MAX_RESULTS } from './constants';
import { get, post } from './fetchapi';
import Album from "./components/AlbumComponent";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: '',
			orientation: 'landscape',
			featured: 'true',
			photosJson: null,
			messages: []
		}

		this.searchImages = this.searchImages.bind(this);
	}

	searchImages() {
		get(GET_PHOTOS_RANDOM, {
			query: this.state.searchInput,
			orientation: this.state.orientation,
			featured: (this.state.featured == 'true'),
			count: MAX_RESULTS
		}).then(photosJson => {
			if (photosJson.errors && photosJson.errors.length > 0){
				this.setState({
					photosJson: null,
					messages: photosJson.errors
				})
			}else{
				this.setState({
					photosJson
				})
			}
			
		})
	}

	onInputChange(key, event) {
		var a = event.target.value;
		this.setState({
			[key]: a
		})
	}

	onSelectChange(key, event) {
		this.setState({
			[key]: event.currentTarget.selectedOptions[0].value
		})
	}

	render() {
		return (
			<div>
				<header className="header">
					Photo Viewer
      			</header>
				<div className="container">
					<form class="form-inline form-row">
						<div className="form-group col-3">
							<label htmlFor="user">Search:</label>
							<input className="form-control" onChange={this.onInputChange.bind(this, 'searchInput')} value={this.state.searchInput} />
						</div>
						<div className="form-group col-3">
							<label htmlFor="user">Orientation:</label>
							<select onChange={this.onSelectChange.bind(this, 'orientation')} value={this.state.orientation}>
								<option value="landscape">Landscape</option>
								<option value="portrait">Portrait</option>
								<option value="squarish">Squarish</option>
							</select>
						</div>
						<div className="form-group col-3">
							<label htmlFor="user">Featured:</label>
							<select onChange={this.onSelectChange.bind(this, 'featured')} value={this.state.featured}>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
						</div>
						<div className="form-group col-3">
							<input type="button" disabled={!this.state.searchInput.length} className="btn btn-primary" onClick={this.searchImages} value="Search" />
						</div>
					</form>

					{
						!this.state.messages.length && this.state.photosJson && <Album photos={this.state.photosJson} />
					}
					{
						!!this.state.messages.length && <div className="errormsg">
							{
								this.state.messages.map(msg => <p>{msg}</p>)
							}
							
						</div>
					}
					
				</div>
			</div>)
	}
}
