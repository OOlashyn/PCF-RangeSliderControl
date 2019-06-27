# PCF-RangeSliderControl

Purpose of this control is to allow users to create customizable range slider control (using [noUiSlider](https://refreshless.com/nouislider/))

![Demo](https://github.com/OOlashyn/PCF-RangeSliderControl/blob/master/Screenshots/demo-v1.gif?raw=true)

You can see more examples in the Demo section below.

### Download Range Slider Control

[Download](https://github.com/OOlashyn/PCF-RangeSliderControl/releases)

## Configuration

This is the list of parameters that can be set on the control

* **MinValue** : Attribute to use as minimal value for sliders range (required | input manually or bound to attribute | read only)
* **MaxValue** : Attribute to use as maximum value for sliders range (required | input manually or bound to attribute | read only)
* **StepValue** : Attribute to use as step value for sliders range (optional | input manually or bound to attribute | read only)
* **HolderValue** : Attribute that serve as reference to holder field only ( will be set by the system automatically )
* **LowerValue** : Attribute to use as starting lower value for slider (required | bound to attribute)
* **UpperValue** : Attribute to use as starting upper value for slider (required | bound to attribute)
* **ShowScale** : Attribute that allows to add scale for slider. 1 to add scale, 0 to remove. If 1 you need to provide StepValue as well (optional | input manually or bound to attribute | read only)
* **RequireStep** : Attribute that allows to restrict holder movement to step size (set 1 to restrict). If 1 you need to provide StepValue as well (optional | input manually or bound to attribute | read only)

## Demo

Show scale below slider. **ShowScale** value set to 1.

![DemoScale](https://github.com/OOlashyn/PCF-RangeSliderControl/blob/master/Screenshots/demo-scale-v1.gif?raw=true)

Restrict holder to move only on step size.  **RequireStep** value set to 1. **ShowScale** value set to 1. **StepValue** set to 10.

![DemoStep](https://github.com/OOlashyn/PCF-RangeSliderControl/blob/master/Screenshots/demo-step-v1.gif?raw=true)
