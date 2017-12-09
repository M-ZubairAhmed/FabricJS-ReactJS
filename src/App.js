import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Canva from './Canva';

const UrlFromClient = new URL(window.location.href);

class App extends Component {
	constructor() {
		super();
		this.state = {
			backgroundImage: UrlFromClient.searchParams.get('originalImageURL'),
			productType: UrlFromClient.searchParams.get('productType'),
			customImageURL: 'http://lorempixel.com/100/100/',
			customText: 'Hello React!'
		};
	}

	render() {
		return (
			<Grid padded>
				<Grid.Row>
					<Grid.Column width={8}>
						<Canva {...this.state} />
					</Grid.Column>
					<Grid.Column width={6}>
						<div style={{ border: '1px solid #000', margin: 10, padding: 10 }}>
							<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
								Customization Tools
							</div>
							<div style={{ display: 'flex' }}>
								<div style={{ marginRight: 10 }}>Add customized image URL:</div>
								<input
									size="40"
									placeholder="Enter image URL"
									onChange={e =>
										this.setState({ customImageURL: e.target.value })}
								/>
							</div>
							<div style={{ display: 'flex' }}>
								<div style={{ marginRight: 10 }}>Add customized text:</div>
								<input
									size="40"
									placeholder="Enter text"
									onChange={e => this.setState({ customText: e.target.value })}
								/>
							</div>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const CustomInput = ({ inputParameter, onChangeHandler, placeholderText }) => {
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ display: 'flex-start' }}>{inputParameter}</div>
			<input
				size="40"
				placeholder={placeholderText}
				onChange={onChangeHandler()}
			/>
		</div>
	);
};

export default App;
