import {IInputs, IOutputs} from "./generated/ManifestTypes";
import noUiSlider = require("nouislider");

export class RangeSliderControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _slider: HTMLDivElement;

	private _minValue: number;
	private _maxValue: number;
	private _stepValue: number;
	private _upperValue: number;
	private _lowerValue: number;

	private _context: ComponentFramework.Context<IInputs>;
	private notifyOutputChanged: () => void;
	private _container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this.refreshData = this.refreshData.bind(this);

		this.notifyOutputChanged = notifyOutputChanged;
		this._container = container;

		this._minValue = context.parameters.MinValue.raw || 0;
		this._maxValue = context.parameters.MaxValue.raw || 100;
		this._stepValue = context.parameters.StepValue.raw || 10;
		this._upperValue = context.parameters.UpperValue.raw;
		this._lowerValue = context.parameters.LowerValue.raw;

		let showScale = !!context.parameters.ShowScale.raw;
		let requireStep = !!context.parameters.RequireStep.raw;

		this._slider = document.createElement("div");
		this._slider.id = "slider";

		let wrapperContainer = document.createElement("div");
		wrapperContainer.className = "dwcrm-slider-wrapper";

		wrapperContainer.appendChild(this._slider);

		this._container.appendChild(wrapperContainer);

		let startLower:number = this._lowerValue || this._minValue;
		let startUpper:number = this._upperValue || this._maxValue;

		let sliderOptions = this.getSliderOptions(this._minValue, this._maxValue,
			startLower, startUpper, this._stepValue, showScale, requireStep);

		noUiSlider.create(this._slider, sliderOptions);

		// @ts-ignore
		this._slider.noUiSlider.on('change', this.refreshData);
	}

	private getSliderOptions(min:number,max:number, startLower:number, startUpper:number, 
		step:number, showScale:boolean, requireStep:boolean): noUiSlider.Options{

		let options:noUiSlider.Options = {
			start: [startLower, startUpper],
			range: {
				'min': min,
				'max': max
			},
			connect: true,
			tooltips: true
		};

		if(showScale && step){
			options.pips = {
				mode: 'steps',
        		values: [0, 50, 100],
				density: 2,
				stepped: true
			};
		}

		if(requireStep){
			options.range = {
				'min': [min, step],
				'max': max
			}
		}

		return options;
	}

	public refreshData(values:string[], handle:number):void{
		console.log("refreshData");
		let value:string = values[handle];

		if(handle == 0){
			this._lowerValue = parseFloat(value);
		} else {
			this._upperValue = parseFloat(value);
		}
		this.notifyOutputChanged();
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		let updated:boolean = false;
		this._context = context;
		let newUpper = context.parameters.UpperValue.raw;
		if(this._upperValue != newUpper){
			this._upperValue = newUpper;
			updated = true;
		}

		let newLower = context.parameters.LowerValue.raw;
		if(this._lowerValue != newLower){
			this._lowerValue = newLower;
			updated = true;
		}

		if(updated){
			// @ts-ignore
			this._slider.noUiSlider.set([this._lowerValue, this._upperValue]);
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return { 
            UpperValue: this._upperValue, 
            LowerValue: this._lowerValue 
        };
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}