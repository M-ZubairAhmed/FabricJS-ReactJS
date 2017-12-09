import React from 'react';
import {
  Col,
  Button,
  Panel,
  FormGroup,
  FormControl,
  Image,
} from 'react-bootstrap';

import Canva from './Canva';
import { stickerDesigns } from './mock';

export default class Customization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customImageURL: '',
      customText: '',
    };
  }
  render() {
    const stickerDesignStyle = {
      width: '50px',
      height: '50px',
      cursor: 'pointer',
    };
    return (
      <div>
        <Col lg={8}>
          <Canva
            backgroundImage={this.props.backgroundImage}
            productType={this.props.productType}
            customText={this.state.customText}
            customImageURL={this.state.customImageURL}
            fontStyle={this.props.fontStyle}
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
            <Button block bsStyle="success">
              Confirm Changes
            </Button>
          </Panel>
        </Col>
      </div>
    );
  }
}

const CustomInput = ({ inputParameter, onChangeHandler, placeholderText }) => {
  return (
    <form>
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
