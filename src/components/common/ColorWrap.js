import React, { Component, PureComponent } from 'react'
import color from '../../helpers/color'

export const ColorWrap = (Picker) => {
  class ColorPicker extends (PureComponent || Component) {
    constructor(props) {
      super(props)

      this.state = {
        ...color.toState(props.color, 0),
      }
    }

    static getDerivedStateFromProps(nextProps, state) {
      return {
        ...color.toState(nextProps.color, state.oldHue),
      }
    }

    handleChange = (data, event) => {
      const isValidColor = color.simpleCheckForValidColor(data)
      if (isValidColor) {
        const colors = color.toState(data, data.h || this.state.oldHue)
        this.setState(colors)
        this.props.onChange && this.props.onChange(colors, event)
      }
    }

    handleSwatchHover = (data, event) => {
      const isValidColor = color.simpleCheckForValidColor(data)
      if (isValidColor) {
        const colors = color.toState(data, data.h || this.state.oldHue)
        this.props.onSwatchHover && this.props.onSwatchHover(colors, event)
      }
    }

    render() {
      const optionalEvents = {}
      if (this.props.onSwatchHover) {
        optionalEvents.onSwatchHover = this.handleSwatchHover
      }

      return (
        <Picker
          { ...this.props }
          { ...this.state }
          onChange={ this.handleChange }
          { ...optionalEvents }
        />
      )
    }
  }

  ColorPicker.propTypes = {
    ...Picker.propTypes,
  }

  ColorPicker.defaultProps = {
    ...Picker.defaultProps,
    color: {
      h: 250,
      s: 0.50,
      l: 0.20,
      a: 1,
    },
  }

  return ColorPicker
}

export default ColorWrap
