import {
    Component,
    Input} from '@angular/core';

@Component({
    selector: 'app-busy-indicator',
    templateUrl: './busy-indicator.component.html',
    styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent  {
  private _hexColor = '#D2B48C';
    @Input() busy!: boolean;
    @Input()
  public get hexColor() {
    return this._hexColor;
  }
  public set hexColor(value) {
    this._hexColor = value;
  }
}
