import { Component } from '@angular/core';
import { LfScaleAnimationFactory } from '../../../../src/app/animations';
@Component({
	selector: 'demo-animations-scaling',
	templateUrl: './scaling.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LfScaleAnimationFactory()],
})
export class ScalingComponent {
	scalingLeft = false;
	scalingRight = false;
	scalingTop = false;
	scalingBottom = false;
	scalingCenter = false;
}
