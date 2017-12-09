import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import Creation from './Creation';
import Customization from './Customization';

const UrlFromClient = new URL(window.location.href);

class App extends Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: UrlFromClient.searchParams.get('originalImageURL'),
      productType: UrlFromClient.searchParams.get('productType'),
      uniqueId: UrlFromClient.searchParams.get('uniqueId'),
      customImageURL: '',
      fontStyleIndex: 0,
      disableButtons: true,
    };
  }

  renderCustomizationProduct() {
    const fontStyleArray = ['normal', 'bold', 'italic'];
    return (
      <Row>
        <Customization
          backgroundImage={this.state.backgroundImage}
          productType={this.state.productType}
          uniqueId={this.state.uniqueId}
          onClickBoldButton={() =>
            this.setState({
              fontStyleIndex:
                this.state.fontStyleIndex !== 2
                  ? this.state.fontStyleIndex + 1
                  : 0,
            })
          }
          fontStyle={fontStyleArray[this.state.fontStyleIndex]}
          fontStyleIndex={this.state.fontStyleIndex}
          fontStyleArray={fontStyleArray}
        />
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

export default App;
