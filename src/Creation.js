import React from 'react'
import { Button, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import Selector from './Selector'
import { trophiesShoots, trophiesStems, trophiesRoots } from './mock'
import html2canvas from 'html2canvas'
import cloudinary from 'cloudinary'
import { cloudinaryConfig } from './secret'

export default class Creation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shootSelection: 0,
      stemSelection: 0,
      rootSelection: 0,
    }
    const cloudinaryImages = cloudinary.config(cloudinaryConfig)
  }

  getActiveSelection = (activeIndex, selectionPart) => {
    switch (selectionPart) {
      case 'shoot':
        this.setState({
          shootSelection: activeIndex,
        })
        break
      case 'stem':
        this.setState({
          stemSelection: activeIndex,
        })
        break
      case 'root':
        this.setState({
          rootSelection: activeIndex,
        })
        break
      default:
    }
  }

  renderPreview() {
    //Todo
    return (
      <ListGroup>
        <h5>Preview</h5>
        <ListGroupItem header={`${this.state.shootSelection}`}>
          Shoot
        </ListGroupItem>
        <ListGroupItem header={`${this.state.stemSelection}`}>
          Stem
        </ListGroupItem>
        <ListGroupItem header={`${this.state.rootSelection}`}>
          Root
        </ListGroupItem>
      </ListGroup>
    )
  }

  saveCreatingTrophy = () => {
    html2canvas(this.myDiv).then(canvas => {
      const createdImage = canvas.toDataURL('image/png', 1.0)
      // console.log(trophyImageEncode)
      cloudinary.uploader.upload(createdImage, result => {}, {
        public_id: 'ass',
      })
    })
  }

  render() {
    const editorStyles = {
      marginTop: '10rem',
    }
    const smallImage = {
      width: '50px',
    }

    return (
      <div style={editorStyles}>
        <Col lg={8}>
          <Selector
            inputSliderData={trophiesShoots}
            getActiveSelection={this.getActiveSelection}
            name="shoot"
          />
          <Selector
            inputSliderData={trophiesStems}
            getActiveSelection={this.getActiveSelection}
            name="stem"
          />
          <Selector
            inputSliderData={trophiesRoots}
            getActiveSelection={this.getActiveSelection}
            name="root"
          />
        </Col>
        <Col lgOffset={1} lg={3}>
          <Panel>
            {this.renderPreview()}
            <div ref={c => (this.myDiv = c)}>
              <div>
                <img
                  style={smallImage}
                  src={trophiesShoots[this.state.shootSelection]}
                />
              </div>
              <div>
                <img
                  style={smallImage}
                  src={trophiesStems[this.state.stemSelection]}
                />
              </div>
              <div>
                <img
                  style={smallImage}
                  src={trophiesRoots[this.state.rootSelection]}
                />
              </div>
            </div>
            <Button block bsStyle="success" onClick={this.saveCreatingTrophy}>
              Confirm Selection
            </Button>
            <Button block>Cancel</Button>
          </Panel>
        </Col>
      </div>
    )
  }
}
