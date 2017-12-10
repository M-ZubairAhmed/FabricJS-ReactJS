import React from 'react';
import {
  Col,
  Button,
  Panel,
  FormGroup,
  FormControl,
  Image,
  Modal,
} from 'react-bootstrap';
import Konva from 'konva';
import cloudinary from 'cloudinary';
import { cloudinaryConfig } from './secret';

import Canva from './Canva';
import { stickerDesigns } from './mock';

let imageCustomized = '';
export default class Customization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customImageURL: '',
      customText: '',
      showModal: false,
    };
    cloudinary.config(cloudinaryConfig);
  }

  getPaintedCanvas = (canvas, dx) => {
    imageCustomized = canvas.toDataURL('image/png', 1.0);
  };

  saveCustomizedProduct = createdImage => {
    const uniqueIdPasses =
      this.props.uniqueId === '' || this.props.uniqueId === null
        ? new Date()
        : this.props.uniqueId;
    if (createdImage !== '') {
      cloudinary.uploader.upload(createdImage, result => {}, {
        public_id: uniqueIdPasses,
      });
      this.setState({
        showModal: true,
      });
    }
  };

  render() {
    const stickerDesignStyle = {
      width: '50px',
      height: '50px',
      cursor: 'pointer',
    };
    const editorStyles = {
      marginTop: '4rem',
    };
    return (
      <div style={editorStyles}>
        <Col lg={8}>
          <Canva
            backgroundImage={this.props.backgroundImage}
            productType={this.props.productType}
            customText={this.state.customText}
            customImageURL={this.state.customImageURL}
            fontStyle={this.props.fontStyle}
            getPaintedCanvas={this.getPaintedCanvas}
          />
        </Col>
        <Col lg={4}>
          <Panel>
            <h4>Customize your Product</h4>
            <Panel>
              <h5>Select decals</h5>
              {stickerDesigns.map((stickerDesign, index) => {
                return (
                  <Image
                    className="stickerDesign"
                    key={index}
                    circle
                    alt="171x180"
                    src={stickerDesign}
                    style={stickerDesignStyle}
                    onClick={() =>
                      this.setState({ customImageURL: stickerDesign })
                    }
                  />
                );
              })}
            </Panel>
            <Panel>
              <CustomInput
                inputParameter="Add customized text:"
                placeholderText="Add text"
                onChangeHandler={e =>
                  this.setState({
                    customText: e.target.value,
                    disableButtons:
                      this.props.customText === '' || e.target.value === '',
                  })
                }
              />
              <h5>Font Weight</h5>
              <Button
                disabled={this.props.disableButtons}
                onClick={this.props.onClickBoldButton}
              >
                {
                  this.props.fontStyleArray[
                    this.props.fontStyleIndex !== 2
                      ? this.props.fontStyleIndex + 1
                      : 0
                  ]
                }
              </Button>
            </Panel>
            <Button block>Cancel</Button>
            <Button
              block
              bsStyle="success"
              onClick={() => this.saveCustomizedProduct(imageCustomized)}
            >
              Confirm Changes
            </Button>
          </Panel>
        </Col>
        <Modal show={this.state.showModal} bsSize="huge">
          <Modal.Header closeButton>
            <Modal.Title>Customization Successfull</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You may now add the your customized product to cart
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const CustomInput = ({ inputParameter, onChangeHandler, placeholderText }) => {
  return (
    <form>
      <div id="container" />
      <FormGroup controlId="formBasicText">
        <h5>{inputParameter}</h5>
        <FormControl
          type="text"
          placeholder={placeholderText}
          onChange={onChangeHandler}
        />
      </FormGroup>
    </form>
  );
};
