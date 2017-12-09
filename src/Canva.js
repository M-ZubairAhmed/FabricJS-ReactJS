import React from 'react';
import Konva from 'konva';

let savingURL;
export default class Canva extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: this.calculateCanvasDim(this.props.productType),
			backgroundImageSize: 600,
			insertedNewImagePosition: this.calculateCenterPosition(600)
		};
	}

	calculateCanvasDim(type) {
		switch (type) {
			case 'shirt':
				return 300;
			case 'mug':
				return 200;
			default:
				return 0;
		}
	}

	calculateCenterPosition(backgroundImageSize) {
		return (
			(backgroundImageSize - this.calculateCanvasDim(this.props.productType)) /
			2
		);
	}

	componentWillReceiveProps(newProps) {
		if (this.props !== newProps) {
			const width = this.state.size;
			const height = this.state.size;

			function update(activeAnchor) {
				var group = activeAnchor.getParent();
				var topLeft = group.get('.topLeft')[0];
				var topRight = group.get('.topRight')[0];
				var bottomRight = group.get('.bottomRight')[0];
				var bottomLeft = group.get('.bottomLeft')[0];
				var image = group.get('Image')[0];
				var anchorX = activeAnchor.getX();
				var anchorY = activeAnchor.getY();

				switch (activeAnchor.getName()) {
					case 'topLeft':
						topRight.setY(anchorY);
						bottomLeft.setX(anchorX);
						break;
					case 'topRight':
						topLeft.setY(anchorY);
						bottomRight.setX(anchorX);
						break;
					case 'bottomRight':
						bottomLeft.setY(anchorY);
						topRight.setX(anchorX);
						break;
					case 'bottomLeft':
						bottomRight.setY(anchorY);
						topLeft.setX(anchorX);
						break;
				}

				image.position(topLeft.position());

				var width = topRight.getX() - topLeft.getX();
				var height = bottomLeft.getY() - topLeft.getY();
				if (width && height) {
					image.width(width);
					image.height(height);
				}
			}
			function addAnchor(group, x, y, name) {
				var stage = group.getStage();
				var layer = group.getLayer();

				var anchor = new Konva.Circle({
					x: x,
					y: y,
					stroke: '#666',
					fill: '#ddd',
					strokeWidth: 2,
					radius: 8,
					name: name,
					draggable: true,
					dragOnTop: false
				});

				anchor.on('dragmove', function() {
					update(this);
					layer.draw();
				});
				anchor.on('mousedown touchstart', function() {
					group.setDraggable(false);
					this.moveToTop();
				});
				anchor.on('dragend', function() {
					group.setDraggable(true);
					layer.draw();
				});
				anchor.on('mouseover', function() {
					var layer = this.getLayer();
					document.body.style.cursor = 'pointer';
					this.setStrokeWidth(4);
					layer.draw();
				});
				anchor.on('mouseout', function() {
					var layer = this.getLayer();
					document.body.style.cursor = 'default';
					this.setStrokeWidth(2);
					layer.draw();
				});
				group.add(anchor);
			}

			var stage = new Konva.Stage({
				container: 'canvasContainer',
				width: width,
				height: height
			});

			var layer = new Konva.Layer();
			stage.add(layer);

			var imageCanvas = new Konva.Image({
				width: 100,
				height: 100
			});

			var imageGroup = new Konva.Group({
				x: 0,
				y: 0,
				draggable: true
			});

			layer.add(imageGroup);
			imageGroup.add(imageCanvas);

			addAnchor(imageGroup, 0, 0, 'topLeft');
			addAnchor(imageGroup, 100, 0, 'topRight');
			addAnchor(imageGroup, 100, 100, 'bottomRight');
			addAnchor(imageGroup, 0, 100, 'bottomLeft');

			var imageObj = new Image();
			imageObj.onload = function() {
				imageCanvas.image(imageObj);
				layer.draw();
			};
			imageObj.src = newProps.customImageURL;
			var textCanvas = new Konva.Text({
				x: 20,
				y: 20,
				text: newProps.customText,
				fontSize: 30,
				fontFamily: 'Calibri',
				fill: 'green'
			});

			textCanvas.on('mouseover', function() {
				document.body.style.cursor = 'move';
			});

			textCanvas.on('mouseout', function() {
				document.body.style.cursor = 'default';
			});

			var textGroup = new Konva.Group({
				x: 0,
				y: 0,
				draggable: true
			});

			layer.add(textGroup);
			textGroup.add(textCanvas);
		}
	}

	render() {
		const rootStyle = {
			backgroundImage: `url(${this.props.backgroundImage})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: '100% 100%',
			height: `${this.state.backgroundImageSize}px`,
			width: `${this.state.backgroundImageSize}px`
		};

		const rootCanvasStyle = {
			top: `${this.state.insertedNewImagePosition}px`,
			left: `${this.state.insertedNewImagePosition}px`,
			position: 'absolute',
			border: '1px dashed white'
		};

		return (
			<div style={rootStyle}>
				<div style={rootCanvasStyle} id="canvasContainer" />
			</div>
		);
	}
}
