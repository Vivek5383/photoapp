import React, { Component } from 'react';
import Photo from './PhotoComponent';

export default class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhotos: props.photos || []
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.showNext = this.showNext.bind(this);
        this.showPrev = this.showPrev.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.photos.length !== (state.photos && state.photos.length)) {
            return {
                selectedPhotos: props.photos,
            };
        }

        // Return null if the state hasn't changed
        return null;
    }

    componentDidMount() {

    }

    handleClick(event) {

    }

    updateDimensions() {

    }

    showPrev() {
        let index = this.state.currentIndex - 1;
        if (index < 0) index = this.state.selectedPhotos.length - 1;
        this.setState({ currentIndex: index });
    }

    showNext() {
        let index = this.state.currentIndex + 1;
        if (index >= this.state.selectedPhotos.length) index = 0;
        this.setState({ currentIndex: index });
    }

    render() {
        return (
            <div className="albumSelect">
                {this.state.selectedPhotos && this.state.selectedPhotos.map((photo, index) => {
                    return <Photo data={photo} />
                })}
            </div>
        );

    }
}