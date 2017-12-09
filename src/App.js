import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Canva from './Canva'
import Creation from './Creation'

const UrlFromClient = new URL(window.location.href)

class App extends Component {
  constructor() {
    super()
    this.state = {
      backgroundImage: UrlFromClient.searchParams.get('originalImageURL'),
      productType: UrlFromClient.searchParams.get('productType'),
      customImageURL: 'http://lorempixel.com/100/100/',
    }
  }

  renderCustomizationProduct() {
    return (
      <Row>
        <Col lg={8}>
          <Canva {...this.state} />
        </Col>
        <Col lg={4}>
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
                  this.setState({ customImageURL: e.target.value })
                }
              />
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  renderCreatingProduct() {
    return (
      <Row>
        <Creation />
      </Row>
    )
  }

  render() {
    return (
      <Grid>
        {this.state.productType === 'trophy'
          ? this.renderCreatingProduct()
          : this.renderCustomizationProduct()}
      </Grid>
    )
  }
}

export default App
