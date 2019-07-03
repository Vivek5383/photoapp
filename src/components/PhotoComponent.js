import React, { Component } from 'react';

export default class Photo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {data} = this.props;
        return <div className="card">
            <div className="card-body">
                <h6 className="card-title">{}</h6>
                <div className="row card-content">
                    <img src={data.urls.thumb} onClick={e =>  window.open(data.urls.full)} />
                    <ul>
                        <li><strong>Photographer : </strong>{data.user.name}</li>
                        <li><strong>Download Count : </strong>{data.downloads}</li>
                        <li><strong>Like :</strong> {data.likes}</li>
                        <li><strong>Description : </strong>{data.description ? data.description : data.alt_description}</li>
                    </ul>
                </div>
            </div>
        </div>
    }
}