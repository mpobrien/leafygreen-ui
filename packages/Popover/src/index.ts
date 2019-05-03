import Popover from './Popover';

export enum Align {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export enum Justify {
  start = 'start',
  middle = 'middle',
  end = 'end',
}

// We transform 'middle' into 'center-vertical' or 'center-horizontal' for internal use,
// So both Justify and Justification are needed, where the same is not true for Alignment.
export enum Justification {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  'center-vertical' = 'center-vertical',
  'center-horizontal' = 'center-horizontal',
}

export interface AbsolutePositionObject {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

export interface RefPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

export interface AbstractPosition {
  alignment?: Align;
  justification?: Justification;
}

export default Popover;
