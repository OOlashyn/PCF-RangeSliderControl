import {IInputs, IOutputs} from "./generated/ManifestTypes";
import noUiSlider = require("nouislider");

export class RangeSliderControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _slider: HTMLDivElement;

	private _minValue: number;
	private _maxValue: number;
	private _stepValue: number;

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
		this.notifyOutputChanged = notifyOutputChanged;
		this._container = container;

		this._minValue = context.parameters.MinValue.raw || 0;
		this._maxValue = context.parameters.MaxValue.raw || 100;
		this._stepValue = context.parameters.StepValue.raw;

		this._slider = document.createElement("div");
		this._slider.id = "slider";

		let wrapperContainer = document.createElement("div");
		wrapperContainer.style.marginTop = "50px";
		wrapperContainer.appendChild(this._slider);

		this._container.appendChild(wrapperContainer);

		noUiSlider.create(this._slider, {
			start: [20, 80],
			connect: true,
			range: {
				'min': 0,
				'max': 100
			},
			tooltips: true,
		});
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._minValue = context.parameters.MinValue.raw;
		this._maxValue = context.parameters.MaxValue.raw;
		this._context = context;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
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