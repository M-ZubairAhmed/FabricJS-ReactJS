import React from 'react'
import Konva from 'konva'

let size, centerPosition
export default class Canva extends React.Component {
  state = {
    size: this.selectCanvasDim(this.props.type),
  }
  selectCanvasDim() {
    switch (this.props.type) {
      case 'shirt':
        size = 300
        break
      case 'mug':
        size = 100
        break
      default:
        size = 0
    }
    centerPosition = (700 - size) / 2
    return size
  }

  componentDidMount() {
    var width = 200
    var height = 200

    function update(activeAnchor) {
      var group = activeAnchor.getParent()
      var topLeft = group.get('.topLeft')[0]
      var topRight = group.get('.topRight')[0]
      var bottomRight = group.get('.bottomRight')[0]
      var bottomLeft = group.get('.bottomLeft')[0]
      var image = group.get('Image')[0]
      var anchorX = activeAnchor.getX()
      var anchorY = activeAnchor.getY()

      switch (activeAnchor.getName()) {
        case 'topLeft':
          topRight.setY(anchorY)
          bottomLeft.setX(anchorX)
          break
        case 'topRight':
          topLeft.setY(anchorY)
          bottomRight.setX(anchorX)
          break
        case 'bottomRight':
          bottomLeft.setY(anchorY)
          topRight.setX(anchorX)
          break
        case 'bottomLeft':
          bottomRight.setY(anchorY)
          topLeft.setX(anchorX)
          break
      }

      image.position(topLeft.position())

      var width = topRight.getX() - topLeft.getX()
      var height = bottomLeft.getY() - topLeft.getY()
      if (width && height) {
        image.width(width)
        image.height(height)
      }
    }
    function addAnchor(group, x, y, name) {
      var stage = group.getStage()
      var layer = group.getLayer()

      var anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        radius: 8,
        name: name,
        draggable: true,
        dragOnTop: false,
      })

      anchor.on('dragmove', function() {
        update(this)
        layer.draw()
      })
      anchor.on('mousedown touchstart', function() {
        group.setDraggable(false)
        this.moveToTop()
      })
      anchor.on('dragend', function() {
        group.setDraggable(true)
        layer.draw()
      })
      // add hover styling
      anchor.on('mouseover', function() {
        var layer = this.getLayer()
        document.body.style.cursor = 'pointer'
        this.setStrokeWidth(4)
        layer.draw()
      })
      anchor.on('mouseout', function() {
        var layer = this.getLayer()
        document.body.style.cursor = 'default'
        this.setStrokeWidth(2)
        layer.draw()
      })

      group.add(anchor)
    }

    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    })

    var layer = new Konva.Layer()
    stage.add(layer)

    // darth vader
    var darthVaderImg = new Konva.Image({
      width: 100,
      height: 100,
    })

    // yoda
    var yodaImg = new Konva.Image({
      width: 100,
      height: 100,
    })

    var darthVaderGroup = new Konva.Group({
      x: 180,
      y: 50,
      draggable: true,
    })
    layer.add(darthVaderGroup)
    darthVaderGroup.add(darthVaderImg)
    addAnchor(darthVaderGroup, 0, 0, 'topLeft')
    addAnchor(darthVaderGroup, 100, 0, 'topRight')
    addAnchor(darthVaderGroup, 100, 100, 'bottomRight')
    addAnchor(darthVaderGroup, 0, 100, 'bottomLeft')

    var yodaGroup = new Konva.Group({
      x: 20,
      y: 110,
      draggable: true,
    })
    layer.add(yodaGroup)
    yodaGroup.add(yodaImg)
    addAnchor(yodaGroup, 0, 0, 'topLeft')
    addAnchor(yodaGroup, 100, 0, 'topRight')
    addAnchor(yodaGroup, 100, 100, 'bottomRight')
    addAnchor(yodaGroup, 0, 100, 'bottomLeft')

    var imageObj1 = new Image()
    imageObj1.onload = function() {
      darthVaderImg.image(imageObj1)
      layer.draw()
    }
    imageObj1.src = 'http://lorempixel.com/100/100'

    var imageObj2 = new Image()
    imageObj2.onload = function() {
      yodaImg.image(imageObj2)
      layer.draw()
    }
    imageObj2.src = 'http://lorempixel.com/100/100'
  }

  render() {
    const canvaContainer = {
      backgroundImage: `url(${this.props.image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      height: '700px',
      width: '700px',
    }

    const stageStyle = {
      top: `${centerPosition}px`,
      left: `${centerPosition}px`,
      position: 'absolute',
      border: '1px dashed white',
    }

    return (
      <div style={canvaContainer}>
        <div style={stageStyle} id="container" />
      </div>
    )
  }
}
