import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import Creation from './Creation';
import Canva from './Canva';

const UrlFromClient = new URL(window.location.href);

class App extends Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: UrlFromClient.searchParams.get('originalImageURL'),
      productType: UrlFromClient.searchParams.get('productType'),
      uniqueId: UrlFromClient.searchParams.get('uniqueId'),
      customImageURL: '',
      customText: '',
      fontStyleIndex: 0,
      disableButtons: true,
    };
  }

  renderCustomizationProduct() {
    const fontStyleArray = ['normal', 'bold', 'italic'];
    const editorStyles = {
      marginTop: '5rem',
    };
    return (
      <Row style={editorStyles}>
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
          <Panel>
            <h4>Customize</h4>
            <CustomInput
              inputParameter="Add customized image URL:"
              placeholderText="Enter image URL"
              onChangeHandler={e =>
                this.setState({ customImageURL: e.target.value })
              }
            />
            <CustomInput
              inputParameter="Add customized text:"
              placeholderText="Enter text"
              onChangeHandler={e =>
                this.setState({
                  customText: e.target.value,
                  disableButtons:
                    this.state.customText === '' || e.target.value === '',
                })
              }
            />
            <h5>Font Weight</h5>
            <Button
              disabled={this.state.disableButtons}
              onClick={() =>
                this.setState({
                  fontStyleIndex:
                    this.state.fontStyleIndex !== 2
                      ? this.state.fontStyleIndex + 1
                      : 0,
                })
              }
            >
              {
                fontStyleArray[
                  this.state.fontStyleIndex !== 2
                    ? this.state.fontStyleIndex + 1
                    : 0
                ]
              }
            </Button>
          </Panel>
        </Col>
      </Row>
    );
  }

  renderCreatingProduct() {
    return (
      <Row>
        <Creation uniqueId={this.state.uniqueId} />
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
    <form>
      <FormGroup controlId="formBasicText">
        <ControlLabel>{inputParameter}</ControlLabel>
        <FormControl
          type="text"
          placeholder={placeholderText}
          onChange={onChangeHandler}
        />
      </FormGroup>
    </form>
  );
};

export default App;
