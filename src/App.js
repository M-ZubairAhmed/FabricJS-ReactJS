import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import Canva from './Canva'

const UrlFromClient = new URL(window.location.href)

class App extends Component {
  constructor() {
    super()
    this.state = {
      originalImageURL: UrlFromClient.searchParams.get('originalImageURL'),
      productType: UrlFromClient.searchParams.get('productType'),
    }
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={12}>
            <Canva
              backgroundImage={this.state.originalImageURL}
              productType={this.state.productType}
            />
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    )
  }
}

export default App
