import React from 'react';
import {
  Button,
  Col,
  Panel,
  ListGroup,
  ListGroupItem,
  Modal,
} from 'react-bootstrap';
import Selector from './Selector';
import { trophiesShoots, trophiesStems, trophiesRoots } from './mock';
import html2canvas from 'html2canvas';
import cloudinary from 'cloudinary';
import { cloudinaryConfig } from './secret';

export default class Creation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shootSelection: 0,
      stemSelection: 0,
      rootSelection: 0,
      showModal: false,
    };
    cloudinary.config(cloudinaryConfig);
  }

  getActiveSelection = (activeIndex, selectionPart) => {
    switch (selectionPart) {
      case 'shoot':
        this.setState({
          shootSelection: activeIndex,
        });
        break;
      case 'stem':
        this.setState({
          stemSelection: activeIndex,
        });
        break;
      case 'root':
        this.setState({
          rootSelection: activeIndex,
        });
        break;
      default:
    }
  };

  renderPreview() {
    return (
      <ListGroup>
        <h5>Selected product no.</h5>
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
    );
  }

  saveCreatingTrophy = () => {
    const uniqueIdPasses =
      this.props.uniqueId === '' || this.props.uniqueId === null
        ? new Date()
        : this.props.uniqueId;
    html2canvas(this.myDiv).then(canvas => {
      const createdImage = canvas.toDataURL('image/png', 1.0);
      cloudinary.uploader.upload(createdImage, result => {}, {
        public_id: uniqueIdPasses,
      });
    });
    this.setState({
      showModal: true,
    });
  };

  render() {
    const editorStyles = {
      marginTop: '10rem',
    };
    const smallImage = {
      width: '50px',
    };

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
            <h4>Create your Product</h4>
            {this.renderPreview()}
            <Panel>
              <h5>Preview</h5>
              <div ref={c => (this.myDiv = c)}>
                <div>
                  <img
                    alt="shoot"
                    style={smallImage}
                    src={trophiesShoots[this.state.shootSelection]}
                  />
                </div>
                <div>
                  <img
                    alt="stem"
                    style={smallImage}
                    src={trophiesStems[this.state.stemSelection]}
                  />
                </div>
                <div>
                  <img
                    alt="root"
                    style={smallImage}
                    src={trophiesRoots[this.state.rootSelection]}
                  />
                </div>
              </div>
            </Panel>
            <Button block>Cancel</Button>
            <Button block bsStyle="success" onClick={this.saveCreatingTrophy}>
              Confirm Selection
            </Button>
          </Panel>
          <Modal show={this.state.showModal}>
            <Modal.Header closeButton>
              <Modal.Title>Customization Successfull</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You may now add the your customized product to cart
            </Modal.Body>
          </Modal>
        </Col>
      </div>
    );
  }
}
