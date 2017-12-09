import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { Grid, Row, Col } from 'react-bootstrap';
import Creation from './Creation';
import Canva from './Canva';

const UrlFromClient = new URL(window.location.href);

class App extends Component {
	constructor() {
		super();
		this.state = {
			backgroundImage: UrlFromClient.searchParams.get('originalImageURL'),
			productType: UrlFromClient.searchParams.get('productType'),
			customImageURL: '',
			customText: '',
			fontStyleIndex: 0,
			disableButtons: true
		};
	}

	renderCustomizationProduct() {
		const fontStyleArray = ['normal', 'bold', 'italic'];
		return (
			<Row>
				<Col lg={8}>
					<Canva
						backgroundImage={this.state.backgroundImage}
						productType={this.state.productType}
						customText={this.state.customText}
						customImageURL={this.state.customImageURL}
						fontStyle={fontStyleArray[this.state.fontStyleIndex]}
					/>
				</Col>
				<Col lg={4}>
					<div style={{ border: '1px solid #000', margin: 10, padding: 10 }}>
						<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
							Customization Tools
						</div>
						<CustomInput
							inputParameter="Add customized image URL:"
							placeholderText="Enter image URL"
							onChangeHandler={e =>
								this.setState({ customImageURL: e.target.value })}
						/>
						<CustomInput
							inputParameter="Add customized text:"
							placeholderText="Enter text"
							onChangeHandler={e =>
								this.setState({
									customText: e.target.value,
									disableButtons:
										this.state.customText === '' || e.target.value === ''
								})}
						/>
						<div style={{ display: 'flex' }}>
							<Button
								disabled={this.state.disableButtons}
								onClick={() =>
									this.setState({
										fontStyleIndex:
											this.state.fontStyleIndex !== 2
												? this.state.fontStyleIndex + 1
												: 0
									})}
							>
								{
									fontStyleArray[
										this.state.fontStyleIndex !== 2
											? this.state.fontStyleIndex + 1
											: 0
									]
								}
							</Button>
						</div>
					</div>
				</Col>
			</Row>
		);
	}

	renderCreatingProduct() {
		return (
			<Row>
				<Creation />
			</Row>
		);
	}

	render() {
		return (
			<Grid>
				{this.state.productType === 'trophy'
					? this.renderCreatingProduct()
					: this.renderCustomizationProduct()}
			</Grid>
		);
	}
}

const CustomInput = ({ inputParameter, onChangeHandler, placeholderText }) => {
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ display: 'flex-start' }}>{inputParameter}</div>
			<Input
				style={{ display: 'flex-end' }}
				size="medium"
				placeholder={placeholderText}
				onChange={onChangeHandler}
			/>
		</div>
	);
};

const CustomInputGroup = props => {
	return (
		<div style={{ display: 'flex' }}>
			{props.customInputElements.map(customElement => {
				<CustomInput {...customElement} />;
			})}
		</div>
	);
};

export default App;
